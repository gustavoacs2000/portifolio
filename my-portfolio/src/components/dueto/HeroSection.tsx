"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Music, Award, Users } from "lucide-react";

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface HeroProps {
  heroImageSrc?: string;
  heroImageAlt?: string;
}

// â”€â”€â”€ Animation variants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
  visible: { opacity: 1, transition: { duration: 1.0, ease: "easeOut" as const } },
};

const slideLeft = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

// â”€â”€â”€ Staff notation SVG background â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
            stroke="#1D4570"
            strokeWidth="0.8"
          />
        ))
      ))}
    </svg>
  );
}

// â”€â”€â”€ Stat pill â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#1D4570]/10 bg-white/60 backdrop-blur-sm">
      <div className="w-8 h-8 rounded-lg bg-[#1D4570]/8 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-[#1D4570]/60" />
      </div>
      <div>
        <p
          className="text-sm font-semibold leading-tight text-[#1D4570]"
          style={{ fontFamily: "var(--font-cormorant-sc), serif" }}
        >
          {value}
        </p>
        <p
          className="text-[10px] text-stone-400 leading-tight mt-0.5"
          style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

// â”€â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function HeroSection({
  heroImageSrc = "https://lh3.googleusercontent.com/sitesv/APaQ0STzxEmC0NIWifX_iblzzXWP8dAmtIkRezOKBMyaXJpO_jr2zlyxLmKjXK_z1hmbTPHFrJTXoxFo1sliIY71JInERnLo725Z3fbnX1FtcG07t6OxuSLrf3_ZaRZtQbAaWQ0wfV_lgO0IyrgMOM2yleLnaBAKktIozcXVDMC9wc9sj6G7U0Zv2QXYjJY=w16383",
  heroImageAlt = "Espaco interno da Dueto Academia de Musica no Guara",
}: HeroProps) {
  return (
    <section
      className="relative w-full min-h-[100svh] bg-[#FEFEFF] overflow-hidden"
      aria-label="Dueto Academia de MÃºsica"
    >
      {/* Staff lines texture */}
      <StaffLines />

      {/* Warm radial glow â€” left */}
      <div
        className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, #1D4570 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      {/* Navy accent stripe â€” top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#1D4570]" aria-hidden="true" />

      {/* â”€â”€ Top bar â”€â”€ */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 lg:px-12 py-6"
      >
        <Image
          src="/images/dueto/logo-sem-fundo.png"
          alt="Dueto Academia de Musica"
          width={320}
          height={192}
          className="w-[140px] sm:w-[180px] h-auto"
          priority
        />

        {/* Nav CTA */}
        <a
          href="#matricula"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1D4570] text-white text-xs font-medium tracking-wide hover:bg-[#243d5e] transition-all duration-200"
          style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
        >
          Aula experimental
          <ArrowRight size={12} />
        </a>
      </motion.div>

      {/* â”€â”€ Grid â”€â”€ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 min-h-[100svh] grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] items-center gap-8 lg:gap-0 pt-28 pb-16 lg:py-0">

        {/* â”€â”€ LEFT: Copy â”€â”€ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center lg:pr-16"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
            <div className="w-8 h-px bg-[#1D4570]" />
            <span
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#1D4570]/60"
              style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
            >
              Guara 2 - DF Â· Desde 2015
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-normal leading-[1.04] tracking-tight text-[#1D4570] mb-6"
            style={{
              fontFamily: "var(--font-cormorant-sc), serif",
              fontSize: "clamp(2.8rem, 5.5vw, 4.4rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            Aprenda violino, viola de arco,
            <br />violoncelo, violao e piano.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed text-stone-500 max-w-md mb-8"
            style={{ fontFamily: "var(--font-libre-baskerville), serif", fontWeight: 400 }}
          >
            A Dueto e um espaco acolhedor e inspirador para alunos a partir
            de 5 anos. O ensino e personalizado e respeita o ritmo,
            os objetivos e a historia de cada aluno.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
            <motion.a
              href="#matricula"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1D4570] text-white text-sm font-medium tracking-wide hover:bg-[#243d5e] transition-all duration-200"
              style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Garantir minha vaga
              <ArrowRight size={14} />
            </motion.a>
            <motion.a
              href="#cursos"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#1D4570]/15 text-[#1D4570]/70 text-sm font-medium tracking-wide hover:border-[#1D4570]/35 hover:text-[#1D4570] transition-all duration-200 bg-white/50 backdrop-blur-sm"
              style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver modalidades
            </motion.a>
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeIn} className="w-full h-px bg-[#1D4570]/8 mb-8" />

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            <StatPill icon={Users}  value="A partir de 5 anos"  label="Aulas para criancas e adultos" />
            <StatPill icon={Award}  value="6 professores" label="Equipe de cordas e piano" />
            <StatPill icon={Music}  value="5 instrumentos" label="Violino, viola, cello, violao e piano" />
          </motion.div>
        </motion.div>

        {/* â”€â”€ RIGHT: Teachers photo â”€â”€ */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          animate="visible"
          className="relative flex items-center justify-center lg:h-[100svh]"
        >
          {/* Decorative frame */}
          <div
            className="absolute inset-8 rounded-3xl opacity-20"
            style={{ background: "linear-gradient(145deg, #1D4570 0%, #1D4570 100%)" }}
            aria-hidden="true"
          />

          {/* Photo */}
          <div className="relative z-10 w-[88%] max-w-md rounded-3xl overflow-hidden border border-[#1D4570]/8 shadow-2xl shadow-[#1D4570]/10" style={{ aspectRatio: "3/4" }}>
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
                style={{ fontFamily: "var(--font-cormorant-sc), serif", letterSpacing: "0.03em" }}
              >
                Dueto Academia de Musica
              </p>
              <p
                className="text-white/55 text-[10px] mt-1 tracking-wide"
                style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
              >
                Escola de Musica no Guara - DF
              </p>
            </div>
          </div>

          {/* Floating badge â€” experience */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute top-[14%] right-2 lg:right-0 z-20 bg-white rounded-2xl border border-[#1D4570]/10 shadow-lg px-4 py-3"
          >
            <p
              className="text-[9px] font-medium tracking-widest uppercase text-[#1D4570] mb-1"
              style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
            >
              Matriculas
            </p>
            <p
              className="text-sm font-medium text-[#1D4570] leading-tight"
              style={{ fontFamily: "var(--font-cormorant-sc), serif", fontSize: "1rem" }}
            >
              Turmas abertas
            </p>
            <p
              className="text-[10px] text-stone-400 mt-0.5"
              style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
            >
              Vagas limitadas
            </p>
          </motion.div>

          {/* Floating badge â€” trial */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute bottom-[18%] left-2 lg:left-0 z-20 bg-[#1D4570] rounded-2xl px-4 py-3"
          >
            <p
              className="text-[9px] font-medium tracking-widest uppercase text-white/80 mb-0.5"
              style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
            >
              Experimente
            </p>
            <p
              className="text-sm font-semibold text-white"
              style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
            >
              Aula experimental
            </p>
            <p
              className="text-[10px] text-white/45 mt-0.5"
              style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
            >
              com instrumento da escola
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2 text-[#1D4570]/25"
        aria-hidden="true"
      >
        <span
          className="text-[9px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
        >
          ConheÃ§a a escola
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="w-px h-8 bg-[#1D4570]/15"
        />
      </motion.div>
    </section>
  );
}

