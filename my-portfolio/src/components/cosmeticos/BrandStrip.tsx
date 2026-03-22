"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Brand {
  id: string;
  name: string;
  category: string; // "Cabelo", "Pele", "Maquiagem"
}

interface BrandStripProps {
  brands?: Brand[];
  tagline?: string;
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_BRANDS: Brand[] = [
  { id: "b1",  name: "L'Oréal Professionnel", category: "Cabelo"    },
  { id: "b2",  name: "Wella Professionals",   category: "Cabelo"    },
  { id: "b3",  name: "Kérastase",             category: "Cabelo"    },
  { id: "b4",  name: "Redken",                category: "Cabelo"    },
  { id: "b5",  name: "La Roche-Posay",        category: "Pele"      },
  { id: "b6",  name: "Vichy",                 category: "Pele"      },
  { id: "b7",  name: "Payot",                 category: "Pele"      },
  { id: "b8",  name: "MAC Cosmetics",         category: "Maquiagem" },
  { id: "b9",  name: "NYX Professional",      category: "Maquiagem" },
  { id: "b10", name: "OPI",                   category: "Unhas"     },
  { id: "b11", name: "Cadiveu",               category: "Cabelo"    },
  { id: "b12", name: "Schwarzkopf",           category: "Cabelo"    },
];

// ─── Category color ───────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  "Cabelo":    "bg-amber-50 text-amber-600 border-amber-100",
  "Pele":      "bg-rose-50 text-rose-500 border-rose-100",
  "Maquiagem": "bg-pink-50 text-pink-500 border-pink-100",
  "Unhas":     "bg-purple-50 text-purple-500 border-purple-100",
};

// ─── Single brand pill ────────────────────────────────────────────────────────

function BrandPill({ brand }: { brand: Brand }) {
  const catColor = CATEGORY_COLORS[brand.category] ?? "bg-stone-50 text-stone-500 border-stone-100";

  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-full border border-stone-100 bg-white shadow-sm shadow-stone-100/80 shrink-0 select-none">
      {/* Monogram circle */}
      <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
        <span
          className="text-[10px] font-bold text-stone-500 leading-none"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {brand.name.charAt(0)}
        </span>
      </div>

      {/* Name */}
      <span
        className="text-sm font-medium text-stone-700 whitespace-nowrap"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {brand.name}
      </span>

      {/* Category tag */}
      <span
        className={`text-[9px] font-medium tracking-wide px-2 py-0.5 rounded-full border ${catColor}`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {brand.category}
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BrandStrip({
  brands = DEFAULT_BRANDS,
  tagline = "Marcas que os melhores profissionais confiam",
}: BrandStripProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Duplicate list for seamless infinite scroll
  const doubled = [...brands, ...brands];

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#FDFBF7] py-14 overflow-hidden border-y border-stone-100"
      aria-label="Marcas representadas"
    >
      {/* Left + right fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
        style={{ background: "linear-gradient(to right, #FDFBF7, transparent)" }} />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
        style={{ background: "linear-gradient(to left, #FDFBF7, transparent)" }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="text-center mb-8 px-6"
      >
        <p
          className="text-[10px] font-medium tracking-[0.2em] uppercase text-rose-400 flex items-center justify-center gap-2"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <span className="w-5 h-px bg-rose-200 inline-block" />
          Portfólio de marcas
          <span className="w-5 h-px bg-rose-200 inline-block" />
        </p>
        <p
          className="mt-2 text-sm text-stone-400"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {tagline}
        </p>
      </motion.div>

      {/* Scrolling track */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <motion.div
          className="flex gap-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: 28,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            },
          }}
          style={{ width: "max-content" }}
        >
          {doubled.map((brand, i) => (
            <BrandPill key={`${brand.id}-${i}`} brand={brand} />
          ))}
        </motion.div>
      </motion.div>

      {/* Count badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 flex justify-center"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-100 shadow-sm"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span
            className="text-[11px] font-medium text-stone-500"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {brands.length}+ marcas no portfólio · Novidades toda semana
          </span>
        </div>
      </motion.div>
    </section>
  );
}
