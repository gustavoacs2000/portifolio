"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock3, MessageCircle, ThumbsUp } from "lucide-react";

const HIGHLIGHTS = [
  { icon: Clock3, label: "Prazo claro", sub: "Primeira versao em ate 10 dias" },
  { icon: MessageCircle, label: "Acompanhamento simples", sub: "Voce aprova cada etapa" },
  { icon: ThumbsUp, label: "Suporte humano", sub: "Atendimento direto no WhatsApp" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[100svh] bg-[#08080F] overflow-hidden flex flex-col items-center justify-center"
      aria-label="GA Solutions - Desenvolvimento de software premium"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#00C2FF 1px, transparent 1px), linear-gradient(90deg, #00C2FF 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[520px] opacity-20"
        style={{ background: "radial-gradient(ellipse at top, #00C2FF 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-56"
        style={{ background: "linear-gradient(to top, #08080F, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-12 pt-28 pb-16 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00C2FF]/25 bg-[#00C2FF]/10 text-[#8fe8ff] text-xs font-semibold tracking-widest uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] animate-pulse" />
              Brasilia - DF - Desenvolvimento premium
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-bold leading-[1.2] tracking-tight text-white mb-6 pt-[0.03em] pb-[0.08em]"
            style={{
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              fontSize: "clamp(2.2rem, 6vw, 4.4rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Tecnologia que transforma
            <br />
            <span className="text-[#58d8ff]">o seu negocio.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg leading-relaxed text-white/78 max-w-2xl mb-10"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
          >
            Desenvolvemos sites, sistemas e landing pages de alta performance para pequenas e medias empresas.
            Codigo limpo, entrega rapida e resultado real.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <motion.a
              href="#contato"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#00C2FF] text-[#08080F] text-sm font-semibold tracking-wide hover:bg-[#33CFFF] transition-all duration-200"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Solicitar orcamento gratis
              <ArrowRight size={14} />
            </motion.a>
            <motion.a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white/85 text-sm font-medium hover:text-white hover:border-white/35 transition-all duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver portfolio
            </motion.a>
          </motion.div>

          <motion.div variants={containerVariants} className="flex flex-wrap items-center justify-center gap-3">
            {HIGHLIGHTS.map(({ icon: Icon, label, sub }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/12 bg-white/[0.06]"
              >
                <div className="w-7 h-7 rounded-lg bg-[#00C2FF]/15 flex items-center justify-center shrink-0">
                  <Icon size={13} className="text-[#79e0ff]" />
                </div>
                <div>
                  <p
                    className="text-xs font-semibold text-white/95 leading-tight"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-[10px] text-white/68 leading-tight"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/38"
        aria-hidden="true"
      >
        <span
          className="text-[9px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" as const }}
          className="w-px h-8 bg-white/30"
        />
      </motion.div>
    </section>
  );
}
