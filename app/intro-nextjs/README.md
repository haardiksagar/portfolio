# Intro / preloader component

A full-screen, one-time page-load sequence: percentage counter → name reveal →
curtain wipe that peels away to reveal your site. Built with GSAP, no
extra plugins (SplitText etc. are a paid GSAP add-on — this splits text by
hand instead).

## 1. Install the one dependency

```bash
npm install gsap
```

## 2. Copy files into your project

```
components/Intro.tsx
components/Intro.module.css
```

## 3. Wire it into your layout

In `app/layout.tsx`, render `<Intro />` as the first child inside `<body>`,
above `{children}`. It's `position: fixed`, so it floats on top of your page
while GSAP runs, then removes itself from the DOM automatically.

```tsx
import Intro from '@/components/Intro';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Intro name="Studio" label="Loading" />
        {children}
      </body>
    </html>
  );
}
```

See `app/layout.example.tsx` for the full version with `next/font` wired up
(recommended — it uses `--font-display` / `--font-mono` CSS variables that
`Intro.module.css` already expects; without them it falls back to
system fonts).

## Props

| Prop              | Type         | Default    | What it does                                             |
|-------------------|--------------|------------|-----------------------------------------------------------|
| `name`            | `string`     | `'Studio'` | Text that types on after the counter — your brand/name    |
| `label`           | `string`     | `'Loading'`| Small eyebrow label above the counter                     |
| `counterDuration` | `number`     | `2`        | Seconds the 0→100 count takes                              |
| `once`            | `boolean`    | `true`     | Only plays once per tab (sessionStorage) — off = every load|
| `onComplete`      | `() => void` | —          | Fires once the curtain has fully wiped away                |

## Notes

- Respects `prefers-reduced-motion`: skips straight to a quick fade instead
  of the full sequence.
- Has a "Skip" button (bottom right) that jumps the timeline to the end —
  keeps it accessible for repeat visitors/testers.
- The 4 curtain panels are plain flex children — change the `[0,1,2,3]`
  array in `Intro.tsx` to add more/fewer.
- Swap the fonts by editing the `next/font` imports in your layout — the
  component just reads whatever `--font-display` / `--font-mono` resolve to.
- `preview.html` in this folder is a standalone, dependency-free version of
  the exact same animation — open it directly in a browser to see the
  motion before wiring it into Next.js.
