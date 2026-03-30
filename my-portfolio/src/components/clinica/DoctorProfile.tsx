"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, GraduationCap, BookOpen, ArrowUpRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Credential {
  icon: "award" | "graduation" | "book";
  label: string;
  sublabel?: string;
}

export interface DoctorStat {
  value: string;
  label: string;
}

export interface DoctorProfileProps {
  theme?: "light" | "dark";
  name?: string;
  title?: string;         // e.g. "Médica Estética & Dermatologista"
  crm?: string;
  bio?: string[];         // Array of paragraphs
  credentials?: Credential[];
  stats?: DoctorStat[];
  imageSrc?: string;
  imageAlt?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_CREDENTIALS: Credential[] = [
  {
    icon: "graduation",
    label: "Medicina – UnB",
    sublabel: "Graduação com distinção, 2010",
  },
  {
    icon: "award",
    label: "Residência em Dermatologia",
    sublabel: "Hospital das Clínicas – FMUSP",
  },
  {
    icon: "book",
    label: "Pós-graduação em Medicina Estética",
    sublabel: "ISCED Brasil · SEME",
  },
  {
    icon: "award",
    label: "Membro da SBME e SBCD",
    sublabel: "Sociedades Brasileiras de referência",
  },
];

const DEFAULT_STATS: DoctorStat[] = [
  { value: "14+",    label: "Anos de experiência" },
  { value: "8.000+", label: "Pacientes atendidos"  },
  { value: "4.9",    label: "Nota média no Google" },
  { value: "12",     label: "Prêmios e certificações" },
];

const DEFAULT_BIO = [
  "Especialista em medicina estética e dermatologia com mais de 14 anos de atuação no Distrito Federal, a Dra. Ana Oliveira é reconhecida por sua abordagem técnica e humanizada — que coloca o bem-estar e a naturalidade do resultado acima de qualquer tendência.",
  "Formada pela Universidade de Brasília e com residência no Hospital das Clínicas de São Paulo, domina os principais protocolos de rejuvenescimento facial, harmonização e tratamentos de alta complexidade.",
];

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeRight = {
  hidden:  { opacity: 0, x: 28 },
  visible: { opacity: 1, x:  0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

const scaleIn = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Icon resolver ────────────────────────────────────────────────────────────

const ICON_MAP = {
  award:      Award,
  graduation: GraduationCap,
  book:       BookOpen,
} as const;

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  stat,
  theme,
  index,
}: {
  stat: DoctorStat;
  theme: "light" | "dark";
  index: number;
}) {
  const isDark = theme === "dark";
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className={`flex flex-col gap-0.5 px-5 py-4 rounded-xl border transition-colors duration-300 ${
        isDark
          ? "bg-white/[0.03] border-white/8"
          : "bg-white border-stone-200/80"
      }`}
    >
      <span
        className={`text-2xl font-light leading-tight tracking-tight ${
          isDark ? "text-amber-300" : "text-stone-900"
        }`}
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {stat.value}
      </span>
      <span
        className={`text-[10px] leading-tight ${
          isDark ? "text-white/40" : "text-stone-400"
        }`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}

// ─── Credential row ───────────────────────────────────────────────────────────

function CredentialRow({
  credential,
  theme,
}: {
  credential: Credential;
  theme: "light" | "dark";
}) {
  const isDark = theme === "dark";
  const Icon = ICON_MAP[credential.icon];

  return (
    <motion.div
      variants={fadeUp}
      className={`flex items-start gap-3 py-3 border-b transition-colors duration-300 last:border-b-0 ${
        isDark ? "border-white/6" : "border-stone-100"
      }`}
    >
      <div
        className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
          isDark ? "bg-amber-400/10" : "bg-amber-50"
        }`}
      >
        <Icon
          size={14}
          className={isDark ? "text-amber-300" : "text-amber-700"}
        />
      </div>
      <div>
        <p
          className={`text-xs font-medium leading-tight ${
            isDark ? "text-white/85" : "text-stone-800"
          }`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {credential.label}
        </p>
        {credential.sublabel && (
          <p
            className={`text-[10px] mt-0.5 leading-tight ${
              isDark ? "text-white/35" : "text-stone-400"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {credential.sublabel}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DoctorProfile({
  theme = "light",
  name = "Dra. Ana Oliveira",
  title = "Médica Estética & Dermatologista",
  crm = "CRM-DF 12345 · RQE 6789",
  bio = DEFAULT_BIO,
  credentials = DEFAULT_CREDENTIALS,
  stats = DEFAULT_STATS,
  imageSrc = "/images/clinica/doctor-profile.jpg",
  imageAlt = "Dra. Ana Oliveira — Médica Estética e Dermatologista",
  ctaHref = "#agendamento",
  ctaLabel = "Agendar com a Dra. Ana",
}: DoctorProfileProps) {
  const isDark = theme === "dark";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // ── Token aliases ──────────────────────────────────────────────────────────
  const sectionBg    = isDark ? "bg-[#0E0E0F]"  : "bg-[#FAF8F5]";
  const eyebrowColor = isDark ? "text-amber-400/65" : "text-amber-700/75";
  const headingColor = isDark ? "text-white"    : "text-stone-900";
  const bodyColor    = isDark ? "text-white/52" : "text-stone-500";
  const crmColor     = isDark ? "text-white/28" : "text-stone-400";
  const divider      = isDark ? "bg-white/8"    : "bg-stone-200";
  const imgBorder    = isDark ? "border-white/8" : "border-stone-200";

  return (
    <section
      ref={ref}
      className={`relative w-full ${sectionBg} py-24 lg:py-32 overflow-hidden`}
      aria-labelledby="doctor-heading"
    >
      {/* ── Subtle bg texture line ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,currentColor,currentColor 1px,transparent 1px,transparent 72px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* ── Split grid: image LEFT | copy RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-start">

          {/* ── LEFT: Photo column ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            {/* Photo frame */}
            <motion.div
              variants={scaleIn}
              className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden border ${imgBorder}`}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQMFAQAAAAAAAAAAAAAAAQIDBAUREiH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Aqz1xms6fX0aSYznTiuZSCeqiKD//2Q=="
              />

              {/* Bottom gradient fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                  background: isDark
                    ? "linear-gradient(to top, rgba(14,14,15,0.7), transparent)"
                    : "linear-gradient(to top, rgba(250,248,245,0.6), transparent)",
                }}
              />

              {/* Name badge pinned to bottom-left of photo */}
              <div className="absolute bottom-4 left-4 right-4">
                <p
                  className="text-white text-base font-light leading-tight drop-shadow-sm"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {name}
                </p>
                <p
                  className="text-white/60 text-[10px] mt-0.5"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {crm}
                </p>
              </div>
            </motion.div>

            {/* Stats grid — 2×2 below the photo */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-3"
            >
              {stats.map((stat, i) => (
                <StatCard key={i} stat={stat} theme={theme} index={i} />
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Copy column ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col"
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeRight}
              className={`text-[10px] font-medium tracking-[0.2em] uppercase mb-5 flex items-center gap-2 ${eyebrowColor}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="w-5 h-px bg-current inline-block" />
              Quem vai te atender
            </motion.p>

            {/* Name */}
            <motion.h2
              id="doctor-heading"
              variants={fadeRight}
              className={`text-4xl lg:text-5xl font-light leading-[1.08] tracking-tight mb-2 ${headingColor}`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {name}
            </motion.h2>

            {/* Title + CRM */}
            <motion.div variants={fadeRight} className="flex flex-wrap items-center gap-2 mb-7">
              <span
                className={`text-sm font-light ${
                  isDark ? "text-amber-300/80" : "text-amber-700"
                }`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {title}
              </span>
              <span className={`w-1 h-1 rounded-full ${isDark ? "bg-white/20" : "bg-stone-300"}`} />
              <span
                className={`text-xs ${crmColor}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {crm}
              </span>
            </motion.div>

            {/* Divider */}
            <motion.div variants={fadeRight} className={`w-12 h-px ${divider} mb-7`} />

            {/* Bio paragraphs */}
            <div className="flex flex-col gap-4 mb-8">
              {bio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  variants={fadeRight}
                  className={`text-sm leading-relaxed ${bodyColor}`}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Credentials block */}
            <motion.div
              variants={fadeRight}
              className={`rounded-xl border p-4 mb-8 ${
                isDark
                  ? "bg-white/[0.025] border-white/8"
                  : "bg-white border-stone-200/70"
              }`}
            >
              <p
                className={`text-[9px] font-semibold tracking-widest uppercase mb-2 ${
                  isDark ? "text-white/30" : "text-stone-400"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Formação &amp; Certificações
              </p>
              <motion.div variants={containerVariants}>
                {credentials.map((cred, i) => (
                  <CredentialRow key={i} credential={cred} theme={theme} />
                ))}
              </motion.div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeRight} className="flex flex-wrap gap-3">
              <motion.a
                href={ctaHref}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 ${
                  isDark
                    ? "bg-amber-400 text-stone-900 hover:bg-amber-300 hover:shadow-[0_0_28px_rgba(201,169,110,0.3)]"
                    : "bg-stone-900 text-white hover:bg-stone-700 hover:shadow-[0_8px_24px_rgba(28,28,30,0.18)]"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {ctaLabel}
                <ArrowUpRight size={14} />
              </motion.a>

              <motion.a
                href="#depoimentos"
                className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium tracking-wide border transition-all duration-200 ${
                  isDark
                    ? "text-white/60 border-white/10 hover:text-white hover:border-white/22"
                    : "text-stone-500 border-stone-200 hover:text-stone-900 hover:border-stone-300"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
              >
                Ver depoimentos
              </motion.a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
