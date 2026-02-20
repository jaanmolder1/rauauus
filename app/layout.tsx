import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raua22.ee"),
  title: {
    default: "Raua 22 | Kadriorg, Tallinn",
    template: "%s | Raua 22",
  },
  description:
    "Viis erakordset korterit ajaloolises muinsuskaitsealuses hoones Kadrioru südames. Five exclusive residences in a protected heritage building in Kadriorg.",
  keywords: [
    "Kadriorg korterid",
    "muinsuskaitsealune hoone",
    "eksklusiivne kinnisvara Tallinn",
    "heritage apartment Tallinn",
    "Kadriorg real estate",
  ],
  openGraph: {
    type: "website",
    locale: "et_EE",
    alternateLocale: "en_GB",
    siteName: "Raua 22",
    images: [
      {
        url: "/images/building-exterior.jpeg",
        width: 1200,
        height: 630,
        alt: "Raua 22 — Kadriorg, Tallinn",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="et">
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
