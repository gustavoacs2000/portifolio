import type { Metadata } from "next";
import { contactConfig } from "@/lib/contact-config";

import Navbar         from "@/components/ga/Navbar";
import HeroSection    from "@/components/ga/HeroSection";
import ServicesSection from "@/components/ga/ServicesSection";
import PortfolioGrid  from "@/components/ga/PortfolioGrid";
import ProcessSection from "@/components/ga/ProcessSection";
import TechStack      from "@/components/ga/TechStack";
import ContactSection from "@/components/ga/ContactSection";
import Footer         from "@/components/ga/Footer";

export const metadata: Metadata = {
  title: "GA Solutions | Desenvolvimento Web Premium em Brasília–DF",
  description:
    "Desenvolvemos sites, sistemas e landing pages de alta performance para pequenas e médias empresas em Brasília. Next.js, TypeScript, Lighthouse 95+.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "https://gasolutions.com.br"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "GA Solutions | Desenvolvimento Web Premium em Brasília–DF",
    description: "Sites, sistemas e landing pages de alta performance para PMEs em Brasília.",
    url: "/",
    siteName: "GA Solutions",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "GA Solutions" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GA Solutions | Desenvolvimento Web Premium em Brasília–DF",
    description: "Sites, sistemas e landing pages de alta performance para PMEs em Brasília.",
    images: ["/og/home.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "GA Solutions",
            description: "Desenvolvimento de software premium para PMEs em Brasília. Sites, sistemas e landing pages de alta performance.",
            url: process.env.NEXT_PUBLIC_BASE_URL ?? "https://gasolutions.com.br",
            telephone: contactConfig.ga.phone.seoTelephone,
            email: contactConfig.ga.email,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Brasília",
              addressRegion: "DF",
              addressCountry: "BR",
            },
            areaServed: { "@type": "City", name: "Brasília" },
            knowsAbout: ["Next.js", "TypeScript", "React", "Node.js", "Landing Pages", "SEO Técnico"],
            priceRange: "$$",
          }),
        }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioGrid />
        <ProcessSection />
        <TechStack />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
