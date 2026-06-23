import type { Metadata } from "next";
import { Section } from "@/components/ui";
import Reveal from "@/components/ui/Reveal";
import AboutUsSection from "@/components/ui/about-us-section";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description: `${BRAND.name} is a dedicated B2B fresh-produce partner for ${BRAND.city}'s hotels, restaurants, cloud kitchens, caterers and tiffin services — built on consistent quality and reliable delivery.`,
};

export default function AboutPage() {
  return (
    <>
      <Section className="bg-paper">
        <div className="mx-auto max-w-3xl pt-12 sm:pt-6">
          <Reveal>
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-husk sm:text-5xl">
              A partner built for{" "}
              <span className="font-serif font-normal italic text-leaf">
                professional kitchens.
              </span>
            </h1>
            <p className="mt-6 font-editorial text-lg leading-relaxed text-husk/75">
              {BRAND.name} supplies fresh fruits, vegetables and leafy greens to{" "}
              {BRAND.city}&rsquo;s hotels, restaurants, cloud kitchens, caterers
              and tiffin services. We built it around a simple belief: a kitchen
              is only as good as what comes through its back door — so we treat
              every crate like it&rsquo;s headed straight for the plate.
            </p>
            <p className="mt-4 font-editorial text-lg leading-relaxed text-husk/75">
              That means doing the unglamorous part well — sourcing early,
              grading honestly, and delivering on time, every day — so the people
              cooking can trust what lands at their door.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* What we do — integrated AboutUsSection component */}
      <AboutUsSection />
    </>
  );
}
