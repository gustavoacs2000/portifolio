"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  tag: string;           // e.g. "Facial"
  title: string;         // e.g. "Toxina Botulínica"
  description: string;   // 1–2 linhas
  duration: string;      // e.g. "30 min"
  sessions: string;      // e.g. "Sessão única"
  highlight?: boolean;   // card em destaque (featured)
  href?: string;
}

interface ServicesGridProps {
  theme?: "light" | "dark";
  services?: Service[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_SERVICES: Service[] = [
  {
    id: "botox",
    tag: "Facial",
    title: "Toxina Botulínica",
    description:
      "Suavização de linhas de expressão com técnica de mapeamento facial personalizado.",
    duration: "30 min",
    sessions: "Sessão única",
    highlight: true,
    href: "#botox",
  },
  {
    id: "preenchimento",
    tag: "Facial",
    title: "Preenchimento",
    description:
      "Ácido hialurônico para restaurar volumes e contornos com naturalidade.",
    duration: "45 min",
    sessions: "1–2 sessões",
    href: "#preenchimento",
  },
  {
    id: "skinbooster",
    tag: "Hidratação",
    title: "Skinbooster",
    description:
      "Microinjeções profundas de ácido hialurônico para luminosidade e firmeza.",
    duration: "40 min",
    sessions: "3 sessões",
    href: "#skinbooster",
  },
  {
    id: "laser",
    tag: "Tecnologia",
    title: "Laser CO₂",
    description:
      "Renovação celular avançada para manchas, textura e rejuvenescimento global.",
    duration: "60 min",
    sessions: "1–3 sessões",
    href: "#laser",
  },
  {
    id: "fios",
    tag: "Sustentação",
    title: "Fios de PDO",
    description:
      "Lifting não cirúrgico com fios bioabsorvíveis para sustentação imediata.",
    duration: "60 min",
    sessions: "Sessão única",
    href: "#fios",
  },
  {
    id: "peeling",
    tag: "Renovação",
    title: "Peeling Químico",
    description:
      "Protocolo de exfoliação profissional para uniformidade e clareza do tom.",
    duration: "50 min",
    sessions: "4–6 sessões",
    href: "#peeling",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const headingVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Decorative icon per tag ──────────────────────────────────────────────────

const TAG_ICONS: Record<string, string> = {
  Facial:      "✦",
  Hidratação:  "◈",
  Tecnologia:  "⬡",
  Sustentação: "⟡",
  Renovação:   "◇",
};

function TagIcon({ tag }: { tag: string }) {
  return (
    <span aria-hidden="true" className="text-[10px] leading-none">
      {TAG_ICONS[tag] ?? "·"}
    </span>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  theme,
}: {
  service: Service;
  theme: "light" | "dark";
}) {
  const isDark = service.highlight
    ? true                   // featured card is always dark (inverted)
    : theme === "dark";

  // Featured card always uses the gold accent bg
  const cardBg = service.highlight
    ? "bg-[#1C1612]"
    : isDark
    ? "bg-white/[0.03] hover:bg-white/[0.06]"
    : "bg-white hover:bg-stone-50/80";

  const cardBorder = service.highlight
    ? "border-amber-700/40"
    : isDark
    ? "border-white/8 hover:border-white/14"
    : "border-stone-200/90 hover:border-stone-300";

  const tagBg = service.highlight
    ? "bg-amber-400/15 text-amber-300 border-amber-500/25"
    : isDark
    ? "bg-white/6 text-white/50 border-white/10"
    : "bg-stone-100 text-stone-500 border-stone-200";

  const titleColor = service.highlight
    ? "text-amber-100"
    : isDark
    ? "text-white"
    : "text-stone-900";

  const descColor = service.highlight
    ? "text-amber-100/55"
    : isDark
    ? "text-white/48"
    : "text-stone-500";

  const metaColor = service.highlight
    ? "text-amber-300/70"
    : isDark
    ? "text-white/30"
    : "text-stone-400";

  const dividerColor = service.highlight
    ? "bg-amber-700/25"
    : isDark
    ? "bg-white/8"
    : "bg-stone-100";

  const arrowColor = service.highlight
    ? "text-amber-300"
    : isDark
    ? "text-white/25 group-hover:text-white/60"
    : "text-stone-300 group-hover:text-stone-600";

  // Gold accent line on highlight card
  const accentLine = service.highlight ? (
    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
  ) : null;

  return (
    <motion.a
      href={service.href ?? "#"}
      variants={cardVariants}
      className={`group relative flex flex-col rounded-2xl border p-6 transition-all duration-300 cursor-pointer ${cardBg} ${cardBorder}`}
      style={{ textDecoration: "none" }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
    >
      {accentLine}

      {/* Top row: tag + arrow */}
      <div className="flex items-center justify-between mb-5">
        <span
          className={`inline-flex items-center gap-1.5 text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-full border ${tagBg}`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <TagIcon tag={service.tag} />
          {service.tag}
        </span>

        <div
          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${
            service.highlight
              ? "border-amber-500/30 text-amber-300"
              : isDark
              ? "border-white/10 group-hover:border-white/25"
              : "border-stone-200 group-hover:border-stone-400"
          } ${arrowColor}`}
        >
          <ArrowUpRight size={13} />
        </div>
      </div>

      {/* Title */}
      <h3
        className={`text-xl font-light leading-tight mb-3 ${titleColor}`}
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className={`text-sm leading-relaxed flex-1 mb-5 ${descColor}`}
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
      >
        {service.description}
      </p>

      {/* Divider */}
      <div className={`h-px w-full ${dividerColor} mb-4`} />

      {/* Meta row: duration + sessions */}
      <div
        className={`flex items-center justify-between text-xs ${metaColor}`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <span className="flex items-center gap-1.5">
          {/* Clock icon */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/>
            <path d="M6 3.5V6l1.5 1.5" stroke="currentColor" strokeWidth="1"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {service.duration}
        </span>
        <span className="flex items-center gap-1.5">
          {/* Repeat icon */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 4h8M8 2l2 2-2 2M10 8H2m2 2L2 8l2-2"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {service.sessions}
        </span>
      </div>
    </motion.a>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ServicesGrid({
  theme = "light",
  services = DEFAULT_SERVICES,
  sectionTitle = "Tratamentos",
  sectionSubtitle = "Cada protocolo é desenhado com base na sua avaliação clínica individual — porque resultados reais começam com um diagnóstico preciso.",
}: ServicesGridProps) {
  const isDark = theme === "dark";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const sectionBg   = isDark ? "bg-[#0A0A0B]" : "bg-[#F4F1ED]";
  const eyebrowColor = isDark ? "text-amber-400/70" : "text-amber-700/80";
  const headingColor = isDark ? "text-white" : "text-stone-900";
  const subColor     = isDark ? "text-white/45" : "text-stone-500";
  const dividerColor = isDark ? "bg-white/8" : "bg-stone-300/60";
  const countColor   = isDark ? "text-white/18" : "text-stone-200";

  return (
    <section
      ref={ref}
      className={`relative w-full ${sectionBg} py-24 lg:py-32 overflow-hidden`}
      aria-labelledby="services-heading"
    >
      {/* Large bg number — decorative */}
      <span
        className={`pointer-events-none select-none absolute -top-6 right-8 text-[11rem] font-light leading-none ${countColor}`}
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
        aria-hidden="true"
      >
        {services.length.toString().padStart(2, "0")}
      </span>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* ── Section header ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 lg:mb-16 max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.p
            variants={headingVariants}
            className={`text-xs font-medium tracking-[0.2em] uppercase mb-4 flex items-center gap-2 ${eyebrowColor}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="w-5 h-px bg-current inline-block" />
            Nossos serviços
          </motion.p>

          {/* Heading */}
          <motion.h2
            id="services-heading"
            variants={headingVariants}
            className={`text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight mb-5 ${headingColor}`}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {sectionTitle}
            <em
              className={`italic font-normal ml-3 ${
                isDark ? "text-amber-300/80" : "text-amber-700/70"
              }`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              estéticos
            </em>
          </motion.h2>

          {/* Divider + subtitle */}
          <motion.div variants={headingVariants} className="flex gap-4 items-start">
            <div className={`w-px h-12 mt-0.5 shrink-0 ${dividerColor}`} />
            <p
              className={`text-sm leading-relaxed ${subColor}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {sectionSubtitle}
            </p>
          </motion.div>
        </motion.div>

        {/* ── Cards grid ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} theme={theme} />
          ))}
        </motion.div>

        {/* ── Bottom CTA row ── */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <p
            className={`text-sm ${subColor}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Não encontrou o que procura?{" "}
            <a
              href="#contato"
              className={`underline underline-offset-2 transition-colors ${
                isDark
                  ? "text-amber-300/80 hover:text-amber-300"
                  : "text-amber-700 hover:text-amber-800"
              }`}
            >
              Fale com nossa equipe
            </a>
          </p>

          <motion.a
            href="#agendamento"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
              isDark
                ? "bg-amber-400 text-stone-900 hover:bg-amber-300"
                : "bg-stone-900 text-white hover:bg-stone-700"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Agendar avaliação gratuita
            <ArrowUpRight size={14} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
