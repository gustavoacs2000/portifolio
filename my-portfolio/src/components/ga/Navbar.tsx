"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

// ─── Nav links ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Serviços",   href: "#servicos"   },
  { label: "Portfólio",  href: "#portfolio"  },
  { label: "Processo",   href: "#processo"   },
  { label: "Contato",    href: "#contato"    },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      >
        {/* Blur background */}
        <motion.div
          className="absolute inset-0 border-b border-white/5"
          style={{
            opacity: bgOpacity,
            background: "rgba(8,8,15,0.85)",
            backdropFilter: "blur(20px)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-12 h-16 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="GA Solutions — voltar ao início">
            {/* Icon mark */}
            <div className="w-8 h-8 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center">
              <span
                className="text-[#00C2FF] font-bold text-sm leading-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                G
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span
                className="text-white font-bold text-base leading-tight tracking-tight"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                GA
              </span>
              <span
                className="text-white/70 text-base font-normal leading-tight"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Solutions
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/50 hover:text-white transition-colors duration-200 relative group"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#00C2FF] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <motion.a
            href="#contato"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/25 text-[#00C2FF] text-sm font-medium hover:bg-[#00C2FF]/18 hover:border-[#00C2FF]/45 transition-all duration-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Falar com especialista
            <ArrowRight size={13} />
          </motion.a>

          {/* ── Mobile menu button ── */}
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-40 bg-[#08080F]/98 backdrop-blur-xl flex flex-col pt-20 px-6 pb-8"
        >
          <nav className="flex flex-col gap-1 flex-1" aria-label="Menu mobile">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                className="flex items-center justify-between py-4 border-b border-white/6 text-white/70 hover:text-white text-lg font-medium transition-colors group"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#00C2FF]" />
              </motion.a>
            ))}
          </nav>

          <motion.a
            href="#contato"
            onClick={() => setMobileOpen(false)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.35 }}
            className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#00C2FF] text-[#08080F] font-semibold text-base tracking-wide"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Falar com especialista
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      )}
    </>
  );
}
