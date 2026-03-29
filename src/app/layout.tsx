import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SpotlightEffect from "@/components/SpotlightEffect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OsHe Digital — Agencia de Desarrollo Web & E-commerce",
  description:
    "Transformamos tu negocio con soluciones digitales profesionales. Páginas web, e-commerce, automatizaciones y más. Pereira, Colombia.",
  keywords: [
    "desarrollo web",
    "e-commerce",
    "agencia digital",
    "Pereira",
    "Colombia",
    "OsHe Digital",
  ],
  openGraph: {
    title: "OsHe Digital — Agencia de Desarrollo Web",
    description:
      "Soluciones digitales que generan confianza y resultados para tu negocio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <SpotlightEffect />
        {children}
      </body>
    </html>
  );
}
