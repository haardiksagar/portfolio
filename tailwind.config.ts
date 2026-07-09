import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        paper: "var(--color-paper)",
        panel: "var(--color-panel)",
        line: "var(--color-line)",
        muted: "var(--color-muted)",
        muted2: "var(--color-muted2)",
        gold: "var(--color-gold)",
        goldDim: "var(--color-goldDim)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
        cinzel: ["var(--font-cinzel)"],
      },
      maxWidth: {
        content: "680px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
