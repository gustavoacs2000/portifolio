"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useCallback, useRef } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Music } from "lucide-react";
import { buildWhatsAppHref, contactConfig } from "@/lib/contact-config";
import { submitProposal } from "@/lib/proposals/client";

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface EnrollmentFormProps {
  whatsappNumber?: string;
  onSubmit?: (data: FormData) => Promise<void>;
}

interface FormData {
  studentName: string;
  studentAge: string;
  guardianName: string;
  phone: string;
  email: string;
  modality: string;
  level: string;
  schedule: string;
  howFound: string;
  message: string;
}

// â”€â”€â”€ Options â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const MODALITIES = [
  { value: "violino",       label: "Violino",        icon: "ðŸŽ»" },
  { value: "viola-de-arco", label: "Viola de Arco",  icon: "ðŸŽ¼" },
  { value: "violoncelo",    label: "Violoncelo",     icon: "ðŸŽ¶" },
  { value: "violao",        label: "Violao",         icon: "ðŸŽ¸" },
  { value: "piano",         label: "Piano",          icon: "ðŸŽ¹" },
];

const LEVELS = [
  "Nunca toquei instrumento",
  "Iniciante (menos de 1 ano)",
  "BÃ¡sico (1 a 2 anos)",
  "IntermediÃ¡rio (2 a 5 anos)",
  "AvanÃ§ado (5+ anos)",
];

const SCHEDULES = [
  "ManhÃ£ (8hâ€“12h)",
  "Tarde (13hâ€“17h)",
  "Noite (18hâ€“21h)",
  "SÃ¡bado",
  "FlexÃ­vel / Qualquer horÃ¡rio",
];

const HOW_FOUND = [
  "Instagram",
  "IndicaÃ§Ã£o de amigo ou familiar",
  "Google",
  "Passando pela escola",
  "Outro",
];

// â”€â”€â”€ Validators â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function validate(data: FormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.studentName.trim())  errors.studentName  = "Informe o nome do aluno";
  if (!data.studentAge.trim())   errors.studentAge   = "Informe a idade";
  if (!data.phone.replace(/\D/g, "") || data.phone.replace(/\D/g, "").length < 10)
    errors.phone = "Telefone invÃ¡lido";
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    errors.email = "E-mail invÃ¡lido";
  if (!data.modality)  errors.modality  = "Selecione uma modalidade";
  if (!data.level)     errors.level     = "Selecione o nÃ­vel";
  if (!data.schedule)  errors.schedule  = "Selecione um horÃ¡rio";
  return errors;
}

function maskPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2)  return `(${d}`;
  if (d.length <= 6)  return `(${d.slice(0,2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
}

// â”€â”€â”€ Field wrapper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function Field({ label, error, required, children }: {
  label: string; error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs font-medium text-[#1D4570]/65"
        style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
      >
        {label}{required && <span className="text-[#1D4570] ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }}
            className="flex items-center gap-1.5 text-[10px] text-red-400"
            style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
          >
            <AlertCircle size={10} />{error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputCls(hasError?: boolean) {
  return `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 bg-white text-[#1D4570] placeholder:text-stone-300 ${
    hasError
      ? "border-red-300 focus:border-red-400"
      : "border-[#1D4570]/10 focus:border-[#1D4570]/35 focus:ring-2 focus:ring-[#1D4570]/5"
  }`;
}

// â”€â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function EnrollmentForm({
  whatsappNumber = contactConfig.dueto.whatsapp.number,
  onSubmit,
}: EnrollmentFormProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [data, setData] = useState<FormData>({
    studentName: "", studentAge: "", guardianName: "",
    phone: "", email: "", modality: "", level: "",
    schedule: "", howFound: "", message: "",
  });
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
    try {
      if (onSubmit) await onSubmit(data);
      else await submitProposal({ source: "dueto", payload: data });
      setSubmitted(true);
    } catch { setErrors({ submit: "Erro ao enviar. Tente novamente." }); }
    finally { setLoading(false); }
  }, [data, onSubmit]);

  const waHref = buildWhatsAppHref(whatsappNumber, contactConfig.dueto.whatsapp.enrollmentMessage);

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#FEFEFF] py-24 lg:py-32 overflow-hidden"
      id="matricula"
      aria-label="FormulÃ¡rio de matrÃ­cula"
    >
      {/* Decorative elements */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, #1D4570 0%, transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #1D4570 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl px-6 lg:px-0">

        {/* â”€â”€ Header â”€â”€ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1D4570]/8 mb-5">
            <Music size={20} className="text-[#1D4570]/50" />
          </div>

          <p
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#1D4570] flex items-center justify-center gap-2 mb-4"
            style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
          >
            <span className="w-5 h-px bg-[#1D4570]/40 inline-block" />
            MatrÃ­cula
            <span className="w-5 h-px bg-[#1D4570]/40 inline-block" />
          </p>

          <h2
            className="font-normal leading-tight text-[#1D4570] mb-3"
            style={{
              fontFamily: "var(--font-cormorant-sc), serif",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 400,
            }}
          >
            Comece sua{" "}
            <em
              className="italic font-normal text-[#1D4570]"
              style={{ fontFamily: "var(--font-cormorant-sc), serif" }}
            >
              jornada musical
            </em>
          </h2>

          <p
            className="text-sm text-stone-400 leading-relaxed"
            style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
          >
            Preencha o formulÃ¡rio e entraremos em contato em atÃ© 24 horas
            para confirmar a matrÃ­cula e agendar sua primeira aula.
          </p>
        </motion.div>

        {/* â”€â”€ Form card â”€â”€ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="rounded-2xl border border-[#1D4570]/8 bg-white overflow-hidden shadow-xl shadow-[#1D4570]/6"
        >
          {/* Navy header strip */}
          <div className="bg-[#1D4570] px-7 py-5 flex items-center justify-between">
            <div>
              <p
                className="text-white font-normal text-base leading-tight"
                style={{ fontFamily: "var(--font-cormorant-sc), serif" }}
              >
                Dueto Academia de MÃºsica
              </p>
              <p
                className="text-white/45 text-[10px] mt-0.5"
                style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
              >
                FormulÃ¡rio de matrÃ­cula â€” {new Date().getFullYear()}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center">
              <Music size={14} className="text-white/80" />
            </div>
          </div>

          <div className="px-7 py-7">
            {submitted ? (
              /* â”€â”€ Success â”€â”€ */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                className="flex flex-col items-center text-center py-10 gap-5"
              >
                <div className="w-14 h-14 rounded-full bg-[#1D4570]/8 border border-[#1D4570]/12 flex items-center justify-center">
                  <CheckCircle2 size={28} className="text-[#1D4570]" />
                </div>
                <div>
                  <h3
                    className="font-normal text-[#1D4570] mb-2"
                    style={{ fontFamily: "var(--font-cormorant-sc), serif", fontSize: "1.5rem" }}
                  >
                    MatrÃ­cula recebida!
                  </h3>
                  <p
                    className="text-sm text-stone-400 leading-relaxed max-w-xs"
                    style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                  >
                    Entraremos em contato em atÃ©{" "}
                    <strong className="text-[#1D4570]">24 horas</strong>{" "}
                    para confirmar sua vaga e agendar a primeira aula.
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#1D4570]/25 bg-[#1D4570]/6 text-xs"
                  style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                >
                  <Music size={12} className="text-[#1D4570]/70" />
                  <span className="text-[#1D4570]/65">Sua vaga estÃ¡ reservada</span>
                </div>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1D4570] text-white text-xs font-medium hover:bg-[#243d5e] transition-all"
                  style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                >
                  Falar pelo WhatsApp agora
                </a>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-5">

                {/* Modality */}
                <Field label="Modalidade de interesse" required error={errors.modality}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {MODALITIES.map((m) => {
                      const isSelected = data.modality === m.value;
                      return (
                        <button
                          key={m.value}
                          type="button"
                          onClick={() => onChange("modality", m.value)}
                          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 text-left ${
                            isSelected
                              ? "bg-[#1D4570] border-[#1D4570] text-white"
                              : `bg-white border-[#1D4570]/10 text-[#1D4570]/60 hover:border-[#1D4570]/25 ${errors.modality ? "border-red-200" : ""}`
                          }`}
                          style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                        >
                          <span style={{ fontSize: "15px" }}>{m.icon}</span>
                          <span className="text-xs">{m.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </Field>

                {/* Student name + age */}
                <div className="grid grid-cols-[1fr_auto] gap-4">
                  <Field label="Nome do aluno" required error={errors.studentName}>
                    <input
                      type="text"
                      value={data.studentName}
                      onChange={e => onChange("studentName", e.target.value)}
                      placeholder="Nome completo do aluno"
                      className={inputCls(!!errors.studentName)}
                      style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                    />
                  </Field>
                  <Field label="Idade" required error={errors.studentAge}>
                    <input
                      type="text"
                      value={data.studentAge}
                      onChange={e => onChange("studentAge", e.target.value)}
                      placeholder="Ex: 8"
                      className={`${inputCls(!!errors.studentAge)} w-20`}
                      maxLength={3}
                      style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                    />
                  </Field>
                </div>

                {/* Guardian name (optional) */}
                <Field label="Nome do responsÃ¡vel (se menor de idade)">
                  <input
                    type="text"
                    value={data.guardianName}
                    onChange={e => onChange("guardianName", e.target.value)}
                    placeholder="Nome do pai, mÃ£e ou responsÃ¡vel"
                    className={inputCls()}
                    style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                  />
                </Field>

                {/* Phone + email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="WhatsApp / Telefone" required error={errors.phone}>
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={e => onChange("phone", maskPhone(e.target.value))}
                      placeholder="(61) 9 9999-9999"
                      maxLength={15}
                      className={inputCls(!!errors.phone)}
                      style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                    />
                  </Field>
                  <Field label="E-mail" required error={errors.email}>
                    <input
                      type="email"
                      value={data.email}
                      onChange={e => onChange("email", e.target.value)}
                      placeholder="seu@email.com.br"
                      className={inputCls(!!errors.email)}
                      style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                    />
                  </Field>
                </div>

                {/* Level + schedule */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nivel atual no instrumento" required error={errors.level}>
                    <select
                      value={data.level}
                      onChange={e => onChange("level", e.target.value)}
                      className={`${inputCls(!!errors.level)} cursor-pointer`}
                      style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                    >
                      <option value="">Selecione</option>
                      {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </Field>
                  <Field label="HorÃ¡rio preferido" required error={errors.schedule}>
                    <select
                      value={data.schedule}
                      onChange={e => onChange("schedule", e.target.value)}
                      className={`${inputCls(!!errors.schedule)} cursor-pointer`}
                      style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                    >
                      <option value="">Selecione</option>
                      {SCHEDULES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                </div>

                {/* How found */}
                <Field label="Como nos conheceu?">
                  <select
                    value={data.howFound}
                    onChange={e => onChange("howFound", e.target.value)}
                    className={`${inputCls()} cursor-pointer`}
                    style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                  >
                    <option value="">Selecione (opcional)</option>
                    {HOW_FOUND.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </Field>

                {/* Message */}
                <Field label="Mensagem ou dÃºvidas (opcional)">
                  <textarea
                    value={data.message}
                    onChange={e => onChange("message", e.target.value)}
                    placeholder="Conte mais sobre o aluno, objetivos ou qualquer dÃºvida..."
                    rows={3}
                    className={`${inputCls()} resize-none`}
                    style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                  />
                </Field>

                {/* Privacy */}
                <p
                  className="text-[10px] text-stone-400 leading-relaxed"
                  style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                >
                  Seus dados sÃ£o usados exclusivamente para contato sobre a matrÃ­cula.
                  A primeira aula Ã© experimental e gratuita â€” sem compromisso.
                </p>

                {/* Submit */}
                <div className="pt-2 border-t border-[#1D4570]/6">
                  {errors.submit && (
                    <p className="flex items-center gap-1.5 text-xs text-red-400 mb-3" style={{ fontFamily: "var(--font-libre-baskerville), serif" }}>
                      <AlertCircle size={12} />{errors.submit}
                    </p>
                  )}
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      loading
                        ? "bg-stone-300 text-white cursor-wait"
                        : "bg-[#1D4570] text-white hover:bg-[#243d5e]"
                    }`}
                    style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                    whileHover={loading ? {} : { scale: 1.01 }}
                    whileTap={loading ? {} : { scale: 0.98 }}
                  >
                    {loading ? "Enviando..." : "Confirmar matrÃ­cula"}
                    {!loading && <ArrowRight size={14} />}
                  </motion.button>
                </div>

              </div>
            )}
          </div>
        </motion.div>

        {/* Alternative */}
        {!submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-5 text-center text-xs text-stone-400"
            style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
          >
            Prefere conversar antes?{" "}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 text-[#1D4570]/60 hover:text-[#1D4570] transition-colors"
            >
              Fale conosco pelo WhatsApp
            </a>
          </motion.p>
        )}

      </div>
    </section>
  );
}

