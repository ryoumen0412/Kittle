import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { ReaderPreferencesProvider } from "@/components/ReaderPreferencesProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kittle — Espacio de Lectura y Creación Literaria",
  description: "Relatos, cuentos, novelas y reflexiones. Un rincón digital diseñado para la lectura sosegada y la escritura cuidada.",
  keywords: ["historias", "cuentos", "novelas", "blog", "literatura", "escritura", "lectura"],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ReaderPreferencesProvider>
          <Navigation />
          <PageTransition>
            <main className="flex-grow">
              {children}
            </main>
          </PageTransition>
          <Footer />
        </ReaderPreferencesProvider>
      </body>
    </html>
  );
}
