"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Package, Users } from "lucide-react";

interface HeroProps {
  representativeName?: string;
  representativeTitle?: string;
  headline?: string;
  subheadline?: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
};

const slideRight = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

function StatBadge({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-rose-100 bg-white/70 backdrop-blur-sm">
      <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-rose-400" />
      </div>
      <div>
        <p className="text-sm font-semibold leading-tight text-stone-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>{value}</p>
        <p className="text-[10px] text-stone-400 leading-tight mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</p>
      </div>
    </div>
  );
}

export default function HeroSection({
  representativeName = "Isabela Monteiro",
  representativeTitle = "Representante Comercial de Cosméticos",
  headline = "Leve as melhores marcas para o seu negócio.",
  subheadline = "Distribuidora exclusiva de marcas premium de beleza para salões, clínicas e revendedores em todo o DF e entorno. Condições especiais, suporte técnico e entrega rápida.",
  heroImageSrc = "/images/cosmeticos/hero-products.png",
  heroImageAlt = "Linha de produtos cosméticos premium",
}: HeroProps) {
  return (
    <section className="relative w-full min-h-[100svh] bg-[#FDFBF7] overflow-hidden" aria-label="Apresentação da representante comercial">

      <div className="pointer-events-none absolute top-0 right-0 w-[55%] h-full"
        style={{ background: "linear-gradient(135deg, #FDF0F0 0%, #F8E8E4 40%, #F2D8D0 100%)" }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }} />
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, #F8D8D0 0%, transparent 70%)" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 min-h-[100svh] grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-center gap-8 lg:gap-0 py-24 lg:py-0">

        {/* LEFT */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col justify-center lg:pr-16">

          <motion.div variants={fadeUp} className="mb-7">
            <div className="inline-flex items-center gap-2">
              <div className="w-8 h-px bg-rose-300" />
              <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-rose-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>{representativeTitle}</span>
            </div>
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-normal leading-[1.06] tracking-tight text-stone-900 mb-6"
            style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}>
            Leve as melhores marcas{" "}
            <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", color: "#C07080" }}>
              para o seu negócio.
            </em>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-base leading-relaxed text-stone-500 max-w-md mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {subheadline}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
            <motion.a href="#catalogo" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-stone-900 text-white text-sm font-medium tracking-wide hover:bg-stone-700 transition-all duration-200" style={{ fontFamily: "'DM Sans', sans-serif" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              Ver catálogo <ArrowRight size={14} />
            </motion.a>
            <motion.a href="#contato" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-stone-200 text-stone-600 text-sm font-medium tracking-wide hover:border-stone-400 hover:text-stone-900 transition-all duration-200 bg-white/60 backdrop-blur-sm" style={{ fontFamily: "'DM Sans', sans-serif" }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}>
              Quero ser revendedor
            </motion.a>
          </motion.div>

          <motion.div variants={fadeIn} className="w-full h-px bg-stone-100 mb-8" />

          <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatBadge icon={Package}  value="40+ marcas"    label="No portfólio"       />
            <StatBadge icon={Users}    value="300+ clientes" label="Revendedores ativos" />
            <StatBadge icon={Sparkles} value="8 anos"        label="De experiência"     />
          </motion.div>

          <motion.div variants={fadeIn} className="mt-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-rose-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {representativeName.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-stone-800 leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>{representativeName}</p>
              <p className="text-[10px] text-stone-400 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Representante exclusiva · Brasília–DF</p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div variants={slideRight} initial="hidden" animate="visible" className="relative flex items-center justify-center lg:h-[100svh]">
          <div className="absolute inset-8 rounded-[40%_60%_55%_45%_/_45%_55%_60%_40%] opacity-60"
            style={{ background: "linear-gradient(135deg, #F8E0DC 0%, #F0D0C8 100%)" }} />

          <div className="relative z-10 w-[85%] max-w-md aspect-square">
            <Image src={heroImageSrc} alt={heroImageAlt} fill priority sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-contain drop-shadow-2xl" placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k=" />
          </div>

          <motion.div initial={{ opacity: 0, x: 20, y: -10 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[15%] right-4 lg:right-0 z-20 bg-white rounded-2xl border border-rose-100 shadow-lg shadow-rose-100/50 px-4 py-3 max-w-[160px]">
            <p className="text-[9px] font-medium tracking-widest uppercase text-rose-400 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Novidade</p>
            <p className="text-xs font-medium text-stone-800 leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>Linha Reparadora Premium</p>
            <p className="text-[10px] text-stone-400 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Disponível para pedido</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[20%] left-4 lg:left-0 z-20 bg-stone-900 rounded-2xl px-4 py-3">
            <p className="text-[9px] font-medium tracking-widest uppercase text-rose-300 mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Revendedor</p>
            <p className="text-sm font-semibold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>Até 40% off</p>
            <p className="text-[10px] text-white/50 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>no preço de tabela</p>
          </motion.div>
        </motion.div>

      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2 text-stone-300" aria-hidden="true">
        <span className="text-[9px] tracking-[0.2em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>Role para baixo</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-px h-8 bg-stone-200" />
      </motion.div>
    </section>
  );
}
