import { Container } from "./ui";

const PILLARS = [
  {
    title: "Sourced from Trusted Farms",
    note: "Hand-picked at the mandi, checked before it leaves.",
  },
  {
    title: "On-Time Delivery",
    note: "Your kitchen runs on schedule. So do we.",
  },
  {
    title: "Consistent Quality",
    note: "The same grade, every single crate.",
  },
];

export default function TrustBar() {
  return (
    <div className="border-y border-stone/40 bg-paper-deep/60">
      <Container>
        <ul className="grid gap-px sm:grid-cols-3">
          {PILLARS.map((p) => (
            <li key={p.title} className="py-7 sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <div className="flex items-start gap-3">
                <Leaf />
                <div>
                  <p className="font-display font-semibold text-field">{p.title}</p>
                  <p className="mt-1 font-editorial text-sm text-husk/65">{p.note}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

function Leaf() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5 shrink-0">
      <path
        d="M12 21c0-7 3-12 9-13 1 8-3 13-9 13Z"
        fill="#5c8a3a"
      />
      <path d="M12 21V11" stroke="#3f6a31" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
