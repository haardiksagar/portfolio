# Implementation Plan: Animated Intro/Preloader for Next.js

## Objective

Add a full-screen, one-time-per-session page-load animation to an existing
Next.js project: a percentage counter (0→100) → a brand/name text reveal →
a 4-panel curtain wipe that reveals the page underneath. Built with GSAP.
No paid GSAP plugins are used (text is split into spans by hand instead of
using SplitText).

Read this whole plan before making changes. Steps 0 and 1 involve detecting
facts about the target project that change how later steps are applied.

---

## Step 0 — Detect the project shape

Before writing anything, inspect the target repo and determine:

1. **Router type**: does `app/layout.tsx` (or `.jsx`) exist? → App Router.
   Otherwise look for `pages/_app.tsx` (or `.jsx`) → Pages Router. This
   plan's default instructions target App Router; Pages Router deltas are
   called out separately in Step 4b.
2. **Language**: TypeScript (`tsconfig.json` present) or JavaScript. If
   JavaScript, strip the type annotations from the code in Step 2 (the
   `IntroProps` interface and the `: ReactNode` etc.) but keep the logic
   identical.
3. **Package manager**: look for `package-lock.json` (npm), `yarn.lock`
   (yarn), or `pnpm-lock.yaml` (pnpm), and use the matching install command
   in Step 1.
4. **Existing global fonts**: check `app/layout.tsx` for existing
   `next/font/google` (or `next/font/local`) usage. If the project already
   defines a display/heading font and a mono font, prefer reusing those
   font variables instead of adding Space Grotesk / JetBrains Mono (see
   Step 3 for both paths).
5. **Path alias**: check `tsconfig.json` / `jsconfig.json` `compilerOptions.paths`
   for a `@/*` alias. If it doesn't exist, use relative imports instead of
   `@/components/Intro` in Step 4.

---

## Step 1 — Install the dependency

Only one runtime dependency is required: `gsap`.

```bash
npm install gsap
# or: yarn add gsap
# or: pnpm add gsap
```

---

## Step 2 — Create the component files

Create these two files exactly as given. Do not rename the CSS classes —
`Intro.tsx` and `Intro.module.css` reference each other by class name.

### `components/Intro.tsx`

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Intro.module.css';

interface IntroProps {
  /** Brand / name text revealed after the counter finishes */
  name?: string;
  /** Small eyebrow label shown above the counter */
  label?: string;
  /** How long the counter takes to reach 100 (seconds) */
  counterDuration?: number;
  /** Only play once per browser tab session (uses sessionStorage) */
  once?: boolean;
  /** Called the moment the intro has fully wiped away (or been skipped) */
  onComplete?: () => void;
}

export default function Intro({
  name = 'Studio',
  label = 'Loading',
  counterDuration = 2,
  once = true,
  onComplete,
}: IntroProps) {
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Decide once, on mount, whether the intro should play at all.
  useEffect(() => {
    if (once && typeof window !== 'undefined' && sessionStorage.getItem('intro-played')) {
      onComplete?.();
      return;
    }
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mounted || !overlayRef.current) return;

    const finish = () => {
      if (once) sessionStorage.setItem('intro-played', 'true');
      overlayRef.current?.remove();
      onComplete?.();
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.4, onComplete: finish });
      return;
    }

    const letters = nameRef.current?.querySelectorAll(`.${styles.letter}`) ?? [];
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    const counter = { val: 0 };

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(counter, {
      val: 100,
      duration: counterDuration,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.floor(counter.val)).padStart(3, '0');
        }
        if (barRef.current) {
          barRef.current.style.width = `${counter.val}%`;
        }
      },
    })
      .to(counterRef.current, { yPercent: -110, autoAlpha: 0, duration: 0.5, ease: 'power3.in' }, '+=0.15')
      .to(barRef.current, { autoAlpha: 0, duration: 0.3 }, '<')
      .fromTo(
        letters,
        { yPercent: 110, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.035, ease: 'power4.out' },
        '-=0.25'
      )
      .to(letters, { yPercent: -110, autoAlpha: 0, duration: 0.5, stagger: 0.02, ease: 'power3.in' }, '+=0.55')
      .to(
        panels,
        { yPercent: -100, duration: 0.9, ease: 'power4.inOut', stagger: 0.07, onComplete: finish },
        '-=0.2'
      );

    return () => {
      tl.kill();
    };
  }, [mounted, counterDuration, once]);

  const handleSkip = () => {
    tlRef.current?.progress(1);
  };

  if (!mounted) return null;

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.panels} aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className={styles.panel}
          />
        ))}
      </div>

      <div className={styles.stage}>
        <span className={styles.eyebrow}>{label}</span>

        <span ref={counterRef} className={styles.counter} aria-hidden="true">
          000
        </span>

        <div ref={nameRef} className={styles.name} aria-hidden="true">
          {name.split('').map((char, i) => (
            <span key={i} className={styles.letterMask}>
              <span className={styles.letter}>{char === ' ' ? '\u00A0' : char}</span>
            </span>
          ))}
        </div>

        <div className={styles.track} aria-hidden="true">
          <div ref={barRef} className={styles.bar} />
        </div>
      </div>

      <button type="button" className={styles.skip} onClick={handleSkip}>
        Skip
      </button>

      <span className={styles.srOnly} role="status">
        {name} is loading
      </span>
    </div>
  );
}
```

### `components/Intro.module.css`

```css
.overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
  color: #f2f0ea;
  overflow: hidden;
}

.panels {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
}

.panel {
  flex: 1;
  background: #0a0a0a;
  border-right: 1px solid rgba(242, 240, 234, 0.05);
}

.panel:last-child {
  border-right: none;
}

.stage {
  position: relative;
  z-index: 3;
  width: min(90vw, 640px);
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.eyebrow {
  position: absolute;
  top: -3rem;
  left: 0;
  font-family: var(--font-mono, 'JetBrains Mono'), ui-monospace, monospace;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(242, 240, 234, 0.5);
}

.counter {
  position: absolute;
  font-family: var(--font-mono, 'JetBrains Mono'), ui-monospace, monospace;
  font-size: clamp(3.25rem, 11vw, 7rem);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.03em;
  line-height: 1;
}

.name {
  position: absolute;
  display: flex;
  font-family: var(--font-display, 'Space Grotesk'), ui-sans-serif, sans-serif;
  font-weight: 700;
  font-size: clamp(2.1rem, 8vw, 5.5rem);
  letter-spacing: -0.02em;
  line-height: 1;
}

.letterMask {
  display: inline-block;
  overflow: hidden;
}

.letter {
  display: inline-block;
  will-change: transform;
}

.track {
  position: absolute;
  bottom: -3rem;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(242, 240, 234, 0.12);
}

.bar {
  height: 100%;
  width: 0%;
  background: #f2f0ea;
}

.skip {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  z-index: 4;
  background: transparent;
  border: none;
  color: rgba(242, 240, 234, 0.5);
  font-family: var(--font-mono, 'JetBrains Mono'), ui-monospace, monospace;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0.5rem;
}

.skip:hover {
  color: #f2f0ea;
}

.skip:focus-visible {
  outline: 1px solid #f2f0ea;
  outline-offset: 2px;
}

.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 640px) {
  .panels {
    flex-direction: column;
  }
}
```

If the project is JavaScript, not TypeScript: recreate `Intro.tsx` as
`Intro.jsx` with the same content, minus the `interface IntroProps {...}`
block and the `: HTMLDivElement`, `: gsap.core.Timeline | null`, etc. type
annotations. The runtime logic does not change.

---

## Step 3 — Fonts

The CSS above reads two CSS custom properties with fallbacks:
`--font-display` (used for the big name reveal) and `--font-mono` (used for
the counter, eyebrow label, and skip button). There are two valid paths —
pick one based on what Step 0 found.

### Path A — project has no existing display/mono font pairing

Add Space Grotesk (display) and JetBrains Mono (mono) via `next/font/google`
in `app/layout.tsx`, and apply their CSS variables to the `<html>` tag:

```tsx
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

// then on the <html> tag:
// className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
```

### Path B — project already has a display and/or mono font

Reuse the existing font setup. Find the CSS variable name the project
already uses for its heading/display font and its mono font (if any), and
either:
- rename those variables to `--font-display` / `--font-mono`, or
- edit `components/Intro.module.css` and replace `var(--font-display, ...)`
  / `var(--font-mono, ...)` with the project's actual variable names.

If the project has no mono font at all, it's fine to leave `--font-mono`
unset — the CSS fallback (`'JetBrains Mono', ui-monospace, monospace`) will
be used automatically. Same for `--font-display`.

---

## Step 4 — Integrate into the app

### Step 4a — App Router (`app/layout.tsx` exists)

Open the project's `app/layout.tsx`. Import `Intro` and render it as the
**first child inside `<body>`**, before `{children}`. Do not replace or
remove any existing content in `<body>` — `Intro` is `position: fixed` and
sits visually on top of whatever else is there, then removes itself from
the DOM when its animation finishes.

```tsx
import Intro from '@/components/Intro'; // or relative path, see Step 0.5

export default function RootLayout({ children }) {
  return (
    <html lang="en" /* keep existing className/attributes here */>
      <body /* keep existing className/attributes here */>
        <Intro name="Studio" label="Loading" />
        {children}
      </body>
    </html>
  );
}
```

Replace `"Studio"` with the actual project/brand name. If the layout is a
Server Component (default for `app/layout.tsx`), that's fine — `Intro`
itself is a Client Component (`'use client'` at the top of `Intro.tsx`), so
it can be rendered from a Server Component parent without any extra work.

### Step 4b — Pages Router (`pages/_app.tsx` exists instead)

```tsx
import type { AppProps } from 'next/app';
import Intro from '@/components/Intro';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Intro name="Studio" label="Loading" />
      <Component {...pageProps} />
    </>
  );
}
```

Fonts in Pages Router: `next/font/google` still works the same way inside
`_app.tsx`; apply the returned `.variable` class to a top-level wrapping
element (e.g. a `<div className={...}>` wrapping the fragment's contents),
since there's no single `<html>`/`<body>` file to attach it to.

---

## Step 5 — Customize

Props on `<Intro />`:

| Prop              | Type         | Default    | Behavior                                                     |
|--------------------|--------------|------------|----------------------------------------------------------------|
| `name`             | `string`     | `'Studio'` | Text that reveals after the counter — set to the real brand name |
| `label`            | `string`     | `'Loading'`| Small eyebrow label above the counter                          |
| `counterDuration`  | `number`     | `2`        | Seconds the 0→100 count takes                                   |
| `once`             | `boolean`    | `true`     | Only plays once per browser tab (`sessionStorage`); `false` = plays on every load |
| `onComplete`       | `() => void` | —          | Fires once the curtain has fully wiped away (or been skipped)  |

Other customizations, done by editing the files directly:
- **Panel count**: change the `[0, 1, 2, 3]` array in `Intro.tsx` (and the
  corresponding map) to add/remove curtain panels.
- **Colors**: `#0a0a0a` (background) and `#f2f0ea` (text/accent) in
  `Intro.module.css` — replace both consistently; they're each used in a few
  places (overlay, panels, bar, skip button).
- **Timing/easing**: every `.to()` / `.fromTo()` step in the GSAP timeline
  inside `Intro.tsx` has its own `duration` and `ease` — adjust independently.

---

## Step 6 — Verification checklist

After integrating, confirm all of the following:

- [ ] `npm run dev` (or equivalent) starts with no console errors.
- [ ] On first load, the counter animates 0 → 100, then the name reveals,
      then the 4 panels wipe up and the real page is visible underneath.
- [ ] After the intro finishes, refreshing the page (same tab) does **not**
      replay the intro (because of `sessionStorage` + `once`), unless
      `once={false}` was intentionally set.
- [ ] Opening the page in a new tab / incognito window plays the intro
      again (fresh session storage).
- [ ] Clicking "Skip" (bottom right) jumps straight to the end and reveals
      the page immediately.
- [ ] With OS-level "reduce motion" enabled, the intro fades out quickly
      instead of running the full sequence.
- [ ] No hydration warnings in the console (the component intentionally
      renders `null` until `mounted` is `true`, specifically to avoid
      SSR/client mismatches with `sessionStorage`).
- [ ] Production build (`npm run build`) succeeds — GSAP and the component
      are client-only, so this should not trigger any SSR errors.

---

## Troubleshooting

- **"gsap is not defined" / import errors** → confirm `gsap` was installed
  in the right workspace/package (monorepos) and that `Intro.tsx` still has
  `'use client'` as the very first line.
- **Hydration mismatch warning mentioning `Intro`** → make sure nothing
  outside the component reads `sessionStorage` on the server, and that the
  `mounted` gate (`if (!mounted) return null;`) was not removed.
- **Fonts fall back to system fonts unexpectedly** → the CSS variables
  `--font-display` / `--font-mono` aren't reaching `Intro.module.css`.
  Check that the `.variable` classes from `next/font/google` were actually
  applied to `<html>` (App Router) or a wrapping element (Pages Router),
  per Step 3.
- **Intro replays on every navigation** → this is expected if the app uses
  a router that re-mounts the root layout per navigation in a way that
  clears `sessionStorage` reads, or if `once` was left `false`. Confirm
  `once` is `true` (default) and that `Intro` lives in the root
  layout/`_app`, not in a per-page component.
- **Curtain panels don't fully cover the screen on very wide/ultrawide
  monitors** → this shouldn't happen (`inset: 0` + `flex: 1` on each panel
  scales to any viewport), but if a custom panel count was set to `0` or
  the flex properties were overridden, restore `flex: 1` on `.panel`.

---

## File manifest (what should exist after this plan is complete)

```
components/
  Intro.tsx
  Intro.module.css
app/
  layout.tsx          (edited — Intro imported and rendered, fonts wired up)
```
