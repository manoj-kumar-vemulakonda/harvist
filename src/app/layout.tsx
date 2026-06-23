import type { Metadata } from "next";
import { Manrope, Inter, Cormorant_Garamond, Lora } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/brand";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Manrope, exclusively — the clean modernist voice of the "Refined Harvest" system.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — Fresh Produce Supply for ${BRAND.city} Kitchens`,
    template: `%s · ${BRAND.name}`,
  },
  description: `${BRAND.name} supplies fresh fruits, vegetables, and leafy greens to hotels, restaurants, cloud kitchens, caterers, and tiffin services across ${BRAND.city}. Sourced from trusted farms, delivered on time.`,
  keywords: [
    "B2B vegetable supply Hyderabad",
    "fresh produce for restaurants",
    "hotel vegetable supplier",
    "leafy greens wholesale Hyderabad",
    BRAND.name,
  ],
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: `Fresh fruits, vegetables, and leafy greens for ${BRAND.city} hotels and restaurants.`,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", manrope.variable, "font-sans", inter.variable, cormorant.variable, lora.variable)}
    >
      <body className="min-h-full flex flex-col bg-paper text-husk">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
