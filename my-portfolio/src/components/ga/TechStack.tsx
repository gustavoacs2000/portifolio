"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TECH_CATEGORIES = [
  {
    label: "Front-end",
    items: [
      { name: "Next.js 15",    color: "#ffffff", desc: "App Router"        },
      { name: "React",         color: "#61DAFB", desc: "UI Library"        },
      { name: "TypeScript",    color: "#3178C6", desc: "Strict mode"       },
      { name: "Tailwind CSS",  color: "#38BDF8", desc: "v4"                },
      { name: "Framer Motion", color: "#FF0080", desc: "Animações"         },
    ],
  },
  {
    label: "Back-end",
    items: [
      { name: "Node.js",       color: "#8CC84B", desc: "Runtime"           },
      { name: "Prisma ORM",    color: "#5A67D8", desc: "Database toolkit"  },
      { name: "PostgreSQL",    color: "#336791", desc: "Banco relacional"  },
      { name: "REST API",      color: "#00C2FF", desc: "HTTP / JSON"       },
    ],
  },
  {
    label: "DevOps & SEO",
    items: [
      { name: "Vercel",        color: "#ffffff", desc: "Deploy & CI/CD"    },
      { name: "Docker",        color: "#2496ED", desc: "Containers"        },
      { name: "JSON-LD",       color: "#F59E0B", desc: "Schema.org"        },
      { name: "Git / GitHub",  color: "#F05032", desc: "Versionamento"     },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#050508] py-24 lg:py-28 overflow-hidden"
      id="tech"
      aria-labelledby="tech-heading"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#00C2FF]/55 flex items-center justify-center gap-2 mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="w-5 h-px bg-[#00C2FF]/30 inline-block" />
            Tecnologias
            <span className="w-5 h-px bg-[#00C2FF]/30 inline-block" />
          </motion.p>

          <motion.h2
            id="tech-heading"
            variants={fadeUp}
            className="font-bold leading-tight text-white"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.01em" }}
          >
            Stack moderno,{" "}
            <span className="text-[#00C2FF]">produção garantida</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {TECH_CATEGORIES.map((cat) => (
            <motion.div
              key={cat.label}
              variants={fadeUp}
              className="rounded-2xl border border-white/6 bg-white/[0.02] p-6"
            >
              <p
                className="text-[9px] font-semibold tracking-widest uppercase text-white/25 mb-5"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {cat.label}
              </p>
              <div className="flex flex-col gap-3">
                {cat.items.map((tech) => (
                  <div key={tech.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: tech.color }}
                      />
                      <span
                        className="text-sm font-medium text-white/75"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {tech.name}
                      </span>
                    </div>
                    <span
                      className="text-[10px] text-white/25"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {tech.desc}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
