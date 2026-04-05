"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gauge, Search, PenTool, LifeBuoy, BarChart3, Smartphone } from "lucide-react";

const BENEFITS = [
  {
    title: "Visual profissional",
    description: "Seu site passa confianca e valoriza sua marca desde o primeiro acesso.",
    icon: PenTool,
  },
  {
    title: "Rapido no celular",
    description: "Experiencia fluida para quem visita pelo telefone, que e a maioria dos acessos.",
    icon: Smartphone,
  },
  {
    title: "Carregamento eficiente",
    description: "Paginas leves para nao perder cliente por demora.",
    icon: Gauge,
  },
  {
    title: "Encontrado no Google",
    description: "Estrutura preparada para melhorar visibilidade nas buscas locais.",
    icon: Search,
  },
  {
    title: "Acompanhamento de resultado",
    description: "Indicadores basicos para entender quantas pessoas chegam e entram em contato.",
    icon: BarChart3,
  },
  {
    title: "Suporte inicial",
    description: "Voce nao fica sozinho depois da publicacao. Fazemos os primeiros ajustes juntos.",
    icon: LifeBuoy,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#050508] py-24 lg:py-28 overflow-hidden"
      id="tech"
      aria-labelledby="tech-heading"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#8fe8ff] flex items-center justify-center gap-2 mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="w-5 h-px bg-[#8fe8ff]/70 inline-block" />
            Diferenciais
            <span className="w-5 h-px bg-[#8fe8ff]/70 inline-block" />
          </motion.p>

          <motion.h2
            id="tech-heading"
            variants={fadeUp}
            className="font-bold leading-tight text-white"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.01em" }}
          >
            O que voce recebe
            <span className="text-[#58d8ff]"> alem do layout</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                variants={fadeUp}
                className="rounded-2xl border border-white/14 bg-white/[0.06] p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-[#00C2FF]/15 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#79e0ff]" />
                </div>
                <p className="text-base font-semibold text-white mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {benefit.title}
                </p>
                <p className="text-sm leading-relaxed text-white/80" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

