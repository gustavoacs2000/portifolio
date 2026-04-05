import { buildWhatsAppHref, contactConfig } from "@/lib/contact-config";

type SocialIconProps = {
  size?: number;
  className?: string;
};

function InstagramIcon({ size = 15, className }: SocialIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-7.8 1.26 4 4 0 0 1 7.8-1.26z" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 15, className }: SocialIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4.1 0 4.8 2.7 4.8 6.2V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.3-2 2.7V21H9z" />
    </svg>
  );
}

function GithubIcon({ size = 15, className }: SocialIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.9 1 2.2 1.9 1 .7 2.5.5 3.2.4.1-.8.4-1.4.7-1.7-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.4 1.2a11.6 11.6 0 0 1 6.1 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.3 2.8.2 3.1.8.9 1.2 2 1.2 3.3 0 4.6-2.8 5.6-5.4 5.9.4.3.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Servicos", href: "#servicos" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
];

const PORTFOLIO_LINKS = [
  { label: "Clinica Medica", href: "/clinica" },
  { label: "Advocacia", href: "/advocacia" },
  { label: "Imoveis de Luxo", href: "/imoveis" },
  { label: "Cosmeticos B2B", href: "/cosmeticos" },
  { label: "Escola de Musica", href: "/dueto" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#050508] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#00C2FF]/12 border border-[#00C2FF]/25 flex items-center justify-center">
                <span className="text-[#00C2FF] font-bold text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  G
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-white font-bold text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                  GA
                </span>
                <span className="text-white/75 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Solutions
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-white/78 mb-6 max-w-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
              Criacao de sites e sistemas para empresas que querem comunicar melhor e gerar mais contato.
            </p>

            <div className="flex items-center gap-2">
              {[
                { icon: InstagramIcon, href: contactConfig.ga.social.instagram, label: "Instagram" },
                { icon: LinkedinIcon, href: contactConfig.ga.social.linkedin, label: "LinkedIn" },
                { icon: GithubIcon, href: contactConfig.ga.social.github, label: "GitHub" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl border border-white/15 bg-white/[0.06] flex items-center justify-center text-white/80 hover:text-white hover:border-white/35 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-white/65 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              Navegacao
            </p>
            <div className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/82 hover:text-white transition-colors duration-200"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-white/65 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              Portfolio
            </p>
            <div className="flex flex-col gap-2.5">
              {PORTFOLIO_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/82 hover:text-[#8fe8ff] transition-colors duration-200"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-white/65 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              Contato
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={buildWhatsAppHref(contactConfig.ga.whatsapp.number)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/82 hover:text-white transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${contactConfig.ga.email}`}
                className="text-sm text-white/82 hover:text-white transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {contactConfig.ga.email}
              </a>
              <span className="text-[11px] text-white/62" style={{ fontFamily: "'Inter', sans-serif" }}>
                Brasilia - DF
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/62" style={{ fontFamily: "'Inter', sans-serif" }}>
            © {year} GA Solutions. Todos os direitos reservados.
          </p>
          <p className="text-[11px] text-white/62" style={{ fontFamily: "'Inter', sans-serif" }}>
            CNPJ: {contactConfig.ga.cnpj} · {contactConfig.ga.cityLabel}
          </p>
        </div>
      </div>
    </footer>
  );
}


