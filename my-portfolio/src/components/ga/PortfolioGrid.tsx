"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

interface PortfolioCase {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  href: string;
  previewImage: string;
  previewAlt: string;
  tags: string[];
  featured?: boolean;
}

const CASES: PortfolioCase[] = [
  {
    id: "clinica",
    number: "01",
    category: "Saude e Estetica",
    title: "Clinica Medica",
    description:
      "Pagina pensada para gerar consultas com chamada para WhatsApp, prova social e visual elegante.",
    href: "/clinica",
    previewImage: "/images/clinica/hero-doctor.jpg",
    previewAlt: "Preview do projeto Clinica Medica",
    tags: ["WhatsApp", "Depoimentos", "Galeria"],
    featured: true,
  },
  {
    id: "advocacia",
    number: "02",
    category: "Juridico",
    title: "Advocacia Corporativa",
    description:
      "Site institucional com estrutura clara para apresentar servicos e facilitar o pedido de consulta.",
    href: "/advocacia",
    previewImage: "/images/advocacia/hero-office.jpg",
    previewAlt: "Preview do projeto Advocacia Corporativa",
    tags: ["Formulario", "Autoridade", "Conversao"],
  },
  {
    id: "imoveis",
    number: "03",
    category: "Imoveis",
    title: "Corretor Premium",
    description:
      "Experiencia visual para valorizar os imoveis e estimular o contato rapido do cliente.",
    href: "/imoveis",
    previewImage: "/images/imoveis/hero-property.png",
    previewAlt: "Preview do projeto Corretor Premium",
    tags: ["Galeria", "Contato rapido", "Alto padrao"],
  },
  {
    id: "cosmeticos",
    number: "04",
    category: "Cosmeticos B2B",
    title: "Representante Comercial",
    description:
      "Catalogo com destaque para produtos e canal direto para pedidos por WhatsApp.",
    href: "/cosmeticos",
    previewImage: "/images/cosmeticos/hero-products.png",
    previewAlt: "Preview do projeto Representante Comercial",
    tags: ["Catalogo", "Pedidos", "B2B"],
  },
  {
    id: "dueto",
    number: "05",
    category: "Educacao",
    title: "Dueto Academia",
    description:
      "Projeto com foco em matricula, apresentacao dos professores e comunicacao acolhedora.",
    href: "/dueto",
    previewImage: "/images/dueto/teacher-gabriel.jpeg",
    previewAlt: "Preview do projeto Dueto Academia",
    tags: ["Matricula", "Professores", "Institucional"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function BrowserPreview({ c }: { c: PortfolioCase }) {
  return (
    <div className="relative w-full overflow-hidden rounded-t-2xl" style={{ aspectRatio: "16/9" }}>
      <div className="absolute top-0 left-0 right-0 h-8 bg-[#0b0b12] border-b border-white/10 flex items-center px-3 gap-1.5 z-10">
        {[
          "#FF5F57",
          "#FFBD2E",
          "#28CA41",
        ].map((col, i) => (
          <div key={i} className="w-2 h-2 rounded-full" style={{ background: col, opacity: 0.85 }} />
        ))}
        <div className="flex-1 mx-3 h-3 rounded-sm bg-white/10 flex items-center px-2">
          <span className="text-[8px] text-white/55" style={{ fontFamily: "'Inter', sans-serif" }}>
            preview.gasolutions.com.br{c.href}
          </span>
        </div>
      </div>

      <Image
        src={c.previewImage}
        alt={c.previewAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#08080F]/70 via-transparent to-transparent" />
      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#08080F]/80 border border-white/15 text-[10px] text-white/90" style={{ fontFamily: "'Inter', sans-serif" }}>
        Preview real
      </div>
    </div>
  );
}

function CaseCard({ c }: { c: PortfolioCase }) {
  return (
    <motion.div
      variants={scaleIn}
      className={`group relative flex flex-col rounded-2xl border border-white/12 bg-white/[0.06] hover:border-[#00C2FF]/40 hover:bg-white/[0.08] overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        c.featured ? "lg:col-span-2" : ""
      }`}
    >
      <BrowserPreview c={c} />

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span
              className="text-[10px] font-medium tracking-widest uppercase text-[#8fe8ff] block mb-1"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {c.category}
            </span>
            <h3
              className="font-semibold text-white leading-[1.2] pt-[0.02em] pb-[0.08em]"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontSize: "1.05rem" }}
            >
              {c.title}
            </h3>
          </div>
          <span
            className="text-3xl font-bold text-white/15 leading-none select-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {c.number}
          </span>
        </div>

        <p
          className="text-sm leading-relaxed text-white/78 flex-1 mb-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {c.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {c.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-2 py-0.5 rounded border border-white/15 bg-white/[0.08] text-white/90"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/15">
          <span className="text-[11px] text-white/70" style={{ fontFamily: "'Inter', sans-serif" }}>
            Ver pagina completa
          </span>
          <a
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8fe8ff] hover:text-white transition-colors duration-200 group-hover:gap-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
            aria-label={`Ver demo: ${c.title}`}
          >
            Abrir demo
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

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
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-35"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div className="max-w-2xl">
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#8fe8ff] flex items-center gap-2 mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="w-5 h-px bg-[#8fe8ff]/70 inline-block" />
              Portfolio
            </motion.p>

            <motion.h2
              id="portfolio-heading"
              variants={fadeUp}
              className="font-bold leading-[1.2] text-white mb-4 pt-[0.02em] pb-[0.08em]"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.01em" }}
            >
              Projetos com cara de negocio
              <span className="text-[#58d8ff]"> e foco em resultado</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-sm leading-relaxed text-white/80"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Aqui voce ve previews reais de paginas que ja estao no ar. Clique nos cards para abrir cada demo.
            </motion.p>
          </div>

          <motion.a
            variants={fadeUp}
            href="#contato"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00C2FF]/15 border border-[#00C2FF]/35 text-[#8fe8ff] text-sm font-medium hover:bg-[#00C2FF]/25 hover:border-[#00C2FF]/55 hover:text-white transition-all duration-200 whitespace-nowrap self-start lg:self-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Quero algo assim
            <ArrowUpRight size={13} />
          </motion.a>
        </motion.div>

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

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-10 text-center text-sm text-white/72"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Todos os projetos podem ser adaptados para seu segmento.
          <a href="#contato" className="underline underline-offset-2 text-[#8fe8ff] hover:text-white transition-colors ml-1">
            Falar sobre meu caso
          </a>
        </motion.p>
      </div>
    </section>
  );
}

