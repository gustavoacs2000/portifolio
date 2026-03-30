import type { Metadata } from "next";
import { buildMetadata, duetoJsonLd } from "@/lib/seo";
import { contactConfig } from "@/lib/contact-config";
import { fetchDuetoGoogleTestimonials } from "@/lib/dueto-google-reviews";

import HeroSection from "@/components/dueto/HeroSection";
import CoursesGrid from "@/components/dueto/CoursesGrid";
import TeachersSection from "@/components/dueto/TeachersSection";
import TestimonialsCarousel from "@/components/dueto/TestimonialsCarousel";
import EnrollmentForm from "@/components/dueto/EnrollmentForm";
import FloatingCTA from "@/components/ui/FloatingCTA";

export const metadata: Metadata = buildMetadata({
  title: "Dueto Academia de Musica | Escola de Musica no Guara, DF",
  description:
    "Aprenda violino, viola de arco, violoncelo, violao e piano em um espaco acolhedor, com aulas para criancas e adultos no Guara, DF.",
  path: "/dueto",
  ogImage:
    "https://lh3.googleusercontent.com/sitesv/APaQ0STzxEmC0NIWifX_iblzzXWP8dAmtIkRezOKBMyaXJpO_jr2zlyxLmKjXK_z1hmbTPHFrJTXoxFo1sliIY71JInERnLo725Z3fbnX1FtcG07t6OxuSLrf3_ZaRZtQbAaWQ0wfV_lgO0IyrgMOM2yleLnaBAKktIozcXVDMC9wc9sj6G7U0Zv2QXYjJY=w16383",
});

export default async function DuetoPage() {
  const googleTestimonials = await fetchDuetoGoogleTestimonials(6);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(duetoJsonLd()) }} />
      <HeroSection />
      <CoursesGrid />
      <TeachersSection />
      <TestimonialsCarousel testimonials={googleTestimonials ?? undefined} />
      <EnrollmentForm whatsappNumber={contactConfig.dueto.whatsapp.number} />
      <FloatingCTA
        whatsappNumber={contactConfig.dueto.floatingCta.whatsappNumber}
        whatsappMessage={contactConfig.dueto.floatingCta.whatsappMessage}
        phoneNumber={contactConfig.dueto.floatingCta.phoneNumber}
        bookingUrl={contactConfig.dueto.floatingCta.bookingUrl}
        theme="dark"
      />
    </>
  );
}

