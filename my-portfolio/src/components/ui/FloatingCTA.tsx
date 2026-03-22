"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { X, Calendar, Phone } from "lucide-react";

interface FloatingCTAProps {
  whatsappNumber: string;
  whatsappMessage?: string;
  phoneNumber?: string;
  bookingUrl?: string;
  scrollThreshold?: number;
  theme?: "light" | "dark";
}

interface ActionItem {
  id: string;
  label: string;
  sublabel: string;
  href: string;
  icon: React.ElementType;
  colorClass: string;
  textClass: string;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:   { opacity: 0, transition: { duration: 0.15 } },
};

const menuVariants = {
  hidden:  { opacity: 0, scale: 0.92, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const } },
  exit:    { opacity: 0, scale: 0.92, y: 8, transition: { duration: 0.18, ease: "easeIn" } },
};

const itemVariants = {
  hidden:  { opacity: 0, x: 16 },
  visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.07, duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } }),
};

const fabVariants = {
  hidden:  { opacity: 0, scale: 0.5, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 22 } },
  exit:    { opacity: 0, scale: 0.5, y: 20, transition: { duration: 0.18 } },
};

const pulseRing = {
  initial: { scale: 1, opacity: 0.5 },
  animate: { scale: [1, 1.55, 1.55], opacity: [0.5, 0, 0], transition: { duration: 2.2, repeat: Infinity, ease: "easeOut" } },
};

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.837L.057 23.43a.5.5 0 0 0 .611.612l5.65-1.48A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.813 9.813 0 0 1-5.006-1.374l-.36-.214-3.713.974.99-3.621-.234-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

function ActionRow({ item, theme, index, onClose }: { item: ActionItem; theme: "light" | "dark"; index: number; onClose: () => void; }) {
  const isDark = theme === "dark";
  return (
    <motion.a href={item.href} target="_blank" rel="noopener noreferrer" custom={index} variants={itemVariants} onClick={onClose}
      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-150 group ${isDark ? "border-white/8 hover:border-white/16 hover:bg-white/5" : "border-stone-100 hover:border-stone-200 hover:bg-stone-50/80"}`}
      style={{ textDecoration: "none" }} whileHover={{ x: -2 }} whileTap={{ scale: 0.98 }}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.colorClass}`}>
        <item.icon size={18} className={item.textClass} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium leading-tight ${isDark ? "text-white" : "text-stone-900"}`} style={{ fontFamily: "'Inter', sans-serif" }}>{item.label}</p>
        <p className={`text-xs mt-0.5 leading-tight truncate ${isDark ? "text-white/45" : "text-stone-400"}`} style={{ fontFamily: "'Inter', sans-serif" }}>{item.sublabel}</p>
      </div>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`shrink-0 transition-opacity ${isDark ? "text-white/20 group-hover:text-white/50" : "text-stone-300 group-hover:text-stone-500"}`} aria-hidden="true">
        <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.a>
  );
}

export default function FloatingCTA({ whatsappNumber, whatsappMessage = "Olá! Gostaria de agendar uma consulta.", phoneNumber, bookingUrl = "#agendamento", scrollThreshold = 300, theme = "light" }: FloatingCTAProps) {
  const isDark = theme === "dark";
  const [visible, setVisible]   = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY >= scrollThreshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollThreshold]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setExpanded(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  const close = useCallback(() => setExpanded(false), []);
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const actions: ActionItem[] = [
    { id: "whatsapp", label: "WhatsApp", sublabel: "Resposta em até 5 min", href: whatsappHref, icon: WhatsAppIcon as React.ElementType, colorClass: isDark ? "bg-[#25D366]/15" : "bg-[#25D366]/10", textClass: "text-[#1aab54]" },
    ...(bookingUrl ? [{ id: "booking", label: "Agendar consulta", sublabel: "Escolha data e horário", href: bookingUrl, icon: Calendar, colorClass: isDark ? "bg-amber-400/12" : "bg-amber-50", textClass: isDark ? "text-amber-300" : "text-amber-700" }] : []),
    ...(phoneNumber ? [{ id: "phone", label: "Ligar agora", sublabel: phoneNumber, href: `tel:${phoneNumber}`, icon: Phone, colorClass: isDark ? "bg-sky-400/12" : "bg-sky-50", textClass: isDark ? "text-sky-300" : "text-sky-700" }] : []),
  ];

  return (
    <>
      <AnimatePresence>
        {expanded && <motion.div key="backdrop" variants={backdropVariants} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 z-40" onClick={close} aria-hidden="true" />}
      </AnimatePresence>
      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3" role="region" aria-label="Contato rápido">
        <AnimatePresence>
          {expanded && (
            <motion.div key="menu" variants={menuVariants} initial="hidden" animate="visible" exit="exit"
              className={`w-[272px] rounded-2xl border p-3 shadow-2xl ${isDark ? "bg-[#141414]/95 border-white/10 shadow-black/50" : "bg-white/95 border-stone-200/80 shadow-stone-300/30"}`}
              style={{ backdropFilter: "blur(20px)" }} role="menu" aria-label="Opções de contato">
              <div className="px-1 pt-1 pb-3">
                <p className={`text-[11px] font-semibold tracking-widest uppercase ${isDark ? "text-white/35" : "text-stone-400"}`} style={{ fontFamily: "'Inter', sans-serif" }}>Fale conosco</p>
              </div>
              <motion.div className="flex flex-col gap-2" initial="hidden" animate="visible">
                {actions.map((item, i) => <ActionRow key={item.id} item={item} theme={theme} index={i} onClose={close} />)}
              </motion.div>
              <p className={`text-[10px] text-center mt-3 px-2 ${isDark ? "text-white/20" : "text-stone-300"}`} style={{ fontFamily: "'Inter', sans-serif" }}>Seg–Sex, 8h–18h · Sáb, 8h–13h</p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {visible && (
            <motion.div key="fab" variants={fabVariants} initial="hidden" animate="visible" exit="exit" className="relative">
              {!expanded && <motion.div className="absolute inset-0 rounded-full bg-[#25D366] pointer-events-none" variants={pulseRing} initial="initial" animate="animate" />}
              <motion.button onClick={() => setExpanded((v) => !v)}
                className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] ${expanded ? isDark ? "bg-white/10 shadow-black/40" : "bg-stone-100 shadow-stone-200/80" : "bg-[#25D366] shadow-[#25D366]/40 hover:shadow-[#25D366]/60"}`}
                aria-label={expanded ? "Fechar menu de contato" : "Abrir menu de contato"} aria-expanded={expanded} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>
                <AnimatePresence mode="wait">
                  {expanded
                    ? <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={20} className={isDark ? "text-white/70" : "text-stone-500"} /></motion.span>
                    : <motion.span key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><WhatsAppIcon size={24} className="text-white" /></motion.span>
                  }
                </AnimatePresence>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}