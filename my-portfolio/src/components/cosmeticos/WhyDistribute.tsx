"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Percent, Truck, HeadphonesIcon, Award, RefreshCw, Users } from "lucide-react";
import { contactConfig } from "@/lib/contact-config";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
  highlight?: string; // número ou dado em destaque
}

interface WhyDistributeProps {
  whatsappNumber?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const BENEFITS: Benefit[] = [
  {
    icon: Percent,
    title: "Margem competitiva",
    description: "Condições exclusivas de revendedor com até 40% abaixo do preço de tabela. Quanto maior o volume, maior o desconto.",
    highlight: "até 40%",
  },
  {
    icon: Truck,
    title: "Entrega rápida",
    description: "Estoque local em Brasília com entrega em até 24h para o DF e entorno. Frete grátis acima de R$ 500.",
    highlight: "24h",
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte técnico",
    description: "Atendimento especializado para tirar dúvidas sobre produtos, aplicação e indicações. Treinamentos periódicos.",
    highlight: "Exclusivo",
  },
  {
    icon: Award,
    title: "Marcas certificadas",
    description: "Trabalhamos apenas com marcas originais e certificadas pela ANVISA. Nota fiscal em todos os pedidos.",
    highlight: "100% original",
  },
  {
    icon: RefreshCw,
    title: "Reposição facilitada",
    description: "Pedidos pelo WhatsApp em menos de 2 minutos. Histórico de compras e reposição automática disponível.",
    highlight: "2 min",
  },
  {
    icon: Users,
    title: "Comunidade de revendedores",
    description: "Grupo exclusivo com dicas de vendas, lançamentos antecipados e materiais de divulgação prontos para usar.",
    highlight: "300+ membros",
  },
];

const STATS = [
  { value: "R$ 500",  label: "Pedido mínimo",     sub: "para frete grátis"    },
  { value: "24h",     label: "Prazo de entrega",   sub: "no DF e entorno"      },
  { value: "40%",     label: "Desconto máximo",    sub: "sobre preço de tabela"},
  { value: "300+",    label: "Revendedores",       sub: "ativos na rede"       },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Benefit card ─────────────────────────────────────────────────────────────

function BenefitCard({ benefit }: { benefit: Benefit }) {
  const Icon = benefit.icon;
  return (
    <motion.div
      variants={fadeUp}
      className="group flex flex-col gap-4 p-6 rounded-2xl border border-stone-100 bg-white hover:border-rose-100 hover:shadow-lg hover:shadow-rose-50 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Icon + highlight */}
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
          <Icon size={20} className="text-rose-400" />
        </div>
        {benefit.highlight && (
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {benefit.highlight}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className="font-normal text-stone-900 leading-tight"
        style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem" }}
      >
        {benefit.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed text-stone-400 flex-1"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {benefit.description}
      </p>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function WhyDistribute({ whatsappNumber = contactConfig.cosmeticos.whatsapp.number }: WhyDistributeProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de me tornar revendedora dos seus produtos. Como funciona?")}`;

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#F8F4EF] py-24 lg:py-32 overflow-hidden"
      aria-labelledby="why-heading"
    >
      {/* Decorative blob top-right */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, #F8E0DC 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 lg:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div className="max-w-xl">
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-rose-400 flex items-center gap-2 mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="w-5 h-px bg-rose-200 inline-block" />
              Por que revender conosco
            </motion.p>

            <motion.h2
              id="why-heading"
              variants={fadeUp}
              className="font-normal leading-tight text-stone-900 mb-4"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
            >
              Tudo que você precisa para{" "}
              <em className="italic" style={{ fontFamily: "'DM Serif Display', serif", color: "#C07080" }}>
                crescer
              </em>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-sm leading-relaxed text-stone-400"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Mais do que produtos — oferecemos uma parceria completa para
              profissionais de beleza que querem escalar suas vendas com
              marcas que os clientes já conhecem e confiam.
            </motion.p>
          </div>

          {/* CTA */}
          <motion.a
            variants={fadeUp}
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-stone-900 text-white text-sm font-medium tracking-wide hover:bg-stone-700 transition-all duration-200 whitespace-nowrap self-start lg:self-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Quero ser revendedora
            <ArrowRight size={14} />
          </motion.a>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="flex flex-col items-center text-center px-4 py-5 rounded-2xl border border-rose-100 bg-white"
            >
              <span
                className="font-normal leading-none text-stone-900 mb-1"
                style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2rem" }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs font-medium text-stone-600 mb-0.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {stat.label}
              </span>
              <span
                className="text-[10px] text-stone-400"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {stat.sub}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Benefits grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {BENEFITS.map((benefit) => (
            <BenefitCard key={benefit.title} benefit={benefit} />
          ))}
        </motion.div>

        {/* ── Bottom testimonial strip ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-14 p-6 lg:p-8 rounded-2xl border border-rose-100 bg-white flex flex-col lg:flex-row items-start lg:items-center gap-5 justify-between"
        >
          <div className="flex items-start gap-4">
            {/* Quote mark */}
            <span
              className="text-4xl font-normal text-rose-200 leading-none shrink-0 -mt-1"
              style={{ fontFamily: "'DM Serif Display', serif" }}
              aria-hidden="true"
            >
              "
            </span>
            <div>
              <p
                className="text-base font-normal text-stone-700 leading-relaxed mb-2 italic"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Comecei revendendo aos finais de semana e hoje é minha renda principal. O suporte da Isabela fez toda a diferença.
              </p>
              <p
                className="text-xs text-stone-400"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Camila R. — Revendedora há 2 anos · Taguatinga–DF
              </p>
            </div>
          </div>

          <motion.a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-rose-200 text-rose-600 text-sm font-medium hover:bg-rose-50 transition-all duration-200 whitespace-nowrap shrink-0"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Começar agora
            <ArrowRight size={13} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
