"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./ui/Reveal";

type Faq = { q: string; a: string };

export default function FaqCards({ faqs }: { faqs: Faq[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduce = useReducedMotion();

  function cardAnim(i: number) {
    if (reduce) return {};
    if (hovered === null) return { y: 0, scale: 1, filter: "blur(0px)", opacity: 1 };
    if (hovered === i) return { y: -14, scale: 1.02, filter: "blur(0px)", opacity: 1 };
    return { y: 0, scale: 0.98, filter: "blur(3px)", opacity: 0.65 };
  }

  return (
    <dl className="mt-12 grid gap-6 md:grid-cols-2" style={{ perspective: "1200px" }}>
      {faqs.map((item, i) => (
        <Reveal key={item.q} delay={i * 0.06}>
          <motion.div
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            animate={cardAnim(i)}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ position: "relative", zIndex: hovered === i ? 20 : 1 }}
            className="h-full rounded-2xl border border-stone/50 bg-card p-7"
          >
            <dt className="font-display text-lg font-bold text-field">{item.q}</dt>
            <dd className="mt-3 font-editorial text-sm leading-relaxed text-husk/70">
              {item.a}
            </dd>
          </motion.div>
        </Reveal>
      ))}
    </dl>
  );
}
