"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRight,
  Globe,
  LayoutDashboard,
  Cog,
  HeadphonesIcon,
  Megaphone,
  FileText,
} from "lucide-react";

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

const SERVICES: Service[] = [
  {
    id: "landing",
    icon: Globe,
    title: "Landing page",
    subtitle: "Para campanha e captacao de leads",
    description:
      "Pagina focada em conversao, com mensagem objetiva, prova social e chamada para acao clara.",
    highlights: ["Design sob medida", "Formulario e WhatsApp", "Publicacao rapida"],
  },
  {
    id: "institucional",
    icon: LayoutDashboard,
    title: "Site institucional",
    subtitle: "Para fortalecer sua marca",
    description:
      "Site completo para apresentar empresa, servicos, diferenciais e canais de contato com confianca.",
    highlights: ["Paginas essenciais", "Visual profissional", "Facil de navegar"],
  },
  {
    id: "sistema",
    icon: Cog,
    title: "Sistema interno",
    subtitle: "Para organizar a operacao",
    description:
      "Painel para centralizar informacoes, acompanhar tarefas e reduzir retrabalho no dia a dia.",
    highlights: ["Fluxo organizado", "Acesso por perfil", "Dados em um so lugar"],
  },
  {
    id: "conteudo",
    icon: FileText,
    title: "Conteudo e estrutura",
    subtitle: "Para comunicar melhor",
    description:
      "Ajustamos textos, secoes e ordem das informacoes para facilitar a decisao do seu cliente.",
    highlights: ["Texto mais claro", "Tom comercial", "Leitura simples"],
  },
  {
    id: "divulgacao",
    icon: Megaphone,
    title: "Pagina para anuncios",
    subtitle: "Para trafego pago e social",
    description:
      "Criamos paginas especificas para campanhas com foco no publico certo e no objetivo da acao.",
    highlights: ["Mensagem direta", "Visual alinhado", "Pronto para anunciar"],
  },
  {
    id: "suporte",
    icon: HeadphonesIcon,
    title: "Suporte e manutencao",
    subtitle: "Para manter tudo atualizado",
    description:
      "Acompanhamento continuo para atualizacoes, ajustes e melhorias sem travar seu negocio.",
    highlights: ["Atualizacoes", "Ajustes sob demanda", "Atendimento rapido"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex flex-col min-h-[340px] rounded-2xl border border-white/14 bg-white/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00C2FF]/45"
    >
      <div className="w-11 h-11 rounded-xl bg-[#00C2FF]/15 flex items-center justify-center mb-5">
        <Icon size={20} className="text-[#7be2ff]" />
      </div>

      <h3
        className="font-semibold leading-[1.2] mb-2 pt-[0.02em] pb-[0.08em] text-white"
        style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontSize: "1.15rem" }}
      >
        {service.title}
      </h3>

      <p
        className="text-xs mb-4 font-medium text-[#8ce8ff]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {service.subtitle}
      </p>

      <p
        className="text-sm leading-relaxed text-white/78 mb-6"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {service.description}
      </p>

      <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-white/12">
        {service.highlights.map((h) => (
          <div key={h} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7be2ff] shrink-0" />
            <span className="text-xs text-white/86" style={{ fontFamily: "'Inter', sans-serif" }}>
              {h}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#08080F] py-24 lg:py-32 overflow-hidden"
      id="servicos"
      aria-labelledby="services-heading"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-35"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.2), transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div className="max-w-2xl">
            <motion.p
              variants={fadeUp}
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#8ce8ff] flex items-center gap-2 mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="w-5 h-px bg-[#8ce8ff]/60 inline-block" />
              Servicos
            </motion.p>

            <motion.h2
              id="services-heading"
              variants={fadeUp}
              className="font-bold leading-[1.2] text-white mb-4 pt-[0.02em] pb-[0.08em]"
              style={{
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                letterSpacing: "-0.01em",
              }}
            >
              Solucoes para vender mais
              <span className="text-[#58d8ff]"> e comunicar melhor</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-sm leading-relaxed text-white/78"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Escolha o formato ideal para sua empresa. Tudo com linguagem simples,
              visual profissional e foco em resultado real.
            </motion.p>
          </div>

          <motion.a
            variants={fadeUp}
            href="#contato"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#00C2FF]/35 text-[#8fe8ff] text-sm font-medium hover:border-[#00C2FF]/60 hover:text-white transition-all duration-200 whitespace-nowrap self-start lg:self-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Solicitar proposta
            <ArrowUpRight size={13} />
          </motion.a>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

