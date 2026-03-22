"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Star, MapPin, Phone, Instagram } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AgentStat {
  value: string;
  label: string;
}

export interface AgentProfileProps {
  theme?: "light" | "dark";
  name?: string;
  title?: string;
  creci?: string;
  bio?: string[];
  specialties?: string[];
  stats?: AgentStat[];
  rating?: number;
  reviewCount?: number;
  imageSrc?: string;
  imageAlt?: string;
  phone?: string;
  instagram?: string;
  ctaHref?: string;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_STATS: AgentStat[] = [
  { value: "R$ 180M+", label: "em vendas realizadas"    },
  { value: "94",       label: "imóveis comercializados" },
  { value: "12",       label: "anos no mercado"         },
  { value: "4.9",      label: "nota média no Google"    },
];

const DEFAULT_SPECIALTIES = [
  "Lago Sul", "Park Way", "Sudoeste", "Noroeste", "Alto Padrão", "Lançamentos",
];

const DEFAULT_BIO = [
  "Especialista em imóveis residenciais de alto padrão no Distrito Federal, com atuação focada nos bairros mais valorizados da capital. Cada negociação é conduzida com transparência total, análise criteriosa de mercado e atenção aos detalhes que fazem a diferença.",
  "Formado em Administração pela UnB com especialização em Negócios Imobiliários, concilia conhecimento técnico com relacionamento próximo — do primeiro contato à entrega das chaves.",
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeRight = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

const scaleIn = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Star rating ──────────────────────────────────────────────────────────────

function StarRating({ rating, isDark }: { rating: number; isDark: boolean }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={11}
          className={i < Math.floor(rating) ? "text-amber-400" : isDark ? "text-white/15" : "text-stone-200"}
          fill={i < Math.floor(rating) ? "currentColor" : "none"} />
      ))}
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ stat, isDark }: { stat: AgentStat; isDark: boolean }) {
  return (
    <motion.div variants={fadeUp}
      className={`flex flex-col gap-0.5 px-5 py-4 rounded-xl border ${
        isDark ? "bg-white/[0.03] border-white/7" : "bg-white border-stone-200/80"
      }`}
    >
      <span className={`text-2xl font-light leading-tight ${isDark ? "text-amber-300" : "text-stone-900"}`}
        style={{ fontFamily: "'Fraunces', serif" }}>{stat.value}</span>
      <span className={`text-[10px] leading-tight ${isDark ? "text-white/38" : "text-stone-400"}`}
        style={{ fontFamily: "'Inter', sans-serif" }}>{stat.label}</span>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AgentProfile({
  theme = "dark",
  name = "Bruno Lacerda",
  title = "Corretor de Imóveis de Luxo",
  creci = "CRECI/DF 12.345-F",
  bio = DEFAULT_BIO,
  specialties = DEFAULT_SPECIALTIES,
  stats = DEFAULT_STATS,
  rating = 4.9,
  reviewCount = 148,
  imageSrc = "/images/imoveis/agent-profile.png",
  imageAlt = "Bruno Lacerda — Corretor de Imóveis de Luxo em Brasília",
  phone = "(61) 9 9999-9999",
  instagram = "@brunolacerda.imoveis",
  ctaHref = "#contato",
}: AgentProfileProps) {
  const isDark = theme === "dark";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const sectionBg    = isDark ? "bg-[#0A0A0B]"     : "bg-[#F5F0E8]";
  const eyebrowColor = isDark ? "text-amber-400/60" : "text-amber-700/70";
  const headingColor = isDark ? "text-white"        : "text-stone-900";
  const accentColor  = isDark ? "text-amber-300/80" : "text-amber-700";
  const bodyColor    = isDark ? "text-white/50"     : "text-stone-500";
  const divider      = isDark ? "bg-white/7"        : "bg-stone-200";
  const creciColor   = isDark ? "text-white/28"     : "text-stone-400";
  const imgBorder    = isDark ? "border-white/7"    : "border-stone-200";
  const specBg       = isDark
    ? "bg-white/5 text-white/45 border-white/8 hover:bg-white/8"
    : "bg-white text-stone-500 border-stone-200 hover:border-stone-300";
  const contactBg    = isDark ? "bg-white/[0.03] border-white/7" : "bg-white border-stone-200";

  return (
    <section ref={ref} className={`relative w-full ${sectionBg} py-24 lg:py-32 overflow-hidden`}
      aria-labelledby="agent-heading">

      <div className="absolute top-0 left-0 right-0 h-px opacity-40" style={{
        background: isDark
          ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)"
          : "linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)",
      }} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">

          {/* LEFT: Photo + stats */}
          <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-6">

            <motion.div variants={scaleIn}
              className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden border ${imgBorder}`}>
              <Image src={imageSrc} alt={imageAlt} fill
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="object-cover object-top"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
              />
              <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" style={{
                background: isDark
                  ? "linear-gradient(to top, rgba(10,10,11,0.75), transparent)"
                  : "linear-gradient(to top, rgba(245,240,232,0.65), transparent)",
              }} />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-base font-light leading-tight"
                  style={{ fontFamily: "'Fraunces', serif" }}>{name}</p>
                <p className="text-white/55 text-[10px] mt-0.5"
                  style={{ fontFamily: "'Inter', sans-serif" }}>{creci}</p>
              </div>
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg backdrop-blur-sm bg-black/30 border border-white/12">
                  <Star size={10} className="text-amber-400 fill-amber-400" />
                  <span className="text-[10px] font-medium text-white/85"
                    style={{ fontFamily: "'Inter', sans-serif" }}>{rating}</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={containerVariants} className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => <StatCard key={i} stat={stat} isDark={isDark} />)}
            </motion.div>

            <motion.div variants={fadeUp}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl border ${contactBg}`}>
              <a href={`tel:${phone.replace(/\D/g, "")}`}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isDark ? "text-white/75 hover:text-white" : "text-stone-700 hover:text-stone-900"
                }`} style={{ fontFamily: "'Inter', sans-serif" }}>
                <Phone size={14} className={isDark ? "text-amber-400/60" : "text-amber-700/70"} />
                {phone}
              </a>
              {instagram && (
                <a href={`https://instagram.com/${instagram.replace("@","")}`}
                  target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 text-xs transition-colors ${
                    isDark ? "text-white/40 hover:text-white/70" : "text-stone-400 hover:text-stone-600"
                  }`} style={{ fontFamily: "'Inter', sans-serif" }}>
                  <Instagram size={13} />{instagram}
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* RIGHT: Copy */}
          <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="flex flex-col">

            <motion.p variants={fadeRight}
              className={`text-[10px] font-medium tracking-[0.2em] uppercase mb-5 flex items-center gap-2 ${eyebrowColor}`}
              style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className="w-5 h-px bg-current inline-block" />Seu corretor
            </motion.p>

            <motion.h2 id="agent-heading" variants={fadeRight}
              className={`font-light leading-[1.08] tracking-tight mb-2 ${headingColor}`}
              style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              {name}
            </motion.h2>

            <motion.div variants={fadeRight} className="flex flex-wrap items-center gap-2 mb-7">
              <span className={`text-sm font-light italic ${accentColor}`}
                style={{ fontFamily: "'Fraunces', serif" }}>{title}</span>
              <span className={`w-1 h-1 rounded-full ${isDark ? "bg-white/20" : "bg-stone-300"}`} />
              <span className={`text-xs ${creciColor}`}
                style={{ fontFamily: "'Inter', sans-serif" }}>{creci}</span>
            </motion.div>

            <motion.div variants={fadeRight} className={`w-12 h-px ${divider} mb-7`} />

            <div className="flex flex-col gap-4 mb-8">
              {bio.map((p, i) => (
                <motion.p key={i} variants={fadeRight}
                  className={`text-sm leading-relaxed ${bodyColor}`}
                  style={{ fontFamily: "'Inter', sans-serif" }}>{p}</motion.p>
              ))}
            </div>

            <motion.div variants={fadeRight}
              className={`flex items-center gap-3 mb-8 pb-7 border-b ${isDark ? "border-white/6" : "border-stone-200"}`}>
              <StarRating rating={rating} isDark={isDark} />
              <span className={`text-sm font-medium ${isDark ? "text-white/80" : "text-stone-700"}`}
                style={{ fontFamily: "'Inter', sans-serif" }}>{rating}</span>
              <span className={`text-xs ${isDark ? "text-white/30" : "text-stone-400"}`}
                style={{ fontFamily: "'Inter', sans-serif" }}>
                · {reviewCount} avaliações no Google
              </span>
            </motion.div>

            <motion.div variants={fadeRight} className="mb-8">
              <p className={`text-[9px] font-semibold tracking-widest uppercase mb-3 ${
                isDark ? "text-white/28" : "text-stone-400"}`}
                style={{ fontFamily: "'Inter', sans-serif" }}>Especialidades</p>
              <div className="flex flex-wrap gap-2">
                {specialties.map((s) => (
                  <span key={s}
                    className={`inline-flex items-center gap-1 text-[10px] font-medium px-3 py-1.5 rounded-full border transition-all duration-200 cursor-default ${specBg}`}
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    <MapPin size={9} />{s}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeRight} className="flex flex-wrap gap-3">
              <motion.a href={ctaHref}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 ${
                  isDark ? "bg-white text-stone-900 hover:bg-stone-100" : "bg-stone-900 text-white hover:bg-stone-700"
                }`} style={{ fontFamily: "'Inter', sans-serif" }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                Falar com Bruno <ArrowUpRight size={14} />
              </motion.a>
              <motion.a href="#imoveis"
                className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium tracking-wide border transition-all duration-200 ${
                  isDark ? "text-white/60 border-white/10 hover:text-white hover:border-white/22"
                    : "text-stone-500 border-stone-200 hover:text-stone-900 hover:border-stone-300"
                }`} style={{ fontFamily: "'Inter', sans-serif" }}
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}>
                Ver portfólio
              </motion.a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
