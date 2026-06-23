import { Container } from "./ui";
import { LiquidLink } from "./ui/LiquidButton";

/** The single bold moment — ripe citrus band driving to the Partner page. */
export default function CtaBand({
  heading = "Ready to stock your kitchen?",
  sub = "Tell us what you run. We'll handle the produce.",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="py-8 sm:py-12">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-citrus px-8 py-10 text-paper sm:flex-row sm:items-center sm:px-12">
          <div>
            <h2 className="font-display text-2xl font-extrabold leading-tight tracking-[-0.01em] sm:text-3xl">
              {heading}
            </h2>
            <p className="mt-2 font-editorial text-paper/85">{sub}</p>
          </div>
          <LiquidLink href="/partner" size="lg" tone="paper">
            Partner With Us
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </LiquidLink>
        </div>
      </Container>
    </section>
  );
}
