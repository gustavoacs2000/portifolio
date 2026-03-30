import type { Metadata } from "next";
import { cormorant, inter, playfair, fraunces, dmSerifDisplay, dmSans, plusJakarta, syne } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Portfólio — Landing Pages Premium",
  description: "Desenvolvimento de landing pages de alta performance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`
    ${cormorant.variable}
    ${inter.variable}
    ${playfair.variable}
    ${fraunces.variable}
    ${dmSerifDisplay.variable}
    ${dmSans.variable}
    ${plusJakarta.variable}
    ${syne.variable}
  `}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
