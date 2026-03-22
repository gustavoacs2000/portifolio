"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  body: string;
  author: string;
  role: string;       // "Aluno" | "Mãe de aluno" | "Pai de aluno"
  since?: string;     // "Aluno desde 2022"
  rating: number;
}

interface TestimonialsCarouselProps {
  testimonials?: Testimonial[];
  autoPlayInterval?: number;
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    body: "Comecei aos 38 anos sem nunca ter tocado nenhum instrumento. Em 8 meses já consigo tocar peças que eu nunca imaginei. A paciência e o método da Ana Clara são incomparáveis.",
    author: "Marcos Andrade",
    role: "Aluno — Adultos Iniciantes",
    since: "Aluno desde 2023",
    rating: 5,
  },
  {
    id: "t2",
    body: "Minha filha tinha 6 anos quando começou. Hoje, com 9, ela acorda pedindo para tocar. O ambiente da Dueto é acolhedor e os professores sabem exatamente como motivar crianças.",
    author: "Patrícia Oliveira",
    role: "Mãe de aluna — Turma Infantil",
    since: "Família na Dueto desde 2021",
    rating: 5,
  },
  {
    id: "t3",
    body: "Estudei em outras escolas antes e nunca senti tanta evolução. O Rafael identifica exatamente onde estão os gargalos técnicos e trabalha isso de forma cirúrgica.",
    author: "Luísa Ferreira",
    role: "Aluna — Aula Individual",
    since: "Aluna desde 2020",
    rating: 5,
  },
  {
    id: "t4",
    body: "Eu queria uma escola séria para o meu filho de 10 anos. A Dueto entregou isso e muito mais — além da técnica, ele aprendeu disciplina, concentração e amor pela música clássica.",
    author: "Carlos Mendonça",
    role: "Pai de aluno — Nível Avançado",
    since: "Família na Dueto desde 2019",
    rating: 5,
  },
  {
    id: "t5",
    body: "O recital semestral foi emocionante. Ver minha filha tocando no palco com tanta segurança depois de só seis meses de aula... não tem preço. Valeu cada esforço.",
    author: "Renata Souza",
    role: "Mãe de aluna — Turma Infantil",
    since: "Família na Dueto desde 2022",
    rating: 5,
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0, x: dir > 0 ? 40 : -40,
  }),
  center: {
    opacity: 1, x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (dir: number) => ({
    opacity: 0, x: dir > 0 ? -40 : 40,
    transition: { duration: 0.28, ease: "easeIn" },
  }),
};

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ count, color = "text-[#D4A843]" }: { count: number; color?: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} className={i < count ? `${color} fill-current` : "text-stone-200"} />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

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

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  // Autoplay
  useEffect(() => {
    if (paused || !inView) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [paused, inView, next, autoPlayInterval]);

  const t = testimonials[current];

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#FAF6EF] py-24 lg:py-32 overflow-hidden"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative staff lines */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(180deg, transparent 0px, transparent 8px, #1A2E4A 8px, #1A2E4A 9px)",
          backgroundSize: "100% 10px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mb-14 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#C8A878] flex items-center justify-center gap-2 mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="w-5 h-px bg-[#D4A843]/40 inline-block" />
            O que dizem nossos alunos
            <span className="w-5 h-px bg-[#D4A843]/40 inline-block" />
          </motion.p>

          <motion.h2
            id="testimonials-heading"
            variants={fadeUp}
            className="font-normal leading-tight text-[#0F1820]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
              fontWeight: 400,
            }}
          >
            Histórias que{" "}
            <em
              className="italic font-normal text-[#1A2E4A]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              nos inspiram
            </em>
          </motion.h2>
        </motion.div>

        {/* ── Carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          {/* Card */}
          <div className="relative rounded-2xl border border-[#1A2E4A]/8 bg-white overflow-hidden shadow-xl shadow-[#1A2E4A]/5 min-h-[280px] flex flex-col">

            {/* Progress bar */}
            <div className="h-0.5 bg-[#1A2E4A]/6">
              <motion.div
                key={current}
                className="h-full bg-[#D4A843]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
              />
            </div>

            {/* Content */}
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
                  {/* Quote icon + stars */}
                  <div className="flex items-start justify-between">
                    <Quote size={32} className="text-[#1A2E4A]/8" aria-hidden="true" />
                    <Stars count={t.rating} />
                  </div>

                  {/* Body */}
                  <blockquote
                    className="text-lg leading-relaxed text-[#0F1820]/75 italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
                  >
                    "{t.body}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-[#1A2E4A]/6">
                    {/* Avatar initial */}
                    <div className="w-10 h-10 rounded-full bg-[#1A2E4A]/8 flex items-center justify-center shrink-0">
                      <span
                        className="text-sm font-semibold text-[#1A2E4A]/60"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {t.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p
                        className="text-sm font-medium text-[#0F1820] leading-tight"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {t.author}
                      </p>
                      <p
                        className="text-[10px] text-stone-400 mt-0.5"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {t.role}
                      </p>
                      {t.since && (
                        <p
                          className="text-[9px] text-[#C8A878]/80 mt-0.5"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
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

          {/* Nav arrows */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[#1A2E4A]/12 bg-white flex items-center justify-center text-[#1A2E4A]/45 hover:text-[#1A2E4A] hover:border-[#1A2E4A]/25 transition-all duration-200"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-6 h-1.5 bg-[#1A2E4A]"
                      : "w-1.5 h-1.5 bg-[#1A2E4A]/20 hover:bg-[#1A2E4A]/40"
                  }`}
                  aria-label={`Ir para depoimento ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[#1A2E4A]/12 bg-white flex items-center justify-center text-[#1A2E4A]/45 hover:text-[#1A2E4A] hover:border-[#1A2E4A]/25 transition-all duration-200"
              aria-label="Próximo depoimento"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* ── Aggregate stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-8"
        >
          {[
            { value: "5.0", label: "Nota média", sub: "Google Reviews" },
            { value: "200+", label: "Alunos formados", sub: "Desde 2015"  },
            { value: "98%", label: "Renovam matrícula", sub: "Índice de retenção" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5 text-center">
              <span
                className="font-normal leading-none text-[#0F1820]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem" }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs font-medium text-stone-600"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {stat.label}
              </span>
              <span
                className="text-[9px] text-stone-400"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {stat.sub}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
