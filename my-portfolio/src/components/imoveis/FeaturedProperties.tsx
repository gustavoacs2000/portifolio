"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, BedDouble, Maximize2, ArrowUpRight, Heart } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Property {
  id: string;
  title: string;
  location: string;
  neighborhood: string;
  price: string;
  priceNote?: string;
  bedrooms: number;
  area: number;         // m²
  landArea?: number;    // m² terreno
  imageSrc: string;
  imageAlt: string;
  tag?: string;         // "Novo", "Exclusivo", "Oportunidade"
  featured?: boolean;   // card principal — maior
}

interface FeaturedPropertiesProps {
  theme?: "light" | "dark";
  properties?: Property[];
  sectionTitle?: string;
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "Residência com Vista Panorâmica",
    location: "Lago Sul, Brasília–DF",
    neighborhood: "Lago Sul",
    price: "R$ 4.800.000",
    priceNote: "Financiamento disponível",
    bedrooms: 5,
    area: 620,
    landArea: 1200,
    imageSrc: "/images/imoveis/property-1.png",
    imageAlt: "Residência de luxo no Lago Sul com vista panorâmica para o lago",
    tag: "Exclusivo",
    featured: true,
  },
  {
    id: "p2",
    title: "Cobertura Duplex Jardins",
    location: "Sudoeste, Brasília–DF",
    neighborhood: "Sudoeste",
    price: "R$ 2.950.000",
    bedrooms: 4,
    area: 380,
    imageSrc: "/images/imoveis/property-2.png",
    imageAlt: "Cobertura duplex no Sudoeste com terraço e vista para a cidade",
    tag: "Novo",
  },
  {
    id: "p3",
    title: "Casa em Condomínio Fechado",
    location: "Park Way, Brasília–DF",
    neighborhood: "Park Way",
    price: "R$ 3.200.000",
    bedrooms: 4,
    area: 480,
    landArea: 2000,
    imageSrc: "/images/imoveis/property-3.png",
    imageAlt: "Casa em condomínio fechado no Park Way com área verde preservada",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const } },
};

const scaleIn = {
  hidden:  { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Tag badge ────────────────────────────────────────────────────────────────

function TagBadge({ tag }: { tag: string }) {
  const colors: Record<string, string> = {
    "Exclusivo":   "bg-amber-500/15 text-amber-300 border-amber-500/25",
    "Novo":        "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    "Oportunidade":"bg-blue-500/15 text-blue-300 border-blue-500/25",
  };
  return (
    <span
      className={`inline-flex text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-md border backdrop-blur-sm ${
        colors[tag] ?? "bg-white/10 text-white/65 border-white/15"
      }`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {tag}
    </span>
  );
}

// ─── Property card ────────────────────────────────────────────────────────────

function PropertyCard({
  property,
  priority = false,
  size = "normal",
  theme,
}: {
  property: Property;
  priority?: boolean;
  size?: "featured" | "normal";
  theme: "light" | "dark";
}) {
  const isDark = theme === "dark";
  const [liked, setLiked] = useState(false);
  const isFeatured = size === "featured";

  const cardBg = isDark ? "bg-[#111214]" : "bg-white";
  const cardBorder = isDark ? "border-white/6" : "border-stone-200";
  const titleColor = isDark ? "text-white/92" : "text-stone-900";
  const metaColor  = isDark ? "text-white/40"  : "text-stone-400";
  const priceColor = isDark ? "text-white"      : "text-stone-900";
  const priceNote  = isDark ? "text-white/35"   : "text-stone-400";
  const divider    = isDark ? "bg-white/6"      : "bg-stone-100";
  const statColor  = isDark ? "text-white/55"   : "text-stone-500";
  const arrowBorder = isDark
    ? "border-white/10 text-white/30 hover:border-white/28 hover:text-white/75"
    : "border-stone-200 text-stone-400 hover:border-stone-500 hover:text-stone-700";

  return (
    <motion.div
      variants={scaleIn}
      className={`group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-2xl ${cardBg} ${cardBorder} ${
        isDark ? "hover:shadow-black/40" : "hover:shadow-stone-300/40"
      }`}
      whileHover={{ y: -4 }}
    >
      {/* ── Image ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: isFeatured ? "16/9" : "4/3" }}
      >
        <Image
          src={property.imageSrc}
          alt={property.imageAlt}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, 65vw"
              : "(max-width: 768px) 100vw, 32vw"
          }
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

        {/* Tag badge */}
        {property.tag && (
          <div className="absolute top-3 left-3 z-10">
            <TagBadge tag={property.tag} />
          </div>
        )}

        {/* Like button */}
        <button
          onClick={() => setLiked((v) => !v)}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full border backdrop-blur-sm flex items-center justify-center transition-all duration-200 ${
            liked
              ? "bg-red-500/20 border-red-400/40"
              : "bg-black/25 border-white/15 hover:bg-black/40"
          }`}
          aria-label={liked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart
            size={13}
            className={liked ? "text-red-400 fill-red-400" : "text-white/60"}
          />
        </button>

        {/* Location pill — pinned to bottom of image */}
        <div className="absolute bottom-3 left-3 z-10">
          <span
            className="inline-flex items-center gap-1 text-[9px] font-medium text-white/80 bg-black/35 backdrop-blur-sm px-2 py-1 rounded-md"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <MapPin size={8} />
            {property.neighborhood}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5">

        {/* Title + location */}
        <div className="mb-3">
          <h3
            className={`font-normal leading-tight mb-1 ${titleColor}`}
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: isFeatured ? "1.2rem" : "1.05rem",
              fontWeight: 300,
            }}
          >
            {property.title}
          </h3>
          <p
            className={`text-xs ${metaColor}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {property.location}
          </p>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span
            className={`font-normal leading-none ${priceColor}`}
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: isFeatured ? "1.5rem" : "1.25rem",
              fontWeight: 300,
            }}
          >
            {property.price}
          </span>
          {property.priceNote && (
            <span
              className={`ml-2 text-xs ${priceNote}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              · {property.priceNote}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className={`h-px w-full ${divider} mb-4`} />

        {/* Stats + arrow */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span
              className={`flex items-center gap-1.5 text-xs ${statColor}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <BedDouble size={12} />
              {property.bedrooms} suítes
            </span>
            <span
              className={`flex items-center gap-1.5 text-xs ${statColor}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Maximize2 size={12} />
              {property.area} m²
            </span>
            {property.landArea && (
              <span
                className={`flex items-center gap-1.5 text-xs ${statColor} hidden sm:flex`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <MapPin size={12} />
                {property.landArea} m²
              </span>
            )}
          </div>

          <a
            href={`#imovel-${property.id}`}
            className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110 ${arrowBorder}`}
            aria-label={`Ver detalhes de ${property.title}`}
          >
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function FeaturedProperties({
  theme = "dark",
  properties = DEFAULT_PROPERTIES,
  sectionTitle = "Imóveis em destaque",
}: FeaturedPropertiesProps) {
  const isDark = theme === "dark";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const sectionBg    = isDark ? "bg-[#0A0A0B]"     : "bg-[#F5F0E8]";
  const eyebrowColor = isDark ? "text-amber-400/60" : "text-amber-700/70";
  const headingColor = isDark ? "text-white"        : "text-stone-900";
  const subColor     = isDark ? "text-white/40"     : "text-stone-500";
  const dividerColor = isDark ? "bg-white/7"        : "bg-stone-300/50";

  // Split: 1 featured + rest
  const featured  = properties.find((p) => p.featured);
  const secondary = properties.filter((p) => !p.featured);

  return (
    <section
      ref={ref}
      className={`relative w-full ${sectionBg} py-24 lg:py-32 overflow-hidden`}
      aria-labelledby="properties-heading"
    >
      {/* Decorative grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12 lg:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div className="max-w-xl">
            <motion.p
              variants={fadeUp}
              className={`text-[10px] font-medium tracking-[0.2em] uppercase mb-4 flex items-center gap-2 ${eyebrowColor}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="w-5 h-px bg-current inline-block" />
              Portfólio exclusivo
            </motion.p>

            <motion.h2
              id="properties-heading"
              variants={fadeUp}
              className={`font-normal leading-[1.08] tracking-tight mb-4 ${headingColor}`}
              style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 300 }}
            >
              {sectionTitle.split(" ").slice(0, -1).join(" ")}{" "}
              <em
                className={`italic font-light ${isDark ? "text-amber-400/75" : "text-amber-700/80"}`}
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {sectionTitle.split(" ").slice(-1)[0]}
              </em>
            </motion.h2>

            <motion.div variants={fadeUp} className="flex gap-4 items-start">
              <div className={`w-px h-10 mt-0.5 shrink-0 ${dividerColor}`} />
              <p
                className={`text-sm leading-relaxed ${subColor}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Curadoria de imóveis de alto padrão em Brasília — selecionados
                pessoalmente com base em localização, acabamento e potencial de valorização.
              </p>
            </motion.div>
          </div>

          {/* View all link */}
          <motion.a
            variants={fadeUp}
            href="#todos-imoveis"
            className={`inline-flex items-center gap-2 text-sm font-medium tracking-wide transition-colors duration-200 whitespace-nowrap ${
              isDark
                ? "text-amber-400/70 hover:text-amber-400"
                : "text-amber-700 hover:text-amber-800"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Ver todos os imóveis
            <ArrowUpRight size={14} />
          </motion.a>
        </motion.div>

        {/* ── Asymmetric grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Row: featured (2/3) + secondary stack (1/3) */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:gap-5 mb-4 lg:mb-5">

            {/* Featured card */}
            {featured && (
              <PropertyCard
                property={featured}
                priority
                size="featured"
                theme={theme}
              />
            )}

            {/* Secondary stack */}
            <div className="flex flex-col gap-4 lg:gap-5">
              {secondary.slice(0, 2).map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  size="normal"
                  theme={theme}
                />
              ))}
            </div>
          </div>

          {/* Remaining properties — 3-col row */}
          {secondary.length > 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {secondary.slice(2).map((p) => (
                <PropertyCard key={p.id} property={p} size="normal" theme={theme} />
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <p
            className={`text-sm text-center sm:text-left ${subColor}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Não encontrou o que procura?{" "}
            <a
              href="#contato"
              className={`underline underline-offset-2 transition-colors ${
                isDark
                  ? "text-amber-400/70 hover:text-amber-400"
                  : "text-amber-700 hover:text-amber-800"
              }`}
            >
              Me conte o perfil ideal
            </a>{" "}
            e busco exclusivamente para você.
          </p>

          <motion.a
            href="#contato"
            className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
              isDark
                ? "bg-white text-stone-900 hover:bg-stone-100"
                : "bg-stone-900 text-white hover:bg-stone-700"
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Agendar visita
            <ArrowUpRight size={14} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
