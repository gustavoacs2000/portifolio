import type { Metadata } from "next";
import { buildMetadata, cosmeticosJsonLd } from "@/lib/seo";
import { contactConfig } from "@/lib/contact-config";

import HeroSection      from "@/components/cosmeticos/HeroSection";
import BrandStrip       from "@/components/cosmeticos/BrandStrip";
import ProductCatalog   from "@/components/cosmeticos/ProductCatalog";
import WhyDistribute    from "@/components/cosmeticos/WhyDistribute";
import TestimonialsGrid from "@/components/cosmeticos/TestimonialsGrid";
import ContactForm      from "@/components/cosmeticos/ContactForm";
import FloatingCTA      from "@/components/ui/FloatingCTA";

export const metadata: Metadata = buildMetadata({
  title: "Cosméticos Premium para Revendedores | Brasília–DF",
  description:
    "Representante exclusiva de marcas premium de beleza no DF. L'Oréal, Wella, Kérastase, La Roche-Posay e mais. Condições especiais para salões, clínicas e revendedores.",
  path: "/cosmeticos",
  ogImage: "/images/cosmeticos/og/cosmeticos.png",
});

export default function CosmeticosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cosmeticosJsonLd()) }}
      />
      <HeroSection />
      <BrandStrip />
      <ProductCatalog whatsappNumber={contactConfig.cosmeticos.whatsapp.number} />
      <WhyDistribute whatsappNumber={contactConfig.cosmeticos.whatsapp.number} />
      <TestimonialsGrid />
      <ContactForm whatsappNumber={contactConfig.cosmeticos.whatsapp.number} />
      <FloatingCTA
        whatsappNumber={contactConfig.cosmeticos.floatingCta.whatsappNumber}
        whatsappMessage={contactConfig.cosmeticos.floatingCta.whatsappMessage}
        phoneNumber={contactConfig.cosmeticos.floatingCta.phoneNumber}
        bookingUrl={contactConfig.cosmeticos.floatingCta.bookingUrl}
        theme="dark"
      />
    </>
  );
}
