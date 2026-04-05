"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useCallback, useRef, useEffect } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, MessageSquare, ChevronDown, MapPin, Clock3, Handshake } from "lucide-react";
import { buildWhatsAppHref, contactConfig } from "@/lib/contact-config";
import { submitProposal } from "@/lib/proposals/client";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

const SERVICES = [
  "Landing page",
  "Site institucional",
  "Sistema interno",
  "Suporte e manutencao",
  "Quero orientacao para decidir",
];

const BUDGETS = [
  "Ate R$ 2.000",
  "R$ 2.000 a R$ 5.000",
  "R$ 5.000 a R$ 10.000",
  "Acima de R$ 10.000",
];

type SelectOption = { label: string; value: string };

const SERVICE_OPTIONS: SelectOption[] = SERVICES.map((item) => ({ label: item, value: item }));
const BUDGET_OPTIONS: SelectOption[] = [{ label: "Selecione (opcional)", value: "" }, ...BUDGETS.map((item) => ({ label: item, value: item }))];

function validate(data: FormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.name.trim()) errors.name = "Informe seu nome";
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "E-mail invalido";
  if (data.phone.replace(/\D/g, "").length < 10) errors.phone = "Telefone invalido";
  if (!data.service) errors.service = "Selecione um servico";
  return errors;
}

function maskPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-white/70" style={{ fontFamily: "'Inter', sans-serif" }}>
        {label}
        {required && <span className="text-[#00C2FF] ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
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

function inputCls(hasError?: boolean) {
  return `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 bg-white/[0.06] text-white placeholder:text-white/40 ${
    hasError
      ? "border-red-500/50 focus:border-red-400"
      : "border-white/14 focus:border-[#00C2FF]/45 focus:bg-white/[0.08]"
  }`;
}

function selectTriggerCls(hasError?: boolean) {
  return `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 bg-white/[0.06] ${
    hasError ? "border-red-500/50" : "border-white/14 hover:border-[#00C2FF]/45"
  }`;
}

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  hasError,
}: {
  value: string;
  onChange: (nextValue: string) => void;
  options: SelectOption[];
  placeholder: string;
  hasError?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`${selectTriggerCls(hasError)} flex items-center justify-between`}
        style={{ fontFamily: "'Inter', sans-serif" }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selected ? "text-white" : "text-white/60"}>{selected ? selected.label : placeholder}</span>
        <ChevronDown size={16} className={`text-white/65 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.14 }}
            className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-[#00C2FF]/30 bg-[#0b111a] shadow-[0_16px_36px_rgba(0,0,0,0.45)]"
          >
            <ul role="listbox" className="max-h-56 overflow-auto py-1">
              {options.map((opt) => {
                const isSelected = value === opt.value;
                return (
                  <li key={`${opt.value}-${opt.label}`}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(opt.value);
                        setOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                        isSelected
                          ? "bg-[#00C2FF]/20 text-white"
                          : "text-white/86 hover:bg-[#00C2FF]/12 hover:text-white"
                      }`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {opt.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = useCallback((field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const n = { ...prev };
      delete n[field];
      return n;
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await submitProposal({ source: "ga", payload: data });
    setSubmitted(true);
    setLoading(false);
  }, [data]);

  const waHref = buildWhatsAppHref(contactConfig.ga.whatsapp.number, contactConfig.ga.whatsapp.quoteMessage);

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#08080F] py-24 lg:py-32 overflow-hidden"
      id="contato"
      aria-label="Formulario de proposta"
    >
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10"
        style={{ background: "radial-gradient(ellipse at bottom, #00C2FF 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div
        className="absolute top-0 left-0 right-0 h-px opacity-35"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.2), transparent)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col"
          >
            <p
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#8fe8ff] flex items-center gap-2 mb-5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="w-5 h-px bg-[#8fe8ff]/60 inline-block" />
              Contato
            </p>

            <h2
              className="font-bold leading-[1.2] text-white mb-4 pt-[0.02em] pb-[0.08em]"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.01em" }}
            >
              Vamos montar sua proposta
              <span className="text-[#58d8ff]"> sem enrolacao</span>
            </h2>

            <p className="text-sm leading-relaxed text-white/80 mb-10" style={{ fontFamily: "'Inter', sans-serif" }}>
              Preencha o formulario e retornamos com orientacao clara sobre escopo, prazo e investimento.
            </p>

            <div className="flex flex-col gap-4 mb-10">
              {[
                { icon: MapPin, label: "Atendimento", value: "Brasilia e remoto" },
                { icon: Clock3, label: "Resposta", value: "Ate 24 horas" },
                { icon: Handshake, label: "Primeiro contato", value: "Sem compromisso" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/12 flex items-center justify-center shrink-0">
                    <Icon size={16} strokeWidth={1.8} className="text-[#8fe8ff]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/58" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {label}
                    </p>
                    <p className="text-sm font-medium text-white/92" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl border border-[#25D366]/35 bg-[#25D366]/12 text-[#6ff0a0] text-sm font-medium hover:bg-[#25D366]/20 hover:border-[#25D366]/55 hover:text-[#8effb6] transition-all duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <MessageSquare size={16} />
              Prefere WhatsApp? Clique aqui
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="rounded-2xl border border-white/12 bg-white/[0.05] overflow-hidden"
          >
            <div className="bg-[#00C2FF]/12 border-b border-[#00C2FF]/18 px-7 py-5">
              <p className="text-white font-semibold text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                Solicitar proposta
              </p>
              <p className="text-white/72 text-[11px] mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                Rapido, simples e sem compromisso
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
                  <div className="w-14 h-14 rounded-full bg-[#00C2FF]/14 border border-[#00C2FF]/30 flex items-center justify-center">
                    <CheckCircle2 size={28} className="text-[#72dcff]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white leading-[1.2] mb-2 pt-[0.02em] pb-[0.08em]" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontSize: "1.3rem" }}>
                      Mensagem recebida
                    </h3>
                    <p className="text-sm text-white/80 max-w-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Retornaremos em ate <strong className="text-white">24 horas</strong> com os proximos passos.
                    </p>
                  </div>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366]/15 text-[#8effb6] border border-[#25D366]/28 text-xs font-medium hover:bg-[#25D366]/24 transition-all"
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
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) => onChange("name", e.target.value)}
                        placeholder="Nome completo"
                        className={inputCls(!!errors.name)}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                    </Field>
                    <Field label="E-mail" required error={errors.email}>
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => onChange("email", e.target.value)}
                        placeholder="seu@email.com.br"
                        className={inputCls(!!errors.email)}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                    </Field>
                  </div>

                  <Field label="WhatsApp / Telefone" required error={errors.phone}>
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={(e) => onChange("phone", maskPhone(e.target.value))}
                      placeholder="(61) 9 9999-9999"
                      maxLength={15}
                      className={inputCls(!!errors.phone)}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Servico de interesse" required error={errors.service}>
                      <CustomSelect
                        value={data.service}
                        onChange={(nextValue) => onChange("service", nextValue)}
                        options={SERVICE_OPTIONS}
                        placeholder="Selecione"
                        hasError={!!errors.service}
                      />
                    </Field>
                    <Field label="Investimento previsto">
                      <CustomSelect
                        value={data.budget}
                        onChange={(nextValue) => onChange("budget", nextValue)}
                        options={BUDGET_OPTIONS}
                        placeholder="Selecione (opcional)"
                      />
                    </Field>
                  </div>

                  <Field label="Mensagem (opcional)">
                    <textarea
                      value={data.message}
                      onChange={(e) => onChange("message", e.target.value)}
                      placeholder="Conte sobre seu objetivo e prazo"
                      rows={3}
                      className={`${inputCls()} resize-none`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </Field>

                  <div className="pt-2 border-t border-white/12">
                    {errors.submit && (
                      <p className="flex items-center gap-1.5 text-xs text-red-400 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <AlertCircle size={12} />
                        {errors.submit}
                      </p>
                    )}
                    <motion.button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        loading ? "bg-white/25 text-white/60 cursor-wait" : "bg-[#00C2FF] text-[#08080F] hover:bg-[#33CFFF]"
                      }`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      whileHover={loading ? {} : { scale: 1.01 }}
                      whileTap={loading ? {} : { scale: 0.98 }}
                    >
                      {loading ? "Enviando..." : "Solicitar proposta"}
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

