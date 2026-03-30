"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Palette, Code2, Rocket } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Briefing",
    subtitle: "Entendemos o seu negócio",
    description:
      "Reunião de alinhamento para entender seus objetivos, público-alvo, concorrentes e expectativas. Definimos escopo, prazo e investimento antes de qualquer linha de código.",
    duration: "1–2 dias",
  },
  {
    number: "02",
    icon: Palette,
    title: "Design",
    subtitle: "Identidade visual exclusiva",
    description:
      "Criamos a identidade visual do projeto — paleta de cores, tipografia e layout. Você aprova o design antes do desenvolvimento começar. Sem surpresas.",
    duration: "2–3 dias",
  },
  {
    number: "03",
    icon: Code2,
    title: "Desenvolvimento",
    subtitle: "Código limpo e performático",
    description:
      "Desenvolvimento em Next.js com TypeScript, animações Framer Motion e otimização de performance. Você acompanha o progresso em ambiente de staging.",
    duration: "5–7 dias",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Entrega & Deploy",
    subtitle: "No ar em menos de 24h",
    description:
      "Deploy na Vercel com domínio configurado, SEO técnico completo e treinamento para você atualizar o conteúdo. Suporte pós-entrega incluso por 30 dias.",
    duration: "1 dia",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#08080F] py-24 lg:py-32 overflow-hidden"
      id="processo"
      aria-labelledby="process-heading"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#00C2FF]/55 flex items-center justify-center gap-2 mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="w-5 h-px bg-[#00C2FF]/30 inline-block" />
            Como trabalhamos
            <span className="w-5 h-px bg-[#00C2FF]/30 inline-block" />
          </motion.p>

          <motion.h2
            id="process-heading"
            variants={fadeUp}
            className="font-bold leading-tight text-white mb-4"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.01em" }}
          >
            Do briefing ao deploy em{" "}
            <span className="text-[#00C2FF]">10 dias</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-sm leading-relaxed text-white/40"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Processo transparente e eficiente — você sabe exatamente o que
            está acontecendo em cada etapa.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-0 relative"
        >
          {/* Connector line — desktop only */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.15) 20%, rgba(0,194,255,0.15) 80%, transparent)" }}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="relative flex flex-col items-center text-center px-6"
              >
                {/* Step icon */}
                <div className="relative mb-6 z-10">
                  <div className="w-20 h-20 rounded-2xl bg-[#08080F] border border-white/8 flex items-center justify-center group-hover:border-[#00C2FF]/30 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#00C2FF]/8 flex items-center justify-center">
                      <Icon size={22} className="text-[#00C2FF]/70" />
                    </div>
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#00C2FF]/12 border border-[#00C2FF]/25 flex items-center justify-center">
                    <span
                      className="text-[9px] font-bold text-[#00C2FF]/80"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {i + 1}
                    </span>
                  </div>
                </div>

                {/* Duration badge */}
                <span
                  className="inline-flex items-center text-[9px] font-medium px-2.5 py-1 rounded-full border border-white/6 bg-white/[0.03] text-white/30 mb-3"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  ⏱ {step.duration}
                </span>

                <h3
                  className="font-bold text-white/90 mb-1"
                  style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.1rem" }}
                >
                  {step.title}
                </h3>

                <p
                  className="text-xs text-[#00C2FF]/55 font-medium mb-3"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {step.subtitle}
                </p>

                <p
                  className="text-xs leading-relaxed text-white/35"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 flex justify-center"
        >
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#00C2FF] text-[#08080F] text-sm font-bold hover:bg-[#33CFFF] transition-all duration-200"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Iniciar meu projeto
          </a>
        </motion.div>

      </div>
    </section>
  );
}
