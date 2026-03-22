"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  body: string;
  author: string;
  role: string;           // "CEO, Empresa X"
  sector: string;         // "Tecnologia", "Agronegócio" etc.
  matter?: string;        // "Fusão e Aquisição"
  featured?: boolean;     // destaque — ocupa linha inteira
}

interface TestimonialsGridProps {
  theme?: "light" | "dark";
  testimonials?: Testimonial[];
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    body: "A capacidade técnica do escritório foi determinante para o êxito da operação. Conduzimos uma aquisição de R$ 240 milhões sem nenhum contratempo jurídico — prazo cumprido, due diligence impecável.",
    author: "Ricardo Tavares",
    role: "CEO",
    sector: "Tecnologia",
    matter: "Fusão & Aquisição",
    featured: true,
  },
  {
    id: "2",
    body: "Passivo trabalhista que parecia intratável foi resolvido em 14 meses. A estratégia do Dr. Rafael foi cirúrgica — redução de 68% na exposição financeira.",
    author: "Mariana Voss",
    role: "CFO",
    sector: "Varejo",
    matter: "Contencioso Trabalhista",
  },
  {
    id: "3",
    body: "Nossa operação passou por uma autuação fiscal de R$ 80M no CARF. A Dra. Júlia liderou a defesa com conhecimento que poucos escritórios têm. Resultado: cancelamento total do auto.",
    author: "Paulo Henrique Lins",
    role: "Diretor Financeiro",
    sector: "Indústria",
    matter: "Tributário — CARF",
  },
  {
    id: "4",
    body: "Estruturamos toda a governança da holding familiar com o Dr. Carlos. Clareza contratual, proteção patrimonial e sucessão planejada. Trabalho de altíssimo nível.",
    author: "Fernando Castelo",
    role: "Sócio-fundador",
    sector: "Agronegócio",
    matter: "Direito Empresarial",
  },
  {
    id: "5",
    body: "Contrato de concessão com o governo federal de alta complexidade. O time de regulatório entende o ambiente político e jurídico como ninguém no DF.",
    author: "Isabela Drummond",
    role: "Diretora Jurídica",
    sector: "Infraestrutura",
    matter: "Regulatório",
  },
  {
    id: "6",
    body: "Programa de compliance implementado em 6 meses. A equipe da Ana Beatriz entrega não só documentos, mas cultura de integridade. Recomendo sem reservas.",
    author: "Gustavo Meirelles",
    role: "COO",
    sector: "Saúde",
    matter: "Compliance & LGPD",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Testimonial card ─────────────────────────────────────────────────────────

function TestimonialCard({
  testimonial,
  theme,
}: {
  testimonial: Testimonial;
  theme: "light" | "dark";
}) {
  const isDark = theme === "dark";
  const isFeatured = testimonial.featured;

  const cardBg = isFeatured
    ? isDark ? "bg-[#0D1E3C]" : "bg-slate-900"
    : isDark
    ? "bg-white/[0.025]"
    : "bg-white";

  const cardBorder = isFeatured
    ? isDark ? "border-blue-900/50" : "border-slate-700"
    : isDark
    ? "border-white/6"
    : "border-slate-200";

  const quoteColor = isFeatured
    ? "text-amber-400/20"
    : isDark ? "text-white/8" : "text-slate-200";

  const bodyColor = isFeatured
    ? "text-white/75"
    : isDark ? "text-white/60" : "text-slate-600";

  const authorColor = isFeatured
    ? "text-white/90"
    : isDark ? "text-white/85" : "text-slate-800";

  const roleColor = isFeatured
    ? "text-white/45"
    : isDark ? "text-white/35" : "text-slate-400";

  const dividerColor = isFeatured
    ? "bg-white/8"
    : isDark ? "bg-white/6" : "bg-slate-100";

  const matterBg = isFeatured
    ? "bg-amber-500/10 text-amber-400/75 border-amber-500/15"
    : isDark
    ? "bg-white/5 text-white/35 border-white/7"
    : "bg-slate-100 text-slate-400 border-slate-200";

  const sectorColor = isFeatured
    ? "text-white/30"
    : isDark ? "text-white/22" : "text-slate-300";

  // Gold accent on featured
  const accentLine = isFeatured ? (
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/45 to-transparent" />
  ) : null;

  return (
    <motion.div
      variants={fadeUp}
      className={`relative flex flex-col rounded-xl border p-6 transition-colors duration-300 ${cardBg} ${cardBorder} ${
        isFeatured ? "lg:col-span-3" : ""
      }`}
    >
      {accentLine}

      {/* Large decorative quote mark */}
      <div className="mb-4 -ml-1">
        <Quote
          size={isFeatured ? 36 : 28}
          className={quoteColor}
          aria-hidden="true"
        />
      </div>

      {/* Body */}
      <blockquote
        className={`text-sm leading-relaxed flex-1 mb-6 ${bodyColor} ${
          isFeatured ? "lg:text-base lg:max-w-3xl" : ""
        }`}
        style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400 }}
      >
        "{testimonial.body}"
      </blockquote>

      {/* Divider */}
      <div className={`h-px w-full ${dividerColor} mb-5`} />

      {/* Footer */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Author */}
        <div className="flex flex-col gap-0.5">
          <span
            className={`text-sm font-medium ${authorColor}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {testimonial.author}
          </span>
          <span
            className={`text-xs ${roleColor}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {testimonial.role}
            {testimonial.sector && (
              <span className={`ml-1.5 ${sectorColor}`}>· {testimonial.sector}</span>
            )}
          </span>
        </div>

        {/* Matter badge */}
        {testimonial.matter && (
          <span
            className={`text-[9px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-md border ${matterBg}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {testimonial.matter}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function TestimonialsGrid({
  theme = "dark",
  testimonials = DEFAULT_TESTIMONIALS,
}: TestimonialsGridProps) {
  const isDark = theme === "dark";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const sectionBg    = isDark ? "bg-[#080A0D]"      : "bg-[#EEF0F5]";
  const eyebrowColor = isDark ? "text-amber-400/60"  : "text-amber-700/70";
  const headingColor = isDark ? "text-white"         : "text-slate-900";
  const subColor     = isDark ? "text-white/40"      : "text-slate-500";
  const dividerColor = isDark ? "bg-white/7"         : "bg-slate-300/50";

  // Separate featured from regular
  const featured = testimonials.find((t) => t.featured);
  const regular  = testimonials.filter((t) => !t.featured);

  return (
    <section
      ref={ref}
      className={`relative w-full ${sectionBg} py-24 lg:py-32 overflow-hidden`}
      aria-labelledby="testimonials-heading"
    >
      {/* Subtle top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: isDark
            ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)"
            : "linear-gradient(90deg, transparent, rgba(0,0,0,0.07), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 lg:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div className="max-w-xl">
            <motion.p
              variants={fadeUp}
              className={`text-[10px] font-medium tracking-[0.2em] uppercase mb-4 flex items-center gap-2 ${eyebrowColor}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="w-5 h-px bg-current inline-block" />
              O que dizem nossos clientes
            </motion.p>

            <motion.h2
              id="testimonials-heading"
              variants={fadeUp}
              className={`font-normal leading-[1.08] tracking-tight mb-4 ${headingColor}`}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
            >
              Resultados que{" "}
              <em
                className={`italic font-normal ${isDark ? "text-amber-400/70" : "text-amber-700/75"}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                constroem
              </em>{" "}
              reputação
            </motion.h2>

            <motion.div variants={fadeUp} className="flex gap-4 items-start">
              <div className={`w-px h-10 mt-0.5 shrink-0 ${dividerColor}`} />
              <p
                className={`text-sm leading-relaxed ${subColor}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Depoimentos de clientes que confiaram ao escritório seus casos
                mais relevantes — e obtiveram os resultados que precisavam.
              </p>
            </motion.div>
          </div>

          {/* Aggregate stats */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-1"
          >
            <div className="flex items-baseline gap-2">
              <span
                className={`font-normal leading-none ${headingColor}`}
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem" }}
              >
                98%
              </span>
              <span
                className={`text-sm ${subColor}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                de satisfação
              </span>
            </div>
            <p
              className={`text-xs ${isDark ? "text-white/25" : "text-slate-400"}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Pesquisa interna · {new Date().getFullYear() - 1}–{new Date().getFullYear()}
            </p>
          </motion.div>
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {/* Featured — full width */}
          {featured && (
            <TestimonialCard
              key={featured.id}
              testimonial={featured}
              theme={theme}
            />
          )}

          {/* Regular — 3 per row */}
          {regular.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} theme={theme} />
          ))}
        </motion.div>

        {/* ── Bottom note ── */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`mt-10 text-xs text-center ${subColor}`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Depoimentos cedidos com autorização dos clientes. Nomes e empresas
          divulgados com consentimento expresso.
        </motion.p>

      </div>
    </section>
  );
}
