"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Clock, Users, Music2 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ageRange: string;
  duration: string;
  frequency: string;
  level: string;
  highlights: string[];
  icon: string;       // emoji
  featured?: boolean;
}

interface CoursesGridProps {
  courses?: Course[];
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_COURSES: Course[] = [
  {
    id: "individual",
    title: "Aula Individual",
    subtitle: "Evolução personalizada",
    description:
      "Acompanhamento exclusivo com um dos professores. O repertório, o ritmo de aprendizado e os objetivos são definidos junto com o aluno.",
    ageRange: "A partir de 7 anos",
    duration: "50 min",
    frequency: "1–2x por semana",
    level: "Todos os níveis",
    highlights: ["Repertório personalizado", "Flexibilidade de horário", "Feedback detalhado a cada aula"],
    icon: "🎻",
    featured: true,
  },
  {
    id: "infantil",
    title: "Turma Infantil",
    subtitle: "Para crianças de 5 a 12 anos",
    description:
      "Iniciação musical lúdica com foco no desenvolvimento auditivo, coordenação motora e amor pela música clássica desde cedo.",
    ageRange: "5 a 12 anos",
    duration: "45 min",
    frequency: "2x por semana",
    level: "Iniciante",
    highlights: ["Método Suzuki adaptado", "Turmas reduzidas (máx. 4 alunos)", "Recital semestral"],
    icon: "🌟",
  },
  {
    id: "adultos",
    title: "Adultos Iniciantes",
    subtitle: "Nunca é tarde para começar",
    description:
      "Programa especial para adultos que sempre quiseram aprender violino. Metodologia adaptada para o aprendizado adulto, sem pressão.",
    ageRange: "A partir de 18 anos",
    duration: "50 min",
    frequency: "1x por semana",
    level: "Iniciante / Intermediário",
    highlights: ["Repertório variado — clássico ao popular", "Turmas noturnas disponíveis", "Sem experiência prévia necessária"],
    icon: "🎵",
  },
  {
    id: "avancado",
    title: "Nível Avançado",
    subtitle: "Para quem quer ir além",
    description:
      "Para alunos com base sólida que buscam aperfeiçoamento técnico, preparação para conservatório ou participação em recitais.",
    ageRange: "Todas as idades",
    duration: "60 min",
    frequency: "2x por semana",
    level: "Intermediário / Avançado",
    highlights: ["Técnica Galamian e Flesch", "Preparatório para conservatório", "Participação em concertos"],
    icon: "🏆",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] as const } },
};

const scaleIn = {
  hidden:  { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Course card ──────────────────────────────────────────────────────────────

function CourseCard({ course }: { course: Course }) {
  const isFeatured = course.featured;

  return (
    <motion.div
      variants={scaleIn}
      className={`group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        isFeatured
          ? "bg-[#1A2E4A] border-[#243d5e] hover:shadow-2xl hover:shadow-[#1A2E4A]/30 lg:col-span-2"
          : "bg-white border-stone-100 hover:border-[#1A2E4A]/15 hover:shadow-xl hover:shadow-[#1A2E4A]/8"
      }`}
    >
      {/* Gold accent top line */}
      <div
        className={`absolute top-0 left-0 right-0 h-px ${
          isFeatured
            ? "bg-gradient-to-r from-transparent via-[#D4A843]/50 to-transparent"
            : "bg-gradient-to-r from-transparent via-[#1A2E4A]/10 to-transparent"
        }`}
      />

      <div className={`flex flex-col flex-1 p-6 ${isFeatured ? "lg:flex-row lg:gap-10" : ""}`}>

        {/* ── Left block (always) ── */}
        <div className={`flex flex-col ${isFeatured ? "lg:flex-1" : "flex-1"}`}>

          {/* Icon + level badge */}
          <div className="flex items-start justify-between mb-5">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                isFeatured ? "bg-white/8" : "bg-[#FAF6EF]"
              }`}
            >
              {course.icon}
            </div>
            <span
              className={`text-[9px] font-medium tracking-wide px-2.5 py-1 rounded-full border ${
                isFeatured
                  ? "bg-[#D4A843]/12 text-[#D4A843]/85 border-[#D4A843]/20"
                  : "bg-[#FAF6EF] text-[#1A2E4A]/55 border-[#1A2E4A]/8"
              }`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {course.level}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`font-normal leading-tight mb-1 ${
              isFeatured ? "text-white" : "text-[#0F1820]"
            }`}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isFeatured ? "1.5rem" : "1.2rem",
              fontWeight: 400,
            }}
          >
            {course.title}
          </h3>

          <p
            className={`text-xs mb-4 ${
              isFeatured ? "text-[#D4A843]/70" : "text-[#C8A878]"
            }`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {course.subtitle}
          </p>

          <p
            className={`text-sm leading-relaxed flex-1 mb-5 ${
              isFeatured ? "text-white/58" : "text-stone-400"
            }`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {course.description}
          </p>

          {/* Meta row */}
          <div className={`flex flex-wrap gap-4 mb-5 pt-4 border-t ${
            isFeatured ? "border-white/8" : "border-stone-50"
          }`}>
            {[
              { icon: Users, label: course.ageRange },
              { icon: Clock, label: course.duration },
              { icon: Music2, label: course.frequency },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon
                  size={11}
                  className={isFeatured ? "text-white/30" : "text-[#1A2E4A]/30"}
                />
                <span
                  className={`text-[10px] ${isFeatured ? "text-white/50" : "text-stone-400"}`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right block (featured only) ── */}
        {isFeatured && (
          <div className="lg:w-64 flex flex-col justify-between">
            {/* Highlights */}
            <div
              className="rounded-xl border border-white/8 bg-white/4 p-4 mb-5"
            >
              <p
                className="text-[9px] font-semibold tracking-widest uppercase text-white/28 mb-3"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                O que está incluso
              </p>
              <div className="flex flex-col gap-2.5">
                {course.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4A843]/60 shrink-0 mt-1.5" />
                    <span
                      className="text-xs text-white/65 leading-relaxed"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.a
              href="#matricula"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-[#1A2E4A] text-sm font-medium tracking-wide hover:bg-stone-100 transition-all duration-200"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Matricular nesta modalidade
              <ArrowRight size={13} />
            </motion.a>
          </div>
        )}

        {/* ── CTA regular cards ── */}
        {!isFeatured && (
          <div>
            {/* Highlights mini */}
            <div className="flex flex-col gap-2 mb-5">
              {course.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C8A878]/70 shrink-0 mt-1.5" />
                  <span
                    className="text-[10px] text-stone-400 leading-relaxed"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {h}
                  </span>
                </div>
              ))}
            </div>

            <motion.a
              href="#matricula"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1A2E4A]/60 hover:text-[#1A2E4A] transition-colors duration-200 group-hover:gap-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Saber mais
              <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </motion.a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function CoursesGrid({ courses = DEFAULT_COURSES }: CoursesGridProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#FAF6EF] py-24 lg:py-32 overflow-hidden"
      aria-labelledby="courses-heading"
      id="cursos"
    >
      {/* Subtle top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-40"
        style={{ background: "linear-gradient(90deg, transparent, rgba(26,46,74,0.12), transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div className="max-w-xl">
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#C8A878] flex items-center gap-2 mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="w-5 h-px bg-[#D4A843]/50 inline-block" />
              Modalidades
            </motion.p>

            <motion.h2
              id="courses-heading"
              variants={fadeUp}
              className="font-normal leading-[1.06] tracking-tight text-[#0F1820] mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
                fontWeight: 400,
              }}
            >
              Encontre a{" "}
              <em
                className="italic font-normal text-[#1A2E4A]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                modalidade certa
              </em>{" "}
              para você
            </motion.h2>

            <motion.div variants={fadeUp} className="flex gap-4 items-start">
              <div className="w-px h-10 mt-0.5 shrink-0 bg-[#1A2E4A]/10" />
              <p
                className="text-sm leading-relaxed text-stone-400"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Do primeiro contato com o instrumento à preparação para
                conservatório — temos uma modalidade para cada fase da sua
                jornada musical.
              </p>
            </motion.div>
          </div>

          {/* Trial CTA */}
          <motion.a
            variants={fadeUp}
            href="#matricula"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A2E4A] text-white text-sm font-medium tracking-wide hover:bg-[#243d5e] transition-all duration-200 whitespace-nowrap self-start lg:self-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Aula experimental gratuita
            <ArrowRight size={14} />
          </motion.a>
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </motion.div>

        {/* ── Bottom note ── */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-10 text-center text-xs text-stone-400"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Dúvidas sobre qual modalidade escolher?{" "}
          <a
            href="https://wa.me/5561999999999?text=Ol%C3%A1%21+Gostaria+de+ajuda+para+escolher+a+modalidade+certa."
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-[#1A2E4A]/60 hover:text-[#1A2E4A] transition-colors"
          >
            Fale com a gente pelo WhatsApp
          </a>{" "}
          — ajudamos você a escolher.
        </motion.p>

      </div>
    </section>
  );
}
