"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, ClipboardList, PenSquare, Rocket } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Conversa inicial",
    subtitle: "Entendemos seu objetivo",
    description:
      "Voce explica o que precisa e qual resultado espera. Nessa etapa alinhamos escopo, prazo e prioridade.",
    duration: "1 dia",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Plano do projeto",
    subtitle: "Organizamos o caminho",
    description:
      "Montamos estrutura das paginas, mensagem principal e ordem das informacoes para facilitar a decisao do cliente.",
    duration: "1-2 dias",
  },
  {
    number: "03",
    icon: PenSquare,
    title: "Criacao e ajustes",
    subtitle: "Visual e conteudo aprovados por voce",
    description:
      "Desenhamos o projeto e refinamos os detalhes com suas validacoes, sem etapa escondida nem surpresa no final.",
    duration: "4-6 dias",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Publicacao",
    subtitle: "Projeto no ar com suporte",
    description:
      "Publicamos, revisamos com voce e deixamos tudo pronto para receber contatos. Depois seguimos com suporte inicial.",
    duration: "1 dia",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
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
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#8fe8ff] flex items-center justify-center gap-2 mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="w-5 h-px bg-[#8fe8ff]/70 inline-block" />
            Processo
            <span className="w-5 h-px bg-[#8fe8ff]/70 inline-block" />
          </motion.p>

          <motion.h2
            id="process-heading"
            variants={fadeUp}
            className="font-bold leading-[1.2] text-white mb-4 pt-[0.02em] pb-[0.08em]"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.01em" }}
          >
            Como seu projeto avanca
            <span className="text-[#58d8ff]"> sem complicacao</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-sm leading-relaxed text-white/80"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Cada etapa tem objetivo claro. Voce entende o que esta sendo feito e quando.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-0 relative"
        >
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.25) 20%, rgba(0,194,255,0.25) 80%, transparent)" }}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.number} variants={fadeUp} className="relative flex flex-col items-center text-center px-6">
                <div className="relative mb-6 z-10">
                  <div className="w-20 h-20 rounded-2xl bg-[#08080F] border border-white/20 flex items-center justify-center transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#00C2FF]/18 flex items-center justify-center">
                      <Icon size={22} className="text-[#79e0ff]" />
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#00C2FF]/20 border border-[#00C2FF]/35 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-[#8fe8ff]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {i + 1}
                    </span>
                  </div>
                </div>

                <span
                  className="inline-flex items-center text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/20 bg-white/[0.07] text-white/78 mb-3"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {step.duration}
                </span>

                <h3 className="font-semibold text-white leading-[1.2] mb-1 pt-[0.02em] pb-[0.08em]" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontSize: "1.1rem" }}>
                  {step.title}
                </h3>

                <p className="text-xs text-[#8fe8ff] font-medium mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {step.subtitle}
                </p>

                <p className="text-sm leading-relaxed text-white/80" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="mt-16 flex justify-center">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#00C2FF] text-[#08080F] text-sm font-bold hover:bg-[#33CFFF] transition-all duration-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Comecar meu projeto
          </a>
        </motion.div>
      </div>
    </section>
  );
}

