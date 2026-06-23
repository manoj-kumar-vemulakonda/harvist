import { BRAND } from "@/lib/brand";
import { Eyebrow } from "./ui";

export default function WhoWeServe() {
  return (
    <div className="rounded-2xl bg-field px-8 py-12 text-paper sm:px-12 sm:py-14">
      <Eyebrow className="!text-citrus-soft">WHO WE SERVE</Eyebrow>
      <h2 className="mt-5 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-[-0.01em] sm:text-4xl">
        Built for the kitchens that feed {BRAND.city}.
      </h2>
      <p className="mt-6 max-w-2xl font-editorial text-base leading-relaxed text-paper/80 sm:text-lg">
        We&rsquo;re a business-to-business supply partner, delivering the raw
        materials &mdash; helping professional kitchens depend on fresh
        vegetables, leafy greens and fruits, straight to your door.
      </p>
      <ul className="mt-9 flex flex-wrap gap-3">
        {BRAND.serves.map((s) => (
          <li
            key={s}
            className="rounded-lg border border-paper/25 px-5 py-2.5 text-sm text-paper/90"
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
