"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Music, Award, GraduationCap, Mic2 } from "lucide-react";

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

const DEFAULT_TEACHERS: Teacher[] = [
  {
    id: "guilherme",
    name: "Guilherme Alexander",
    instrument: "Violino",
    role: "Socio e Professor de Violino",
    bio: [
      "Professor integrante da equipe da Dueto Academia de Musica.",
      "Release profissional em breve.",
    ],
    credentials: [
      { icon: "music", text: "Professor de violino" },
      { icon: "award", text: "Socio da Dueto Academia" },
      { icon: "mic", text: "Release em breve" },
    ],
    imageSrc: "/images/dueto/teacher-guilherme.jpeg",
    imageAlt: "Guilherme Alexander, professor de violino",
  },
  {
    id: "jordana",
    name: "Jordana Rodrigues",
    instrument: "Violino",
    role: "Socia e Professora de Violino",
    bio: [
      "Professora integrante da equipe da Dueto Academia de Musica.",
      "Release profissional em breve.",
    ],
    credentials: [
      { icon: "music", text: "Professora de violino" },
      { icon: "award", text: "Socia da Dueto Academia" },
      { icon: "mic", text: "Release em breve" },
    ],
    imageSrc: "/images/dueto/teacher-jordana.jpeg",
    imageAlt: "Jordana Rodrigues, professora de violino",
  },
  {
    id: "gabriel",
    name: "Gabriel Mendes",
    instrument: "Violino",
    role: "Professor de Violino",
    bio: [
      "Professor da equipe da Dueto Academia de Musica.",
      "Release profissional em breve.",
    ],
    credentials: [
      { icon: "music", text: "Professor de violino" },
      { icon: "award", text: "Equipe Dueto" },
      { icon: "mic", text: "Release em breve" },
    ],
    imageSrc: "/images/dueto/teacher-gabriel.jpeg",
    imageAlt: "Gabriel Mendes, professor de violino",
  },
  {
    id: "lucas",
    name: "Lucas Rezende",
    instrument: "Violao",
    role: "Professor de Violao",
    bio: [
      "Professor de violao com quase 20 anos de experiencia no instrumento, dedicado a ensinar alunos de todas as idades, de criancas a adultos.",
      "Cursou Licenciatura em Musica pela UnB e violao erudito pela Escola de Musica de Brasilia. Sua abordagem une base tecnica solida e pratica musical desde o inicio.",
    ],
    credentials: [
      { icon: "graduation", text: "Licenciatura em Musica pela UnB" },
      { icon: "award", text: "Formacao em violao erudito na Escola de Musica de Brasilia" },
      { icon: "music", text: "Quase 20 anos de experiencia no instrumento" },
      { icon: "mic", text: "Aulas personalizadas para criancas e adultos" },
    ],
    imageSrc: "/images/dueto/teacher-lucas.jpeg",
    imageAlt: "Lucas Rezende, professor de violao",
    featuredQuote: "Meu objetivo e que o aluno toque sua primeira musica ja na primeira aula.",
  },
  {
    id: "hellen",
    name: "Hellen Alvares",
    instrument: "Violoncelo",
    role: "Professora de Violoncelo",
    bio: [
      "Educadora musical e violoncelista, atuante em Brasilia-DF, com experiencia no ensino coletivo de cordas e em projetos culturais para criancas, jovens e adultos.",
      "Licencianda em Musica pelo Claretiano Centro Universitario, aluna da Escola de Musica de Brasilia e com participacao na Academia Claude Brendel e Brasilia Cello Academia.",
    ],
    credentials: [
      { icon: "graduation", text: "Licencianda em Musica pelo Claretiano Centro Universitario" },
      { icon: "award", text: "Aluna da Escola de Musica de Brasilia" },
      { icon: "music", text: "Atuacao em projetos sociais e educacionais" },
      { icon: "mic", text: "Participacao na Academia Claude Brendel e Brasilia Cello Academia" },
    ],
    imageSrc: "/images/dueto/teacher-hellen.jpeg",
    imageAlt: "Hellen Alvares, professora de violoncelo",
  },
  {
    id: "alfredo",
    name: "Alfredo Siqueira",
    instrument: "Piano",
    role: "Professor de Piano",
    bio: [
      "Natural do Mato Grosso do Sul, Alfredo Ericeira e graduado em Musica (Licenciatura) pela UFMS e mestre em Musica com enfase em Regencia pela UnB.",
      "Pianista e professor de piano ha mais de 20 anos, tambem atua como maestro, compositor e arranjador, com mais de 100 criacoes e forte atuacao em preparacao de alunos para a Escola de Musica de Brasilia.",
    ],
    credentials: [
      { icon: "graduation", text: "Graduado em Musica pela UFMS" },
      { icon: "award", text: "Mestre em Musica (Regencia) pela UnB" },
      { icon: "music", text: "Professor de piano ha mais de 20 anos" },
      { icon: "mic", text: "Maestro, compositor e arranjador com mais de 100 criacoes" },
    ],
    imageSrc: "/images/dueto/teacher-alfredo.png",
    imageAlt: "Alfredo Siqueira, professor de piano",
  },
];

const ICON_MAP = { award: Award, graduation: GraduationCap, music: Music, mic: Mic2 };

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

function TeacherCard({ teacher, index, inView }: { teacher: Teacher; index: number; inView: boolean }) {
  const isLeft = index % 2 === 0;
  const contentToneClass = index % 2 === 0 ? "bg-[#2A5A8A]" : "bg-[#163B61]";

  return (
    <motion.div
      variants={isLeft ? fadeLeft : fadeRight}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-white/15 shadow-[0_18px_45px_-22px_rgba(8,18,33,0.75)] ${
        isLeft ? "" : "lg:[direction:rtl]"
      }`}
    >
      <div className="relative overflow-hidden lg:[direction:ltr]" style={{ aspectRatio: "3/4" }}>
        <Image
          src={teacher.imageSrc}
          alt={teacher.imageAlt}
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover object-top"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(15,24,32,0.88), transparent)" }}
        />
        <div className="absolute bottom-5 left-5 right-5 z-10 lg:[direction:ltr]">
          <p
            className="text-white font-normal text-xl leading-tight"
            style={{ fontFamily: "var(--font-cormorant-sc), serif", letterSpacing: "0.03em" }}
          >
            {teacher.name}
          </p>
          <p className="text-white/70 text-[10px] mt-1" style={{ fontFamily: "var(--font-libre-baskerville), serif" }}>
            {teacher.instrument} Â· {teacher.role}
          </p>
        </div>
      </div>

      <div className={`flex flex-col p-7 lg:p-8 lg:[direction:ltr] ${contentToneClass}`}>
        {teacher.featuredQuote && (
          <div className="mb-6">
            <span
              className="text-4xl text-white/18 font-normal leading-none"
              style={{ fontFamily: "var(--font-cormorant-sc), serif" }}
              aria-hidden="true"
            >
              {"\""}
            </span>
            <p
              className="text-white/72 text-base leading-relaxed -mt-2 italic"
              style={{ fontFamily: "var(--font-cormorant-sc), serif", fontWeight: 400 }}
            >
              {teacher.featuredQuote}
            </p>
          </div>
        )}

        <div className="h-px bg-white/6 mb-6" />

        <div className="flex flex-col gap-4 flex-1 mb-6">
          {teacher.bio.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-white/46" style={{ fontFamily: "var(--font-libre-baskerville), serif" }}>
              {p}
            </p>
          ))}
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.07] p-4 mb-6">
          <p
            className="text-[9px] font-semibold tracking-widest uppercase text-white/20 mb-3"
            style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
          >
            Formacao e experiencia
          </p>
          <div className="flex flex-col gap-3">
            {teacher.credentials.map((cred, i) => {
              const Icon = ICON_MAP[cred.icon];
              return (
                <div key={i} className="flex items-start gap-2.5">
                  <Icon size={12} className="text-white/45 shrink-0 mt-0.5" />
                  <span className="text-xs text-white/58 leading-relaxed" style={{ fontFamily: "var(--font-libre-baskerville), serif" }}>
                    {cred.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <a
          href="#matricula"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 group"
          style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
        >
          Agendar aula com {teacher.name.split(" ")[0]}
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </a>
      </div>
    </motion.div>
  );
}

export default function TeachersSection({ teachers = DEFAULT_TEACHERS }: TeachersSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#1D4570] py-24 lg:py-32 overflow-hidden"
      aria-labelledby="teachers-heading"
    >
      <div
        className="pointer-events-none absolute top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-12"
        style={{ background: "radial-gradient(circle, #1D4570 0%, transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] translate-x-1/3 translate-y-1/3 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #1D4570 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent, transparent 38px, rgba(255,255,255,0.5) 38px, rgba(255,255,255,0.5) 39px, transparent 39px, transparent 48px, rgba(255,255,255,0.5) 48px, rgba(255,255,255,0.5) 49px, transparent 49px, transparent 58px, rgba(255,255,255,0.5) 58px, rgba(255,255,255,0.5) 59px, transparent 59px, transparent 68px, rgba(255,255,255,0.5) 68px, rgba(255,255,255,0.5) 69px, transparent 69px, transparent 78px, rgba(255,255,255,0.5) 78px, rgba(255,255,255,0.5) 79px, transparent 79px, transparent 130px)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-16 text-center">
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/65 flex items-center justify-center gap-2 mb-5"
            style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
          >
            <span className="w-5 h-px bg-white/30 inline-block" />
            Professores
            <span className="w-5 h-px bg-white/30 inline-block" />
          </motion.p>

          <motion.h2
            id="teachers-heading"
            variants={fadeUp}
            className="font-normal leading-[1.06] tracking-tight text-white mb-5"
            style={{ fontFamily: "var(--font-cormorant-sc), serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400 }}
          >
            Conheca a equipe da Dueto
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-sm text-white/38 leading-relaxed max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
          >
            Equipe de professores da aba Professores da Dueto Academia,
            com atuacao em violino, violao, violoncelo e piano.
          </motion.p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {teachers.map((teacher, index) => (
            <TeacherCard key={teacher.id} teacher={teacher} index={index} inView={inView} />
          ))}
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-12 text-center text-xs text-white/20"
          style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
        >
          Nossa equipe esta empenhada em realizar seu sonho de tocar.{" "}
          <a href="#matricula" className="underline underline-offset-2 text-white/60 hover:text-white transition-colors">
            Esperamos voce
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}


