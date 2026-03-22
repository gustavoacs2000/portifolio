"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Music, Award, Users } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroProps {
  heroImageSrc?: string;
  heroImageAlt?: string;
}

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.0, ease: "easeOut" } },
};

const slideLeft = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Staff notation SVG background ───────────────────────────────────────────

function StaffLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.04]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {Array.from({ length: 12 }).map((_, groupIndex) => (
        Array.from({ length: 5 }).map((_, lineIndex) => (
          <line
            key={`${groupIndex}-${lineIndex}`}
            x1="0"
            y1={groupIndex * 90 + lineIndex * 10 + 20}
            x2="100%"
            y2={groupIndex * 90 + lineIndex * 10 + 20}
            stroke="#1A2E4A"
            strokeWidth="0.8"
          />
        ))
      ))}
    </svg>
  );
}

// ─── Stat pill ────────────────────────────────────────────────────────────────

function StatPill({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#1A2E4A]/10 bg-white/60 backdrop-blur-sm">
      <div className="w-8 h-8 rounded-lg bg-[#1A2E4A]/8 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-[#1A2E4A]/60" />
      </div>
      <div>
        <p
          className="text-sm font-semibold leading-tight text-[#0F1820]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {value}
        </p>
        <p
          className="text-[10px] text-stone-400 leading-tight mt-0.5"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function HeroSection({
  heroImageSrc = "/images/dueto/hero-teachers.png",
  heroImageAlt = "Rafael e Ana Clara — professores de violino da Dueto Academia de Música",
}: HeroProps) {
  return (
    <section
      className="relative w-full min-h-[100svh] bg-[#FAF6EF] overflow-hidden"
      aria-label="Dueto Academia de Música"
    >
      {/* Staff lines texture */}
      <StaffLines />

      {/* Warm radial glow — left */}
      <div
        className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, #C8A878 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      {/* Navy accent stripe — top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#1A2E4A]" aria-hidden="true" />

      {/* ── Top bar ── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 lg:px-12 py-6"
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* Violin icon */}
          <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 2C10 2 8.5 3.5 8.5 5.5C8.5 7 9.2 8.2 10.2 9C8.8 10 8 11.5 8 13C8 15.2 9.5 17 11.5 17.5V24C11.5 25.1 11 26 10 26.5L9 27V30H15V27L14 26.5C13 26 12.5 25.1 12.5 24V17.5C14.5 17 16 15.2 16 13C16 11.5 15.2 10 13.8 9C14.8 8.2 15.5 7 15.5 5.5C15.5 3.5 14 2 12 2Z" fill="#1A2E4A" opacity="0.7"/>
            <line x1="11" y1="4" x2="13" y2="4" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="11" y1="6" x2="13" y2="6" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <div>
            <p
              className="text-[#0F1820] font-normal leading-tight tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", letterSpacing: "0.04em" }}
            >
              Dueto Academia
            </p>
            <p
              className="text-[#1A2E4A]/50 text-[9px] tracking-[0.18em] uppercase mt-0.5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              de Música
            </p>
          </div>
        </div>

        {/* Nav CTA */}
        <a
          href="#matricula"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A2E4A] text-white text-xs font-medium tracking-wide hover:bg-[#243d5e] transition-all duration-200"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Aula experimental
          <ArrowRight size={12} />
        </a>
      </motion.div>

      {/* ── Grid ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 min-h-[100svh] grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] items-center gap-8 lg:gap-0 pt-28 pb-16 lg:py-0">

        {/* ── LEFT: Copy ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center lg:pr-16"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
            <div className="w-8 h-px bg-[#D4A843]" />
            <span
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#1A2E4A]/60"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Brasília — DF · Desde 2015
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-normal leading-[1.04] tracking-tight text-[#0F1820] mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem, 5.5vw, 4.4rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            Aprenda violino com{" "}
            <em
              className="italic font-normal"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A2E4A" }}
            >
              quem vive
            </em>
            <br />a música.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed text-stone-500 max-w-md mb-8"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400 }}
          >
            Rafael e Ana Clara são violinistas formados com anos de experiência em
            palco e ensino. Na Dueto, cada aluno aprende no seu tempo —
            do iniciante ao avançado, crianças e adultos.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
            <motion.a
              href="#matricula"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1A2E4A] text-white text-sm font-medium tracking-wide hover:bg-[#243d5e] transition-all duration-200"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Garantir minha vaga
              <ArrowRight size={14} />
            </motion.a>
            <motion.a
              href="#cursos"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#1A2E4A]/15 text-[#1A2E4A]/70 text-sm font-medium tracking-wide hover:border-[#1A2E4A]/35 hover:text-[#1A2E4A] transition-all duration-200 bg-white/50 backdrop-blur-sm"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver modalidades
            </motion.a>
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeIn} className="w-full h-px bg-[#1A2E4A]/8 mb-8" />

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            <StatPill icon={Users}  value="200+ alunos"  label="Formados desde 2015"  />
            <StatPill icon={Award}  value="2 professores" label="Formados em conservatório" />
            <StatPill icon={Music}  value="4 modalidades" label="Do infantil ao avançado" />
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Teachers photo ── */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          animate="visible"
          className="relative flex items-center justify-center lg:h-[100svh]"
        >
          {/* Decorative frame */}
          <div
            className="absolute inset-8 rounded-3xl opacity-20"
            style={{ background: "linear-gradient(145deg, #C8A878 0%, #1A2E4A 100%)" }}
            aria-hidden="true"
          />

          {/* Photo */}
          <div className="relative z-10 w-[88%] max-w-md rounded-3xl overflow-hidden border border-[#1A2E4A]/8 shadow-2xl shadow-[#1A2E4A]/10" style={{ aspectRatio: "3/4" }}>
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 42vw"
              className="object-cover object-top"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
            />

            {/* Bottom overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(15,24,32,0.75), transparent)" }}
            />

            {/* Teachers names */}
            <div className="absolute bottom-5 left-5 right-5 z-10">
              <p
                className="text-white font-normal leading-tight text-lg"
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em" }}
              >
                Rafael & Ana Clara
              </p>
              <p
                className="text-white/55 text-[10px] mt-1 tracking-wide"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Violinistas · Fundadores da Dueto
              </p>
            </div>
          </div>

          {/* Floating badge — experience */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute top-[14%] right-2 lg:right-0 z-20 bg-white rounded-2xl border border-[#1A2E4A]/10 shadow-lg px-4 py-3"
          >
            <p
              className="text-[9px] font-medium tracking-widest uppercase text-[#D4A843] mb-1"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Próxima turma
            </p>
            <p
              className="text-sm font-medium text-[#0F1820] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
            >
              Fevereiro 2026
            </p>
            <p
              className="text-[10px] text-stone-400 mt-0.5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Vagas limitadas
            </p>
          </motion.div>

          {/* Floating badge — trial */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute bottom-[18%] left-2 lg:left-0 z-20 bg-[#1A2E4A] rounded-2xl px-4 py-3"
          >
            <p
              className="text-[9px] font-medium tracking-widest uppercase text-[#D4A843]/80 mb-0.5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Experimente
            </p>
            <p
              className="text-sm font-semibold text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Aula gratuita
            </p>
            <p
              className="text-[10px] text-white/45 mt-0.5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              sem compromisso
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2 text-[#1A2E4A]/25"
        aria-hidden="true"
      >
        <span
          className="text-[9px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Conheça a escola
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="w-px h-8 bg-[#1A2E4A]/15"
        />
      </motion.div>
    </section>
  );
}
