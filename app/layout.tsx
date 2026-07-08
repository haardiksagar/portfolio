import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haardik S Sagar",
  description: "Building things, one late night at a time.",
  openGraph: {
    title: "Haardik S Sagar",
    description: "Building things, one late night at a time.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Haardik S Sagar",
    description: "Building things, one late night at a time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body bg-ink text-paper antialiased">
        {children}
      </body>
    </html>
  );
}
