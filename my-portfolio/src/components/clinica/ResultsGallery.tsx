"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ResultItem {
  id: string;
  treatment: string;       // label shown on card
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  period?: string;         // e.g. "3 sessões · 6 semanas"
  featured?: boolean;      // first card is larger (colspan-2 on desktop)
}

interface ResultsGalleryProps {
  theme?: "light" | "dark";
  results?: ResultItem[];
  sectionTitle?: string;
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_RESULTS: ResultItem[] = [
  {
    id: "r1",
    treatment: "Harmonização Facial",
    beforeSrc: "/images/clinica/before-1.jpg",
    afterSrc:  "/images/clinica/after-1.jpg",
    beforeAlt: "Antes — harmonização facial",
    afterAlt:  "Depois — harmonização facial",
    period: "1 sessão · 30 dias",
    featured: true,
  },
  {
    id: "r2",
    treatment: "Toxina Botulínica",
    beforeSrc: "/images/clinica/before-2.jpg",
    afterSrc:  "/images/clinica/after-2.jpg",
    beforeAlt: "Antes — toxina botulínica",
    afterAlt:  "Depois — toxina botulínica",
    period: "Sessão única · 14 dias",
  },
  {
    id: "r3",
    treatment: "Laser CO₂",
    beforeSrc: "/images/clinica/before-3.jpg",
    afterSrc:  "/images/clinica/after-3.jpg",
    beforeAlt: "Antes — laser CO₂",
    afterAlt:  "Depois — laser CO₂",
    period: "3 sessões · 60 dias",
  },
  {
    id: "r4",
    treatment: "Skinbooster",
    beforeSrc: "/images/clinica/before-4.jpg",
    afterSrc:  "/images/clinica/after-4.jpg",
    beforeAlt: "Antes — skinbooster",
    afterAlt:  "Depois — skinbooster",
    period: "3 sessões · 45 dias",
  },
];

// ─── Drag-reveal card ─────────────────────────────────────────────────────────

function RevealCard({
  result,
  theme,
  priority = false,
}: {
  result: ResultItem;
  theme: "light" | "dark";
  priority?: boolean;
}) {
  const isDark = theme === "dark";

  // Reveal position: 0 = full before, 1 = full after. Start at 50%.
  const [revealPct, setRevealPct] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragHandlersRef = useRef<{
    move?: (event: PointerEvent) => void;
    up?: () => void;
  }>({});

  // ── Pointer/drag logic ────────────────────────────────────────────────────

  const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));

  const getX = useCallback((clientX: number) => {
    if (!containerRef.current) return 50;
    const { left, width } = containerRef.current.getBoundingClientRect();
    return clamp(((clientX - left) / width) * 100, 2, 98);
  }, []);

  const stopDragging = useCallback(() => {
    const { move, up } = dragHandlersRef.current;
    if (move) window.removeEventListener("pointermove", move);
    if (up) window.removeEventListener("pointerup", up);
    dragHandlersRef.current = {};
    setIsDragging(false);
  }, []);

  const startDrag = useCallback(
    (clientX: number) => {
      setIsDragging(true);
      setHasInteracted(true);
      setRevealPct(getX(clientX));
      const move = (event: PointerEvent) => setRevealPct(getX(event.clientX));
      const up = () => stopDragging();
      dragHandlersRef.current = { move, up };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [getX, stopDragging]
  );

  // Touch
  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      setRevealPct(getX(e.touches[0].clientX));
      setHasInteracted(true);
    },
    [getX]
  );

  // Keyboard accessibility
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft")  { setRevealPct((p) => clamp(p - 5, 2, 98)); setHasInteracted(true); }
    if (e.key === "ArrowRight") { setRevealPct((p) => clamp(p + 5, 2, 98)); setHasInteracted(true); }
  }, []);

  useEffect(() => () => stopDragging(), [stopDragging]);

  // ── Styles ────────────────────────────────────────────────────────────────

  const labelBase = `absolute bottom-3 text-[9px] font-semibold tracking-widest uppercase px-2 py-1 rounded-md select-none pointer-events-none`;
  const handleSize = 40;

  const borderColor = isDark ? "border-white/8" : "border-stone-200";
  const cardBg      = isDark ? "bg-[#111]"      : "bg-white";
  const tagBg       = isDark
    ? "bg-amber-400/10 text-amber-300 border-amber-500/20"
    : "bg-amber-50 text-amber-700 border-amber-200";
  const metaColor   = isDark ? "text-white/38"  : "text-stone-400";

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${cardBg} ${borderColor}`}
    >
      {/* ── Reveal area ── */}
      <div
        ref={containerRef}
        role="slider"
        aria-label={`Comparação antes e depois — ${result.treatment}. Use as setas para revelar.`}
        aria-valuenow={Math.round(revealPct)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        className="relative w-full overflow-hidden select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        style={{
          aspectRatio: result.featured ? "16/9" : "4/5",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onPointerDown={(e) => startDrag(e.clientX)}
        onTouchMove={onTouchMove}
        onTouchStart={(e) => { setHasInteracted(true); setRevealPct(getX(e.touches[0].clientX)); }}
        onKeyDown={onKeyDown}
      >
        {/* AFTER image — full width, sits behind */}
        <div className="absolute inset-0">
          <Image
            src={result.afterSrc}
            alt={result.afterAlt}
            fill
            priority={priority}
            sizes={result.featured
              ? "(max-width:768px) 100vw, 60vw"
              : "(max-width:768px) 100vw, 30vw"}
            className="object-cover object-center pointer-events-none"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
          />
          {/* "Depois" label */}
          <span className={`${labelBase} right-2 bg-black/50 text-white/80`}>
            Depois
          </span>
        </div>

        {/* BEFORE image — clipped to revealPct width */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${revealPct}%` }}
        >
          <div className="absolute inset-0" style={{ width: `${(100 / revealPct) * 100}%` }}>
            <Image
              src={result.beforeSrc}
              alt={result.beforeAlt}
              fill
              priority={priority}
              sizes={result.featured
                ? "(max-width:768px) 100vw, 60vw"
                : "(max-width:768px) 100vw, 30vw"}
              className="object-cover object-center pointer-events-none"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
            />
          </div>
          {/* "Antes" label */}
          <span className={`${labelBase} left-2 bg-black/50 text-white/80`}>
            Antes
          </span>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/80 pointer-events-none z-10"
          style={{ left: `${revealPct}%`, transform: "translateX(-50%)" }}
        />

        {/* Drag handle */}
        <div
          className="absolute top-1/2 z-20 pointer-events-none"
          style={{
            left: `${revealPct}%`,
            transform: "translate(-50%, -50%)",
            width: handleSize,
            height: handleSize,
          }}
        >
          <div
            className={`w-full h-full rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-transform duration-150 ${
              isDragging ? "scale-110" : "scale-100"
            }`}
            style={{ background: "rgba(255,255,255,0.92)" }}
          >
            <MoveHorizontal size={16} className="text-stone-700" />
          </div>
        </div>

        {/* First-use hint — fades out after interaction */}
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          >
            <div className="flex items-center gap-2 bg-black/45 backdrop-blur-sm text-white text-[10px] font-medium px-3 py-1.5 rounded-full">
              <MoveHorizontal size={12} />
              Arraste para revelar
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Card footer ── */}
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`inline-flex items-center text-[9px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-full border shrink-0 ${tagBg}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {result.treatment}
          </span>
          {result.period && (
            <span
              className={`text-[9px] truncate ${metaColor}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {result.period}
            </span>
          )}
        </div>

        <button
          className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-105 ${
            isDark
              ? "border-white/10 text-white/30 hover:border-white/25 hover:text-white/70"
              : "border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-700"
          }`}
          aria-label={`Ver mais resultados de ${result.treatment}`}
        >
          <ArrowUpRight size={12} />
        </button>
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function ResultsGallery({
  theme = "light",
  results = DEFAULT_RESULTS,
  sectionTitle = "Resultados",
}: ResultsGalleryProps) {
  const isDark = theme === "dark";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const sectionBg    = isDark ? "bg-[#0E0E0F]"      : "bg-[#FAF8F5]";
  const eyebrowColor = isDark ? "text-amber-400/65"  : "text-amber-700/75";
  const headingColor = isDark ? "text-white"         : "text-stone-900";
  const bodyColor    = isDark ? "text-white/45"      : "text-stone-500";
  const disclaimerColor = isDark ? "text-white/22"   : "text-stone-300";

  // Separate featured card from the rest
  const featured = results.find((r) => r.featured);
  const regular  = results.filter((r) => !r.featured);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  const fadeUp = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      ref={ref}
      className={`relative w-full ${sectionBg} py-24 lg:py-32 overflow-hidden`}
      aria-labelledby="results-heading"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12 lg:mb-14"
        >
          <motion.p
            variants={fadeUp}
            className={`text-[10px] font-medium tracking-[0.2em] uppercase mb-4 flex items-center gap-2 ${eyebrowColor}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="w-5 h-px bg-current inline-block" />
            Galeria de resultados
          </motion.p>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <motion.h2
              id="results-heading"
              variants={fadeUp}
              className={`text-4xl lg:text-5xl font-light leading-[1.08] tracking-tight ${headingColor}`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {sectionTitle}
              <em
                className={`italic font-normal ml-3 ${
                  isDark ? "text-amber-300/80" : "text-amber-700/70"
                }`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                reais
              </em>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className={`text-xs max-w-xs text-right ${bodyColor}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Arraste o divisor em cada imagem para comparar antes e depois.
            </motion.p>
          </div>
        </motion.div>

        {/* ── Gallery grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {/* Featured card — spans 2 columns on desktop */}
          {featured && (
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <RevealCard result={featured} theme={theme} priority />
            </motion.div>
          )}

          {/* Regular cards — each 1 column */}
          {regular.slice(0, featured ? 1 : 3).map((result) => (
            <motion.div key={result.id} variants={fadeUp}>
              <RevealCard result={result} theme={theme} />
            </motion.div>
          ))}

          {/* Second row: remaining regular cards */}
          {regular.slice(featured ? 1 : 3).map((result) => (
            <motion.div key={result.id} variants={fadeUp}>
              <RevealCard result={result} theme={theme} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom row: disclaimer + CTA ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p
            className={`text-[10px] max-w-sm leading-relaxed ${disclaimerColor}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            * Os resultados podem variar conforme o protocolo, biotipo e resposta individual de cada paciente. Imagens compartilhadas com autorização.
          </p>

          <motion.a
            href="#agendamento"
            className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
              isDark
                ? "bg-amber-400 text-stone-900 hover:bg-amber-300"
                : "bg-stone-900 text-white hover:bg-stone-700"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Quero meu resultado
            <ArrowUpRight size={14} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
