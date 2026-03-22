import Link from "next/link";
import type { Metadata } from "next";
import { homeJsonLd, buildMetadata } from "@/lib/seo";


// Adicionar esse export antes do componente
export const metadata: Metadata = buildMetadata({
  title: "Landing Pages Premium — Alto Padrão para Negócios de Alto Valor",
  description: "Desenvolvemos landing pages de alta performance para clínicas, escritórios de advocacia e corretores de luxo. Design premium, SEO técnico e conversão comprovada.",
  path: "/",
  ogImage: "/og/home.jpg",
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const MODELS = [
  {
    href: "/dueto",
    number: "05",
    category: "Escola de Música",
    title: "Dueto Academia",
    description:
      "Landing page para escola de violino com perfis dos professores, grade de modalidades, carrossel de depoimentos e formulário de matrícula qualificado.",
    features: ["Perfis dos professores", "Grade de modalidades", "Carrossel de depoimentos", "Formulário de matrícula"],
    palette: ["#FAF6EF", "#C8A878", "#1A2E4A"],
    font: "Cormorant Garamond + Plus Jakarta Sans",
    accentColor: "#D4A843",
    darkBg: "#0A1220",
  },
  {
    href: "/cosmeticos",
    number: "04",
    category: "Beleza & Cosméticos",
    title: "Representante B2B",
    description:
      "Catálogo de produtos com filtro por categoria, scroll de marcas infinito e formulário B2B qualificado. Pedidos direto pelo WhatsApp.",
    features: ["Catálogo com filtro", "BrandStrip infinito", "Formulário B2B", "Pedido via WhatsApp"],
    palette: ["#FDFBF7", "#E8A0A8", "#2A2420"],
    font: "DM Serif Display + DM Sans",
    accentColor: "#E8A0A8",
    darkBg: "#1a1008",
  },
  {
    href: "/clinica",
    number: "01",
    category: "Saúde & Estética",
    title: "Clínica Médica",
    description:
      "Design clean de alto padrão com prova social, galeria de resultados antes/depois e botão de agendamento flutuante. Otimizado para Google Ads e SEO local.",
    features: ["Galeria antes/depois", "Agendamento integrado", "Depoimentos", "FloatingCTA WhatsApp"],
    palette: ["#FAF8F5", "#C9A96E", "#1C1C1E"],
    font: "Cormorant + Inter",
    gradient: "from-stone-100 to-amber-50",
    accentColor: "#C9A96E",
    darkBg: "#0E0E0F",
  },
  {
    href: "/advocacia",
    number: "02",
    category: "Jurídico & Corporativo",
    title: "Advocacia Corporativa",
    description:
      "Sobriedade, autoridade e tipografia elegante. Formulário multi-step de captura de leads qualificados com validação e animação de sucesso.",
    features: ["Formulário multi-step", "Grid de sócios", "Áreas de atuação", "Depoimentos corporativos"],
    palette: ["#F7F4EE", "#C9A65A", "#0D1E3C"],
    font: "Playfair Display + Inter",
    gradient: "from-slate-100 to-blue-50",
    accentColor: "#C9A65A",
    darkBg: "#0F0F10",
  },
  {
    href: "/imoveis",
    number: "03",
    category: "Imóveis de Luxo",
    title: "Corretor Premium",
    description:
      "Imersão visual total com galeria lightbox, scroll horizontal e hero full-bleed. Otimização extrema de imagens pesadas sem comprometer o LCP.",
    features: ["Hero full-bleed", "Galeria + lightbox", "Grid de imóveis", "Perfil do corretor"],
    palette: ["#F5F0E8", "#C9A96E", "#0A0A0B"],
    font: "Fraunces + Inter",
    gradient: "from-amber-50 to-stone-100",
    accentColor: "#C9A96E",
    darkBg: "#0A0A0B",
  },
];

const STACK = [
  { label: "Next.js 15", sub: "App Router" },
  { label: "TypeScript", sub: "Strict mode" },
  { label: "Tailwind CSS", sub: "v4" },
  { label: "Framer Motion", sub: "Animações" },
  { label: "next/image", sub: "LCP otimizado" },
  { label: "JSON-LD", sub: "SEO estruturado" },
];

const DELIVERABLES = [
  { icon: "⚡", title: "Lighthouse 95+", desc: "Performance, SEO, Acessibilidade e Best Practices auditados" },
  { icon: "📱", title: "Mobile-first", desc: "Responsivo em todos os breakpoints, testado em iOS e Android" },
  { icon: "🔍", title: "SEO técnico", desc: "Metadata, Open Graph, JSON-LD e sitemap configurados" },
  { icon: "🎨", title: "Design exclusivo", desc: "Identidade visual única para cada nicho, sem templates genéricos" },
  { icon: "⚙️", title: "Código de produção", desc: "TypeScript strict, componentes reutilizáveis, zero dependências desnecessárias" },
  { icon: "🚀", title: "Deploy incluso", desc: "Configuração completa na Vercel com domínio personalizado" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080809] text-white overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()) }}
      />
      {/* ── HERO ── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 py-24 overflow-hidden">

        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-10 rounded-full"
          style={{ background: "radial-gradient(ellipse, #C9A96E 0%, transparent 65%)" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-medium tracking-widest uppercase text-white/55 mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Landing Pages · High-Code · Alto Padrão
          </div>

          {/* Headline */}
          <h1
            className="font-light leading-[1.05] tracking-tight text-white mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            }}
          >
            Sites que{" "}
            <em className="italic font-light text-amber-300/85"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              vendem
            </em>
            <br />
            para negócios de{" "}
            <em className="italic font-light text-amber-300/85"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              alto valor.
            </em>
          </h1>

          {/* Subheadline */}
          <p
            className="text-base leading-relaxed text-white/50 max-w-xl mx-auto mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Desenvolvemos landing pages de alta performance com Next.js,
            design premium e foco absoluto em conversão. Cada projeto é
            único — sem templates, sem atalhos.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <a
              href="#modelos"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-stone-900 text-sm font-medium tracking-wide hover:bg-stone-100 transition-all duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Ver modelos
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" />
              </svg>
            </a>
            <a
              href="https://wa.me/5561999999999?text=Ol%C3%A1%21+Gostaria+de+solicitar+um+or%C3%A7amento+para+uma+landing+page."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/12 bg-white/5 text-white/70 text-sm font-medium tracking-wide hover:bg-white/10 hover:text-white hover:border-white/25 transition-all duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Solicitar orçamento
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { value: "3", label: "Modelos prontos" },
              { value: "95+", label: "Lighthouse score" },
              { value: "100%", label: "High-code, sem Wix" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span
                  className="text-2xl font-light text-white leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-[10px] text-white/35"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20" aria-hidden="true">
          <span className="text-[9px] tracking-[0.2em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
            Role
          </span>
          <div className="w-px h-8 bg-white/15 animate-bounce" />
        </div>
      </section>

      {/* ── MODELS GRID ── */}
      <section id="modelos" className="py-24 lg:py-32 px-6 lg:px-12 bg-[#050506]">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="mb-16 max-w-2xl">
            <p
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-amber-400/60 flex items-center gap-2 mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="w-5 h-px bg-current" />
              Modelos disponíveis
            </p>
            <h2
              className="font-light text-white leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              Três nichos,{" "}
              <em className="italic text-amber-300/80" style={{ fontFamily: "'Playfair Display', serif" }}>
                três identidades
              </em>
              , uma plataforma.
            </h2>
            <p
              className="text-sm text-white/42 leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Cada modelo foi desenvolvido do zero com design e stack
              exclusivos para o nicho. Clique em qualquer um para ver a
              demo completa.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {MODELS.map((model) => (
              <Link
                key={model.href}
                href={model.href}
                className="group relative flex flex-col rounded-2xl border border-white/6 bg-white/[0.025] hover:bg-white/[0.05] hover:border-white/12 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ textDecoration: "none" }}
              >
                {/* Preview window */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/9", background: model.darkBg }}
                >
                  {/* Simulated browser chrome */}
                  <div className="absolute top-0 left-0 right-0 h-6 bg-white/5 flex items-center px-3 gap-1.5 z-10">
                    {["#FF5F57", "#FFBD2E", "#28CA41"].map((c, i) => (
                      <div key={i} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.7 }} />
                    ))}
                    <div
                      className="flex-1 mx-3 h-3 rounded-sm bg-white/8 flex items-center px-2"
                    >
                      <span className="text-[7px] text-white/30" style={{ fontFamily: "'Inter', sans-serif" }}>
                        localhost:3000{model.href}
                      </span>
                    </div>
                  </div>

                  {/* Color palette preview */}
                  <div className="absolute bottom-0 left-0 right-0 top-6 flex items-end p-4">
                    {/* Fake content blocks */}
                    <div className="w-full">
                      <div
                        className="w-2/3 h-2 rounded-full mb-2 opacity-40"
                        style={{ background: model.accentColor }}
                      />
                      <div className="w-full h-1.5 rounded-full bg-white/10 mb-1.5" />
                      <div className="w-4/5 h-1.5 rounded-full bg-white/7 mb-4" />
                      <div className="flex gap-2">
                        <div
                          className="h-7 px-4 rounded-lg flex items-center"
                          style={{ background: model.accentColor === "#C9A96E" ? "#fff" : model.darkBg === "#0F0F10" ? "#f0ece6" : "#f5f0e8", opacity: 0.9 }}
                        >
                          <div className="w-12 h-1.5 rounded-full bg-black/20" />
                        </div>
                        <div className="h-7 px-3 rounded-lg border border-white/15 flex items-center">
                          <div className="w-10 h-1.5 rounded-full bg-white/25" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Palette swatches */}
                  <div className="absolute top-9 right-4 flex gap-1">
                    {model.palette.map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-white/10"
                        style={{ background: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Card content */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span
                        className="text-[9px] font-medium tracking-widest uppercase text-amber-400/60 block mb-1"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {model.category}
                      </span>
                      <h3
                        className="text-lg font-light text-white leading-tight"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {model.title}
                      </h3>
                    </div>
                    <span
                      className="text-3xl font-light text-white/8 leading-none select-none"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {model.number}
                    </span>
                  </div>

                  <p
                    className="text-xs leading-relaxed text-white/45 flex-1 mb-5"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {model.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {model.features.map((f) => (
                      <span
                        key={f}
                        className="text-[9px] font-medium px-2 py-0.5 rounded border border-white/6 bg-white/[0.03] text-white/35"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/6 mb-4" />

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] text-white/25"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {model.font}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-amber-400/70 group-hover:text-amber-400 transition-colors duration-200"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Ver demo
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
                        <path d="M2 6h8M7 3l3 3-3 3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STACK ── */}
      <section className="py-20 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/25 text-center mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Stack tecnológico
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {STACK.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/6 bg-white/[0.025]"
              >
                <span
                  className="text-xs font-medium text-white/70"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {s.label}
                </span>
                <span
                  className="text-[9px] text-white/28"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {s.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-[#050506]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center">
            <p
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-amber-400/60 mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              O que está incluso
            </p>
            <h2
              className="font-light text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.7rem, 3vw, 2.5rem)" }}
            >
              Tudo que um negócio de alto valor{" "}
              <em className="italic text-amber-300/80" style={{ fontFamily: "'Playfair Display', serif" }}>
                precisa
              </em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DELIVERABLES.map((d) => (
              <div
                key={d.title}
                className="flex gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02]"
              >
                <span className="text-xl shrink-0 mt-0.5" style={{ fontSize: "18px" }}>
                  {d.icon}
                </span>
                <div>
                  <p
                    className="text-sm font-medium text-white/85 mb-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {d.title}
                  </p>
                  <p
                    className="text-xs leading-relaxed text-white/38"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {d.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 px-6 text-center border-t border-white/5">
        <div className="max-w-xl mx-auto">
          <h2
            className="font-light text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Pronto para ter uma{" "}
            <em className="italic text-amber-300/85" style={{ fontFamily: "'Playfair Display', serif" }}>
              landing page premium?
            </em>
          </h2>
          <p
            className="text-sm text-white/42 leading-relaxed mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Entre em contato pelo WhatsApp e receba um orçamento
            personalizado em até 24 horas.
          </p>
          <a
            href="https://wa.me/5561999999999?text=Ol%C3%A1%21+Gostaria+de+solicitar+um+or%C3%A7amento+para+uma+landing+page."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-stone-900 text-sm font-medium tracking-wide hover:bg-stone-100 transition-all duration-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Solicitar orçamento via WhatsApp
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p
          className="text-[10px] text-white/20"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Landing Pages Premium · Next.js · TypeScript · Tailwind CSS
        </p>
        <div className="flex gap-5">
          {["/clinica", "/advocacia", "/imoveis"].map((href) => (
            <Link
              key={href}
              href={href}
              className="text-[10px] text-white/25 hover:text-white/60 transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {href.replace("/", "").charAt(0).toUpperCase() + href.slice(2)}
            </Link>
          ))}
        </div>
      </footer>

    </main>
  );
}
