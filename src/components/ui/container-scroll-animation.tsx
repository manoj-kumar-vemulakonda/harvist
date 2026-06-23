"use client";

import React, { useRef } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-driven 3D tilt reveal (adapted from Aceternity's container-scroll).
 * Re-themed to the Harvist "Refined Harvest" palette — taupe stage, cream
 * framed card, sage/stone hairlines — instead of the original dark device card.
 *
 * As the container scrolls through the viewport the title drifts up while the
 * card rotates from a tilted plane (rotateX 20°) to flat and settles to 1× scale.
 * Honours `prefers-reduced-motion`: the effect is disabled and everything
 * renders flat.
 */
export const ContainerScroll = ({
  titleComponent,
  children,
  className,
  cardClassName,
  innerClassName,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
  /** Outer stage (controls overall height + padding). */
  className?: string;
  /** The tilting card frame. Override to go frameless. */
  cardClassName?: string;
  /** The card's inner surface. */
  innerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = (): [number, number] =>
    isMobile ? [0.8, 1] : [1.05, 1];

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-[58rem] items-center justify-center p-2 md:h-[74rem] md:p-12",
        className,
      )}
    >
      <div
        className="relative w-full py-8 md:py-28"
        style={{ perspective: "1000px" }}
      >
        <Header translate={prefersReduced ? null : translate}>
          {titleComponent}
        </Header>
        <Card
          rotate={prefersReduced ? null : rotate}
          scale={prefersReduced ? null : scale}
          cardClassName={cardClassName}
          innerClassName={innerClassName}
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

const Header = ({
  translate,
  children,
}: {
  translate: MotionValue<number> | null;
  children: React.ReactNode;
}) => (
  <motion.div
    style={translate ? { translateY: translate } : undefined}
    className="mx-auto max-w-3xl text-center"
  >
    {children}
  </motion.div>
);

const Card = ({
  rotate,
  scale,
  cardClassName,
  innerClassName,
  children,
}: {
  rotate: MotionValue<number> | null;
  scale: MotionValue<number> | null;
  cardClassName?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) => (
  <motion.div
    style={rotate && scale ? { rotateX: rotate, scale } : undefined}
    className={cn(
      "mx-auto -mt-8 h-[26rem] w-full max-w-5xl rounded-[30px] border border-stone/60 bg-card p-2 shadow-2xl md:h-[38rem] md:p-4",
      cardClassName,
    )}
  >
    <div
      className={cn(
        "h-full w-full overflow-hidden rounded-2xl bg-paper-deep",
        innerClassName,
      )}
    >
      {children}
    </div>
  </motion.div>
);
