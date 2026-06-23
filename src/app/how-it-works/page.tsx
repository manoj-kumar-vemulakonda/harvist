import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui";
import Reveal from "@/components/ui/Reveal";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import FaqCards from "@/components/FaqCards";
import CtaBand from "@/components/CtaBand";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "How It Works",
  description: `Register, we source fresh each morning at ${BRAND.sourceMarket}, and we deliver to your ${BRAND.city} kitchen on schedule. Here's how supply with ${BRAND.name} works.`,
};

const FAQS = [
  {
    q: "Is there a minimum order or platform fee?",
    a: "No platform fees and no app to sign up for. We agree a working order with you directly. As we grow we'll keep the relationship simple — you order, we deliver.",
  },
  {
    q: "How fresh is the produce?",
    a: `Orders are hand-picked the same morning at ${BRAND.sourceMarket} and other ${BRAND.city} markets, graded, and dispatched — leafy greens get the tightest turnaround of all.`,
  },
  {
    q: "What if I need to change my order?",
    a: "Tell us your delivery window and standing list when you register. Day-to-day changes are a quick message away — you're dealing with people, not a checkout.",
  },
  {
    q: "Which areas do you deliver to?",
    a: `We serve kitchens across ${BRAND.city}. Share your location on the partner form and we'll confirm your delivery schedule.`,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Section className="bg-paper">
        <div className="mx-auto max-w-3xl pt-12 sm:pt-6">
          <Reveal>
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-husk sm:text-5xl">
              Three steps from{" "}
              <span className="font-serif font-normal italic text-leaf">
                market to kitchen.
              </span>
            </h1>
            <p className="mt-6 font-editorial text-lg leading-relaxed text-husk/75">
              No app, no friction. You tell us what you need, we do the early
              mornings, and your crates arrive ready to plate.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <HowItWorksSteps />
      </Section>

      {/* FAQ */}
      <Section>
        <Reveal>
          <Eyebrow>GOOD TO KNOW</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-field sm:text-4xl">
            Questions kitchens usually ask.
          </h2>
        </Reveal>
        <FaqCards faqs={FAQS} />
      </Section>

      <CtaBand
        heading="Ready when you are."
        sub="Register your kitchen and we'll take it from there."
      />
    </>
  );
}
