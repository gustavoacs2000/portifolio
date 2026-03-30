import type { Metadata } from "next";
import { buildWhatsAppHref, contactConfig } from "@/lib/contact-config";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://seudominio.com.br";

const OG_IMAGES = {
  home:      `${BASE_URL}/og/home.jpg`,
  clinica:   `${BASE_URL}/og/clinica.jpg`,
  advocacia: `${BASE_URL}/og/advocacia.jpg`,
  imoveis:   `${BASE_URL}/og/imoveis.jpg`,
};

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${BASE_URL}${path}`;
  const image = ogImage ?? OG_IMAGES.home;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Landing Pages Premium",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function clinicaJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${BASE_URL}/clinica`,
    name: "Clínica Estética & Medicina",
    description: "Clínica de medicina estética em Brasília. Protocolos personalizados com tecnologia de ponta.",
    url: `${BASE_URL}/clinica`,
    telephone: contactConfig.clinica.seoTelephone,
    image: `${BASE_URL}/images/clinica/hero-doctor.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "SHN Quadra 02, Bloco A, Sala 101",
      addressLocality: "Brasília",
      addressRegion: "DF",
      postalCode: "70702-906",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -15.7942,
      longitude: -47.8825,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "08:00", closes: "13:00" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 1200,
      bestRating: 5,
      worstRating: 1,
    },
    medicalSpecialty: "Dermatology",
    priceRange: "$$",
  };
}

export function advocaciaJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${BASE_URL}/advocacia`,
    name: "Mendonça & Associados Advocacia Corporativa",
    description: "Escritório de advocacia corporativa em Brasília. Especialistas em M&A, contratos e contencioso estratégico.",
    url: `${BASE_URL}/advocacia`,
    telephone: contactConfig.advocacia.seoTelephone,
    image: `${BASE_URL}/images/advocacia/hero-office.jpg`,
    foundingDate: "2002",
    address: {
      "@type": "PostalAddress",
      streetAddress: "SCS Quadra 06, Bloco A, Sala 702",
      addressLocality: "Brasília",
      addressRegion: "DF",
      postalCode: "70306-916",
      addressCountry: "BR",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
    areaServed: [
      { "@type": "City", name: "Brasília" },
      { "@type": "City", name: "São Paulo" },
    ],
    knowsAbout: [
      "Direito Empresarial",
      "Fusões e Aquisições",
      "Arbitragem",
      "Tributário",
      "Compliance",
      "LGPD",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços Jurídicos",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Direito Empresarial" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Contencioso Estratégico" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Regulatório & Compliance" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tributário" } },
      ],
    },
  };
}

export function imoveisJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${BASE_URL}/imoveis`,
    name: "Bruno Lacerda — Imóveis de Luxo Brasília",
    description: "Corretor de imóveis de alto padrão em Brasília. Especialista em Lago Sul, Sudoeste e Park Way. CRECI/DF 12.345-F.",
    url: `${BASE_URL}/imoveis`,
    telephone: contactConfig.imoveis.seoTelephone,
    image: `${BASE_URL}/images/imoveis/agent-profile.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brasília",
      addressRegion: "DF",
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "Place", name: "Lago Sul" },
      { "@type": "Place", name: "Lago Norte" },
      { "@type": "Place", name: "Sudoeste" },
      { "@type": "Place", name: "Park Way" },
      { "@type": "Place", name: "Noroeste" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 180,
      bestRating: 5,
      worstRating: 1,
    },
    knowsAbout: [
      "Imóveis de Luxo",
      "Alto Padrão Brasília",
      "Lago Sul",
      "Investimento Imobiliário",
    ],
  };
}

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": BASE_URL,
    name: "Landing Pages Premium",
    description: "Desenvolvimento de landing pages de alta performance para negócios de alto valor.",
    url: BASE_URL,
  };
}

export function cosmeticosJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/cosmeticos`,
    name: "Isabela Monteiro — Representante de Cosméticos",
    description:
      "Representante exclusiva de marcas premium de beleza para salões, clínicas e revendedores no DF. L'Oréal, Wella, Kérastase, La Roche-Posay e mais.",
    url: `${BASE_URL}/cosmeticos`,
    telephone: contactConfig.cosmeticos.seoTelephone,
    image: `${BASE_URL}/images/cosmeticos/representative-profile.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brasília",
      addressRegion: "DF",
      addressCountry: "BR",
    },
    areaServed: { "@type": "City", name: "Brasília" },
    knowsAbout: [
      "Cosméticos",
      "Produtos de Beleza",
      "L'Oréal Professionnel",
      "Wella Professionals",
      "Kérastase",
      "La Roche-Posay",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 5.0,
      reviewCount: 300,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

// ─── JSON-LD: MusicSchool (Dueto) ─────────────────────────────────────────────

export function duetoJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicSchool",
    "@id": `${BASE_URL}/dueto`,
    name: "Dueto Academia de Musica",
    description:
      "Escola de musica no Guara, DF, com aulas de violino, viola de arco, violoncelo, violao e piano para criancas e adultos.",
    url: `${BASE_URL}/dueto`,
    telephone: contactConfig.dueto.seoTelephone,
    email: contactConfig.dueto.email,
    image:
      "https://lh3.googleusercontent.com/sitesv/APaQ0STzxEmC0NIWifX_iblzzXWP8dAmtIkRezOKBMyaXJpO_jr2zlyxLmKjXK_z1hmbTPHFrJTXoxFo1sliIY71JInERnLo725Z3fbnX1FtcG07t6OxuSLrf3_ZaRZtQbAaWQ0wfV_lgO0IyrgMOM2yleLnaBAKktIozcXVDMC9wc9sj6G7U0Zv2QXYjJY=w16383",
    address: {
      "@type": "PostalAddress",
      streetAddress: "QI 25, Bloco A, Edificio Real Mix, Cobertura 5",
      addressLocality: "Guara",
      addressRegion: "DF",
      postalCode: "71060-263",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -15.8359045,
      longitude: -47.9787796,
    },
    areaServed: [
      { "@type": "City", name: "Guara" },
      { "@type": "City", name: "Brasilia" },
      { "@type": "AdministrativeArea", name: "Distrito Federal" },
    ],
    sameAs: [
      contactConfig.dueto.instagramUrl,
      buildWhatsAppHref(contactConfig.dueto.whatsapp.number),
      "https://www.google.com/maps/place/Dueto+Academia+de+M%C3%BAsica/data=!4m7!3m6!1s0x935a3367f5e8d41f:0x1f1a1f4d09e38497!8m2!3d-15.8359045!4d-47.9787796!16s%2Fg%2F11ptmc9m53!19sChIJH9To9WczWpMRl4TjCU0fGh8?hl=pt-BR&rclk=1",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:00",
        closes: "16:00",
      },
    ],
    knowsAbout: [
      "Violino",
      "Viola de Arco",
      "Violoncelo",
      "Violao",
      "Piano",
      "Aulas Individuais",
      "Aulas Coletivas",
      "Musica para Criancas",
      "Musica para Adultos",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Modalidades",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aulas de Violino" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aulas de Viola de Arco" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aulas de Violoncelo" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aulas de Violao" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aulas de Piano" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aulas Individuais" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aulas Coletivas" } },
      ],
    },
  };
}
