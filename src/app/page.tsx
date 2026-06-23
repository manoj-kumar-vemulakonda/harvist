import Link from "next/link";
import Hero from "@/components/Hero";
import ProduceCards from "@/components/ProduceCards";
import WhoWeServe from "@/components/WhoWeServe";
import CtaBand from "@/components/CtaBand";
import { Section, Eyebrow } from "@/components/ui";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Hero />

      {/* What we offer — teaser */}
      <Section>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>WHAT WE SUPPLY</Eyebrow>
              <h2 className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight text-field sm:text-4xl">
                Three categories. One reliable line of supply.
              </h2>
            </div>
            <Link
              href="/produce"
              className="text-sm font-medium text-field underline-offset-4 hover:underline"
            >
              View all →
            </Link>
          </div>
        </Reveal>
        <div className="mt-6">
          <ProduceCards />
        </div>
      </Section>

      {/* Who we serve */}
      <Section className="py-8 sm:py-10">
        <Reveal>
          <WhoWeServe />
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
