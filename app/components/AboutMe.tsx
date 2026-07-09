import { about } from "../content";
import SectionLabel from "./SectionLabel";

export default function AboutMe() {
  return (
    <section className="mt-16">
      <SectionLabel>{about.eyebrow}</SectionLabel>

      <div className="mt-8 flex flex-col-reverse md:flex-row gap-10 md:gap-14 items-start">
        {/* Text Content */}
        <div className="flex-1 space-y-5 text-[15px] leading-relaxed text-muted max-w-[60ch]">
          <p dangerouslySetInnerHTML={{ __html: about.intro }} />

          <p>{about.techIntro}</p>

          <ul className="grid grid-cols-2 gap-y-2 gap-x-4 font-mono text-[13px] text-muted mt-4 mb-4">
            {about.technologies.map((tech) => (
              <li key={tech} className="flex items-center gap-2.5">
                <span className="text-emerald-400 text-[10px]">▶</span>
                {tech}
              </li>
            ))}
          </ul>

          <p>{about.outro}</p>
        </div>

        {/* Image */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-panel border border-line/50">
            {/* Using a standard img tag for simplicity based on the placeholder, but you can swap to next/image later */}
            <img
              src={about.image}
              alt="About me profile"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
