// Example: how to wire Intro into your existing app/layout.tsx
// Copy the relevant pieces into your real layout file — don't just drop this in as-is.

import type { ReactNode } from 'react';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import Intro from '@/components/Intro';

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        {/* Sits on top of the page via position:fixed, then removes itself when done. */}
        <Intro name="Studio" label="Loading" counterDuration={2} once />
        {children}
      </body>
    </html>
  );
}
