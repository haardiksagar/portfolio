"use client";

import { useState } from "react";
import { profile, socials } from "../content";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [msgOpen, setMsgOpen] = useState(false);

  return (
    <header className="animate-fadeUp">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-y-6">
        <h1 className="font-display italic text-[15vw] leading-[0.9] sm:text-6xl md:text-7xl text-paper">
          {profile.handle}
          <span className="text-gold">.</span>
        </h1>
        
        <nav className="sm:mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 relative">
          {socials.map((s) => {
            if (s.label === "MSG") {
              return (
                <div key={s.label} className="relative flex items-center">
                  <button
                    onClick={() => setMsgOpen(!msgOpen)}
                    className="font-mono text-xs tracking-[0.1em] text-muted hover:text-gold transition-colors duration-200 uppercase outline-none p-0 m-0 bg-transparent leading-none"
                  >
                    {s.label}
                  </button>
                  {msgOpen && (
                    <div className="absolute top-full mt-2 left-0 sm:left-auto sm:right-0 bg-panel border border-line rounded-md p-3 shadow-xl z-50 min-w-[200px] animate-fadeUp">
                      <p className="font-mono text-[10px] text-muted mb-1 uppercase tracking-wider">Email me at</p>
                      <a 
                        href={`mailto:${profile.email}`} 
                        className="font-mono text-xs text-paper hover:text-gold transition-colors duration-200 block truncate"
                      >
                        {profile.email}
                      </a>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a
                key={s.label}
                href={s.href}
                title={s.title}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-mono text-xs tracking-[0.1em] text-muted hover:text-gold transition-colors duration-200 uppercase outline-none p-0 m-0 bg-transparent leading-none"
              >
                {s.label}
              </a>
            );
          })}
        </nav>
      </div>
      
      <p className="mt-5 font-mono text-sm text-muted max-w-[46ch]">
        <span className="text-goldDim">$</span> {profile.tagline}
      </p>

      <ThemeToggle />
    </header>
  );
}
