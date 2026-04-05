"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { ArrowRight, ArrowLeft, Check, AlertCircle, CheckCircle2 } from "lucide-react";
import { submitProposal } from "@/lib/proposals/client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LeadFormProps {
  theme?: "light" | "dark";
  onSubmit?: (data: FormData) => Promise<void>;
}

interface FormData {
  // Step 1
  practiceArea: string;
  urgency: string;
  caseDescription: string;
  // Step 2
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  // Step 3 (confirmation)
}

interface FieldError {
  [key: string]: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PRACTICE_AREAS = [
  "Direito Empresarial / M&A",
  "Contratos Complexos",
  "Contencioso Estratégico",
  "Regulatório & Compliance",
  "Trabalhista Corporativo",
  "Tributário",
  "Outro",
];

const URGENCY_OPTIONS = [
  { value: "imediato",  label: "Imediato",    sub: "Prazo em menos de 7 dias"    },
  { value: "curto",     label: "Curto prazo", sub: "De 7 a 30 dias"              },
  { value: "medio",     label: "Médio prazo", sub: "De 1 a 3 meses"              },
  { value: "planejamento", label: "Planejamento", sub: "Sem prazo imediato"      },
];

const STEPS = [
  { number: 1, label: "Contexto jurídico" },
  { number: 2, label: "Seus dados"        },
  { number: 3, label: "Confirmação"       },
];

// ─── Validators ───────────────────────────────────────────────────────────────

function validateStep1(data: FormData): FieldError {
  const errors: FieldError = {};
  if (!data.practiceArea) errors.practiceArea = "Selecione uma área";
  if (!data.urgency)       errors.urgency      = "Selecione a urgência";
  if (!data.caseDescription.trim() || data.caseDescription.trim().length < 20)
    errors.caseDescription = "Descreva em pelo menos 20 caracteres";
  return errors;
}

function validateStep2(data: FormData): FieldError {
  const errors: FieldError = {};
  if (!data.companyName.trim())  errors.companyName  = "Informe a empresa";
  if (!data.contactName.trim())  errors.contactName  = "Informe seu nome";
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    errors.email = "E-mail inválido";
  if (data.phone.replace(/\D/g, "").length < 10)
    errors.phone = "Telefone inválido";
  return errors;
}

// ─── Phone mask ───────────────────────────────────────────────────────────────

function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2)  return `(${digits}`;
  if (digits.length <= 6)  return `(${digits.slice(0,2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`;
  return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
}

// ─── Animation variants ───────────────────────────────────────────────────────

const stepVariants = {
  enter: (dir: number) => ({
    opacity: 0, x: dir > 0 ? 32 : -32,
  }),
  center: {
    opacity: 1, x: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (dir: number) => ({
    opacity: 0, x: dir > 0 ? -32 : 32,
    transition: { duration: 0.25, ease: "easeIn" as const },
  }),
};

const successVariants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Reusable field wrapper ───────────────────────────────────────────────────

function Field({
  label,
  error,
  required,
  isDark,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  isDark: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className={`text-xs font-medium ${isDark ? "text-white/65" : "text-slate-600"}`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {label}
        {required && <span className="text-amber-500 ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-[10px] text-red-400"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <AlertCircle size={10} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Input classes helper ─────────────────────────────────────────────────────

function inputClass(isDark: boolean, hasError?: boolean) {
  const base = `w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 outline-none border`;
  const theme = isDark
    ? `bg-white/4 text-white/88 placeholder:text-white/25 ${
        hasError
          ? "border-red-500/50 focus:border-red-400"
          : "border-white/8 focus:border-white/28 focus:bg-white/6"
      }`
    : `bg-white text-slate-800 placeholder:text-slate-300 ${
        hasError
          ? "border-red-400 focus:border-red-500"
          : "border-slate-200 focus:border-slate-400"
      }`;
  return `${base} ${theme}`;
}

function selectClass(isDark: boolean, hasError?: boolean) {
  return inputClass(isDark, hasError) + " cursor-pointer";
}

// ─── Step 1: Contexto jurídico ────────────────────────────────────────────────

function Step1({
  data,
  errors,
  onChange,
  isDark,
}: {
  data: FormData;
  errors: FieldError;
  onChange: (field: keyof FormData, value: string) => void;
  isDark: boolean;
}) {
  const charCount = data.caseDescription.trim().length;
  const minChars = 20;

  return (
    <div className="flex flex-col gap-5">
      <Field label="Área jurídica de interesse" error={errors.practiceArea} required isDark={isDark}>
        <select
          value={data.practiceArea}
          onChange={(e) => onChange("practiceArea", e.target.value)}
          className={selectClass(isDark, !!errors.practiceArea)}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <option value="">Selecione uma área</option>
          {PRACTICE_AREAS.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </Field>

      <Field label="Urgência do caso" error={errors.urgency} required isDark={isDark}>
        <div className="grid grid-cols-2 gap-2">
          {URGENCY_OPTIONS.map((opt) => {
            const isSelected = data.urgency === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange("urgency", opt.value)}
                className={`flex flex-col items-start px-4 py-3 rounded-lg border text-left transition-all duration-200 ${
                  isSelected
                    ? isDark
                      ? "bg-white/8 border-white/25 ring-1 ring-white/15"
                      : "bg-slate-900 border-slate-900 text-white"
                    : isDark
                    ? "bg-white/3 border-white/6 hover:bg-white/6 hover:border-white/14"
                    : "bg-white border-slate-200 hover:border-slate-300"
                } ${errors.urgency ? "border-red-400/50" : ""}`}
              >
                <span
                  className={`text-xs font-medium ${
                    isSelected
                      ? isDark ? "text-white" : "text-white"
                      : isDark ? "text-white/75" : "text-slate-700"
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {opt.label}
                </span>
                <span
                  className={`text-[10px] mt-0.5 ${
                    isSelected
                      ? isDark ? "text-white/55" : "text-white/70"
                      : isDark ? "text-white/35" : "text-slate-400"
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {opt.sub}
                </span>
              </button>
            );
          })}
        </div>
        {errors.urgency && (
          <p className="flex items-center gap-1.5 text-[10px] text-red-400" style={{ fontFamily: "'Inter', sans-serif" }}>
            <AlertCircle size={10} />{errors.urgency}
          </p>
        )}
      </Field>

      <Field
        label="Descrição resumida do caso"
        error={errors.caseDescription}
        required
        isDark={isDark}
      >
        <div className="relative">
          <textarea
            value={data.caseDescription}
            onChange={(e) => onChange("caseDescription", e.target.value)}
            placeholder="Descreva brevemente a situação jurídica, o que precisa e qual o resultado esperado..."
            rows={4}
            className={`${inputClass(isDark, !!errors.caseDescription)} resize-none`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
          <span
            className={`absolute bottom-3 right-3 text-[10px] ${
              charCount >= minChars
                ? isDark ? "text-green-400/60" : "text-green-600/70"
                : isDark ? "text-white/20" : "text-slate-300"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {charCount}/{minChars}+
          </span>
        </div>
      </Field>
    </div>
  );
}

// ─── Step 2: Dados de contato ─────────────────────────────────────────────────

function Step2({
  data,
  errors,
  onChange,
  isDark,
}: {
  data: FormData;
  errors: FieldError;
  onChange: (field: keyof FormData, value: string) => void;
  isDark: boolean;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Empresa / Organização" error={errors.companyName} required isDark={isDark}>
          <input
            type="text"
            value={data.companyName}
            onChange={(e) => onChange("companyName", e.target.value)}
            placeholder="Razão social ou nome fantasia"
            className={inputClass(isDark, !!errors.companyName)}
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
        </Field>

        <Field label="Seu nome completo" error={errors.contactName} required isDark={isDark}>
          <input
            type="text"
            value={data.contactName}
            onChange={(e) => onChange("contactName", e.target.value)}
            placeholder="Nome e sobrenome"
            className={inputClass(isDark, !!errors.contactName)}
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="E-mail corporativo" error={errors.email} required isDark={isDark}>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="seu@empresa.com.br"
            className={inputClass(isDark, !!errors.email)}
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
        </Field>

        <Field label="Telefone / WhatsApp" error={errors.phone} required isDark={isDark}>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange("phone", maskPhone(e.target.value))}
            placeholder="(61) 99999-9999"
            maxLength={15}
            className={inputClass(isDark, !!errors.phone)}
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
        </Field>
      </div>

      {/* Privacy note */}
      <p
        className={`text-[10px] leading-relaxed ${isDark ? "text-white/28" : "text-slate-400"}`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Seus dados são protegidos conforme nossa{" "}
        <a
          href="#privacidade"
          className={`underline underline-offset-2 ${isDark ? "text-amber-400/55" : "text-amber-700/70"}`}
        >
          Política de Privacidade
        </a>
        {" "}e utilizados exclusivamente para contato sobre seu caso.
      </p>
    </div>
  );
}

// ─── Step 3: Confirmação ──────────────────────────────────────────────────────

function Step3({
  data,
  isDark,
}: {
  data: FormData;
  isDark: boolean;
}) {
  const rows = [
    { label: "Área jurídica",  value: data.practiceArea },
    { label: "Urgência",       value: URGENCY_OPTIONS.find(o => o.value === data.urgency)?.label ?? "" },
    { label: "Empresa",        value: data.companyName },
    { label: "Contato",        value: data.contactName },
    { label: "E-mail",         value: data.email },
    { label: "Telefone",       value: data.phone },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div
        className={`rounded-xl border p-5 ${
          isDark ? "bg-white/[0.025] border-white/8" : "bg-white border-slate-200"
        }`}
      >
        <p
          className={`text-[9px] font-semibold tracking-widest uppercase mb-4 ${
            isDark ? "text-white/30" : "text-slate-400"
          }`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Resumo da solicitação
        </p>
        <div className="flex flex-col gap-3">
          {rows.map(({ label, value }) => (
            <div key={label} className={`flex items-start justify-between gap-4 pb-3 border-b last:border-b-0 last:pb-0 ${isDark ? "border-white/5" : "border-slate-100"}`}>
              <span
                className={`text-xs shrink-0 ${isDark ? "text-white/35" : "text-slate-400"}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {label}
              </span>
              <span
                className={`text-xs text-right ${isDark ? "text-white/80" : "text-slate-700"}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Case description preview */}
      <div
        className={`rounded-xl border p-5 ${
          isDark ? "bg-white/[0.015] border-white/6" : "bg-slate-50 border-slate-200"
        }`}
      >
        <p
          className={`text-[9px] font-semibold tracking-widest uppercase mb-2 ${
            isDark ? "text-white/25" : "text-slate-400"
          }`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Descrição do caso
        </p>
        <p
          className={`text-xs leading-relaxed ${isDark ? "text-white/55" : "text-slate-600"}`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {data.caseDescription}
        </p>
      </div>

      <p
        className={`text-[10px] leading-relaxed ${isDark ? "text-white/28" : "text-slate-400"}`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Ao enviar, você concorda que um de nossos sócios entrará em contato
        em até 24 horas úteis para agendar uma consulta inicial.
      </p>
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ isDark }: { isDark: boolean }) {
  return (
    <motion.div
      variants={successVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-12 text-center gap-5"
    >
      {/* Animated check */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 18 }}
        className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isDark ? "bg-green-500/12 border border-green-500/20" : "bg-green-50 border border-green-200"
        }`}
      >
        <CheckCircle2 size={32} className={isDark ? "text-green-400" : "text-green-600"} />
      </motion.div>

      <div>
        <h3
          className={`font-normal mb-2 ${isDark ? "text-white" : "text-slate-900"}`}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}
        >
          Solicitação recebida
        </h3>
        <p
          className={`text-sm leading-relaxed max-w-sm ${isDark ? "text-white/52" : "text-slate-500"}`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Um sócio especialista na área indicada entrará em contato em até{" "}
          <strong className={isDark ? "text-white/80" : "text-slate-700"}>
            24 horas úteis
          </strong>{" "}
          para agendar sua consulta inicial.
        </p>
      </div>

      <div
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs ${
          isDark
            ? "bg-amber-500/8 border-amber-500/15 text-amber-400/75"
            : "bg-amber-50 border-amber-200 text-amber-700"
        }`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <Check size={12} />
        Confirmação enviada para seu e-mail
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function LeadForm({ theme = "dark", onSubmit }: LeadFormProps) {
  const isDark = theme === "dark";

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<FieldError>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [data, setData] = useState<FormData>({
    practiceArea: "",
    urgency: "",
    caseDescription: "",
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
  });

  const onChange = useCallback((field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const goNext = useCallback(() => {
    const errs = step === 1 ? validateStep1(data) : validateStep2(data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setDirection(1);
    setStep((s) => s + 1);
  }, [step, data]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setStep((s) => s - 1);
    setErrors({});
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      if (onSubmit) await onSubmit(data);
      else await submitProposal({ source: "advocacia", payload: data });
      setSubmitted(true);
    } catch {
      setErrors({ submit: "Erro ao enviar. Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  }, [data, onSubmit]);

  // ── Token aliases ────────────────────────────────────────────────────────
  const sectionBg  = isDark ? "bg-[#0A0C10]" : "bg-[#F0F2F5]";
  const cardBg     = isDark ? "bg-[#0F1118] border-white/6" : "bg-white border-slate-200";
  const headingColor = isDark ? "text-white" : "text-slate-900";
  const subColor   = isDark ? "text-white/45" : "text-slate-500";
  const stepActive = isDark ? "bg-white text-slate-900" : "bg-slate-900 text-white";
  const stepDone   = isDark ? "bg-green-500/15 border-green-500/20 text-green-400" : "bg-green-50 border-green-300 text-green-700";
  const stepInactive = isDark ? "bg-white/5 border-white/8 text-white/25" : "bg-slate-100 border-slate-200 text-slate-400";
  const connectorDone = isDark ? "bg-green-500/25" : "bg-green-300";
  const connectorInactive = isDark ? "bg-white/6" : "bg-slate-200";

  return (
    <section
      className={`relative w-full ${sectionBg} py-24 lg:py-32`}
      aria-label="Formulário de contato"
      id="contato"
    >
      <div className="mx-auto max-w-2xl px-6 lg:px-0">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-10 text-center"
        >
          <p
            className={`text-[10px] font-medium tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-2 ${
              isDark ? "text-amber-400/60" : "text-amber-700/70"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="w-5 h-px bg-current inline-block" />
            Consulta estratégica
            <span className="w-5 h-px bg-current inline-block" />
          </p>
          <h2
            className={`font-normal leading-tight mb-3 ${headingColor}`}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
          >
            Fale com um{" "}
            <em
              className={`italic ${isDark ? "text-amber-400/70" : "text-amber-700/75"}`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              especialista
            </em>
          </h2>
          <p
            className={`text-sm leading-relaxed ${subColor}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Preencha o formulário e um sócio da área indicada entrará em
            contato em até 24 horas úteis.
          </p>
        </motion.div>

        {/* ── Form card ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          className={`rounded-2xl border overflow-hidden ${cardBg}`}
        >
          {/* ── Progress bar ── */}
          {!submitted && (
            <div className={`px-8 pt-8 pb-6 border-b ${isDark ? "border-white/5" : "border-slate-100"}`}>
              <div className="flex items-center gap-0">
                {STEPS.map((s, i) => {
                  const isActive = step === s.number;
                  const isDone   = step > s.number;
                  const isLast   = i === STEPS.length - 1;

                  return (
                    <div key={s.number} className="flex items-center flex-1 last:flex-none">
                      {/* Step circle */}
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                            isDone ? stepDone : isActive ? stepActive : stepInactive
                          }`}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {isDone ? <Check size={13} /> : s.number}
                        </div>
                        <span
                          className={`text-[9px] font-medium whitespace-nowrap transition-colors duration-300 ${
                            isActive
                              ? isDark ? "text-white/80" : "text-slate-700"
                              : isDark ? "text-white/28" : "text-slate-400"
                          }`}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {s.label}
                        </span>
                      </div>

                      {/* Connector */}
                      {!isLast && (
                        <div className={`flex-1 h-px mx-3 mb-4 transition-all duration-500 ${isDone ? connectorDone : connectorInactive}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Form body ── */}
          <div className="px-8 py-7">
            {submitted ? (
              <SuccessScreen isDark={isDark} />
            ) : (
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {step === 1 && (
                    <Step1 data={data} errors={errors} onChange={onChange} isDark={isDark} />
                  )}
                  {step === 2 && (
                    <Step2 data={data} errors={errors} onChange={onChange} isDark={isDark} />
                  )}
                  {step === 3 && (
                    <Step3 data={data} isDark={isDark} />
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {/* ── Navigation ── */}
            {!submitted && (
              <div className={`flex items-center justify-between mt-8 pt-6 border-t ${isDark ? "border-white/5" : "border-slate-100"}`}>
                {/* Back */}
                <button
                  type="button"
                  onClick={goPrev}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    step === 1
                      ? "opacity-0 pointer-events-none"
                      : isDark
                      ? "text-white/50 hover:text-white/80 border border-white/8 hover:border-white/18"
                      : "text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300"
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  aria-hidden={step === 1}
                >
                  <ArrowLeft size={14} />
                  Voltar
                </button>

                {/* Step indicator */}
                <span
                  className={`text-[10px] ${isDark ? "text-white/25" : "text-slate-400"}`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {step} de {STEPS.length}
                </span>

                {/* Next / Submit */}
                {step < STEPS.length ? (
                  <motion.button
                    type="button"
                    onClick={goNext}
                    className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isDark
                        ? "bg-white text-slate-900 hover:bg-slate-100"
                        : "bg-slate-900 text-white hover:bg-slate-700"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Continuar
                    <ArrowRight size={14} />
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isSubmitting
                        ? isDark ? "bg-white/40 text-slate-900/50 cursor-wait" : "bg-slate-400 text-white cursor-wait"
                        : isDark ? "bg-amber-500 text-white hover:bg-amber-400" : "bg-amber-600 text-white hover:bg-amber-700"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    whileHover={isSubmitting ? {} : { scale: 1.02 }}
                    whileTap={isSubmitting ? {} : { scale: 0.97 }}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar solicitação"}
                    {!isSubmitting && <ArrowRight size={14} />}
                  </motion.button>
                )}
              </div>
            )}

            {/* Submit error */}
            {errors.submit && (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-red-400 justify-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                <AlertCircle size={12} />
                {errors.submit}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
