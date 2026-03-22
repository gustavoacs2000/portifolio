"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Shield, Scale, Award } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroProps {
  theme?: "light" | "dark";
}

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" as const } },
};

const slideRight = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function CredentialBadge({
  icon: Icon,
  text,
  isDark,
}: {
  icon: React.ElementType;
  text: string;
  isDark: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-colors duration-300 ${
        isDark
          ? "bg-white/4 border-white/8 text-white/65"
          : "bg-white border-slate-200 text-slate-600"
      }`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Icon size={12} className={isDark ? "text-amber-400/70" : "text-amber-700/80"} />
      {text}
    </motion.div>
  );
}

function StatPill({
  value,
  label,
  isDark,
}: {
  value: string;
  label: string;
  isDark: boolean;
}) {
  return (
    <div className="flex flex-col">
      <span
        className={`text-2xl font-light leading-none tracking-tight ${
          isDark ? "text-white" : "text-slate-900"
        }`}
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {value}
      </span>
      <span
        className={`text-[10px] mt-1 ${isDark ? "text-white/40" : "text-slate-400"}`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function HeroSection({ theme = "dark" }: HeroProps) {
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // ── Token aliases ──────────────────────────────────────────────────────────
  const bg          = isDark ? "bg-[#0F0F10]"   : "bg-[#F7F4EE]";
  const headingColor = isDark ? "text-white"      : "text-slate-900";
  const accentColor  = isDark ? "text-amber-400/80" : "text-amber-700";
  const bodyColor    = isDark ? "text-white/52"   : "text-slate-500";
  const divider      = isDark ? "bg-white/8"      : "bg-slate-200";
  const tagBg        = isDark
    ? "bg-amber-500/10 text-amber-400/80 border-amber-500/20"
    : "bg-amber-50 text-amber-700 border-amber-200";
  const statDivider  = isDark ? "bg-white/8"      : "bg-slate-200";

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-[100svh] ${bg} overflow-hidden`}
      aria-label="Apresentação do escritório"
    >
      {/* ── Subtle grid texture ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.022]"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(var(--grid-color, #888) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color, #888) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Navy glow — dark only ── */}
      {isDark && (
        <div
          className="pointer-events-none absolute top-0 right-0 w-[700px] h-[700px] opacity-15 z-0"
          style={{
            background: "radial-gradient(ellipse at top right, #0D1E3C 0%, transparent 65%)",
          }}
        />
      )}

      {/* ── Main grid ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 min-h-[100svh] grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] items-center gap-10 lg:gap-0 py-24 lg:py-0">

        {/* ── LEFT: Copy ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center lg:pr-16 xl:pr-24"
        >
          {/* Eyebrow tag */}
          <motion.div variants={fadeUp} className="mb-7">
            <span
              className={`inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.18em] uppercase px-3 py-1.5 rounded-md border ${tagBg}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Scale size={10} />
              Advocacia Corporativa &amp; Empresarial
            </span>
          </motion.div>

          {/* Headline — Playfair Display */}
          <motion.h1
            variants={fadeUp}
            className={`font-normal leading-[1.08] tracking-tight mb-6 ${headingColor}`}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            }}
          >
            Estratégia jurídica{" "}
            <em
              className={`italic font-normal ${accentColor}`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              que protege
            </em>
            <br />
            o que você construiu.
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className={`text-base leading-relaxed max-w-lg mb-8 ${bodyColor}`}
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
          >
            Assessoria jurídica de alto padrão para empresas que não podem
            se dar ao luxo de errar. Soluções integradas em direito
            empresarial, contratos, M&amp;A e contencioso estratégico.
          </motion.p>

          {/* CTA row */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
            <motion.a
              href="#contato"
              className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 ${
                isDark
                  ? "bg-white text-slate-900 hover:bg-slate-100"
                  : "bg-slate-900 text-white hover:bg-slate-700"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Consulta estratégica
              <ArrowUpRight size={14} />
            </motion.a>

            <motion.a
              href="#areas"
              className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-medium tracking-wide border transition-all duration-200 ${
                isDark
                  ? "text-white/65 border-white/12 hover:text-white hover:border-white/28"
                  : "text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-400"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              Áreas de atuação
            </motion.a>
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeIn} className={`w-full h-px ${divider} mb-8`} />

          {/* Stats row */}
          <motion.div
            variants={containerVariants}
            className="flex items-center gap-8"
          >
            <StatPill value="22+" label="Anos de atuação" isDark={isDark} />
            <div className={`w-px h-8 ${statDivider}`} />
            <StatPill value="400+" label="Empresas atendidas" isDark={isDark} />
            <div className={`w-px h-8 ${statDivider}`} />
            <StatPill value="98%" label="Taxa de êxito" isDark={isDark} />
          </motion.div>

          {/* Credential badges */}
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap gap-2 mt-7"
          >
            <CredentialBadge icon={Shield} text="OAB/DF 12.345" isDark={isDark} />
            <CredentialBadge icon={Award}  text="Top 10 Chambers BR 2024" isDark={isDark} />
            <CredentialBadge icon={Scale}  text="Membro da ABBC" isDark={isDark} />
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Image panel ── */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          animate="visible"
          className="relative w-full h-[520px] lg:h-[100svh] overflow-hidden"
        >
          {/* Top border line — desktop only */}
          <div
            className={`hidden lg:block absolute inset-0 border-l z-10 pointer-events-none ${
              isDark ? "border-white/6" : "border-slate-200/50"
            }`}
          />

          {/* Gold accent line — top */}
          <div className="absolute top-0 left-0 right-0 h-px z-10 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(to top, #0F0F10 0%, transparent 100%)"
                : "linear-gradient(to top, #F7F4EE 0%, transparent 100%)",
            }}
          />

          {/* Parallax image */}
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-0 scale-[1.07]"
          >
            <Image
              src="/images/advocacia/hero-office.jpg"
              alt="Escritório de advocacia corporativa — sala de reuniões executiva"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
            />
          </motion.div>

          {/* Floating info card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
            className={`absolute bottom-12 left-6 z-20 flex flex-col gap-1.5 px-5 py-4 rounded-xl border backdrop-blur-md max-w-[260px] ${
              isDark
                ? "bg-white/6 border-white/10"
                : "bg-white/92 border-white shadow-lg shadow-slate-200/60"
            }`}
          >
            <p
              className={`text-[10px] font-medium tracking-widest uppercase ${
                isDark ? "text-amber-400/65" : "text-amber-700/75"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Reconhecimento
            </p>
            <p
              className={`text-sm font-normal leading-snug ${
                isDark ? "text-white/85" : "text-slate-800"
              }`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "Escritório de referência em direito empresarial no DF"
            </p>
            <p
              className={`text-[10px] ${isDark ? "text-white/35" : "text-slate-400"}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              — Análise Advocacia 500, 2024
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2 ${bodyColor}`}
        aria-hidden="true"
      >
        <span
          className="text-[9px] tracking-[0.22em] uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Role para baixo
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className={`w-px h-8 ${isDark ? "bg-white/18" : "bg-slate-300"}`}
        />
      </motion.div>
    </section>
  );
}
