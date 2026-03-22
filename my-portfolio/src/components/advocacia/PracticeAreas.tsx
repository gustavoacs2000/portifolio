"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PracticeArea {
  id: string;
  number: string;       // "01", "02" etc.
  title: string;
  description: string;
  tags: string[];
  href?: string;
  featured?: boolean;
}

interface PracticeAreasProps {
  theme?: "light" | "dark";
  areas?: PracticeArea[];
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_AREAS: PracticeArea[] = [
  {
    id: "empresarial",
    number: "01",
    title: "Direito Empresarial",
    description:
      "Estruturação societária, governança corporativa, fusões e aquisições. Assessoria completa ao longo do ciclo de vida da empresa — da constituição ao exit.",
    tags: ["M&A", "Governança", "Societário"],
    href: "#empresarial",
    featured: true,
  },
  {
    id: "contratos",
    number: "02",
    title: "Contratos Complexos",
    description:
      "Elaboração, revisão e negociação de contratos de alto valor. Expertise em contratos internacionais, EPC, concessões e instrumentos financeiros.",
    tags: ["EPC", "Internacional", "Financeiro"],
    href: "#contratos",
  },
  {
    id: "contencioso",
    number: "03",
    title: "Contencioso Estratégico",
    description:
      "Litígio de alta complexidade em instâncias superiores. Arbitragem nacional e internacional, mediação e resolução alternativa de conflitos.",
    tags: ["Arbitragem", "Litígio", "STJ/STF"],
    href: "#contencioso",
  },
  {
    id: "regulatorio",
    number: "04",
    title: "Regulatório & Compliance",
    description:
      "Navegação em ambientes regulatórios complexos. Programas de integridade, LGPD, anticorrupção e relacionamento com agências reguladoras.",
    tags: ["LGPD", "Anticorrupção", "ANATEL"],
    href: "#regulatorio",
  },
  {
    id: "trabalhista",
    number: "05",
    title: "Trabalhista Corporativo",
    description:
      "Gestão estratégica de passivos trabalhistas, reestruturações com impacto em RH, negociações coletivas e contencioso de alta complexidade.",
    tags: ["Passivo", "Reestruturação", "Sindical"],
    href: "#trabalhista",
  },
  {
    id: "tributario",
    number: "06",
    title: "Tributário",
    description:
      "Planejamento tributário estruturado, defesa em autuações fiscais de grande porte e recuperação de créditos tributários em âmbito administrativo e judicial.",
    tags: ["Planejamento", "Autuações", "CARF"],
    href: "#tributario",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Area card ────────────────────────────────────────────────────────────────

function AreaCard({
  area,
  theme,
}: {
  area: PracticeArea;
  theme: "light" | "dark";
}) {
  const isDark = theme === "dark";
  const isFeatured = area.featured;

  const cardBg = isFeatured
    ? isDark ? "bg-[#0D1E3C]" : "bg-slate-900"
    : isDark
    ? "bg-white/[0.025] hover:bg-white/[0.05]"
    : "bg-white hover:bg-slate-50/70";

  const cardBorder = isFeatured
    ? isDark ? "border-blue-900/60" : "border-slate-700"
    : isDark
    ? "border-white/6 hover:border-white/12"
    : "border-slate-200 hover:border-slate-300";

  const numColor = isFeatured
    ? "text-white/20"
    : isDark ? "text-white/12" : "text-slate-200";

  const titleColor = isFeatured
    ? "text-white"
    : isDark ? "text-white/88" : "text-slate-900";

  const descColor = isFeatured
    ? "text-white/55"
    : isDark ? "text-white/45" : "text-slate-500";

  const tagBg = isFeatured
    ? "bg-white/8 text-white/55 border-white/10"
    : isDark
    ? "bg-white/5 text-white/40 border-white/8"
    : "bg-slate-100 text-slate-500 border-slate-200";

  const arrowColor = isFeatured
    ? "border-white/15 text-white/40 group-hover:border-white/35 group-hover:text-white/80"
    : isDark
    ? "border-white/8 text-white/25 group-hover:border-white/25 group-hover:text-white/65"
    : "border-slate-200 text-slate-400 group-hover:border-slate-500 group-hover:text-slate-700";

  const dividerColor = isFeatured
    ? "bg-white/8"
    : isDark ? "bg-white/6" : "bg-slate-100";

  // Gold accent top line on featured
  const accentLine = isFeatured ? (
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
  ) : null;

  return (
    <motion.a
      href={area.href ?? "#"}
      variants={fadeUp}
      className={`group relative flex flex-col rounded-xl border p-6 transition-all duration-300 cursor-pointer ${cardBg} ${cardBorder}`}
      style={{ textDecoration: "none" }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
    >
      {accentLine}

      {/* Number + arrow */}
      <div className="flex items-start justify-between mb-5">
        <span
          className={`font-light leading-none select-none ${numColor}`}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.8rem",
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          {area.number}
        </span>

        <div
          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 group-hover:scale-110 shrink-0 mt-1 ${arrowColor}`}
        >
          <ArrowUpRight size={12} />
        </div>
      </div>

      {/* Title */}
      <h3
        className={`font-normal leading-tight mb-3 ${titleColor}`}
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem" }}
      >
        {area.title}
      </h3>

      {/* Description */}
      <p
        className={`text-sm leading-relaxed flex-1 mb-5 ${descColor}`}
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
      >
        {area.description}
      </p>

      {/* Divider */}
      <div className={`h-px w-full ${dividerColor} mb-4`} />

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {area.tags.map((tag) => (
          <span
            key={tag}
            className={`text-[9px] font-medium tracking-widest uppercase px-2 py-0.5 rounded border ${tagBg}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function PracticeAreas({
  theme = "dark",
  areas = DEFAULT_AREAS,
}: PracticeAreasProps) {
  const isDark = theme === "dark";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const sectionBg    = isDark ? "bg-[#0A0C10]"      : "bg-[#F0F2F5]";
  const eyebrowColor = isDark ? "text-amber-400/60"  : "text-amber-700/70";
  const headingColor = isDark ? "text-white"         : "text-slate-900";
  const subColor     = isDark ? "text-white/42"      : "text-slate-500";
  const dividerColor = isDark ? "bg-white/8"         : "bg-slate-300/50";
  const countColor   = isDark ? "text-white/[0.04]"  : "text-slate-200/80";

  return (
    <section
      ref={ref}
      className={`relative w-full ${sectionBg} py-24 lg:py-32 overflow-hidden`}
      aria-labelledby="areas-heading"
    >
      {/* Decorative large number */}
      <span
        className={`pointer-events-none select-none absolute -top-4 right-6 font-light leading-none ${countColor}`}
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "10rem" }}
        aria-hidden="true"
      >
        {areas.length.toString().padStart(2, "0")}
      </span>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* ── Section header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 lg:mb-16 max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className={`text-[10px] font-medium tracking-[0.2em] uppercase mb-4 flex items-center gap-2 ${eyebrowColor}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="w-5 h-px bg-current inline-block" />
            Áreas de atuação
          </motion.p>

          <motion.h2
            id="areas-heading"
            variants={fadeUp}
            className={`font-normal leading-[1.08] tracking-tight mb-5 ${headingColor}`}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Expertise jurídica{" "}
            <em
              className={`italic font-normal ${isDark ? "text-amber-400/70" : "text-amber-700/75"}`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              especializada
            </em>
          </motion.h2>

          <motion.div variants={fadeUp} className="flex gap-4 items-start">
            <div className={`w-px h-12 mt-0.5 shrink-0 ${dividerColor}`} />
            <p
              className={`text-sm leading-relaxed ${subColor}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Atuamos nas principais frentes do direito empresarial com equipes
              dedicadas por área. Cada mandato é conduzido por sócios sênior com
              experiência comprovada no setor.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {areas.map((area) => (
            <AreaCard key={area.id} area={area} theme={theme} />
          ))}
        </motion.div>

        {/* ── Bottom bar ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <p
            className={`text-sm ${subColor}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Sua área não está listada?{" "}
            <a
              href="#contato"
              className={`underline underline-offset-2 transition-colors ${
                isDark
                  ? "text-amber-400/70 hover:text-amber-400"
                  : "text-amber-700 hover:text-amber-800"
              }`}
            >
              Consulte nossa equipe
            </a>
          </p>

          <motion.a
            href="#contato"
            className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
              isDark
                ? "bg-white text-slate-900 hover:bg-slate-100"
                : "bg-slate-900 text-white hover:bg-slate-700"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Falar com um especialista
            <ArrowUpRight size={14} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
