import { achievements } from "../content";

export default function Achievements() {
  return (
    <ul className="space-y-4">
      {achievements.map((a) => (
        <li key={a.title} className="flex items-start gap-3">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
          <p className="text-sm leading-relaxed text-paper">
            {a.title}
            <span className="block text-muted text-[13px] mt-0.5">
              {a.subtitle}
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
}
