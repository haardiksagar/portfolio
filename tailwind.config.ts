import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0C",
        paper: "#F2F1EC",
        panel: "#141415",
        line: "#242426",
        muted: "#8B8B8D",
        muted2: "#5C5C5E",
        gold: "#C6A15B",
        goldDim: "#8A7443",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
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
