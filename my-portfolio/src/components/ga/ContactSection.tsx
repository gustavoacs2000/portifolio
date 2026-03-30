"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useCallback, useRef } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { buildWhatsAppHref, contactConfig } from "@/lib/contact-config";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

const SERVICES = [
  "Landing Page Premium",
  "Site Institucional",
  "Sistema Web / Dashboard",
  "Manutenção & Suporte",
  "Não sei ainda — quero conversar",
];

const BUDGETS = [
  "Até R$ 2.000",
  "R$ 2.000 – R$ 5.000",
  "R$ 5.000 – R$ 10.000",
  "Acima de R$ 10.000",
];

function validate(data: FormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.name.trim())   errors.name  = "Informe seu nome";
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "E-mail inválido";
  if (data.phone.replace(/\D/g, "").length < 10) errors.phone = "Telefone inválido";
  if (!data.service)       errors.service = "Selecione um serviço";
  return errors;
}

function maskPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2)  return `(${d}`;
  if (d.length <= 6)  return `(${d.slice(0,2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
}

function Field({ label, error, required, children }: {
  label: string; error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
        {label}{required && <span className="text-[#00C2FF] ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }}
            className="flex items-center gap-1.5 text-[10px] text-red-400"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <AlertCircle size={10} />{error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputCls(hasError?: boolean) {
  return `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 bg-white/[0.04] text-white/85 placeholder:text-white/20 ${
    hasError
      ? "border-red-500/50 focus:border-red-400"
      : "border-white/8 focus:border-[#00C2FF]/40 focus:bg-white/[0.06]"
  }`;
}

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [data, setData] = useState<FormData>({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const onChange = useCallback((field: keyof FormData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  }, []);

  const handleSubmit = useCallback(async () => {
    const errs = validate(data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setSubmitted(true);
    setLoading(false);
  }, [data]);

  const waHref = buildWhatsAppHref(
    contactConfig.ga.whatsapp.number,
    contactConfig.ga.whatsapp.quoteMessage,
  );

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#08080F] py-24 lg:py-32 overflow-hidden"
      id="contato"
      aria-label="Formulário de orçamento"
    >
      {/* Glow bottom */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-8"
        style={{ background: "radial-gradient(ellipse at bottom, #00C2FF 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.15), transparent)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">

          {/* ── LEFT: Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col"
          >
            <p
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#00C2FF]/55 flex items-center gap-2 mb-5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="w-5 h-px bg-[#00C2FF]/30 inline-block" />
              Fale conosco
            </p>

            <h2
              className="font-bold leading-tight text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.01em" }}
            >
              Vamos construir algo{" "}
              <span className="text-[#00C2FF]">incrível</span>{" "}
              juntos
            </h2>

            <p
              className="text-sm leading-relaxed text-white/40 mb-10"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Preencha o formulário e retornamos em até 24 horas com uma
              proposta personalizada. Orçamento sempre gratuito e sem compromisso.
            </p>

            {/* Info cards */}
            <div className="flex flex-col gap-4 mb-10">
              {[
                { icon: "📍", label: "Localização", value: "Brasília — DF" },
                { icon: "⏱",  label: "Resposta",    value: "Em até 24 horas" },
                { icon: "💰", label: "Orçamento",   value: "Sempre gratuito" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/6 flex items-center justify-center shrink-0 text-base">
                    {icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</p>
                    <p className="text-sm font-medium text-white/75" style={{ fontFamily: "'Inter', sans-serif" }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp direct */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl border border-[#25D366]/20 bg-[#25D366]/8 text-[#25D366]/80 text-sm font-medium hover:bg-[#25D366]/14 hover:border-[#25D366]/35 hover:text-[#25D366] transition-all duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <MessageSquare size={16} />
              Prefere o WhatsApp? Clique aqui
            </a>
          </motion.div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="rounded-2xl border border-white/6 bg-white/[0.025] overflow-hidden"
          >
            {/* Header strip */}
            <div className="bg-[#00C2FF]/8 border-b border-[#00C2FF]/10 px-7 py-5">
              <p className="text-white font-bold text-base" style={{ fontFamily: "'Syne', sans-serif" }}>
                Solicitar orçamento
              </p>
              <p className="text-white/40 text-[10px] mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                Gratuito e sem compromisso
              </p>
            </div>

            <div className="px-7 py-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                  className="flex flex-col items-center text-center py-8 gap-5"
                >
                  <div className="w-14 h-14 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center">
                    <CheckCircle2 size={28} className="text-[#00C2FF]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.3rem" }}>
                      Mensagem recebida!
                    </h3>
                    <p className="text-sm text-white/40 max-w-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Retornaremos em até <strong className="text-white/70">24 horas</strong> com uma proposta personalizada.
                    </p>
                  </div>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366]/12 text-[#25D366] border border-[#25D366]/20 text-xs font-medium hover:bg-[#25D366]/20 transition-all"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <MessageSquare size={12} />
                    Falar agora pelo WhatsApp
                  </a>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Seu nome" required error={errors.name}>
                      <input type="text" value={data.name} onChange={e => onChange("name", e.target.value)}
                        placeholder="Nome completo" className={inputCls(!!errors.name)}
                        style={{ fontFamily: "'Inter', sans-serif" }} />
                    </Field>
                    <Field label="E-mail" required error={errors.email}>
                      <input type="email" value={data.email} onChange={e => onChange("email", e.target.value)}
                        placeholder="seu@email.com.br" className={inputCls(!!errors.email)}
                        style={{ fontFamily: "'Inter', sans-serif" }} />
                    </Field>
                  </div>

                  <Field label="WhatsApp / Telefone" required error={errors.phone}>
                    <input type="tel" value={data.phone} onChange={e => onChange("phone", maskPhone(e.target.value))}
                      placeholder="(61) 9 9999-9999" maxLength={15} className={inputCls(!!errors.phone)}
                      style={{ fontFamily: "'Inter', sans-serif" }} />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Serviço de interesse" required error={errors.service}>
                      <select value={data.service} onChange={e => onChange("service", e.target.value)}
                        className={`${inputCls(!!errors.service)} cursor-pointer`}
                        style={{ fontFamily: "'Inter', sans-serif" }}>
                        <option value="">Selecione</option>
                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                    <Field label="Investimento previsto">
                      <select value={data.budget} onChange={e => onChange("budget", e.target.value)}
                        className={`${inputCls()} cursor-pointer`}
                        style={{ fontFamily: "'Inter', sans-serif" }}>
                        <option value="">Selecione (opcional)</option>
                        {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </Field>
                  </div>

                  <Field label="Mensagem (opcional)">
                    <textarea value={data.message} onChange={e => onChange("message", e.target.value)}
                      placeholder="Conte sobre o projeto, prazos, referências visuais..."
                      rows={3} className={`${inputCls()} resize-none`}
                      style={{ fontFamily: "'Inter', sans-serif" }} />
                  </Field>

                  <div className="pt-2 border-t border-white/5">
                    {errors.submit && (
                      <p className="flex items-center gap-1.5 text-xs text-red-400 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <AlertCircle size={12} />{errors.submit}
                      </p>
                    )}
                    <motion.button
                      type="button" onClick={handleSubmit} disabled={loading}
                      className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                        loading ? "bg-white/20 text-white/40 cursor-wait" : "bg-[#00C2FF] text-[#08080F] hover:bg-[#33CFFF]"
                      }`}
                      style={{ fontFamily: "'Syne', sans-serif" }}
                      whileHover={loading ? {} : { scale: 1.01 }}
                      whileTap={loading ? {} : { scale: 0.98 }}
                    >
                      {loading ? "Enviando..." : "Solicitar orçamento grátis"}
                      {!loading && <ArrowRight size={14} />}
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
