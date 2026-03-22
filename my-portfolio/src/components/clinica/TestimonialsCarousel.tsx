"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  name: string;
  age?: number;
  treatment: string;
  body: string;
  rating: number;         // 1–5
  avatarInitials: string; // e.g. "MA"
  avatarSrc?: string;     // optional real photo
  date?: string;          // e.g. "Março 2024"
  source?: "google" | "instagram" | "indicação";
}

interface TestimonialsCarouselProps {
  theme?: "light" | "dark";
  testimonials?: Testimonial[];
  autoPlayInterval?: number; // ms, default 5000
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Mariana Alves",
    age: 38,
    treatment: "Toxina Botulínica",
    body: "Resultado completamente natural — exatamente o que eu queria. A Dra. Ana explicou cada etapa do procedimento, tirou todas as minhas dúvidas e o resultado ficou melhor do que eu esperava. Estou na terceira sessão e recomendo sem hesitar.",
    rating: 5,
    avatarInitials: "MA",
    date: "Março 2024",
    source: "google",
  },
  {
    id: "2",
    name: "Carolina Freitas",
    age: 45,
    treatment: "Preenchimento Labial",
    body: "Tinha muito medo de ficar com aquele 'bico de pato'. A doutora entendeu exatamente o que eu precisava e o resultado ficou extremamente natural. Minha autoestima agradece. O atendimento desde a recepção até o pós-procedimento foi impecável.",
    rating: 5,
    avatarInitials: "CF",
    date: "Janeiro 2024",
    source: "google",
  },
  {
    id: "3",
    name: "Fernanda Costa",
    age: 52,
    treatment: "Fios de PDO",
    body: "Procurava um lifting sem cirurgia e encontrei aqui a solução. Aos 52 anos, ver o rosto com essa sustentação novamente é incrível. A recuperação foi rápida e o resultado durou mais do que eu esperava. Clínica de referência no DF sem dúvida.",
    rating: 5,
    avatarInitials: "FC",
    date: "Fevereiro 2024",
    source: "indicação",
  },
  {
    id: "4",
    name: "Renata Souza",
    age: 33,
    treatment: "Skinbooster",
    body: "A pele ficou com uma luminosidade que eu não via há anos. O protocolo foi personalizado, o ambiente é super aconchegante e a equipe é extremamente atenciosa. Já indiquei para três amigas e todas adoraram.",
    rating: 5,
    avatarInitials: "RS",
    date: "Abril 2024",
    source: "instagram",
  },
  {
    id: "5",
    name: "Beatriz Lima",
    age: 41,
    treatment: "Laser CO₂",
    body: "Tinha manchas há anos que nada resolvia. Após o protocolo de laser indicado pela Dra. Ana, a diferença foi visível desde a primeira sessão. Resultado progressivo, cuidado excelente e orientações pós-procedimento muito claras.",
    rating: 5,
    avatarInitials: "BL",
    date: "Maio 2024",
    source: "google",
  },
];

// ─── Source badge ─────────────────────────────────────────────────────────────

const SOURCE_LABELS: Record<string, string> = {
  google:    "Google",
  instagram: "Instagram",
  indicação: "Indicação",
};

// ─── Star rating ──────────────────────────────────────────────────────────────

function StarRating({
  rating,
  isDark,
}: {
  rating: number;
  isDark: boolean;
}) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={
            i < rating
              ? isDark ? "text-amber-300" : "text-amber-500"
              : isDark ? "text-white/15"  : "text-stone-200"
          }
          fill={i < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({
  initials,
  src,
  size = "md",
  isDark,
}: {
  initials: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  isDark: boolean;
}) {
  const dims = size === "lg" ? "w-14 h-14 text-base" : size === "md" ? "w-10 h-10 text-sm" : "w-7 h-7 text-[10px]";

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={initials}
        className={`${dims} rounded-full object-cover object-center shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${dims} rounded-full flex items-center justify-center shrink-0 font-medium ${
        isDark
          ? "bg-amber-400/15 text-amber-200"
          : "bg-amber-50 text-amber-700"
      }`}
      style={{ fontFamily: "'Inter', sans-serif" }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

// ─── Individual testimonial card ──────────────────────────────────────────────

function TestimonialCard({
  testimonial,
  theme,
}: {
  testimonial: Testimonial;
  theme: "light" | "dark";
}) {
  const isDark = theme === "dark";

  return (
    <div
      className={`h-full flex flex-col rounded-2xl border p-7 ${
        isDark
          ? "bg-white/[0.03] border-white/8"
          : "bg-white border-stone-200/70"
      }`}
    >
      {/* Quote icon */}
      <div className="mb-5">
        <Quote
          size={28}
          className={isDark ? "text-amber-400/25" : "text-amber-300/60"}
          aria-hidden="true"
        />
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} isDark={isDark} />
      </div>

      {/* Body */}
      <blockquote
        className={`flex-1 text-sm leading-relaxed mb-6 ${
          isDark ? "text-white/65" : "text-stone-600"
        }`}
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
      >
        "{testimonial.body}"
      </blockquote>

      {/* Divider */}
      <div
        className={`h-px w-full mb-5 ${
          isDark ? "bg-white/8" : "bg-stone-100"
        }`}
      />

      {/* Footer: avatar + name + meta */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar
            initials={testimonial.avatarInitials}
            src={testimonial.avatarSrc}
            isDark={isDark}
          />
          <div className="min-w-0">
            <p
              className={`text-sm font-medium leading-tight truncate ${
                isDark ? "text-white/90" : "text-stone-900"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {testimonial.name}
              {testimonial.age && (
                <span
                  className={`ml-1 font-normal text-xs ${
                    isDark ? "text-white/35" : "text-stone-400"
                  }`}
                >
                  · {testimonial.age} anos
                </span>
              )}
            </p>
            <p
              className={`text-[10px] mt-0.5 truncate ${
                isDark ? "text-amber-300/70" : "text-amber-700/80"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {testimonial.treatment}
            </p>
          </div>
        </div>

        {/* Source + date badge */}
        {(testimonial.source || testimonial.date) && (
          <div className="flex flex-col items-end gap-0.5 shrink-0">
            {testimonial.source && (
              <span
                className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${
                  isDark
                    ? "bg-white/6 text-white/35"
                    : "bg-stone-100 text-stone-400"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {SOURCE_LABELS[testimonial.source]}
              </span>
            )}
            {testimonial.date && (
              <span
                className={`text-[9px] ${
                  isDark ? "text-white/25" : "text-stone-300"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {testimonial.date}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main carousel ────────────────────────────────────────────────────────────

export default function TestimonialsCarousel({
  theme = "light",
  testimonials = DEFAULT_TESTIMONIALS,
  autoPlayInterval = 5000,
}: TestimonialsCarouselProps) {
  const isDark = theme === "dark";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);

  const total = testimonials.length;

  // Items visible per viewport: show 3 on desktop, 1 on mobile (CSS handles)
  // The carousel logic tracks the "lead" index
  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  }, [current]);

  // Auto-play
  useEffect(() => {
    if (paused || !inView) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [paused, inView, next, autoPlayInterval]);

  // Get visible indices (3 cards: current, current+1, current+2)
  const visibleIndices = [0, 1, 2].map((offset) => (current + offset) % total);

  // Slide variants
  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
    exit: (d: number) => ({
      opacity: 0, x: d > 0 ? -48 : 48,
      transition: { duration: 0.35, ease: "easeIn" },
    }),
  };

  // ── Token aliases ──────────────────────────────────────────────────────────
  const sectionBg    = isDark ? "bg-[#0A0A0B]"     : "bg-[#F4F1ED]";
  const eyebrowColor = isDark ? "text-amber-400/65" : "text-amber-700/75";
  const headingColor = isDark ? "text-white"        : "text-stone-900";
  const bodyColor    = isDark ? "text-white/45"     : "text-stone-500";
  const navBtn       = isDark
    ? "border-white/10 text-white/50 hover:border-white/25 hover:text-white bg-white/[0.03] hover:bg-white/[0.07]"
    : "border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-700 bg-white hover:bg-stone-50";
  const dotActive    = isDark ? "bg-amber-400"      : "bg-stone-800";
  const dotInactive  = isDark ? "bg-white/15"       : "bg-stone-300";

  return (
    <section
      ref={ref}
      className={`relative w-full ${sectionBg} py-24 lg:py-32 overflow-hidden`}
      aria-label="Depoimentos de pacientes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* ── Header row ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          {/* Left: title */}
          <div>
            <p
              className={`text-[10px] font-medium tracking-[0.2em] uppercase mb-4 flex items-center gap-2 ${eyebrowColor}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="w-5 h-px bg-current inline-block" />
              O que dizem nossas pacientes
            </p>
            <h2
              className={`text-4xl lg:text-5xl font-light leading-[1.08] tracking-tight ${headingColor}`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Resultados que{" "}
              <em
                className={`italic font-normal ${isDark ? "text-amber-300/80" : "text-amber-700/70"}`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                falam
              </em>
            </h2>
          </div>

          {/* Right: nav buttons + aggregate score */}
          <div className="flex items-center gap-4">
            {/* Aggregate score */}
            <div className={`text-right ${bodyColor}`}>
              <div
                className={`text-2xl font-light leading-none ${headingColor}`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                4.9
              </div>
              <div className="flex justify-end mt-1">
                <StarRating rating={5} isDark={isDark} />
              </div>
              <p
                className="text-[9px] mt-1"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                +1.200 avaliações
              </p>
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${navBtn}`}
                aria-label="Depoimento anterior"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${navBtn}`}
                aria-label="Próximo depoimento"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Cards track ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {/* Desktop: 3 cards visible */}
          <div className="hidden lg:grid grid-cols-3 gap-5 relative overflow-hidden">
            <AnimatePresence mode="popLayout" custom={direction}>
              {visibleIndices.map((idx, position) => (
                <motion.div
                  key={`${current}-${position}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ originX: direction > 0 ? 0 : 1 }}
                >
                  <TestimonialCard
                    testimonial={testimonials[idx]}
                    theme={theme}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile: 1 card visible */}
          <div className="lg:hidden relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <TestimonialCard
                  testimonial={testimonials[current]}
                  theme={theme}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Dot indicators + progress bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          {/* Dots */}
          <div className="flex gap-2" role="tablist" aria-label="Navegar entre depoimentos">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Ir para depoimento ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? `w-6 ${dotActive}`
                    : `w-1.5 ${dotInactive} hover:opacity-70`
                }`}
              />
            ))}
          </div>

          {/* Auto-play progress bar */}
          {!paused && (
            <div
              className={`w-32 h-px rounded-full overflow-hidden ${
                isDark ? "bg-white/8" : "bg-stone-200"
              }`}
            >
              <motion.div
                key={current}
                className={isDark ? "h-full bg-amber-400" : "h-full bg-stone-600"}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
              />
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
