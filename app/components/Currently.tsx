import { currently } from "../content";
import SectionLabel from "./SectionLabel";

export default function Currently() {
  return (
    <section className="mt-16">
      <SectionLabel>{currently.eyebrow}</SectionLabel>

      <a
        href={currently.href}
        className="group block rounded-lg border border-line/80 bg-panel/50 px-5 py-5 transition-colors duration-200 hover:border-gold/40"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl text-paper">
            {currently.name}
            <span className="ml-1.5 inline-block text-gold transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </h3>
        </div>
        <p className="mt-1.5 font-mono text-[12px] tracking-wide text-goldDim">
          {currently.role} · {currently.period}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted max-w-[54ch]">
          {currently.description}
        </p>
      </a>
    </section>
  );
}
