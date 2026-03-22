"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar, Star, ChevronRight, Award, Users } from "lucide-react";

interface HeroProps {
  theme?: "light" | "dark";
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" as const } },
};

const badgeFade = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function TrustBadge({ icon: Icon, value, label, theme }: {
  icon: React.ElementType; value: string; label: string; theme: "light" | "dark";
}) {
  const isDark = theme === "dark";
  return (
    <motion.div
      variants={badgeFade}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm ${
        isDark ? "bg-white/5 border-white/10 text-white" : "bg-white/80 border-stone-200/80 text-stone-800"
      }`}
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isDark ? "bg-amber-400/15" : "bg-amber-50"}`}>
        <Icon size={17} className={isDark ? "text-amber-300" : "text-amber-700"} />
      </div>
      <div>
        <p className={`text-sm font-semibold leading-tight tracking-tight ${isDark ? "text-white" : "text-stone-900"}`} style={{ fontFamily: "'Inter', sans-serif" }}>{value}</p>
        <p className={`text-xs leading-tight mt-0.5 ${isDark ? "text-white/50" : "text-stone-500"}`} style={{ fontFamily: "'Inter', sans-serif" }}>{label}</p>
      </div>
    </motion.div>
  );
}

function StarRating({ theme }: { theme: "light" | "dark" }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} className={theme === "dark" ? "text-amber-300" : "text-amber-500"} fill="currentColor" />
      ))}
    </div>
  );
}

export default function HeroSection({ theme = "light" }: HeroProps) {
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const bg = isDark ? "bg-[#0E0E0F]" : "bg-[#FAF8F5]";
  const headingColor = isDark ? "text-white" : "text-stone-900";
  const accentColor = isDark ? "text-amber-300" : "text-amber-700";
  const bodyColor = isDark ? "text-white/60" : "text-stone-500";
  const dividerColor = isDark ? "bg-white/10" : "bg-stone-200";
  const tagBg = isDark ? "bg-amber-400/10 text-amber-300 border-amber-400/20" : "bg-amber-50 text-amber-700 border-amber-200";

  return (
    <section ref={sectionRef} className={`relative w-full min-h-[100svh] ${bg} overflow-hidden`} aria-label="Apresentação da clínica">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "128px 128px" }} />
      {isDark && <div className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20 z-0" style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)" }} />}

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 min-h-[100svh] grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] items-center gap-8 lg:gap-0 py-24 lg:py-0">
        <motion.div className="flex flex-col justify-center lg:pr-12 xl:pr-20" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="mb-6">
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase px-3 py-1.5 rounded-full border ${tagBg}`} style={{ fontFamily: "'Inter', sans-serif" }}>
              <Award size={11} />
              Medicina Estética &amp; Bem-Estar
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className={`text-[2.6rem] sm:text-5xl xl:text-[3.6rem] font-light leading-[1.1] tracking-tight ${headingColor} mb-5`} style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Realce a sua{" "}
            <em className={`italic font-normal ${accentColor}`} style={{ fontFamily: "'Cormorant Garamond', serif" }}>beleza natural</em>
            <br />com precisão médica.
          </motion.h1>

          <motion.p variants={fadeUp} className={`text-base leading-relaxed max-w-md ${bodyColor} mb-8`} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
            Protocolos personalizados com tecnologia de ponta e o cuidado de uma equipe especializada. Cada tratamento é pensado exclusivamente para você.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
            <motion.a href="#agendamento" className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 ${isDark ? "bg-amber-400 text-stone-900 hover:bg-amber-300" : "bg-stone-900 text-white hover:bg-stone-700"}`} style={{ fontFamily: "'Inter', sans-serif" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Calendar size={15} />
              Agendar consulta
            </motion.a>
            <motion.a href="#tratamentos" className={`inline-flex items-center gap-1.5 px-6 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 ${isDark ? "text-white/70 hover:text-white border border-white/10 hover:border-white/25" : "text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300"}`} style={{ fontFamily: "'Inter', sans-serif" }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              Ver tratamentos
              <ChevronRight size={14} />
            </motion.a>
          </motion.div>

          <motion.div variants={fadeIn} className={`w-full h-px ${dividerColor} mb-8`} />

          <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <TrustBadge icon={Star}  value="4.9 / 5"   label="1.200+ avaliações"  theme={theme} />
            <TrustBadge icon={Users} value="8.000+"    label="Pacientes atendidos" theme={theme} />
            <TrustBadge icon={Award} value="CFM · CRM-DF" label="Certificados"    theme={theme} />
          </motion.div>

          <motion.div variants={fadeIn} className={`mt-6 flex items-center gap-2.5 ${bodyColor}`}>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-7 h-7 rounded-full border-2 overflow-hidden ${isDark ? "border-[#0E0E0F]" : "border-[#FAF8F5]"}`} aria-hidden="true"
                  style={{ background: isDark ? `hsl(${30 + i * 20}, 25%, ${30 + i * 6}%)` : `hsl(${20 + i * 15}, 20%, ${75 + i * 4}%)` }} />
              ))}
            </div>
            <StarRating theme={theme} />
            <span className="text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>"Resultado incrível. Recomendo a todos."</span>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="relative w-full h-[520px] lg:h-[100svh] overflow-hidden">
          <div className={`hidden lg:block absolute inset-0 border-l ${isDark ? "border-white/5" : "border-stone-200/60"} z-10 pointer-events-none`} />
          <div className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none" style={{ background: isDark ? "linear-gradient(to top, #0E0E0F, transparent)" : "linear-gradient(to top, #FAF8F5, transparent)" }} />
          <motion.div style={{ y: imageY }} className="absolute inset-0 scale-[1.08]">
            <Image src="/images/clinica/hero-doctor.jpg" alt="Médica especialista em estética atendendo paciente na clínica" fill priority sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover object-center" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIhAAAQQBBAMAAAAAAAAAAAAAAQIDBBEFEiExQWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Apz1xms6fX0aSY5KmMuIW3HbVylBWjj7IHIOc4A9UVFZs6Q7UJSGWEpHoK//Z" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20, x: 20 }} animate={{ opacity: 1, y: 0, x: 0 }} transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }} className={`absolute bottom-10 right-6 z-20 flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-md shadow-xl max-w-[240px] ${isDark ? "bg-white/8 border-white/12 text-white" : "bg-white/90 border-white text-stone-800 shadow-stone-200/80"}`}>
            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
              <div className="w-full h-full" style={{ background: isDark ? "linear-gradient(135deg, #3a3022, #5a4a2a)" : "linear-gradient(135deg, #e8d5b0, #c9a96e)" }} />
            </div>
            <div>
              <p className={`text-xs font-semibold leading-tight ${isDark ? "text-white" : "text-stone-900"}`} style={{ fontFamily: "'Inter', sans-serif" }}>Dra. Ana Oliveira</p>
              <p className={`text-[10px] mt-0.5 ${isDark ? "text-white/50" : "text-stone-400"}`} style={{ fontFamily: "'Inter', sans-serif" }}>Médica Estética · CRM-DF 12345</p>
              <div className="mt-1"><StarRating theme={theme} /></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }} className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2 ${bodyColor}`} aria-hidden="true">
        <span className="text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>Role para baixo</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }} className={`w-px h-8 ${isDark ? "bg-white/20" : "bg-stone-300"}`} />
      </motion.div>
    </section>
  );
}