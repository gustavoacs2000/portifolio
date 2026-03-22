import type { Metadata } from "next";
import { buildMetadata, cosmeticosJsonLd } from "@/lib/seo";

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
  ogImage: "/og/cosmeticos.jpg",
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
      <ProductCatalog whatsappNumber="5561999999999" />
      <WhyDistribute whatsappNumber="5561999999999" />
      <TestimonialsGrid />
      <ContactForm whatsappNumber="5561999999999" />
      <FloatingCTA
        whatsappNumber="5561999999999"
        whatsappMessage="Olá! Vi o site e gostaria de saber mais sobre os produtos e como me tornar revendedora."
        phoneNumber="6199999999"
        bookingUrl="#contato"
        theme="dark"
      />
    </>
  );
}