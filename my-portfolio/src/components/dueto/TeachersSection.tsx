"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Music, Award, GraduationCap, Mic2 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Teacher {
  id: string;
  name: string;
  instrument: string;
  role: string;
  bio: string[];
  credentials: { icon: "award" | "graduation" | "music" | "mic"; text: string }[];
  imageSrc: string;
  imageAlt: string;
  featuredQuote?: string;
}

interface TeachersSectionProps {
  teachers?: Teacher[];
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_TEACHERS: Teacher[] = [
  {
    id: "rafael",
    name: "Rafael Oliveira",
    instrument: "Violino",
    role: "Co-fundador · Professor",
    bio: [
      "Formado pelo Conservatório Carlos Gomes de Belém, Rafael se especializou em música de câmara e performance solo em São Paulo antes de fundar a Dueto em Brasília.",
      "Com mais de 15 anos de experiência em palco — incluindo apresentações no Theatro Municipal de São Paulo e na Sala Martins Pena em Brasília — traz para as aulas a vivência real de um músico em atividade.",
    ],
    credentials: [
      { icon: "graduation", text: "Conservatório Carlos Gomes — Bacharelado em Violino" },
      { icon: "award",      text: "Pós-graduação em Pedagogia Musical — USP" },
      { icon: "music",      text: "15+ anos de performance em câmara e solo" },
      { icon: "mic",        text: "Apresentações no Theatro Municipal — SP" },
    ],
    imageSrc: "/images/dueto/teacher-rafael.png",
    imageAlt: "Rafael Oliveira — professor de violino da Dueto Academia de Música",
    featuredQuote: "Ensinar violino é transmitir uma linguagem que não tem fronteiras.",
  },
  {
    id: "ana",
    name: "Ana Clara Fontes",
    instrument: "Violino",
    role: "Co-fundadora · Professora",
    bio: [
      "Ana Clara é violinista e educadora musical formada pela Escola de Música de Brasília com especialização em música para a infância e método Suzuki pela ABM.",
      "Desenvolveu metodologia própria que une técnica clássica com repertório contemporâneo, tornando o aprendizado mais acessível e prazeroso para todas as idades.",
    ],
    credentials: [
      { icon: "graduation", text: "Escola de Música de Brasília — Bacharelado em Violino" },
      { icon: "award",      text: "Certificação Suzuki — ABM" },
      { icon: "music",      text: "Especialista em musicalização infantil" },
      { icon: "mic",        text: "Recitais no Centro Cultural Banco do Brasil — DF" },
    ],
    imageSrc: "/images/dueto/teacher-ana.png",
    imageAlt: "Ana Clara Fontes — professora de violino da Dueto Academia de Música",
    featuredQuote: "Cada aluno aprende de um jeito único. Meu trabalho é encontrar o caminho de cada um.",
  },
];

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP = { award: Award, graduation: GraduationCap, music: Music, mic: Mic2 };

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeLeft  = { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const fadeRight = { hidden: { opacity: 0, x:  28 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };

// ─── Teacher card ─────────────────────────────────────────────────────────────

function TeacherCard({ teacher, index, inView }: { teacher: Teacher; index: number; inView: boolean }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      variants={isLeft ? fadeLeft : fadeRight}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-white/6 ${
        isLeft ? "" : "lg:[direction:rtl]"
      }`}
    >
      {/* Photo */}
      <div className="relative overflow-hidden lg:[direction:ltr]" style={{ aspectRatio: "3/4" }}>
        <Image
          src={teacher.imageSrc}
          alt={teacher.imageAlt}
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover object-top"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
        />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(15,24,32,0.88), transparent)" }} />
        <div className="absolute bottom-5 left-5 right-5 z-10 lg:[direction:ltr]">
          <p className="text-white font-normal text-xl leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em" }}>
            {teacher.name}
          </p>
          <p className="text-[#D4A843]/65 text-[10px] mt-1"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {teacher.instrument} · {teacher.role}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col p-7 lg:p-8 lg:[direction:ltr]">
        {teacher.featuredQuote && (
          <div className="mb-6">
            <span className="text-4xl text-[#D4A843]/18 font-normal leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }} aria-hidden="true">"</span>
            <p className="text-white/72 text-base leading-relaxed -mt-2 italic"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
              {teacher.featuredQuote}
            </p>
          </div>
        )}

        <div className="h-px bg-white/6 mb-6" />

        <div className="flex flex-col gap-4 flex-1 mb-6">
          {teacher.bio.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-white/46"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {p}
            </p>
          ))}
        </div>

        <div className="rounded-xl border border-white/6 bg-white/[0.03] p-4 mb-6">
          <p className="text-[9px] font-semibold tracking-widest uppercase text-white/20 mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Formação & experiência
          </p>
          <div className="flex flex-col gap-3">
            {teacher.credentials.map((cred, i) => {
              const Icon = ICON_MAP[cred.icon];
              return (
                <div key={i} className="flex items-start gap-2.5">
                  <Icon size={12} className="text-[#D4A843]/45 shrink-0 mt-0.5" />
                  <span className="text-xs text-white/58 leading-relaxed"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {cred.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <a href="#matricula"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#D4A843]/65 hover:text-[#D4A843] transition-colors duration-200 group"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Agendar aula com {teacher.name.split(" ")[0]}
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </a>
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function TeachersSection({ teachers = DEFAULT_TEACHERS }: TeachersSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#0F1820] py-24 lg:py-32 overflow-hidden"
      aria-labelledby="teachers-heading"
    >
      {/* Glows */}
      <div className="pointer-events-none absolute top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-12"
        style={{ background: "radial-gradient(circle, #1A2E4A 0%, transparent 65%)" }} aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] translate-x-1/3 translate-y-1/3 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #C8A878 0%, transparent 65%)" }} aria-hidden="true" />

      {/* Staff lines on dark */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "repeating-linear-gradient(180deg, transparent, transparent 38px, rgba(255,255,255,0.5) 38px, rgba(255,255,255,0.5) 39px, transparent 39px, transparent 48px, rgba(255,255,255,0.5) 48px, rgba(255,255,255,0.5) 49px, transparent 49px, transparent 58px, rgba(255,255,255,0.5) 58px, rgba(255,255,255,0.5) 59px, transparent 59px, transparent 68px, rgba(255,255,255,0.5) 68px, rgba(255,255,255,0.5) 69px, transparent 69px, transparent 78px, rgba(255,255,255,0.5) 78px, rgba(255,255,255,0.5) 79px, transparent 79px, transparent 130px)",
        }} aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}
          className="mb-16 text-center">
          <motion.p variants={fadeUp}
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#D4A843]/55 flex items-center justify-center gap-2 mb-5"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span className="w-5 h-px bg-[#D4A843]/30 inline-block" />
            Os professores
            <span className="w-5 h-px bg-[#D4A843]/30 inline-block" />
          </motion.p>

          <motion.h2 id="teachers-heading" variants={fadeUp}
            className="font-normal leading-[1.06] tracking-tight text-white mb-5"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400 }}>
            Conheça quem vai{" "}
            <em className="italic font-normal text-[#D4A843]/75"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              guiar sua jornada
            </em>
          </motion.h2>

          <motion.p variants={fadeUp}
            className="text-sm text-white/38 leading-relaxed max-w-lg mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Violinistas em atividade, com formação sólida e anos de palco.
            Na Dueto, você aprende com quem realmente vive a música.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {teachers.map((teacher, index) => (
            <TeacherCard key={teacher.id} teacher={teacher} index={index} inView={inView} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="mt-12 text-center text-xs text-white/20"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Ambos os professores estão disponíveis para aula experimental gratuita.{" "}
          <a href="#matricula"
            className="underline underline-offset-2 text-[#D4A843]/45 hover:text-[#D4A843] transition-colors">
            Reserve a sua vaga
          </a>.
        </motion.p>
      </div>
    </section>
  );
}
