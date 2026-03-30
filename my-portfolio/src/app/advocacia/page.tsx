import type { Metadata } from "next";
import { buildMetadata, advocaciaJsonLd } from "@/lib/seo";
import { contactConfig } from "@/lib/contact-config";

import HeroSection      from "@/components/advocacia/HeroSection";
import PracticeAreas    from "@/components/advocacia/PracticeAreas";
import AttorneysGrid    from "@/components/advocacia/AttorneysGrid";
import TestimonialsGrid from "@/components/advocacia/TestimonialsGrid";
import LeadForm         from "@/components/advocacia/LeadForm";
import FloatingCTA      from "@/components/ui/FloatingCTA";

export const metadata: Metadata = buildMetadata({
  title: "Advocacia Corporativa em Brasília | M&A, Contratos e Contencioso",
  description: "Escritório de advocacia empresarial com 22 anos de atuação. Especialistas em M&A, contratos complexos, arbitragem, tributário e compliance. OAB/DF.",
  path: "/advocacia",
  ogImage: "/og/advocacia.png",
});

export default function AdvocaciaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(advocaciaJsonLd()) }}
      />
      <HeroSection theme="dark" />
      <PracticeAreas theme="dark" />
      <AttorneysGrid theme="dark" />
      <TestimonialsGrid theme="dark" />
      <LeadForm theme="dark" />
      <FloatingCTA
        whatsappNumber={contactConfig.advocacia.floatingCta.whatsappNumber}
        whatsappMessage={contactConfig.advocacia.floatingCta.whatsappMessage}
        phoneNumber={contactConfig.advocacia.floatingCta.phoneNumber}
        bookingUrl={contactConfig.advocacia.floatingCta.bookingUrl}
        theme="dark"
      />
    </>
  );
}
