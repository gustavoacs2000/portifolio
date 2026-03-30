import type { Metadata } from "next";
import { buildMetadata, clinicaJsonLd } from "@/lib/seo";
import { contactConfig } from "@/lib/contact-config";

import HeroSection          from "@/components/clinica/HeroSection";
import ServicesGrid         from "@/components/clinica/ServicesGrid";
import DoctorProfile        from "@/components/clinica/DoctorProfile";
import TestimonialsCarousel from "@/components/clinica/TestimonialsCarousel";
import ResultsGallery       from "@/components/clinica/ResultsGallery";
import FloatingCTA          from "@/components/ui/FloatingCTA";

export const metadata: Metadata = buildMetadata({
  title: "Clínica Estética & Medicina | Resultados Naturais em Brasília",
  description: "Protocolos personalizados de medicina estética com tecnologia de ponta. Toxina botulínica, preenchimento, laser e skinbooster. Agende sua consulta.",
  path: "/clinica",
  ogImage: "/og/clinica.jpg",
});

export default function ClinicaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicaJsonLd()) }}
      />
      <HeroSection theme="dark" />
      <ServicesGrid theme="light" />
      <DoctorProfile theme="light" />
      <TestimonialsCarousel theme="dark" />
      <ResultsGallery theme="light" />
      <FloatingCTA
        whatsappNumber={contactConfig.clinica.floatingCta.whatsappNumber}
        whatsappMessage={contactConfig.clinica.floatingCta.whatsappMessage}
        phoneNumber={contactConfig.clinica.floatingCta.phoneNumber}
        bookingUrl={contactConfig.clinica.floatingCta.bookingUrl}
        theme="dark"
      />
    </>
  );
}
