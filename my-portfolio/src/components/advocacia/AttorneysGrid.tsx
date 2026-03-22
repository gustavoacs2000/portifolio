"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Linkedin } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Attorney {
  id: string;
  name: string;
  role: string;           // "Sócio Fundador", "Sócio", "Of Counsel"
  oab: string;            // "OAB/DF 12.345"
  specialties: string[];  // max 3
  bio: string;            // 1 linha
  imageSrc: string;
  imageAlt: string;
  linkedinUrl?: string;
  featured?: boolean;     // sócio fundador — card maior
}

interface AttorneysGridProps {
  theme?: "light" | "dark";
  attorneys?: Attorney[];
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_ATTORNEYS: Attorney[] = [
  {
    id: "carlos",
    name: "Dr. Carlos Mendonça",
    role: "Sócio Fundador",
    oab: "OAB/DF 8.421",
    specialties: ["M&A", "Governança Corporativa", "Arbitragem"],
    bio: "Ex-conselheiro do CADE. 28 anos de atuação em operações estruturadas de alto valor.",
    imageSrc: "/images/advocacia/attorney-carlos.jpg",
    imageAlt: "Dr. Carlos Mendonça — Sócio Fundador",
    linkedinUrl: "#",
    featured: true,
  },
  {
    id: "ana",
    name: "Dra. Ana Beatriz Leal",
    role: "Sócia",
    oab: "OAB/DF 14.872",
    specialties: ["Regulatório", "Compliance", "LGPD"],
    bio: "Especialista em direito regulatório com passagem pela ANATEL e ANCINE.",
    imageSrc: "/images/advocacia/attorney-ana.jpg",
    imageAlt: "Dra. Ana Beatriz Leal — Sócia",
    linkedinUrl: "#",
  },
  {
    id: "rafael",
    name: "Dr. Rafael Drummond",
    role: "Sócio",
    oab: "OAB/DF 19.330",
    specialties: ["Contencioso", "STJ/STF", "Arbitragem"],
    bio: "Atuação em tribunais superiores com 94% de êxito em mandatos de alta complexidade.",
    imageSrc: "/images/advocacia/attorney-rafael.jpg",
    imageAlt: "Dr. Rafael Drummond — Sócio",
    linkedinUrl: "#",
  },
  {
    id: "julia",
    name: "Dra. Júlia Fonseca",
    role: "Of Counsel",
    oab: "OAB/SP 22.115",
    specialties: ["Tributário", "CARF", "Planejamento"],
    bio: "Ex-conselheira do CARF. Referência em planejamento tributário para grupos econômicos.",
    imageSrc: "/images/advocacia/attorney-julia.jpg",
    imageAlt: "Dra. Júlia Fonseca — Of Counsel",
    linkedinUrl: "#",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const scaleIn = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Role badge color ─────────────────────────────────────────────────────────

function roleBadgeClass(role: string, isDark: boolean) {
  if (role === "Sócio Fundador") {
    return isDark
      ? "bg-amber-500/12 text-amber-400/80 border-amber-500/20"
      : "bg-amber-50 text-amber-700 border-amber-200";
  }
  if (role === "Of Counsel") {
    return isDark
      ? "bg-blue-500/10 text-blue-300/70 border-blue-500/15"
      : "bg-blue-50 text-blue-700 border-blue-200";
  }
  return isDark
    ? "bg-white/5 text-white/45 border-white/8"
    : "bg-slate-100 text-slate-500 border-slate-200";
}

// ─── Attorney card ────────────────────────────────────────────────────────────

function AttorneyCard({
  attorney,
  theme,
}: {
  attorney: Attorney;
  theme: "light" | "dark";
}) {
  const isDark = theme === "dark";
  const isFeatured = attorney.featured;

  const cardBg = isDark
    ? "bg-white/[0.025] hover:bg-white/[0.05]"
    : "bg-white hover:bg-slate-50/60";

  const cardBorder = isDark
    ? "border-white/6 hover:border-white/12"
    : "border-slate-200 hover:border-slate-300";

  const nameColor    = isDark ? "text-white/90"   : "text-slate-900";
  const oabColor     = isDark ? "text-white/28"   : "text-slate-400";
  const bioColor     = isDark ? "text-white/48"   : "text-slate-500";
  const dividerColor = isDark ? "bg-white/6"      : "bg-slate-100";
  const specBg       = isDark
    ? "bg-white/4 text-white/38 border-white/6"
    : "bg-slate-50 text-slate-500 border-slate-200";
  const linkedinColor = isDark
    ? "border-white/8 text-white/25 hover:border-white/25 hover:text-white/65"
    : "border-slate-200 text-slate-400 hover:border-slate-400 hover:text-slate-700";

  return (
    <motion.div
      variants={scaleIn}
      className={`group relative flex flex-col rounded-xl border overflow-hidden transition-all duration-300 ${cardBg} ${cardBorder}`}
      whileHover={{ y: -3 }}
    >
      {/* ── Photo ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: isFeatured ? "3/2" : "4/3" }}
      >
        <Image
          src={attorney.imageSrc}
          alt={attorney.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
        />

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: isDark
              ? "linear-gradient(to top, rgba(10,12,16,0.8), transparent)"
              : "linear-gradient(to top, rgba(255,255,255,0.7), transparent)",
          }}
        />

        {/* Role badge — pinned to top-left */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`inline-flex text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-md border backdrop-blur-sm ${roleBadgeClass(attorney.role, isDark)}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {attorney.role}
          </span>
        </div>

        {/* LinkedIn — pinned to top-right */}
        {attorney.linkedinUrl && (
          <a
            href={attorney.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute top-3 right-3 z-10 w-7 h-7 rounded-lg border flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
              isDark
                ? "bg-white/8 border-white/12 text-white/50 hover:bg-white/18 hover:text-white"
                : "bg-white/80 border-white/60 text-slate-500 hover:bg-white hover:text-slate-900"
            }`}
            aria-label={`LinkedIn de ${attorney.name}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin size={12} />
          </a>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5">

        {/* Name + OAB */}
        <div className="mb-3">
          <h3
            className={`font-normal leading-tight mb-0.5 ${nameColor}`}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem" }}
          >
            {attorney.name}
          </h3>
          <p
            className={`text-[10px] ${oabColor}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {attorney.oab}
          </p>
        </div>

        {/* Bio */}
        <p
          className={`text-xs leading-relaxed flex-1 mb-4 ${bioColor}`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {attorney.bio}
        </p>

        {/* Divider */}
        <div className={`h-px w-full ${dividerColor} mb-3`} />

        {/* Specialties + arrow */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1 min-w-0">
            {attorney.specialties.map((s) => (
              <span
                key={s}
                className={`text-[8px] font-medium tracking-widest uppercase px-1.5 py-0.5 rounded border ${specBg}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {s}
              </span>
            ))}
          </div>

          <a
            href={`#${attorney.id}`}
            className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-105 ${linkedinColor}`}
            aria-label={`Ver perfil de ${attorney.name}`}
          >
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function AttorneysGrid({
  theme = "dark",
  attorneys = DEFAULT_ATTORNEYS,
}: AttorneysGridProps) {
  const isDark = theme === "dark";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const sectionBg    = isDark ? "bg-[#0F0F10]"     : "bg-[#F7F4EE]";
  const eyebrowColor = isDark ? "text-amber-400/60" : "text-amber-700/70";
  const headingColor = isDark ? "text-white"        : "text-slate-900";
  const subColor     = isDark ? "text-white/42"     : "text-slate-500";
  const dividerColor = isDark ? "bg-white/8"        : "bg-slate-200/60";

  return (
    <section
      ref={ref}
      className={`relative w-full ${sectionBg} py-24 lg:py-32 overflow-hidden`}
      aria-labelledby="attorneys-heading"
    >
      {/* Subtle horizontal rule across the top */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-40"
        style={{
          background: isDark
            ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)"
            : "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)",
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
          {/* Left */}
          <div className="max-w-xl">
            <motion.p
              variants={fadeUp}
              className={`text-[10px] font-medium tracking-[0.2em] uppercase mb-4 flex items-center gap-2 ${eyebrowColor}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="w-5 h-px bg-current inline-block" />
              Nossa equipe
            </motion.p>

            <motion.h2
              id="attorneys-heading"
              variants={fadeUp}
              className={`font-normal leading-[1.08] tracking-tight mb-4 ${headingColor}`}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
            >
              Os sócios que{" "}
              <em
                className={`italic font-normal ${isDark ? "text-amber-400/70" : "text-amber-700/75"}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                conduzem
              </em>{" "}
              seu caso
            </motion.h2>

            <motion.div variants={fadeUp} className="flex gap-4 items-start">
              <div className={`w-px h-10 mt-0.5 shrink-0 ${dividerColor}`} />
              <p
                className={`text-sm leading-relaxed ${subColor}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Cada cliente é atendido diretamente por sócios. Nenhum mandato
                é delegado exclusivamente a associados — garantia de qualidade
                e atenção que nossos clientes exigem.
              </p>
            </motion.div>
          </div>

          {/* Right: aggregate credentials */}
          <motion.div
            variants={fadeUp}
            className={`flex items-center gap-6 px-6 py-4 rounded-xl border ${
              isDark ? "border-white/6 bg-white/[0.02]" : "border-slate-200 bg-white"
            }`}
          >
            {[
              { value: "4", label: "Sócios sênior" },
              { value: "60+", label: "Anos combinados" },
              { value: "3", label: "Escritórios" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <span
                  className={`text-xl font-normal leading-none ${isDark ? "text-white" : "text-slate-900"}`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {stat.value}
                </span>
                <span
                  className={`text-[9px] mt-1.5 whitespace-nowrap ${isDark ? "text-white/35" : "text-slate-400"}`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Cards grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {attorneys.map((attorney) => (
            <AttorneyCard key={attorney.id} attorney={attorney} theme={theme} />
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
          Conheça nossa equipe completa de{" "}
          <a
            href="#equipe"
            className={`underline underline-offset-2 transition-colors ${
              isDark
                ? "text-amber-400/65 hover:text-amber-400"
                : "text-amber-700 hover:text-amber-800"
            }`}
          >
            associados e of counsels
          </a>
          .
        </motion.p>

      </div>
    </section>
  );
}
