import { profile, stack } from "../content";

const lines: [string, string][] = [
  ["languages", stack.languages],
  ["frontend", stack.frontend],
  ["backend", stack.backend],
  ["infra", stack.infra],
];

export default function Terminal() {
  return (
    <div className="rounded-lg border border-line/80 bg-panel overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-line/80 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3c]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3c]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3c]" />
        <span className="ml-3 font-mono text-[11px] text-muted2">
          ~/{profile.handle} — zsh
        </span>
      </div>

      <div className="px-5 py-5 font-mono text-[13px] leading-7">
        <p className="text-muted">
          <span className="text-gold">~/{profile.handle}</span>
        </p>
        <p className="text-paper">
          <span className="text-gold">$</span> cat stack.txt
        </p>
        <div className="mt-1">
          {lines.map(([key, value]) => (
            <p key={key}>
              <span className="text-goldDim">{key}</span>
              <span className="text-muted2">: </span>
              <span className="text-muted">{value}</span>
            </p>
          ))}
        </div>
        <p className="mt-1 text-paper">
          <span className="text-gold">$</span>{" "}
          <span className="animate-blink">▍</span>
        </p>
      </div>
    </div>
  );
}
