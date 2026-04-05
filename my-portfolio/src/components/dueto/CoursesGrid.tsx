"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Clock, Users, Music2 } from "lucide-react";
import { buildWhatsAppHref, contactConfig } from "@/lib/contact-config";

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  ageRange: string;
  duration: string;
  frequency: string;
  level: string;
  highlights: string[];
  icon: string;
  featured?: boolean;
}

interface CoursesGridProps {
  courses?: Course[];
}

const DEFAULT_COURSES: Course[] = [
  {
    id: "violino",
    title: "Violino",
    subtitle: "Formacao completa no instrumento",
    description:
      "Aulas para iniciantes e avancados com foco em tecnica, repertorio e expressao musical.",
    imageSrc:
      "https://lh3.googleusercontent.com/sitesv/APaQ0SSuXIRNbvrMTHCXDdR7tmUE_1Zy6cx9sojARMbMKV8FsLjMCZgPGacF5rGbeJy0rOjwkjTCK0CqtEr1OqCwX55WuIQJs8WCp6G7q3YWio9gWHBX3XUCs8gN6XDn0zLV5yq6StrtxMpUrGKKMBnIgL6vD-sJYe3rplOaA1IgL75Iv-hUpguEE0HOCiUcaY5P0wsmzjua4UIVXK7uNoSWbjzUv0SIC1148r5Qqnw=w1280",
    imageAlt: "Aulas de violino na Dueto Academia",
    ageRange: "Criancas e adultos",
    duration: "Aulas individuais e coletivas",
    frequency: "Planos semanais",
    level: "Todos os niveis",
    highlights: [
      "Aulas individuais",
      "Aulas coletivas",
      "Turmas para criancas e adultos",
    ],
    icon: "VN",
    featured: true,
  },
  {
    id: "viola-de-arco",
    title: "Viola de Arco",
    subtitle: "Tecnica e musicalidade",
    description:
      "Formacao para quem deseja desenvolver leitura, sonoridade e repertorio na viola.",
    imageSrc:
      "https://lh3.googleusercontent.com/sitesv/APaQ0SS4AcwlEiXlUsdoQRdbKPTThWfwrZHoqGXSgbFJYypMv1Vke_cwuxKSv10s1N3yFMCuRyKw794CoIcS2g1TOXBbLAF53j3qzAxL15_97DsPTp9HAZjyAZPib9F8bpi8JsqVkMVXA9b8vxud89QIGHrhpSlXQNAmDiqrSW0Md7lFo3d6UflTxlLI363C7eo666juGN7dPWVRp17W0wT2ywoPI_IPaGNQ-Lgxmhw=w1280",
    imageAlt: "Aulas de viola de arco na Dueto Academia",
    ageRange: "Criancas e adultos",
    duration: "Aulas individuais e coletivas",
    frequency: "Planos semanais",
    level: "Iniciante ao avancado",
    highlights: [
      "Acompanhamento tecnico",
      "Aulas individuais e coletivas",
      "Turmas para criancas e adultos",
    ],
    icon: "VA",
  },
  {
    id: "violoncelo",
    title: "Violoncelo",
    subtitle: "Base tecnica e expressao artistica",
    description:
      "Aulas de violoncelo com foco em postura, sonoridade e repertorio para diferentes niveis.",
    imageSrc:
      "/images/dueto/course-violoncelo.jpg",
    imageAlt: "Aulas de violoncelo na Dueto Academia",
    ageRange: "Criancas e adultos",
    duration: "Aulas individuais e coletivas",
    frequency: "Planos semanais",
    level: "Todos os niveis",
    highlights: [
      "Desenvolvimento tecnico",
      "Aulas para iniciantes e avancados",
      "Aulas individuais e coletivas",
    ],
    icon: "VC",
  },
  {
    id: "violao",
    title: "Violao",
    subtitle: "Aprendizado pratico desde a primeira aula",
    description:
      "Aulas personalizadas de violao para tocar com seguranca e musicalidade em pouco tempo.",
    imageSrc:
      "/images/dueto/course-violao.jpg",
    imageAlt: "Aulas de violao na Dueto Academia",
    ageRange: "Criancas e adultos",
    duration: "Aulas individuais e coletivas",
    frequency: "Planos semanais",
    level: "Iniciante ao avancado",
    highlights: [
      "Metodo personalizado",
      "Repertorio com base no interesse do aluno",
      "Turmas para criancas e adultos",
    ],
    icon: "VL",
  },
  {
    id: "piano",
    title: "Piano",
    subtitle: "Formacao musical e tecnica pianistica",
    description:
      "Aulas de piano com base tecnica, leitura musical e repertorio para diversos objetivos.",
    imageSrc:
      "https://lh3.googleusercontent.com/sitesv/APaQ0SR6datAFHdL3CcDEggiXUOC8yXgyvId1AWQEJmX0nuV7wfZr0fpLXj264DxPzsn37wNBbg4zho0pkgrjpVifa_8ekrrQdP1Hbfs5QjneTWBcfUcjUh5Cbx_bQfuI7CjUBaIK24tXj8flRiie4adMLZqkZ_KnOIDyZskl_QVwdxZ9ACYEsueqS47hfnar36xmvfbsCg3W6xbO7rx4Ech4_pbCmsuWLEZIAS6=w1280",
    imageAlt: "Aulas de piano na Dueto Academia",
    ageRange: "Criancas e adultos",
    duration: "Aulas individuais e coletivas",
    frequency: "Planos semanais",
    level: "Todos os niveis",
    highlights: [
      "Aulas com professor especializado",
      "Aulas individuais e coletivas",
      "Preparacao tecnica e artistica",
    ],
    icon: "PN",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const } },
};

function CourseCard({ course }: { course: Course }) {
  const isFeatured = course.featured;

  return (
    <motion.div
      variants={scaleIn}
      className={`group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        isFeatured
          ? "bg-[#1D4570] border-[#243d5e] hover:shadow-2xl hover:shadow-[#1D4570]/30 lg:col-span-2"
          : "bg-white border-stone-100 hover:border-[#1D4570]/15 hover:shadow-xl hover:shadow-[#1D4570]/8"
      }`}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-px ${
          isFeatured
            ? "bg-gradient-to-r from-transparent via-white/50 to-transparent"
            : "bg-gradient-to-r from-transparent via-[#1D4570]/10 to-transparent"
        }`}
      />

      <div className="relative w-full h-44">
        <Image
          src={course.imageSrc}
          alt={course.imageAlt}
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: isFeatured
              ? "linear-gradient(to top, rgba(15,24,32,0.55), rgba(15,24,32,0.2))"
              : "linear-gradient(to top, rgba(15,24,32,0.45), transparent)",
          }}
        />
        <div className="absolute left-4 bottom-4 flex items-center gap-2">
          <span className="text-2xl">{course.icon}</span>
          <span
            className="text-white text-sm font-medium"
            style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
          >
            {course.title}
          </span>
        </div>
      </div>

      <div className={`flex flex-col flex-1 p-6 ${isFeatured ? "lg:flex-row lg:gap-10" : ""}`}>
        <div className={`flex flex-col ${isFeatured ? "lg:flex-1" : "flex-1"}`}>
          <div className="flex items-start justify-between mb-5">
            <span
              className={`text-[9px] font-medium tracking-wide px-2.5 py-1 rounded-full border ${
                isFeatured
                  ? "bg-white/10 text-white/90 border-white/25"
                  : "bg-[#FEFEFF] text-[#1D4570]/55 border-[#1D4570]/8"
              }`}
              style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
            >
              {course.level}
            </span>
          </div>

          <h3
            className={`font-normal leading-tight mb-1 ${isFeatured ? "text-white" : "text-[#1D4570]"}`}
            style={{
              fontFamily: "var(--font-cormorant-sc), serif",
              fontSize: isFeatured ? "1.5rem" : "1.2rem",
              fontWeight: 400,
            }}
          >
            {course.title}
          </h3>

          <p
            className={`text-xs mb-4 ${isFeatured ? "text-white/72" : "text-[#1D4570]"}`}
            style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
          >
            {course.subtitle}
          </p>

          <p
            className={`text-sm leading-relaxed flex-1 mb-5 ${isFeatured ? "text-white/58" : "text-stone-500"}`}
            style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
          >
            {course.description}
          </p>

          <div className={`flex flex-wrap gap-4 mb-5 pt-4 border-t ${isFeatured ? "border-white/8" : "border-stone-50"}`}>
            {[
              { icon: Users, label: course.ageRange },
              { icon: Clock, label: course.duration },
              { icon: Music2, label: course.frequency },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon size={11} className={isFeatured ? "text-white/30" : "text-[#1D4570]/30"} />
                <span
                  className={`text-[10px] ${isFeatured ? "text-white/50" : "text-stone-500"}`}
                  style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {isFeatured && (
          <div className="lg:w-64 flex flex-col justify-between">
            <div className="rounded-xl border border-white/8 bg-white/4 p-4 mb-5">
              <p
                className="text-[9px] font-semibold tracking-widest uppercase text-white/28 mb-3"
                style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
              >
                Formato das aulas
              </p>
              <div className="flex flex-col gap-2.5">
                {course.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0 mt-1.5" />
                    <span
                      className="text-xs text-white/65 leading-relaxed"
                      style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                    >
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <motion.a
              href="#matricula"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-[#1D4570] text-sm font-medium tracking-wide hover:bg-stone-100 transition-all duration-200"
              style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Quero saber mais
              <ArrowRight size={13} />
            </motion.a>
          </div>
        )}

        {!isFeatured && (
          <div>
            <div className="flex flex-col gap-2 mb-5">
              {course.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1D4570]/70 shrink-0 mt-1.5" />
                  <span
                    className="text-[10px] text-stone-500 leading-relaxed"
                    style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
                  >
                    {h}
                  </span>
                </div>
              ))}
            </div>

            <motion.a
              href="#matricula"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1D4570]/60 hover:text-[#1D4570] transition-colors duration-200 group-hover:gap-2"
              style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
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

export default function CoursesGrid({ courses = DEFAULT_COURSES }: CoursesGridProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const waHelpHref = buildWhatsAppHref(
    contactConfig.dueto.whatsapp.number,
    contactConfig.dueto.whatsapp.helpMessage,
  );

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#FEFEFF] py-24 lg:py-32 overflow-hidden"
      aria-labelledby="courses-heading"
      id="cursos"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-40"
        style={{ background: "linear-gradient(90deg, transparent, rgba(26,46,74,0.12), transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div className="max-w-xl">
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#1D4570] flex items-center gap-2 mb-4"
              style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
            >
              <span className="w-5 h-px bg-[#1D4570]/50 inline-block" />
              Modalidades
            </motion.p>

            <motion.h2
              id="courses-heading"
              variants={fadeUp}
              className="font-normal leading-[1.06] tracking-tight text-[#1D4570] mb-4"
              style={{
                fontFamily: "var(--font-cormorant-sc), serif",
                fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
                fontWeight: 400,
              }}
            >
              Escolha o instrumento e o formato ideal para voce
            </motion.h2>

            <motion.div variants={fadeUp} className="flex gap-4 items-start">
              <div className="w-px h-10 mt-0.5 shrink-0 bg-[#1D4570]/10" />
              <p
                className="text-sm leading-relaxed text-stone-500"
                style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
              >
                Modalidades da aba Instrumentos: violino, viola de arco, violoncelo, violao e piano,
                com opcoes de aulas individuais e coletivas para criancas e adultos.
              </p>
            </motion.div>
          </div>

          <motion.a
            variants={fadeUp}
            href="#matricula"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1D4570] text-white text-sm font-medium tracking-wide hover:bg-[#243d5e] transition-all duration-200 whitespace-nowrap self-start lg:self-auto"
            style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Aula experimental
            <ArrowRight size={14} />
          </motion.a>
        </motion.div>

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

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-10 text-center text-xs text-stone-500"
          style={{ fontFamily: "var(--font-libre-baskerville), serif" }}
        >
          Duvidas para escolher modalidade e instrumento?{" "}
          <a
            href={waHelpHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-[#1D4570]/60 hover:text-[#1D4570] transition-colors"
          >
            Fale com a equipe no WhatsApp
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}


