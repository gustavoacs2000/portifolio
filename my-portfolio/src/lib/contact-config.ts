export type ContactRouteKey =
  | "ga"
  | "clinica"
  | "advocacia"
  | "imoveis"
  | "cosmeticos"
  | "dueto";

type FloatingCtaContact = {
  whatsappNumber: string;
  whatsappMessage: string;
  phoneNumber: string;
  bookingUrl: string;
};

export const contactConfig = {
  // Conta principal do portfolio GA (/)
  ga: {
    businessName: "GA Solutions",
    cityLabel: "Brasilia - DF",
    cnpj: "00.000.000/0001-00",
    email: "contato@gasolutions.com.br",
    phone: {
      display: "(61) 9 9999-9999",
      // Formato para telefone/schema (com + e separadores)
      seoTelephone: "+55-61-9-9999-9999",
    },
    whatsapp: {
      // Formato E.164 sem "+"
      number: "5561995090622",
      quoteMessage: "Ola! Gostaria de solicitar um orcamento para um projeto.",
    },
    social: {
      instagram: "https://www.instagram.com/gustavoacs2000/",
      linkedin: "https://www.linkedin.com/in/gustavo-alexandre-cardoso-de-sousa-02b2141b0/",
      github: "https://github.com/gustavoacs2000",
    },
  },

  clinica: {
    floatingCta: {
      whatsappNumber: "5561995090622",
      whatsappMessage: "Ola! Vi o site e gostaria de agendar uma consulta.",
      phoneNumber: "6133334444",
      bookingUrl: "#agendamento",
    } satisfies FloatingCtaContact,
    seoTelephone: "+55-61-3333-4444",
  },

  advocacia: {
    floatingCta: {
      whatsappNumber: "5561995090622",
      whatsappMessage: "Ola! Gostaria de agendar uma consulta juridica.",
      phoneNumber: "6133334444",
      bookingUrl: "#contato",
    } satisfies FloatingCtaContact,
    seoTelephone: "+55-61-3222-5555",
    attorneysLinkedin: {
      carlos: "https://linkedin.com/in/seu-perfil-carlos",
      ana: "https://linkedin.com/in/seu-perfil-ana",
      rafael: "https://linkedin.com/in/seu-perfil-rafael",
      julia: "https://linkedin.com/in/seu-perfil-julia",
    },
  },

  imoveis: {
    floatingCta: {
      whatsappNumber: "5561995090622",
      whatsappMessage: "Ola! Vi o site e gostaria de conhecer os imoveis disponiveis.",
      phoneNumber: "6199999999",
      bookingUrl: "#contato",
    } satisfies FloatingCtaContact,
    seoTelephone: "+55-61-9-9999-9999",
    heroPhone: {
      display: "(61) 9 9999-9999",
      telHref: "+5561999999999",
    },
    agent: {
      phoneDisplay: "(61) 9 9999-9999",
      instagramHandle: "@brunolacerda.imoveis",
    },
  },

  cosmeticos: {
    floatingCta: {
      whatsappNumber: "5561995090622",
      whatsappMessage: "Ola! Vi o site e gostaria de saber mais sobre os produtos e como me tornar revendedora.",
      phoneNumber: "6199999999",
      bookingUrl: "#contato",
    } satisfies FloatingCtaContact,
    seoTelephone: "+55-61-9-9999-9999",
    whatsapp: {
      number: "5561995090622",
      resellerMessage: "Ola! Gostaria de me tornar revendedora dos seus produtos.",
    },
  },

  dueto: {
    floatingCta: {
      whatsappNumber: "5561995090622",
      whatsappMessage: "Ola! Vi o site da Dueto Academia e gostaria de informacoes sobre matricula.",
      phoneNumber: "61995029627",
      bookingUrl: "#matricula",
    } satisfies FloatingCtaContact,
    seoTelephone: "+55-61-99502-9627",
    email: "academiademusicadueto@gmail.com",
    instagramUrl: "https://www.instagram.com/duetoacademiademusica",
    whatsapp: {
      number: "5561995090622",
      helpMessage: "Ola! Gostaria de ajuda para escolher modalidade e instrumento na Dueto.",
      enrollmentMessage: "Ola! Gostaria de informacoes sobre matricula na Dueto Academia de Musica.",
    },
  },
} as const;

export function buildWhatsAppHref(whatsappNumber: string, message?: string): string {
  const base = `https://wa.me/${whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function buildTelHref(phone: string): string {
  const cleaned = phone.startsWith("+") ? `+${phone.slice(1).replace(/\D/g, "")}` : phone.replace(/\D/g, "");
  return `tel:${cleaned}`;
}
