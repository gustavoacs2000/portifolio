"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";

// ─── Tech grid items ──────────────────────────────────────────────────────────

const TECH_ITEMS = [
  { label: "Next.js 15",      color: "#ffffff" },
  { label: "TypeScript",      color: "#3178C6" },
  { label: "React",           color: "#61DAFB" },
  { label: "Tailwind CSS",    color: "#38BDF8" },
  { label: "Framer Motion",   color: "#FF0080" },
  { label: "Node.js",         color: "#8CC84B" },
  { label: "PostgreSQL",      color: "#336791" },
  { label: "Prisma",          color: "#5A67D8" },
  { label: "Vercel",          color: "#ffffff" },
  { label: "Docker",          color: "#2496ED" },
  { label: "REST API",        color: "#00C2FF" },
  { label: "SEO Técnico",     color: "#F59E0B" },
];

// ─── Proof badges ─────────────────────────────────────────────────────────────

const PROOF_BADGES = [
  { icon: Zap,      label: "Lighthouse 95+",   sub: "Performance garantida" },
  { icon: Shield,   label: "Código limpo",      sub: "TypeScript strict"     },
  { icon: BarChart3,label: "SEO técnico",       sub: "JSON-LD + sitemap"     },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9 } },
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[100svh] bg-[#08080F] overflow-hidden flex flex-col items-center justify-center"
      aria-label="GA Solutions — Desenvolvimento de software premium"
    >
      {/* ── Background effects ── */}

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#00C2FF 1px, transparent 1px), linear-gradient(90deg, #00C2FF 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Radial glow — center top */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-15"
        style={{ background: "radial-gradient(ellipse at top, #00C2FF 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-48"
        style={{ background: "linear-gradient(to top, #08080F, transparent)" }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-12 pt-28 pb-16 flex flex-col items-center text-center">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00C2FF]/20 bg-[#00C2FF]/5 text-[#00C2FF]/80 text-xs font-medium tracking-widest uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] animate-pulse" />
              Brasília — DF · Desenvolvimento Premium
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-bold leading-[1.02] tracking-tight text-white mb-6"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.6rem, 6.5vw, 5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Tecnologia que{" "}
            <span
              className="relative inline-block"
              style={{ color: "#00C2FF" }}
            >
              transforma
              {/* Underline glow */}
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-px bg-[#00C2FF]/40"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                style={{ transformOrigin: "left" }}
              />
            </span>
            <br />
            o seu negócio.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-lg leading-relaxed text-white/48 max-w-2xl mb-10"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
          >
            Desenvolvemos sites, sistemas e landing pages de alta performance
            para pequenas e médias empresas em Brasília. Código limpo,
            entrega rápida, resultado real.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 mb-14">
            <motion.a
              href="#contato"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#00C2FF] text-[#08080F] text-sm font-semibold tracking-wide hover:bg-[#33CFFF] transition-all duration-200"
              style={{ fontFamily: "'Syne', sans-serif" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Solicitar orçamento grátis
              <ArrowRight size={14} />
            </motion.a>
            <motion.a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/10 text-white/65 text-sm font-medium hover:text-white hover:border-white/25 transition-all duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver portfólio
            </motion.a>
          </motion.div>

          {/* Proof badges */}
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap items-center justify-center gap-3 mb-14"
          >
            {PROOF_BADGES.map(({ icon: Icon, label, sub }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/6 bg-white/[0.03]"
              >
                <div className="w-7 h-7 rounded-lg bg-[#00C2FF]/10 flex items-center justify-center shrink-0">
                  <Icon size={13} className="text-[#00C2FF]" />
                </div>
                <div>
                  <p
                    className="text-xs font-medium text-white/85 leading-tight"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-[10px] text-white/35 leading-tight"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech grid */}
          <motion.div variants={fadeIn} className="w-full max-w-3xl">
            <p
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/20 mb-5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Stack tecnológico
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {TECH_ITEMS.map((tech, i) => (
                <motion.div
                  key={tech.label}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.6 + i * 0.05,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/6 bg-white/[0.025] hover:border-white/14 hover:bg-white/[0.05] transition-all duration-200"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: tech.color }}
                  />
                  <span
                    className="text-[11px] text-white/55 font-medium whitespace-nowrap"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {tech.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/18"
        aria-hidden="true"
      >
        <span
          className="text-[9px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" as const }}
          className="w-px h-8 bg-white/12"
        />
      </motion.div>
    </section>
  );
}
