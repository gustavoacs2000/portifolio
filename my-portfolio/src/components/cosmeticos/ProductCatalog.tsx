"use client";

import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { ArrowUpRight, ShoppingBag, Star } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: "Cabelo" | "Pele" | "Maquiagem" | "Unhas" | "Corpo";
  description: string;
  volume?: string;       // "300ml", "1L"
  tag?: string;          // "Mais vendido", "Novo", "Exclusivo"
  imageSrc: string;
  imageAlt: string;
  whatsappMessage?: string;
}

interface ProductCatalogProps {
  products?: Product[];
  whatsappNumber?: string;
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Absolut Repair Gold Quinoa",
    brand: "L'Oréal Professionnel",
    category: "Cabelo",
    description: "Reconstrução intensiva para cabelos muito danificados. Ação proteica de tripla camada.",
    volume: "500ml",
    tag: "Mais vendido",
    imageSrc: "/images/cosmeticos/product-loreal.png",
    imageAlt: "L'Oréal Absolut Repair Gold Quinoa",
  },
  {
    id: "p2",
    name: "INVIGO Nutri-Enrich",
    brand: "Wella Professionals",
    category: "Cabelo",
    description: "Nutrição profunda com gengibre e Omega-9. Fórmula vegana para cabelos ressecados.",
    volume: "1L",
    imageSrc: "/images/cosmeticos/product-wella.png",
    imageAlt: "Wella INVIGO Nutri-Enrich",
  },
  {
    id: "p3",
    name: "Nutritive Masquintense",
    brand: "Kérastase",
    category: "Cabelo",
    description: "Máscara nutritiva de alta concentração. Textura rica que transforma cabelos finos.",
    volume: "200ml",
    tag: "Exclusivo",
    imageSrc: "/images/cosmeticos/product-kerastase.png",
    imageAlt: "Kérastase Nutritive Masquintense",
  },
  {
    id: "p4",
    name: "Effaclar Duo+",
    brand: "La Roche-Posay",
    category: "Pele",
    description: "Tratamento anti-imperfeições com Niacinamida 5,5%. Reduz manchas e controla oleosidade.",
    volume: "40ml",
    tag: "Novo",
    imageSrc: "/images/cosmeticos/product-laroche.png",
    imageAlt: "La Roche-Posay Effaclar Duo+",
  },
  {
    id: "p5",
    name: "Liftactiv Collagen Specialist",
    brand: "Vichy",
    category: "Pele",
    description: "Sérum anti-idade com Vitamina C pura 15% + Peptídeos de colágeno. Pele visivelmente mais firme.",
    volume: "30ml",
    imageSrc: "/images/cosmeticos/product-vichy.png",
    imageAlt: "Vichy Liftactiv Collagen Specialist",
  },
  {
    id: "p6",
    name: "Studio Fix Fluid",
    brand: "MAC Cosmetics",
    category: "Maquiagem",
    description: "Base líquida de cobertura completa com FPS 15. 67 tons disponíveis. Acabamento matte.",
    volume: "30ml",
    tag: "Mais vendido",
    imageSrc: "/images/cosmeticos/product-mac.png",
    imageAlt: "MAC Studio Fix Fluid Foundation",
  },
  {
    id: "p7",
    name: "Cant Stop Wont Stop",
    brand: "NYX Professional",
    category: "Maquiagem",
    description: "Base de longa duração 24h. Fórmula à prova d'água. Textura leve e cobertura total.",
    volume: "30ml",
    imageSrc: "/images/cosmeticos/product-nyx.png",
    imageAlt: "NYX Cant Stop Wont Stop Foundation",
  },
  {
    id: "p8",
    name: "Infinite Shine",
    brand: "OPI",
    category: "Unhas",
    description: "Esmalte gel sem cabine UV. Até 11 dias de duração com brilho espelhado.",
    volume: "15ml",
    tag: "Novo",
    imageSrc: "/images/cosmeticos/product-opi.png",
    imageAlt: "OPI Infinite Shine Nail Polish",
  },
];

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORIES = ["Todos", "Cabelo", "Pele", "Maquiagem", "Unhas", "Corpo"] as const;

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  "Cabelo":    { bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-100", dot: "bg-amber-400"  },
  "Pele":      { bg: "bg-rose-50",   text: "text-rose-600",   border: "border-rose-100",  dot: "bg-rose-400"   },
  "Maquiagem": { bg: "bg-pink-50",   text: "text-pink-600",   border: "border-pink-100",  dot: "bg-pink-400"   },
  "Unhas":     { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100",dot: "bg-purple-400" },
  "Corpo":     { bg: "bg-teal-50",   text: "text-teal-600",   border: "border-teal-100",  dot: "bg-teal-400"   },
};

const TAG_STYLES: Record<string, string> = {
  "Mais vendido": "bg-amber-500 text-white",
  "Novo":         "bg-rose-500 text-white",
  "Exclusivo":    "bg-stone-800 text-white",
};

// ─── Animation variants ───────────────────────────────────────────────────────

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

// ─── Product image placeholder ────────────────────────────────────────────────

const PRODUCT_GRADIENTS: Record<string, string> = {
  "Cabelo":    "from-amber-100 to-amber-50",
  "Pele":      "from-rose-100 to-rose-50",
  "Maquiagem": "from-pink-100 to-pink-50",
  "Unhas":     "from-purple-100 to-purple-50",
  "Corpo":     "from-teal-100 to-teal-50",
};

// ─── Product card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  whatsappNumber,
}: {
  product: Product;
  whatsappNumber: string;
}) {
  const catStyle = CATEGORY_STYLES[product.category];
  const tagStyle = product.tag ? TAG_STYLES[product.tag] : null;
  const gradClass = PRODUCT_GRADIENTS[product.category] ?? "from-stone-100 to-stone-50";

  const waMessage = product.whatsappMessage
    ?? `Olá! Gostaria de fazer um pedido do produto: ${product.name} (${product.brand})${product.volume ? ` — ${product.volume}` : ""}.`;
  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group flex flex-col rounded-2xl border border-stone-100 bg-white overflow-hidden hover:shadow-lg hover:shadow-rose-100/50 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image area */}
      <div className={`relative w-full aspect-square bg-gradient-to-br ${gradClass} overflow-hidden`}>
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
        />

        {/* Tag badge */}
        {tagStyle && product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`text-[9px] font-semibold tracking-wide px-2.5 py-1 rounded-full ${tagStyle}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {product.tag}
            </span>
          </div>
        )}

        {/* Volume badge */}
        {product.volume && (
          <div className="absolute top-3 right-3 z-10">
            <span
              className="text-[9px] font-medium px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm text-stone-500 border border-stone-100"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {product.volume}
            </span>
          </div>
        )}

        {/* Quick order overlay on hover */}
        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">

        {/* Category tag */}
        {catStyle && (
          <span
            className={`inline-flex items-center gap-1.5 self-start text-[9px] font-medium px-2.5 py-1 rounded-full border mb-3 ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <div className={`w-1 h-1 rounded-full ${catStyle.dot}`} />
            {product.category}
          </span>
        )}

        {/* Brand */}
        <p
          className="text-[10px] font-medium text-stone-400 mb-0.5 truncate"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {product.brand}
        </p>

        {/* Name */}
        <h3
          className="text-sm font-medium text-stone-800 leading-tight mb-2"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p
          className="text-[11px] leading-relaxed text-stone-400 flex-1 mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {product.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-stone-50 mb-3" />

        {/* CTA */}
        <motion.a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-stone-900 text-white text-xs font-medium tracking-wide hover:bg-stone-700 transition-all duration-200"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <ShoppingBag size={12} />
          Fazer pedido
        </motion.a>
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function ProductCatalog({
  products = DEFAULT_PRODUCTS,
  whatsappNumber = "5561999999999",
}: ProductCatalogProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  const filtered = activeCategory === "Todos"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const handleCategory = useCallback((cat: string) => {
    setActiveCategory(cat);
  }, []);

  // Count per category
  const counts = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = cat === "Todos"
      ? products.length
      : products.filter((p) => p.category === cat).length;
    return acc;
  }, {});

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#FDFBF7] py-24 lg:py-32"
      aria-labelledby="catalog-heading"
      id="catalogo"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <p
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-rose-400 flex items-center gap-2 mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="w-5 h-px bg-rose-200 inline-block" />
              Catálogo de produtos
            </p>
            <h2
              id="catalog-heading"
              className="font-normal leading-tight text-stone-900 mb-2"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
            >
              Escolha seus{" "}
              <em className="italic" style={{ fontFamily: "'DM Serif Display', serif", color: "#C07080" }}>
                produtos
              </em>
            </h2>
            <p
              className="text-sm text-stone-400 max-w-md"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Clique em "Fazer pedido" para enviar sua solicitação diretamente pelo WhatsApp.
            </p>
          </div>

          {/* Total count */}
          <div className="flex items-center gap-2 shrink-0">
            <Star size={13} className="text-rose-300 fill-rose-300" />
            <span
              className="text-sm text-stone-400"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {filtered.length} produto{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </motion.div>

        {/* ── Category filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Filtrar por categoria"
        >
          {CATEGORIES.filter((cat) => counts[cat] > 0).map((cat) => {
            const isActive = cat === activeCategory;
            const catStyle = cat !== "Todos" ? CATEGORY_STYLES[cat] : null;

            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleCategory(cat)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-stone-900 border-stone-900 text-white"
                    : "bg-white border-stone-100 text-stone-500 hover:border-stone-300 hover:text-stone-700"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {catStyle && !isActive && (
                  <div className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`} />
                )}
                {cat}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-stone-100 text-stone-400"
                  }`}
                >
                  {counts[cat]}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* ── Products grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={whatsappNumber}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p
              className="text-stone-400 text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Nenhum produto nesta categoria ainda.
            </p>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-5 pt-10 border-t border-stone-100"
        >
          <p
            className="text-sm text-stone-400 text-center sm:text-left"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Não encontrou o produto?{" "}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Estou procurando um produto que não vi no catálogo. Pode me ajudar?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 text-rose-500 hover:text-rose-700 transition-colors"
            >
              Me envie uma mensagem
            </a>
          </p>

          <motion.a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de receber o catálogo completo em PDF.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-200 text-stone-700 text-sm font-medium hover:border-stone-400 hover:text-stone-900 transition-all duration-200 bg-white"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Receber catálogo completo em PDF
            <ArrowUpRight size={13} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
