"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useCallback, useRef } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactFormProps {
  whatsappNumber?: string;
  onSubmit?: (data: FormData) => Promise<void>;
}

interface FormData {
  name: string;
  phone: string;
  city: string;
  businessType: string;
  volume: string;
  brands: string;
  message: string;
}

// ─── Options ──────────────────────────────────────────────────────────────────

const BUSINESS_TYPES = [
  { value: "salao",       label: "Salão de beleza",  icon: "💇" },
  { value: "revendedora", label: "Revendedora",       icon: "💼" },
  { value: "clinica",     label: "Clínica / Spa",     icon: "🏥" },
  { value: "studio",      label: "Studio / Ateliê",   icon: "✨" },
];

const VOLUME_OPTIONS = [
  "Até R$ 500/mês",
  "R$ 500 a R$ 2.000/mês",
  "R$ 2.000 a R$ 5.000/mês",
  "Acima de R$ 5.000/mês",
];

const BRAND_OPTIONS = [
  "Cabelo (L'Oréal, Wella, Kérastase)",
  "Pele (La Roche-Posay, Vichy)",
  "Maquiagem (MAC, NYX)",
  "Unhas (OPI)",
  "Tudo / Sem preferência",
];

// ─── Validators ───────────────────────────────────────────────────────────────

function validate(data: FormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.name.trim())         errors.name         = "Informe seu nome";
  if (data.phone.replace(/\D/g, "").length < 10) errors.phone = "Telefone inválido";
  if (!data.city.trim())         errors.city         = "Informe sua cidade";
  if (!data.businessType)        errors.businessType = "Selecione o tipo de negócio";
  if (!data.volume)              errors.volume       = "Selecione o volume estimado";
  return errors;
}

function maskPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2)  return `(${d}`;
  if (d.length <= 6)  return `(${d.slice(0,2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({ label, error, required, children }: {
  label: string; error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs font-medium text-stone-600"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }}
            className="flex items-center gap-1.5 text-[10px] text-red-400"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <AlertCircle size={10} />{error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (hasError?: boolean) =>
  `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 bg-white text-stone-800 placeholder:text-stone-300 ${
    hasError
      ? "border-red-300 focus:border-red-400"
      : "border-stone-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-50"
  }`;

// ─── Main component ───────────────────────────────────────────────────────────

export default function ContactForm({
  whatsappNumber = "5561999999999",
  onSubmit,
}: ContactFormProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [data, setData] = useState<FormData>({
    name: "", phone: "", city: "", businessType: "",
    volume: "", brands: "", message: "",
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
      else await new Promise(r => setTimeout(r, 900));
      setSubmitted(true);
    } catch { setErrors({ submit: "Erro ao enviar. Tente novamente." }); }
    finally { setLoading(false); }
  }, [data, onSubmit]);

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de me tornar revendedora dos seus produtos.")}`;

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#F8F4EF] py-24 lg:py-32"
      id="contato"
      aria-label="Formulário de contato"
    >
      {/* Decorative blob */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, #F8E0DC 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-xl px-6 lg:px-0">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-rose-400 flex items-center justify-center gap-2 mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <span className="w-5 h-px bg-rose-200 inline-block" />
            Seja uma parceira
            <span className="w-5 h-px bg-rose-200 inline-block" />
          </p>
          <h2
            className="font-normal leading-tight text-stone-900 mb-3"
            style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
          >
            Comece a{" "}
            <em className="italic" style={{ fontFamily: "'DM Serif Display', serif", color: "#C07080" }}>
              revender
            </em>{" "}
            hoje
          </h2>
          <p
            className="text-sm text-stone-400 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Preencha o formulário e entrarei em contato em até 2 horas com as melhores condições para o seu perfil.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="rounded-2xl border border-stone-100 bg-white overflow-hidden shadow-sm shadow-rose-100/30"
        >
          <div className="p-7">
            {submitted ? (
              /* Success */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                className="flex flex-col items-center text-center py-8 gap-5"
              >
                <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center">
                  <CheckCircle2 size={28} className="text-rose-400" />
                </div>
                <div>
                  <h3
                    className="font-normal text-stone-900 mb-2"
                    style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem" }}
                  >
                    Recebemos sua solicitação!
                  </h3>
                  <p
                    className="text-sm text-stone-400 leading-relaxed max-w-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Entrarei em contato em até{" "}
                    <strong className="text-stone-700">2 horas</strong>{" "}
                    com as melhores condições para o seu negócio.
                  </p>
                </div>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-700 transition-all"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <MessageSquare size={12} />
                  Falar agora pelo WhatsApp
                </a>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-5">

                {/* Business type */}
                <Field label="Tipo de negócio" required error={errors.businessType}>
                  <div className="grid grid-cols-2 gap-2">
                    {BUSINESS_TYPES.map((bt) => {
                      const isSelected = data.businessType === bt.value;
                      return (
                        <button
                          key={bt.value}
                          type="button"
                          onClick={() => onChange("businessType", bt.value)}
                          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                            isSelected
                              ? "bg-stone-900 border-stone-900 text-white"
                              : "bg-white border-stone-200 text-stone-600 hover:border-rose-200"
                          } ${errors.businessType ? "border-red-200" : ""}`}
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          <span style={{ fontSize: "15px" }}>{bt.icon}</span>
                          {bt.label}
                        </button>
                      );
                    })}
                  </div>
                </Field>

                {/* Name + phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Seu nome" required error={errors.name}>
                    <input
                      type="text"
                      value={data.name}
                      onChange={e => onChange("name", e.target.value)}
                      placeholder="Nome completo"
                      className={inputCls(!!errors.name)}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </Field>
                  <Field label="WhatsApp" required error={errors.phone}>
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={e => onChange("phone", maskPhone(e.target.value))}
                      placeholder="(61) 9 9999-9999"
                      maxLength={15}
                      className={inputCls(!!errors.phone)}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </Field>
                </div>

                {/* City + volume */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Cidade" required error={errors.city}>
                    <input
                      type="text"
                      value={data.city}
                      onChange={e => onChange("city", e.target.value)}
                      placeholder="Ex: Brasília – DF"
                      className={inputCls(!!errors.city)}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </Field>
                  <Field label="Volume estimado por mês" required error={errors.volume}>
                    <select
                      value={data.volume}
                      onChange={e => onChange("volume", e.target.value)}
                      className={`${inputCls(!!errors.volume)} cursor-pointer`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      <option value="">Selecione</option>
                      {VOLUME_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </Field>
                </div>

                {/* Brands interest */}
                <Field label="Categorias de interesse">
                  <select
                    value={data.brands}
                    onChange={e => onChange("brands", e.target.value)}
                    className={`${inputCls()} cursor-pointer`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <option value="">Selecione (opcional)</option>
                    {BRAND_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </Field>

                {/* Message */}
                <Field label="Mensagem (opcional)">
                  <textarea
                    value={data.message}
                    onChange={e => onChange("message", e.target.value)}
                    placeholder="Conte um pouco sobre seu negócio ou dúvidas..."
                    rows={3}
                    className={`${inputCls()} resize-none`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </Field>

                {/* Privacy */}
                <p
                  className="text-[10px] text-stone-400 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Seus dados são confidenciais e usados apenas para entrar em contato com você.
                </p>

                {/* Submit */}
                <div className="pt-2 border-t border-stone-50">
                  {errors.submit && (
                    <p className="flex items-center gap-1.5 text-xs text-red-400 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <AlertCircle size={12} />{errors.submit}
                    </p>
                  )}
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      loading
                        ? "bg-stone-300 text-white cursor-wait"
                        : "bg-stone-900 text-white hover:bg-stone-700"
                    }`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                    whileHover={loading ? {} : { scale: 1.01 }}
                    whileTap={loading ? {} : { scale: 0.98 }}
                  >
                    {loading ? "Enviando..." : "Quero ser parceira"}
                    {!loading && <ArrowRight size={14} />}
                  </motion.button>
                </div>

              </div>
            )}
          </div>
        </motion.div>

        {/* Alternative CTA */}
        {!submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-5 text-center text-xs text-stone-400"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Prefere ir direto?{" "}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 text-rose-500 hover:text-rose-700 transition-colors"
            >
              Me chame no WhatsApp agora
            </a>
          </motion.p>
        )}

      </div>
    </section>
  );
}
