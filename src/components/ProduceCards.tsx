"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./ui";
import Reveal from "./ui/Reveal";

export type ProduceCategory = {
  lot: string;
  name: string;
  blurb: string;
  examples: string[];
  accent: string;
  image: string;
};

export const PRODUCE: ProduceCategory[] = [
  {
    lot: "LOT 02 · FRUITS",
    name: "Fruits",
    blurb:
      "Seasonal and staple fruits picked at ripeness for dessert counters, juice bars, and breakfast spreads.",
    examples: ["Banana", "Apple", "Pomegranate", "Sweet Lime", "Papaya", "Watermelon"],
    accent: "#d24b3e",
    image: "/fruits.png",
  },
  {
    lot: "LOT 03 · VEGETABLES",
    name: "Vegetables",
    blurb:
      "Everyday kitchen vegetables in restaurant-grade quantities, sorted and graded before dispatch.",
    examples: ["Tomato", "Onion", "Potato", "Capsicum", "Carrot", "Brinjal"],
    accent: "#e59a2e",
    image: "/vegetables.png",
  },
  {
    lot: "LOT 04 · LEAFY GREENS",
    name: "Leafy Greens",
    blurb:
      "Our specialty. The most perishable category, handled with the tightest turnaround so it reaches your kitchen crisp.",
    examples: ["Spinach", "Methi", "Coriander", "Curry Leaves", "Mint", "Amaranth"],
    accent: "#5c8a3a",
    image: "/leafyvegetables.png",
  },
];

export default function ProduceCards({
  showExamples = false,
}: {
  showExamples?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduce = useReducedMotion();

  function cardAnim(i: number) {
    if (reduce) return {};
    if (hovered === null) return { y: 0, scale: 1, filter: "blur(0px)", opacity: 1 };
    if (hovered === i) return { y: -14, scale: 1.02, filter: "blur(0px)", opacity: 1 };
    return { y: 0, scale: 0.98, filter: "blur(3px)", opacity: 0.65 };
  }

  return (
    <div className="grid gap-6 md:grid-cols-3" style={{ perspective: "1200px" }}>
      {PRODUCE.map((cat, i) => (
        <Reveal key={cat.name} delay={i * 0.08}>
          <motion.article
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            animate={cardAnim(i)}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ position: "relative", zIndex: hovered === i ? 20 : 1 }}
            className={`relative flex h-full min-h-[20rem] flex-col overflow-hidden rounded-2xl border border-stone/50 p-7 ${
              cat.name === "Leafy Greens" ? "ring-1 ring-leaf/30" : ""
            }`}
          >
            {/* Produce photograph fills the card; a scrim keeps text legible. */}
            <Image
              src={cat.image}
              alt={`Fresh ${cat.name.toLowerCase()} in a basket.`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center"
              draggable={false}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-husk/85 via-husk/45 to-husk/15"
            />

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-center justify-end">
                <span
                  aria-hidden
                  className="h-3 w-3 rounded-full ring-2 ring-paper/40"
                  style={{ backgroundColor: cat.accent }}
                />
              </div>
              <h3 className="mt-auto font-display text-2xl font-bold text-paper">
                {cat.name}
              </h3>
              <p className="mt-3 font-editorial text-sm leading-relaxed text-paper/85">
                {cat.blurb}
              </p>
              {cat.name === "Leafy Greens" && (
                <p className="mt-4">
                  <Eyebrow className="!text-citrus-soft">OUR SPECIALTY</Eyebrow>
                </p>
              )}
              {showExamples && (
                <ul className="mt-5 flex flex-wrap gap-2 border-t border-paper/25 pt-5">
                  {cat.examples.map((e) => (
                    <li
                      key={e}
                      className="rounded-md bg-paper/15 px-3 py-1 text-xs font-medium text-paper backdrop-blur-sm"
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.article>
        </Reveal>
      ))}
    </div>
  );
}
