"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export interface Testimonial {
  id: string;
  body: string;
  author: string;
  role: string;
  since?: string;
  rating: number;
}

interface TestimonialsCarouselProps {
  testimonials?: Testimonial[];
  autoPlayInterval?: number;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    body: "Sou aluno a cinco anos e so tenho a agradecer essa experiencia incrivel!",
    author: "Arthur Henrique",
    role: "Aluno",
    since: "Depoimento publico",
    rating: 5,
  },
  {
    id: "t2",
    body: "Excelentes profissionais, muito atenciosos e dedicados aos seus alunos. Otimos professores.",
    author: "Andre Barros",
    role: "Aluno",
    since: "Depoimento publico",
    rating: 5,
  },
  {
    id: "t3",
    body: "Aula maravilhosa, professora excepcional.",
    author: "Maria de Fatima",
    role: "Aluna",
    since: "Depoimento publico",
    rating: 5,
  },
  {
    id: "t4",
    body: "Excelentes profissionais, comprometidos com o aprendizado e tambem com os resultados.",
    author: "Fernanda Vieira",
    role: "Aluna",
    since: "Depoimento publico",
    rating: 5,
  },
];

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 40 : -40,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -40 : 40,
    transition: { duration: 0.28, ease: "easeIn" as const },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] as const } },
};

function Stars({ count, color = "text-[#1D4570]" }: { count: number; color?: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} className={i < count ? `${color} fill-current` : "text-stone-200"} />
      ))}
    </div>
  );
}

export default function TestimonialsCarousel({
  testimonials = DEFAULT_TESTIMONIALS,
  autoPlayInterval = 5500,
}: TestimonialsCarouselProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const total = testimonials.length;

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current],
  );

  useEffect(() => {
    if (paused || !inView) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [paused, inView, next, autoPlayInterval]);

  const t = testimonials[current];

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#FEFEFF] py-24 lg:py-32 overflow-hidden"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(180deg, transparent 0px, transparent 8px, #1D4570 8px, #1D4570 9px)",
          backgroundSize: "100% 10px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mb-14 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#1D4570] flex items-center justify-center gap-2 mb-4"
            style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
          >
            <span className="w-5 h-px bg-[#1D4570]/40 inline-block" />
            Opinioes dos alunos
            <span className="w-5 h-px bg-[#1D4570]/40 inline-block" />
          </motion.p>

          <motion.h2
            id="testimonials-heading"
            variants={fadeUp}
            className="font-normal leading-tight text-[#1D4570]"
            style={{
              fontFamily: "var(--font-cormorant-sc), serif",
              fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
              fontWeight: 400,
            }}
          >
            Veja algumas opinioes sobre nos
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="relative rounded-2xl border border-[#1D4570]/8 bg-white overflow-hidden shadow-xl shadow-[#1D4570]/5 min-h-[280px] flex flex-col">
            <div className="h-0.5 bg-[#1D4570]/6">
              <motion.div
                key={current}
                className="h-full bg-[#1D4570]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: autoPlayInterval / 1000, ease: "linear" as const }}
              />
            </div>

            <div className="flex-1 px-8 lg:px-12 py-10">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-6"
                >
                  <div className="flex items-start justify-between">
                    <Quote size={32} className="text-[#1D4570]/8" aria-hidden="true" />
                    <Stars count={t.rating} />
                  </div>

                  <blockquote
                    className="text-lg leading-relaxed text-[#1D4570]/75 italic"
                    style={{ fontFamily: "var(--font-cormorant-sc), serif", fontWeight: 400 }}
                  >
                    &ldquo;{t.body}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4 pt-4 border-t border-[#1D4570]/6">
                    <div className="w-10 h-10 rounded-full bg-[#1D4570]/8 flex items-center justify-center shrink-0">
                      <span
                        className="text-sm font-semibold text-[#1D4570]/60"
                        style={{ fontFamily: "var(--font-cormorant-sc), serif" }}
                      >
                        {t.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p
                        className="text-sm font-medium text-[#1D4570] leading-tight"
                        style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                      >
                        {t.author}
                      </p>
                      <p
                        className="text-[10px] text-stone-400 mt-0.5"
                        style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                      >
                        {t.role}
                      </p>
                      {t.since && (
                        <p
                          className="text-[9px] text-[#1D4570]/80 mt-0.5"
                          style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                        >
                          {t.since}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[#1D4570]/12 bg-white flex items-center justify-center text-[#1D4570]/45 hover:text-[#1D4570] hover:border-[#1D4570]/25 transition-all duration-200"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? "w-6 h-1.5 bg-[#1D4570]" : "w-1.5 h-1.5 bg-[#1D4570]/20 hover:bg-[#1D4570]/40"
                  }`}
                  aria-label={`Ir para depoimento ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[#1D4570]/12 bg-white flex items-center justify-center text-[#1D4570]/45 hover:text-[#1D4570] hover:border-[#1D4570]/25 transition-all duration-200"
              aria-label="Proximo depoimento"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-8"
        >
          {[
            { value: "5", label: "Instrumentos", sub: "Violino, viola, cello, violao e piano" },
            { value: "6", label: "Professores", sub: "Equipe Dueto" },
            { value: "2015", label: "Desde", sub: "Atuando no Guara - DF" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5 text-center">
              <span
                className="font-normal leading-none text-[#1D4570]"
                style={{ fontFamily: "var(--font-cormorant-sc), serif", fontSize: "2.2rem" }}
              >
                {stat.value}
              </span>
              <span className="text-xs font-medium text-stone-600" style={{ fontFamily: "var(--font-libre-baskerville), serif" }}>
                {stat.label}
              </span>
              <span className="text-[9px] text-stone-500" style={{ fontFamily: "var(--font-libre-baskerville), serif" }}>
                {stat.sub}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


