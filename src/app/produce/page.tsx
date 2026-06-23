import type { Metadata } from "next";
import Image from "next/image";
import { Section, Eyebrow } from "@/components/ui";
import Reveal from "@/components/ui/Reveal";
import ProduceCards from "@/components/ProduceCards";
import CtaBand from "@/components/CtaBand";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Produce",
  description: `Fresh fruits, vegetables and leafy greens supplied to ${BRAND.city}'s kitchens by ${BRAND.name}. Leafy greens are our specialty — handled with the tightest turnaround.`,
};

export default function ProducePage() {
  return (
    <>
      <Section className="bg-paper">
        <div className="mx-auto max-w-3xl pt-12 sm:pt-6">
          <Reveal>
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-husk sm:text-5xl">
              What we{" "}
              <span className="font-serif font-normal italic text-leaf">
                supply.
              </span>
            </h1>
            <p className="mt-6 font-editorial text-lg leading-relaxed text-husk/75">
              Three categories, one dependable line of supply. Everything is
              sourced fresh each morning, graded, and packed for the trade. The
              lists below are a starting point — if you need something
              specific for your menu, just ask on the partner form.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Scroll-driven 3D reveal — the scene flattens as you scroll into it */}
      <ContainerScroll
        className="h-[48rem] md:h-[64rem]"
        innerClassName="relative"
        titleComponent={
          <div className="px-6">
            <Eyebrow>FROM FARM TO KITCHEN</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-husk sm:text-4xl lg:text-5xl">
              Picked at dawn.{" "}
              <span className="font-serif font-normal italic text-leaf">
                On your line by service.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-editorial text-base leading-relaxed text-husk/70">
              Every crate moves the same day it&rsquo;s picked — sorted, graded,
              and on your prep table before the lunch rush, never left sitting on
              a warehouse shelf.
            </p>
          </div>
        }
      >
        <Image
          src="/processpage.png"
          alt="A Harvist delivery handing a crate of fresh produce to a chef at a hotel entrance."
          fill
          sizes="(max-width: 1024px) 100vw, 64rem"
          className="object-cover object-center"
          draggable={false}
        />
      </ContainerScroll>

      <Section className="pt-0 sm:pt-0">
        <ProduceCards showExamples />
        <Reveal delay={0.2}>
          <p className="mt-10 rounded-2xl border border-stone/50 bg-paper-deep/40 px-6 py-5 text-sm leading-relaxed text-husk/70">
            <span className="stamp text-leaf">A NOTE ON SEASON</span>
            <span className="mt-3 block">
              Availability shifts with the season and the market. We&rsquo;ll
              always tell you what&rsquo;s at its best on a given day rather than
              push tired stock — that&rsquo;s the point of a real supply partner.
            </span>
          </p>
        </Reveal>
      </Section>

      <CtaBand
        heading="Need a specific list for your menu?"
        sub="Send us your usual order and we'll quote it back."
      />
    </>
  );
}
