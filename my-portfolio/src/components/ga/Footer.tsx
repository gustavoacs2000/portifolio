import { Camera, BriefcaseBusiness, GitBranch } from "lucide-react";
import { buildWhatsAppHref, contactConfig } from "@/lib/contact-config";

const NAV_LINKS = [
  { label: "Serviços",    href: "#servicos"  },
  { label: "Portfólio",   href: "#portfolio" },
  { label: "Processo",    href: "#processo"  },
  { label: "Tecnologias", href: "#tech"      },
  { label: "Contato",     href: "#contato"   },
];

const PORTFOLIO_LINKS = [
  { label: "Clínica Médica",   href: "/clinica"    },
  { label: "Advocacia",        href: "/advocacia"  },
  { label: "Imóveis de Luxo",  href: "/imoveis"    },
  { label: "Cosméticos B2B",   href: "/cosmeticos" },
  { label: "Escola de Música", href: "/dueto"      },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#050508] border-t border-white/5">

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">

          {/* Brand */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center">
                <span className="text-[#00C2FF] font-bold text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>G</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-white font-bold text-base" style={{ fontFamily: "'Syne', sans-serif" }}>GA</span>
                <span className="text-white/45 text-base" style={{ fontFamily: "'Syne', sans-serif" }}>Solutions</span>
              </div>
            </div>

            <p
              className="text-sm leading-relaxed text-white/35 mb-6 max-w-xs"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Desenvolvimento de software premium para pequenas e médias
              empresas em Brasília. Sites, sistemas e landing pages de
              alta performance.
            </p>

            {/* Social */}
            <div className="flex items-center gap-2">
              {[
                { icon: Camera,            href: contactConfig.ga.social.instagram, label: "Instagram" },
                { icon: BriefcaseBusiness, href: contactConfig.ga.social.linkedin,  label: "LinkedIn"  },
                { icon: GitBranch,         href: contactConfig.ga.social.github,    label: "GitHub"    },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl border border-white/6 bg-white/[0.025] flex items-center justify-center text-white/35 hover:text-white/75 hover:border-white/15 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p
              className="text-[10px] font-semibold tracking-widest uppercase text-white/25 mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Navegação
            </p>
            <div className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Portfolio */}
          <div>
            <p
              className="text-[10px] font-semibold tracking-widest uppercase text-white/25 mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Portfólio
            </p>
            <div className="flex flex-col gap-2.5">
              {PORTFOLIO_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/40 hover:text-[#00C2FF]/70 transition-colors duration-200"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-[10px] font-semibold tracking-widest uppercase text-white/25 mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Contato
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={buildWhatsAppHref(contactConfig.ga.whatsapp.number)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-white/75 transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${contactConfig.ga.email}`}
                className="text-sm text-white/40 hover:text-white/75 transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {contactConfig.ga.email}
              </a>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] text-white/20" style={{ fontFamily: "'Inter', sans-serif" }}>
                  📍 {contactConfig.ga.cityLabel}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-[11px] text-white/18"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            © {year} GA Solutions. Todos os direitos reservados.
          </p>
          <p
            className="text-[11px] text-white/18"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            CNPJ: {contactConfig.ga.cnpj} · {contactConfig.ga.cityLabel}
          </p>
        </div>
      </div>

    </footer>
  );
}
