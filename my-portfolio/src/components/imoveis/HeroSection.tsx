"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MapPin, BedDouble, Maximize2, Phone } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroProps {
  theme?: "light" | "dark";
}

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1, ease: "easeOut" as const } },
};

// ─── Property stat pill ───────────────────────────────────────────────────────

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
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
        <Icon size={13} className="text-white/70" />
      </div>
      <div>
        <p
          className="text-sm font-medium text-white leading-tight"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {value}
        </p>
        <p
          className="text-[9px] text-white/45 leading-tight"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function HeroSection({ theme = "dark" }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: imagem sobe mais devagar que o scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  // Copy desce levemente com scroll — efeito de profundidade
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  // Overlay escurece com scroll
  const overlayOp = useTransform(scrollYProgress, [0, 0.5], [0.45, 0.72]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] overflow-hidden bg-[#0A0A0B]"
      aria-label="Imóvel em destaque"
    >
      {/* ── Full-bleed background image ── */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 scale-[1.12]"
      >
        <Image
          src="/images/imoveis/hero-property.png"
          alt="Imóvel de luxo — sala de estar ampla com vista para o lago"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
        />
      </motion.div>

      {/* ── Gradient overlay — bottom-heavy para legibilidade do copy ── */}
      <motion.div
        style={{
          opacity: overlayOp,
          background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 100%)",
        }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* ── Vinheta lateral esquerda ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 50%)",
        }}
      />

      {/* ── Top bar: logo + contato ── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 lg:px-12 py-7"
      >
        {/* Logo/Nome do corretor */}
        <div>
          <p
            className="text-white font-normal leading-tight tracking-wide"
            style={{ fontFamily: "'Fraunces', serif", fontSize: "1.35rem" }}
          >
            Bruno Lacerda
          </p>
          <p
            className="text-white/45 text-[10px] tracking-widest uppercase mt-0.5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Imóveis de Luxo · Brasília
          </p>
        </div>

        {/* Phone CTA */}
        <a
          href="tel:+556199999999"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/8 backdrop-blur-sm text-white text-xs font-medium tracking-wide transition-all duration-200 hover:bg-white/16 hover:border-white/35"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <Phone size={12} />
          (61) 9 9999-9999
        </a>
      </motion.div>

      {/* ── Main copy — pinned to bottom-left ── */}
      <motion.div
        style={{ y: contentY }}
        className="absolute bottom-0 left-0 right-0 z-20 px-6 lg:px-12 pb-10 lg:pb-16"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Location tag */}
          <motion.div variants={fadeUp} className="mb-5">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/18 bg-white/8 backdrop-blur-sm text-white/75"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <MapPin size={10} />
              Lago Sul · Brasília–DF
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-normal text-white leading-[1.05] tracking-tight mb-4"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
              fontWeight: 300,
            }}
          >
            Residência de alto{" "}
            <em
              className="italic font-light text-amber-300/90"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              padrão
            </em>
            <br />
            com vista para o lago.
          </motion.h1>

          {/* Price + area */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-baseline gap-3 mb-7">
            <span
              className="text-2xl font-light text-white leading-none"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              R$ 4.800.000
            </span>
            <span
              className="text-white/35 text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              · Financiamento disponível
            </span>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-6 mb-8"
          >
            <StatPill icon={BedDouble} value="5 suítes" label="Sendo 1 master" />
            <StatPill icon={Maximize2} value="620 m²" label="Área construída" />
            <StatPill icon={MapPin} value="1.200 m²" label="Terreno" />
          </motion.div>

          {/* CTA row */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <motion.a
              href="#contato"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-slate-900 text-sm font-medium tracking-wide transition-all duration-200 hover:bg-slate-100"
              style={{ fontFamily: "'Inter', sans-serif" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Agendar visita
              <ArrowRight size={14} />
            </motion.a>

            <motion.a
              href="#galeria"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-white/8 backdrop-blur-sm text-white text-sm font-medium tracking-wide transition-all duration-200 hover:bg-white/16 hover:border-white/35"
              style={{ fontFamily: "'Inter', sans-serif" }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver galeria
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 right-8 z-20 hidden lg:flex flex-col items-center gap-2 text-white/30"
        aria-hidden="true"
      >
        <span
          className="text-[9px] tracking-[0.22em] uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Role
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-8 bg-white/20"
        />
      </motion.div>

      {/* ── Property count badge — top right ── */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="absolute top-24 right-6 lg:right-12 z-20 hidden sm:flex flex-col items-end gap-1"
      >
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/6 backdrop-blur-sm"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span
            className="text-[10px] font-medium text-white/65"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            12 imóveis disponíveis
          </span>
        </div>
      </motion.div>
    </section>
  );
}
