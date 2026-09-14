import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bilan — le rapport mensuel qui s'envoie tout seul",
  description:
    "Bilan met en page et envoie le rapport mensuel de vos clients, avec accusé de lecture. Cinq minutes par mois, zéro relance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${plex.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
