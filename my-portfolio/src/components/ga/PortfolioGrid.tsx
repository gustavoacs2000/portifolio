"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PortfolioCase {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  href: string;
  palette: string[];
  accentColor: string;
  darkBg: string;
  font: string;
  tags: string[];
  featured?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CASES: PortfolioCase[] = [
  {
    id: "clinica",
    number: "01",
    category: "Saúde & Estética",
    title: "Clínica Médica",
    description:
      "Landing page de alto padrão com galeria drag antes/depois, carrossel de depoimentos e FloatingCTA WhatsApp. Design clean com Cormorant Garamond.",
    href: "/clinica",
    palette: ["#FAF8F5", "#C9A96E", "#1C1C1E"],
    accentColor: "#C9A96E",
    darkBg: "#0E0E0F",
    font: "Cormorant + Inter",
    tags: ["Galeria drag B/A", "Carrossel", "WhatsApp CTA"],
    featured: true,
  },
  {
    id: "advocacia",
    number: "02",
    category: "Jurídico",
    title: "Advocacia Corporativa",
    description:
      "Formulário multi-step de 3 etapas com validação em tempo real, grid de sócios e seção de áreas de atuação.",
    href: "/advocacia",
    palette: ["#F7F4EE", "#C9A65A", "#0D1E3C"],
    accentColor: "#C9A65A",
    darkBg: "#0F0F10",
    font: "Playfair + Inter",
    tags: ["Form multi-step", "Grid sócios", "Lead qualificado"],
  },
  {
    id: "imoveis",
    number: "03",
    category: "Imóveis de Luxo",
    title: "Corretor Premium",
    description:
      "Hero full-bleed com 3 layers de parallax, galeria lightbox com navegação por teclado e scroll horizontal nativo.",
    href: "/imoveis",
    palette: ["#F5F0E8", "#C9A96E", "#0A0A0B"],
    accentColor: "#C9A96E",
    darkBg: "#0A0A0B",
    font: "Fraunces + Inter",
    tags: ["Parallax 3 layers", "Lightbox", "Scroll snap"],
  },
  {
    id: "cosmeticos",
    number: "04",
    category: "Cosméticos B2B",
    title: "Representante Comercial",
    description:
      "Catálogo com filtro por categoria sem reload, scroll infinito de marcas via CSS puro e pedido WhatsApp por produto.",
    href: "/cosmeticos",
    palette: ["#FDFBF7", "#E8A0A8", "#2A2420"],
    accentColor: "#E8A0A8",
    darkBg: "#1a1008",
    font: "DM Serif + DM Sans",
    tags: ["Catálogo filtrado", "B2B form", "WhatsApp produto"],
  },
  {
    id: "dueto",
    number: "05",
    category: "Escola de Música",
    title: "Dueto Academia",
    description:
      "Textura de pautas musicais em SVG inline, seção de professores em navy dramático e formulário de matrícula com 4 qualificadores.",
    href: "/dueto",
    palette: ["#FAF6EF", "#C8A878", "#1A2E4A"],
    accentColor: "#D4A843",
    darkBg: "#0A1220",
    font: "Cormorant + Plus Jakarta",
    tags: ["SVG texture", "Perfis navy", "Form matrícula"],
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const scaleIn = {
  hidden:  { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Browser preview ──────────────────────────────────────────────────────────

function BrowserPreview({ c }: { c: PortfolioCase }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-t-2xl"
      style={{ aspectRatio: "16/9", background: c.darkBg }}
    >
      {/* Browser chrome */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-white/5 flex items-center px-3 gap-1.5 z-10">
        {["#FF5F57", "#FFBD2E", "#28CA41"].map((col, i) => (
          <div key={i} className="w-2 h-2 rounded-full" style={{ background: col, opacity: 0.7 }} />
        ))}
        <div className="flex-1 mx-3 h-3 rounded-sm bg-white/8 flex items-center px-2">
          <span className="text-[7px] text-white/30" style={{ fontFamily: "'Inter', sans-serif" }}>
            gasolutions.com.br{c.href}
          </span>
        </div>
      </div>

      {/* Fake content */}
      <div className="absolute top-7 left-0 right-0 bottom-0 p-4 flex items-end">
        <div className="w-full">
          <div
            className="h-2 rounded-full mb-2 opacity-70 w-3/5"
            style={{ background: c.accentColor }}
          />
          <div className="w-full h-1.5 rounded-full bg-white/10 mb-1.5" />
          <div className="w-4/5 h-1.5 rounded-full bg-white/7 mb-4" />
          <div className="flex gap-2">
            <div className="h-7 w-16 rounded-lg" style={{ background: c.accentColor, opacity: 0.85 }} />
            <div className="h-7 w-12 rounded-lg border border-white/15" />
          </div>
        </div>
      </div>

      {/* Palette dots */}
      <div className="absolute top-10 right-3 flex gap-1">
        {c.palette.map((color, i) => (
          <div
            key={i}
            className="w-3.5 h-3.5 rounded-full border border-white/10"
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Case card ────────────────────────────────────────────────────────────────

function CaseCard({ c }: { c: PortfolioCase }) {
  return (
    <motion.div
      variants={scaleIn}
      className={`group relative flex flex-col rounded-2xl border border-white/6 bg-white/[0.025] hover:border-white/12 hover:bg-white/[0.04] overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        c.featured ? "lg:col-span-2" : ""
      }`}
    >
      {/* Preview */}
      <BrowserPreview c={c} />

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span
              className="text-[9px] font-medium tracking-widest uppercase text-[#00C2FF]/55 block mb-1"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {c.category}
            </span>
            <h3
              className="font-bold text-white/90 leading-tight"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.05rem" }}
            >
              {c.title}
            </h3>
          </div>
          <span
            className="text-3xl font-bold text-white/5 leading-none select-none"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {c.number}
          </span>
        </div>

        <p
          className="text-xs leading-relaxed text-white/40 flex-1 mb-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {c.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {c.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-medium px-2 py-0.5 rounded border border-white/6 bg-white/[0.03] text-white/32"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span
            className="text-[10px] text-white/22"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {c.font}
          </span>
          <a
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#00C2FF]/60 hover:text-[#00C2FF] transition-colors duration-200 group-hover:gap-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
            aria-label={`Ver demo: ${c.title}`}
          >
            Ver demo
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function PortfolioGrid() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#050508] py-24 lg:py-32 overflow-hidden"
      id="portfolio"
      aria-labelledby="portfolio-heading"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-25"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
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
              Portfólio
            </motion.p>

            <motion.h2
              id="portfolio-heading"
              variants={fadeUp}
              className="font-bold leading-tight text-white mb-4"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                letterSpacing: "-0.01em",
              }}
            >
              Projetos que{" "}
              <span className="text-[#00C2FF]">provam</span>{" "}
              o que entregamos
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-sm leading-relaxed text-white/40"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Cinco modelos funcionais, deployados e acessíveis. Cada um com
              design e identidade únicos para o nicho — clique em qualquer
              card para ver a demo ao vivo.
            </motion.p>
          </div>

          <motion.a
            variants={fadeUp}
            href="#contato"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[#00C2FF]/75 text-sm font-medium hover:bg-[#00C2FF]/16 hover:border-[#00C2FF]/35 hover:text-[#00C2FF] transition-all duration-200 whitespace-nowrap self-start lg:self-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Quero um projeto assim
            <ArrowUpRight size={13} />
          </motion.a>
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {CASES.map((c) => (
            <CaseCard key={c.id} c={c} />
          ))}
        </motion.div>

        {/* ── Bottom note ── */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-10 text-center text-xs text-white/22"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Todos os projetos são funcionais e estão no ar.{" "}
          <a
            href="#contato"
            className="underline underline-offset-2 text-[#00C2FF]/50 hover:text-[#00C2FF] transition-colors"
          >
            Quer um projeto exclusivo para o seu nicho?
          </a>
        </motion.p>

      </div>
    </section>
  );
}
