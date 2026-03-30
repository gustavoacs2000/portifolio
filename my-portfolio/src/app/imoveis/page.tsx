import type { Metadata } from "next";
import { buildMetadata, imoveisJsonLd } from "@/lib/seo";
import { contactConfig } from "@/lib/contact-config";

import HeroSection        from "@/components/imoveis/HeroSection";
import FeaturedProperties from "@/components/imoveis/FeaturedProperties";
import PropertyGallery    from "@/components/imoveis/PropertyGallery";
import AgentProfile       from "@/components/imoveis/AgentProfile";
import ContactForm        from "@/components/imoveis/ContactForm";
import FloatingCTA        from "@/components/ui/FloatingCTA";

export const metadata: Metadata = buildMetadata({
  title: "Imóveis de Luxo em Brasília | Lago Sul, Sudoeste e Park Way",
  description: "Corretor especialista em imóveis de alto padrão em Brasília. Residências, coberturas e casas em condomínio no Lago Sul, Sudoeste e Park Way. CRECI/DF.",
  path: "/imoveis",
  ogImage: "/og/imoveis.jpg",
});

export default function ImoveisPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imoveisJsonLd()) }}
      />
      <HeroSection theme="dark" />
      <FeaturedProperties theme="dark" />
      <PropertyGallery theme="dark" />
      <AgentProfile theme="dark" />
      <ContactForm theme="dark" />
      <FloatingCTA
        whatsappNumber={contactConfig.imoveis.floatingCta.whatsappNumber}
        whatsappMessage={contactConfig.imoveis.floatingCta.whatsappMessage}
        phoneNumber={contactConfig.imoveis.floatingCta.phoneNumber}
        bookingUrl={contactConfig.imoveis.floatingCta.bookingUrl}
        theme="dark"
      />
    </>
  );
}
