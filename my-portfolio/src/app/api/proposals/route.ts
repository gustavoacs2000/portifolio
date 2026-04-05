import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { isProposalSource, proposalSourceLabels, type ProposalSource } from "@/lib/proposals/shared";

export const runtime = "nodejs";

const MAX_FIELDS = 50;
const MAX_VALUE_LENGTH = 4000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;

const requestCounter = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  const header = request.headers.get("x-forwarded-for");
  if (!header) return "unknown";
  return header.split(",")[0]?.trim() || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const current = requestCounter.get(ip);

  if (!current || now >= current.resetAt) {
    requestCounter.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  current.count += 1;
  requestCounter.set(ip, current);
  return true;
}

function stringifyValue(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  if (Array.isArray(value)) {
    return value
      .map((item) => stringifyValue(item))
      .filter(Boolean)
      .join(", ");
  }

  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}

function sanitizePayload(payload: unknown): Record<string, string> {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {};
  }

  const entries = Object.entries(payload as Record<string, unknown>).slice(0, MAX_FIELDS);
  const sanitized: Record<string, string> = {};

  for (const [rawKey, rawValue] of entries) {
    const key = rawKey.trim();
    if (!key) continue;

    const value = stringifyValue(rawValue).slice(0, MAX_VALUE_LENGTH);
    if (!value) continue;

    sanitized[key] = value;
  }

  return sanitized;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeLabel(key: string): string {
  return key
    .replaceAll("_", " ")
    .replaceAll(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (char) => char.toUpperCase());
}

function buildEmailContent(source: ProposalSource, payload: Record<string, string>) {
  const sourceLabel = proposalSourceLabels[source];
  const sentAt = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  const rows = Object.entries(payload)
    .map(([key, value]) => {
      const safeKey = escapeHtml(normalizeLabel(key));
      const safeValue = escapeHtml(value).replaceAll("\n", "<br />");
      return `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;">${safeKey}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${safeValue}</td></tr>`;
    })
    .join("");

  const textLines = Object.entries(payload).map(([key, value]) => `${normalizeLabel(key)}: ${value}`);

  const subject = `[${sourceLabel}] Nova proposta recebida`;
  const html = `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.45;">
      <h2 style="margin:0 0 12px;">Nova proposta</h2>
      <p style="margin:0 0 16px;">Origem: <strong>${escapeHtml(sourceLabel)}</strong></p>
      <table style="border-collapse:collapse;width:100%;max-width:800px;">${rows}</table>
      <p style="margin:16px 0 0;color:#6b7280;font-size:12px;">Enviado em ${escapeHtml(sentAt)}</p>
    </div>
  `;
  const text = [`Nova proposta`, `Origem: ${sourceLabel}`, ...textLines, `Enviado em: ${sentAt}`].join("\n");

  return { subject, html, text };
}

function isValidEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sendWithResend(params: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<{ success: boolean; providerId?: string }> {
  const body: Record<string, unknown> = {
    from: params.from,
    to: [params.to],
    subject: params.subject,
    html: params.html,
    text: params.text,
  };

  if (params.replyTo) {
    body.reply_to = params.replyTo;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("[proposals] resend error", response.status, errorBody);
    return { success: false };
  }

  const data = (await response.json().catch(() => null)) as { id?: string } | null;
  return { success: true, providerId: data?.id };
}

async function sendWithSmtp(params: {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<{ success: boolean; providerId?: string }> {
  try {
    const transporter = nodemailer.createTransport({
      host: params.host,
      port: params.port,
      secure: params.secure,
      auth: {
        user: params.user,
        pass: params.pass,
      },
    });

    const info = await transporter.sendMail({
      from: params.from,
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
      replyTo: params.replyTo,
    });

    return { success: true, providerId: info.messageId };
  } catch (error) {
    console.error("[proposals] smtp error", error);
    return { success: false };
  }
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  try {
    const body = (await request.json()) as {
      source?: unknown;
      payload?: unknown;
      website?: unknown;
    };

    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ ok: true, delivered: false, reason: "honeypot" });
    }

    if (!isProposalSource(body.source)) {
      return NextResponse.json({ ok: false, error: "invalid_source" }, { status: 400 });
    }

    const payload = sanitizePayload(body.payload);
    if (Object.keys(payload).length === 0) {
      return NextResponse.json({ ok: false, error: "empty_payload" }, { status: 400 });
    }

    const { subject, html, text } = buildEmailContent(body.source, payload);

    const toEmail = process.env.PROPOSAL_TO_EMAIL;
    const fromEmail = process.env.PROPOSAL_FROM_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || "465");
    const smtpSecure =
      (process.env.SMTP_SECURE ?? "").toLowerCase() === "true" || smtpPort === 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, "");

    if (!toEmail || !fromEmail) {
      console.warn("[proposals] email provider not configured. Define PROPOSAL_TO_EMAIL and PROPOSAL_FROM_EMAIL.");
      return NextResponse.json({ ok: true, delivered: false, reason: "provider_not_configured" });
    }

    const replyTo = isValidEmail(payload.email) ? payload.email : undefined;

    const hasSmtpConfig = Boolean(
      smtpHost && Number.isFinite(smtpPort) && smtpUser && smtpPass,
    );

    if (hasSmtpConfig) {
      const smtpResult = await sendWithSmtp({
        host: smtpHost!,
        port: smtpPort,
        secure: smtpSecure,
        user: smtpUser!,
        pass: smtpPass!,
        from: fromEmail,
        to: toEmail,
        subject,
        html,
        text,
        replyTo,
      });

      if (smtpResult.success) {
        return NextResponse.json({
          ok: true,
          delivered: true,
          provider: "smtp",
          providerId: smtpResult.providerId,
        });
      }
    }

    if (resendApiKey) {
      const resendResult = await sendWithResend({
        apiKey: resendApiKey,
        from: fromEmail,
        to: toEmail,
        subject,
        html,
        text,
        replyTo,
      });

      if (resendResult.success) {
        return NextResponse.json({
          ok: true,
          delivered: true,
          provider: "resend",
          providerId: resendResult.providerId,
        });
      }
    }

    if (!hasSmtpConfig && !resendApiKey) {
      console.warn(
        "[proposals] email provider not configured. Configure SMTP_* vars or RESEND_API_KEY.",
      );
      return NextResponse.json({ ok: true, delivered: false, reason: "provider_not_configured" });
    }

    // Safe mode: do not break existing UX if provider fails.
    return NextResponse.json({ ok: true, delivered: false, reason: "provider_error" });
  } catch (error) {
    console.error("[proposals] unexpected error", error);
    // Safe mode fallback to keep current flow operational.
    return NextResponse.json({ ok: true, delivered: false, reason: "unexpected_error" });
  }
}
