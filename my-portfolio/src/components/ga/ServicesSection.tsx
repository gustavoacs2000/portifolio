"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Globe, LayoutDashboard, Cog, HeadphonesIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tag?: string;
  featured?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES: Service[] = [
  {
    id: "landing",
    icon: Globe,
    title: "Landing Pages Premium",
    subtitle: "Conversão que se vê nos resultados",
    description:
      "Landing pages desenvolvidas do zero com Next.js, otimizadas para conversão e Lighthouse 95+. Design exclusivo para cada nicho — sem templates, sem atalhos.",
    highlights: [
      "Design exclusivo por nicho",
      "SEO técnico + JSON-LD",
      "Formulário e integração WhatsApp",
      "Entrega em até 10 dias",
    ],
    tag: "Mais solicitado",
    featured: true,
  },
  {
    id: "sites",
    icon: LayoutDashboard,
    title: "Sites Institucionais",
    subtitle: "Presença digital profissional",
    description:
      "Sites completos para empresas que precisam de credibilidade online. Multi-página, responsivo e com painel de conteúdo para edição sem precisar de desenvolvedor.",
    highlights: [
      "Multi-página responsivo",
      "Painel CMS incluso",
      "Domínio e hospedagem",
      "Integração Google Analytics",
    ],
  },
  {
    id: "sistemas",
    icon: Cog,
    title: "Sistemas Web",
    subtitle: "Automação e eficiência operacional",
    description:
      "Dashboards, painéis administrativos e sistemas sob medida para automatizar processos internos. React + Node.js + banco de dados robusto.",
    highlights: [
      "Dashboard personalizado",
      "Autenticação e permissões",
      "Integração com APIs externas",
      "Banco de dados PostgreSQL",
    ],
    tag: "Novo",
  },
  {
    id: "manutencao",
    icon: HeadphonesIcon,
    title: "Manutenção & Suporte",
    subtitle: "Seu site sempre no ar e atualizado",
    description:
      "Planos mensais de manutenção, atualizações de conteúdo, monitoramento de performance e suporte técnico prioritário para clientes GA Solutions.",
    highlights: [
      "Monitoramento 24/7",
      "Atualizações de conteúdo",
      "Backup automático",
      "Suporte via WhatsApp",
    ],
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const scaleIn = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Service card ─────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  const isFeatured = service.featured;

  return (
    <motion.div
      variants={scaleIn}
      className={`group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        isFeatured
          ? "bg-[#00C2FF]/5 border-[#00C2FF]/20 hover:border-[#00C2FF]/40 hover:shadow-2xl hover:shadow-[#00C2FF]/10"
          : "bg-white/[0.025] border-white/6 hover:border-white/14 hover:bg-white/[0.04]"
      } ${isFeatured ? "lg:col-span-2" : ""}`}
    >
      {/* Accent top line */}
      <div
        className={`absolute top-0 left-0 right-0 h-px ${
          isFeatured
            ? "bg-gradient-to-r from-transparent via-[#00C2FF]/50 to-transparent"
            : "bg-gradient-to-r from-transparent via-white/8 to-transparent"
        }`}
      />

      <div className={`flex flex-col flex-1 p-7 ${isFeatured ? "lg:flex-row lg:gap-10" : ""}`}>

        {/* Left block */}
        <div className={`flex flex-col ${isFeatured ? "lg:flex-1" : "flex-1"}`}>

          {/* Icon + tag */}
          <div className="flex items-start justify-between mb-6">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isFeatured ? "bg-[#00C2FF]/12" : "bg-white/5"
              }`}
            >
              <Icon size={22} className={isFeatured ? "text-[#00C2FF]" : "text-white/50"} />
            </div>
            {service.tag && (
              <span
                className={`text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full ${
                  service.tag === "Mais solicitado"
                    ? "bg-[#00C2FF]/12 text-[#00C2FF]/85 border border-[#00C2FF]/20"
                    : "bg-white/6 text-white/45 border border-white/8"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {service.tag}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className={`font-bold leading-tight mb-2 ${
              isFeatured ? "text-white" : "text-white/90"
            }`}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: isFeatured ? "1.4rem" : "1.15rem",
            }}
          >
            {service.title}
          </h3>

          <p
            className={`text-xs mb-4 font-medium ${
              isFeatured ? "text-[#00C2FF]/65" : "text-white/35"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {service.subtitle}
          </p>

          <p
            className={`text-sm leading-relaxed flex-1 mb-6 ${
              isFeatured ? "text-white/55" : "text-white/40"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {service.description}
          </p>

          {/* CTA */}
          <a
            href="#contato"
            className={`inline-flex items-center gap-1.5 text-xs font-medium transition-all duration-200 group-hover:gap-2 ${
              isFeatured
                ? "text-[#00C2FF]/70 hover:text-[#00C2FF]"
                : "text-white/35 hover:text-white/70"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Solicitar orçamento
            <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Right block — highlights (featured only) */}
        {isFeatured && (
          <div className="lg:w-60 flex flex-col justify-center mt-6 lg:mt-0">
            <div className="rounded-xl border border-[#00C2FF]/10 bg-[#00C2FF]/5 p-5">
              <p
                className="text-[9px] font-semibold tracking-widest uppercase text-[#00C2FF]/40 mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                O que está incluso
              </p>
              <div className="flex flex-col gap-3">
                {service.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00C2FF]/50 shrink-0" />
                    <span
                      className="text-xs text-white/60"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Highlights — regular cards */}
        {!isFeatured && (
          <div className="flex flex-col gap-2 pt-5 border-t border-white/5">
            {service.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                <span
                  className="text-[10px] text-white/35"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {h}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#08080F] py-24 lg:py-32 overflow-hidden"
      id="servicos"
      aria-labelledby="services-heading"
    >
      {/* Subtle divider top */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.15), transparent)" }}
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
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#00C2FF]/55 flex items-center gap-2 mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="w-5 h-px bg-[#00C2FF]/30 inline-block" />
              O que entregamos
            </motion.p>

            <motion.h2
              id="services-heading"
              variants={fadeUp}
              className="font-bold leading-tight text-white mb-4"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                letterSpacing: "-0.01em",
              }}
            >
              Soluções digitais{" "}
              <span className="text-[#00C2FF]">completas</span>{" "}
              para o seu negócio
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-sm leading-relaxed text-white/40"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Do site institucional ao sistema web completo — desenvolvemos
              com o mesmo padrão de qualidade, independente do tamanho do projeto.
            </motion.p>
          </div>

          <motion.a
            variants={fadeUp}
            href="#contato"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#00C2FF]/20 text-[#00C2FF]/70 text-sm font-medium hover:border-[#00C2FF]/40 hover:text-[#00C2FF] transition-all duration-200 whitespace-nowrap self-start lg:self-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Ver todos os serviços
            <ArrowUpRight size={13} />
          </motion.a>
        </motion.div>

        {/* ── Services grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
