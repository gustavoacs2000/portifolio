import type { Metadata } from "next";

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
    telephone: "+55-61-3333-4444",
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
    telephone: "+55-61-3222-5555",
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
    telephone: "+55-61-9-9999-9999",
    image: `${BASE_URL}/images/imoveis/agent-profile.jpg`,
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
    telephone: "+55-61-9-9999-9999",
    image: `${BASE_URL}/images/cosmeticos/representative-profile.jpg`,
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
    name: "Dueto Academia de Música",
    description:
      "Escola de violino em Brasília com aulas individuais, turmas infantis e para adultos. Professores Rafael Duarte e Ana Clara Mendes.",
    url: `${BASE_URL}/dueto`,
    telephone: "+55-61-9-9999-9999",
    image: `${BASE_URL}/images/dueto/hero-teachers.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brasília",
      addressRegion: "DF",
      addressCountry: "BR",
    },
    founder: [
      { "@type": "Person", name: "Rafael Duarte" },
      { "@type": "Person", name: "Ana Clara Mendes" },
    ],
    knowsAbout: [
      "Violino",
      "Música Clássica",
      "Método Suzuki",
      "Musicalização Infantil",
      "Conservatório",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 5.0,
      reviewCount: 200,
      bestRating: 5,
      worstRating: 1,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Modalidades",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aula Individual de Violino" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Turma Infantil" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adultos Iniciantes" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nível Avançado" } },
      ],
    },
  };
}