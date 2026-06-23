import type { Metadata } from "next";
import { Section } from "@/components/ui";
import Reveal from "@/components/ui/Reveal";
import PartnerForm from "@/components/PartnerForm";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Partner With Us",
  description: `Stock your ${BRAND.city} kitchen with farm-fresh produce from ${BRAND.name}. Tell us about your business and our team will set up reliable supply.`,
};

export default function PartnerPage() {
  return (
    <Section className="bg-paper">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <header className="mb-12 text-center sm:mb-16">
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-husk sm:text-5xl">
              Let&rsquo;s stock your{" "}
              <span className="font-serif font-normal italic text-leaf">
                kitchen.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-editorial text-lg text-husk/70">
              {BRAND.name} supplies {BRAND.city}&rsquo;s hotels, restaurants and
              cloud kitchens with produce picked for the trade. Tell us a little
              about your business and we&rsquo;ll line up dependable, fresh
              supply.
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <PartnerForm />
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-8 text-center text-sm text-husk/55">
            We typically respond within one business day.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
