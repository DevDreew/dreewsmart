import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsFlutuante from "@/components/WhatsFlutuante";
import CartDrawer from "@/components/CartDrawer";

// Fontes self-hosted (variáveis, subset latin) — sem request de
// terceiro no caminho crítico. Ajuda direto no teto de LCP < 1.8s.
const archivo = localFont({
  src: "../fonts/archivo-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-archivo",
  display: "swap",
});

const interTight = localFont({
  src: "../fonts/inter-tight-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrains = localFont({
  src: "../fonts/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DREEWSMART — Academia e suplemento sob o mesmo padrão",
  description:
    "Barra não negocia. Academia 24h em Barueri e linha própria de suplemento com rótulo aberto. Dose declarada. Sem blend proprietário.",
  openGraph: {
    title: "DREEWSMART",
    description: "Rótulo aberto. Equipamento que aguenta. Barueri/SP.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${archivo.variable} ${interTight.variable} ${jetbrains.variable} min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsFlutuante />
        <CartDrawer />
      </body>
    </html>
  );
}
