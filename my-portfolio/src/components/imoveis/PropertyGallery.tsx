"use client";

import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Grid3X3 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  room: string;      // "Sala de estar", "Suíte master" etc.
  width?: number;    // aspect ratio hint: wide | square
  height?: number;
}

interface PropertyGalleryProps {
  theme?: "light" | "dark";
  images?: GalleryImage[];
  propertyTitle?: string;
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_IMAGES: GalleryImage[] = [
  { id: "g1", src: "/images/imoveis/gallery-sala.png",      alt: "Sala de estar com pé-direito duplo e vista para o lago",    room: "Sala de estar",    width: 16, height: 9  },
  { id: "g2", src: "/images/imoveis/gallery-suite.png",     alt: "Suíte master com closet integrado e banheira de imersão",    room: "Suíte master",     width: 4,  height: 3  },
  { id: "g3", src: "/images/imoveis/gallery-cozinha.png",   alt: "Cozinha gourmet com ilha central e equipamentos Miele",      room: "Cozinha gourmet",  width: 4,  height: 3  },
  { id: "g4", src: "/images/imoveis/gallery-piscina.png",   alt: "Área de lazer com piscina aquecida e deck em madeira nobre", room: "Área de lazer",    width: 16, height: 9  },
  { id: "g5", src: "/images/imoveis/gallery-escritorio.png",alt: "Home office com acabamento em madeira e vista para o jardim", room: "Home office",      width: 4,  height: 3  },
  { id: "g6", src: "/images/imoveis/gallery-jardim.png",    alt: "Jardim paisagístico com iluminação cênica noturna",          room: "Jardim",           width: 4,  height: 3  },
  { id: "g7", src: "/images/imoveis/gallery-banheiro.png",  alt: "Banheiro da suíte master com mármore carrara e cuba esculpida",room: "Banheiro",        width: 4,  height: 3  },
  { id: "g8", src: "/images/imoveis/gallery-garagem.png",   alt: "Garagem para 4 veículos com sistema automatizado",            room: "Garagem",          width: 16, height: 9  },
];

// ─── Gradient placeholders per room ──────────────────────────────────────────

const ROOM_GRADIENTS: Record<string, string> = {
  "Sala de estar":   "linear-gradient(155deg, #8090a8 0%, #607080 40%, #405060 100%)",
  "Suíte master":    "linear-gradient(155deg, #c8b090 0%, #a08060 40%, #806040 100%)",
  "Cozinha gourmet": "linear-gradient(155deg, #d0c8b8 0%, #b0a888 40%, #908868 100%)",
  "Área de lazer":   "linear-gradient(155deg, #6090a0 0%, #407880 40%, #205860 100%)",
  "Home office":     "linear-gradient(155deg, #908070 0%, #706050 40%, #504030 100%)",
  "Jardim":          "linear-gradient(155deg, #708060 0%, #506040 40%, #304020 100%)",
  "Banheiro":        "linear-gradient(155deg, #c0c8d0 0%, #a0a8b0 40%, #808890 100%)",
  "Garagem":         "linear-gradient(155deg, #606870 0%, #404850 40%, #202830 100%)",
};

// ─── Lightbox variants ────────────────────────────────────────────────────────

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.22 } },
};

const lightboxVariants = {
  hidden:  { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const } },
  exit:    { opacity: 0, scale: 0.96, transition: { duration: 0.22, ease: "easeIn" as const } },
};

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.22 } }),
};

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const [direction, setDirection] = useState(1);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const img = images[current];

  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex flex-col"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-4 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p
            className="text-white/90 text-sm font-normal"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {img.room}
          </p>
          <p
            className="text-white/35 text-[10px] mt-0.5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {current + 1} / {images.length}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full border border-white/15 bg-white/8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 transition-all duration-200"
          aria-label="Fechar galeria"
        >
          <X size={16} />
        </button>
      </div>

      {/* Main image */}
      <div
        className="flex-1 flex items-center justify-center px-4 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative w-full max-w-5xl max-h-[72vh] rounded-xl overflow-hidden"
            style={{ aspectRatio: `${img.width ?? 16} / ${img.height ?? 9}` }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
            />
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        <button
          onClick={prev}
          className="absolute left-2 lg:left-8 w-10 h-10 rounded-full border border-white/15 bg-white/8 backdrop-blur-sm flex items-center justify-center text-white/65 hover:text-white hover:bg-white/18 transition-all duration-200"
          aria-label="Imagem anterior"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          className="absolute right-2 lg:right-8 w-10 h-10 rounded-full border border-white/15 bg-white/8 backdrop-blur-sm flex items-center justify-center text-white/65 hover:text-white hover:bg-white/18 transition-all duration-200"
          aria-label="Próxima imagem"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div
        className="shrink-0 px-6 py-4 flex gap-2 overflow-x-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`relative shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              i === current ? "border-amber-400 opacity-100" : "border-transparent opacity-40 hover:opacity-70"
            }`}
            aria-label={`Ver ${img.room}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="56px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Gallery thumbnail ────────────────────────────────────────────────────────

function GalleryThumb({
  image,
  index,
  onOpen,
  theme,
}: {
  image: GalleryImage;
  index: number;
  onOpen: (i: number) => void;
  theme: "light" | "dark";
}) {
  const isDark = theme === "dark";
  const isWide = (image.width ?? 4) / (image.height ?? 3) > 1.5;

  return (
    <motion.button
      variants={{
        hidden:  { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
      }}
      onClick={() => onOpen(index)}
      className="group relative overflow-hidden rounded-xl flex-shrink-0 cursor-pointer"
      style={{
        width: isWide ? "320px" : "220px",
        aspectRatio: isWide ? "16/9" : "4/3",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Ampliar foto: ${image.room}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        loading="lazy"
        sizes="(max-width: 768px) 80vw, 320px"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.07]"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAHhAAAQQCAwAAAAAAAAAAAAAAAQIDBAUREiEx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqzWtnas6fXpaSYeM3LiuZiCeqiKD/9k="
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

      {/* Zoom icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
          <ZoomIn size={16} className="text-white" />
        </div>
      </div>

      {/* Room label */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/70 to-transparent">
        <p
          className="text-white/80 text-[9px] font-medium tracking-wide"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {image.room}
        </p>
      </div>
    </motion.button>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function PropertyGallery({
  theme = "dark",
  images = DEFAULT_IMAGES,
  propertyTitle = "Residência Lago Sul",
}: PropertyGalleryProps) {
  const isDark = theme === "dark";
  const ref = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  // Scroll track buttons
  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  const sectionBg    = isDark ? "bg-[#0F0F10]"     : "bg-[#FAF8F4]";
  const eyebrowColor = isDark ? "text-amber-400/60" : "text-amber-700/70";
  const headingColor = isDark ? "text-white"        : "text-stone-900";
  const subColor     = isDark ? "text-white/40"     : "text-stone-500";
  const trackBg      = isDark ? "bg-white/4"        : "bg-stone-100";
  const navBtn       = isDark
    ? "border-white/10 text-white/45 hover:border-white/25 hover:text-white bg-white/[0.03] hover:bg-white/[0.07]"
    : "border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-700 bg-white hover:bg-stone-50";

  return (
    <>
      <section
        ref={ref}
        className={`relative w-full ${sectionBg} py-24 lg:py-32 overflow-hidden`}
        aria-labelledby="gallery-heading"
        id="galeria"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10"
          >
            <div>
              <p
                className={`text-[10px] font-medium tracking-[0.2em] uppercase mb-4 flex items-center gap-2 ${eyebrowColor}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span className="w-5 h-px bg-current inline-block" />
                Galeria de fotos
              </p>
              <h2
                id="gallery-heading"
                className={`font-normal leading-tight mb-2 ${headingColor}`}
                style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 300 }}
              >
                {propertyTitle} —{" "}
                <em
                  className={`italic font-light ${isDark ? "text-amber-400/70" : "text-amber-700/75"}`}
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  cada detalhe
                </em>
              </h2>
              <p
                className={`text-xs ${subColor}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {images.length} fotos · Clique para ampliar
              </p>
            </div>

            {/* Nav buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollBy(-1)}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${navBtn}`}
                aria-label="Rolar para esquerda"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => scrollBy(1)}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${navBtn}`}
                aria-label="Rolar para direita"
              >
                <ChevronRight size={15} />
              </button>

              {/* Ver grade */}
              <button
                onClick={() => openLightbox(0)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-medium transition-all duration-200 ${navBtn}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
                aria-label="Ver todas as fotos em grade"
              >
                <Grid3X3 size={12} />
                Ver todas
              </button>
            </div>
          </motion.div>

          {/* ── Horizontal scroll track ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <motion.div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto pb-4"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {images.map((img, i) => (
                <div
                  key={img.id}
                  style={{ scrollSnapAlign: "start" }}
                >
                  <GalleryThumb
                    image={img}
                    index={i}
                    onOpen={openLightbox}
                    theme={theme}
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Scroll hint ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className={`mt-4 text-center text-[10px] ${subColor}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ← Arraste para explorar todas as fotos →
          </motion.p>

        </div>
      </section>

      {/* ── Lightbox (portal-like, above everything) ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            initialIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
}
