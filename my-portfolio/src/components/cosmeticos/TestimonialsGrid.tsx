"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  body: string;
  author: string;
  role: string;
  business: string;
  city: string;
  rating: number;
  type: "salao" | "revendedora" | "clinica" | "studio";
  featured?: boolean;
  since?: string;
}

interface TestimonialsGridProps {
  testimonials?: Testimonial[];
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    body: "Trabalho com a Isabela há 3 anos e não troco por nada. Os produtos chegam sempre no prazo, nunca tive problema com produto fora do padrão e o suporte técnico é diferenciado. Meu salão cresceu muito depois que padronizei com as marcas dela.",
    author: "Fernanda Alves",
    role: "Proprietária",
    business: "Studio Fernanda Alves",
    city: "Brasília–DF",
    rating: 5,
    type: "salao",
    featured: true,
    since: "Cliente desde 2021",
  },
  {
    id: "t2",
    body: "Comecei com um pedido pequeno só pra testar e hoje faço pedido toda semana. A margem realmente compensa e o WhatsApp dela responde na hora. Recomendo para qualquer cabeleireira autônoma.",
    author: "Priscila Menezes",
    role: "Cabeleireira autônoma",
    business: "Profissional independente",
    city: "Taguatinga–DF",
    rating: 5,
    type: "revendedora",
    since: "Cliente desde 2022",
  },
  {
    id: "t3",
    body: "Nossa clínica precisava de produtos de pele com nota fiscal e certificação ANVISA. A Isabela atendeu todos os requisitos e ainda nos deu treinamento sobre os ativos. Parceria de alto nível.",
    author: "Dra. Camila Torres",
    role: "Dermatologista",
    business: "Clínica Torres Saúde",
    city: "Águas Claras–DF",
    rating: 5,
    type: "clinica",
  },
  {
    id: "t4",
    body: "O grupo de revendedoras é incrível. Toda semana tem dica nova, material de divulgação pronto e às vezes lançamento exclusivo antes de todo mundo. Vale muito a pena fazer parte.",
    author: "Juliana Costa",
    role: "Revendedora",
    business: "Revendedora exclusiva",
    city: "Gama–DF",
    rating: 5,
    type: "revendedora",
  },
  {
    id: "t5",
    body: "Sou proprietário de dois salões e a gestão de estoque sempre foi um problema. Com a reposição facilitada por WhatsApp, resolvemos isso. Entrega em 24h no DF é diferencial real.",
    author: "Ricardo Nunes",
    role: "Empresário",
    business: "Grupo Nunes Beauty",
    city: "Brasília–DF",
    rating: 5,
    type: "salao",
    since: "Cliente desde 2020",
  },
  {
    id: "t6",
    body: "Trabalho em studio de micropigmentação e precisava de produtos de pele de qualidade. Os da La Roche-Posay que ela distribui são exatamente o que meus clientes precisam no pós-procedimento.",
    author: "Amanda Ribeiro",
    role: "Micropigmentadora",
    business: "Studio Amanda Ribeiro",
    city: "Samambaia–DF",
    rating: 5,
    type: "studio",
  },
];

// ─── Type badge ───────────────────────────────────────────────────────────────

const TYPE_LABELS: Record<string, string> = {
  salao:       "Salão",
  revendedora: "Revendedora",
  clinica:     "Clínica",
  studio:      "Studio",
};

const TYPE_STYLES: Record<string, string> = {
  salao:       "bg-amber-50 text-amber-700 border-amber-100",
  revendedora: "bg-rose-50 text-rose-600 border-rose-100",
  clinica:     "bg-blue-50 text-blue-600 border-blue-100",
  studio:      "bg-purple-50 text-purple-600 border-purple-100",
};

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={11} className={i < count ? "text-amber-400 fill-amber-400" : "text-stone-200"} />
      ))}
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function TestimonialCard({ t }: { t: Testimonial }) {
  const isFeatured = t.featured;
  const typeStyle = TYPE_STYLES[t.type] ?? "bg-stone-50 text-stone-500 border-stone-100";

  return (
    <motion.div
      variants={{
        hidden:  { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={`relative flex flex-col rounded-2xl border p-6 transition-colors duration-300 ${
        isFeatured
          ? "bg-stone-900 border-stone-800 lg:col-span-3"
          : "bg-white border-stone-100 hover:border-rose-100"
      }`}
    >
      {/* Gold accent on featured */}
      {isFeatured && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-400/40 to-transparent" />
      )}

      {/* Quote mark */}
      <span
        className={`text-4xl font-normal leading-none mb-3 -ml-1 ${isFeatured ? "text-rose-400/25" : "text-rose-200"}`}
        style={{ fontFamily: "'DM Serif Display', serif" }}
        aria-hidden="true"
      >
        "
      </span>

      {/* Stars */}
      <div className="mb-3">
        <Stars count={t.rating} />
      </div>

      {/* Body */}
      <blockquote
        className={`text-sm leading-relaxed flex-1 mb-5 italic ${
          isFeatured ? "text-white/75" : "text-stone-500"
        }`}
        style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}
      >
        "{t.body}"
      </blockquote>

      {/* Divider */}
      <div className={`h-px mb-4 ${isFeatured ? "bg-white/8" : "bg-stone-50"}`} />

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p
            className={`text-sm font-medium leading-tight ${isFeatured ? "text-white/90" : "text-stone-800"}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t.author}
          </p>
          <p
            className={`text-[10px] mt-0.5 ${isFeatured ? "text-white/40" : "text-stone-400"}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t.role} · {t.business}
          </p>
          {t.since && (
            <p
              className={`text-[9px] mt-0.5 ${isFeatured ? "text-rose-300/60" : "text-rose-400/70"}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {t.since}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-1">
          <span
            className={`text-[9px] font-medium px-2.5 py-1 rounded-full border ${typeStyle}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {TYPE_LABELS[t.type]}
          </span>
          <span
            className={`text-[9px] ${isFeatured ? "text-white/25" : "text-stone-300"}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t.city}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function TestimonialsGrid({ testimonials = DEFAULT_TESTIMONIALS }: TestimonialsGridProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const featured = testimonials.find((t) => t.featured);
  const regular  = testimonials.filter((t) => !t.featured);

  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
  };

  const fadeUp = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#FDFBF7] py-24 lg:py-32 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div className="max-w-xl">
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-rose-400 flex items-center gap-2 mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="w-5 h-px bg-rose-200 inline-block" />
              O que dizem nossos parceiros
            </motion.p>

            <motion.h2
              id="testimonials-heading"
              variants={fadeUp}
              className="font-normal leading-tight text-stone-900 mb-3"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
            >
              Parceiros que{" "}
              <em className="italic" style={{ fontFamily: "'DM Serif Display', serif", color: "#C07080" }}>
                crescem
              </em>{" "}
              com a gente
            </motion.h2>

            <motion.p variants={fadeUp} className="text-sm text-stone-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              De salões a clínicas, revendedoras independentes a studios — confira o que nossos parceiros dizem.
            </motion.p>
          </div>

          {/* Aggregate rating */}
          <motion.div variants={fadeUp} className="flex flex-col items-end gap-1 shrink-0">
            <span
              className="font-normal leading-none text-stone-900"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: "3rem" }}
            >
              5.0
            </span>
            <Stars count={5} />
            <p className="text-[10px] text-stone-400 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {testimonials.length}+ avaliações verificadas
            </p>
          </motion.div>
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {featured && <TestimonialCard t={featured} />}
          {regular.map((t) => <TestimonialCard key={t.id} t={t} />)}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-10 text-center text-[10px] text-stone-400"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Depoimentos cedidos com autorização. Nomes e negócios divulgados com consentimento.
        </motion.p>
      </div>
    </section>
  );
}
