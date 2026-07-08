# haardik.

A personal portfolio site built with Next.js 14 (App Router) + TypeScript + Tailwind CSS.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Build for production

```bash
npm run build
npm run start
```

## Edit your content

Everything you'd want to change lives in one file: **`app/content.ts`**

- `profile` — your name, handle, tagline, and email
- `socials` — your social links (already set to your X, LinkedIn, GitHub, Threads)
- `currently` — what you're building right now
- `previously` — past ventures/roles (click to expand on the live site)
- `projects` — side projects (click to expand)
- `stack` — your tech stack, shown in the terminal block
- `achievements` — notable achievements

Everything currently in `previously`, `projects`, `achievements`, and `currently`
is **placeholder copy** — swap it for your real details. The email in `profile.email`
is also a placeholder.

## Deploy

The fastest path is [Vercel](https://vercel.com): push this to a GitHub repo and
import it, or run `npx vercel` from this folder.

## Structure

```
app/
  content.ts          ← all editable copy
  layout.tsx           ← root layout + metadata
  page.tsx              ← page composition
  globals.css           ← design tokens (colors, fonts)
  components/
    Header.tsx           ← name, tagline, social row
    Currently.tsx         ← current work callout
    AccordionList.tsx      ← expandable list (Previously / Projects)
    Terminal.tsx             ← terminal-styled tech stack block
    Achievements.tsx          ← achievements list
    Footer.tsx                  ← email + copyright
    SectionLabel.tsx             ← section header used throughout
```
