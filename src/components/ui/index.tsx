import { ReactNode } from "react";

/** Centered max-width wrapper with responsive gutters. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Vertical rhythm wrapper for a page section. */
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-8 sm:py-10 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/**
 * Crate-stamp / lot-ticket eyebrow — the signature motif.
 * Encodes real supply info (lot, category, source) rather than decoration.
 */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`stamp inline-flex items-center gap-2 text-leaf ${className}`}
    >
      <span aria-hidden className="inline-block h-px w-6 bg-leaf/60" />
      {children}
    </span>
  );
}
