import type { Metadata } from "next";
import { buildMetadata, duetoJsonLd } from "@/lib/seo";

import HeroSection          from "@/components/dueto/HeroSection";
import CoursesGrid          from "@/components/dueto/CoursesGrid";
import TeachersSection      from "@/components/dueto/TeachersSection";
import TestimonialsCarousel from "@/components/dueto/TestimonialsCarousel";
import EnrollmentForm       from "@/components/dueto/EnrollmentForm";
import FloatingCTA          from "@/components/ui/FloatingCTA";

export const metadata: Metadata = buildMetadata({
  title: "Dueto Academia de Música | Aulas de Violino em Brasília–DF",
  description:
    "Aprenda violino com Rafael e Ana Clara — violinistas formados com anos de experiência em palco e ensino. Turmas infantis, adultos e aulas individuais em Brasília.",
  path: "/dueto",
  ogImage: "/og/dueto.jpg",
});

export default function DuetoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(duetoJsonLd()) }}
      />
      <HeroSection />
      <CoursesGrid />
      <TeachersSection />
      <TestimonialsCarousel />
      <EnrollmentForm whatsappNumber="5561999999999" />
      <FloatingCTA
        whatsappNumber="5561999999999"
        whatsappMessage="Olá! Vi o site da Dueto Academia e gostaria de informações sobre matrícula."
        phoneNumber="6199999999"
        bookingUrl="#matricula"
        theme="dark"
      />
    </>
  );
}