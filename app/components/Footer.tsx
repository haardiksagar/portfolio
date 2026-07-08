import { profile } from "../content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-line/70 pt-6">
      <a
        href={`mailto:${profile.email}`}
        className="font-mono text-xs text-muted hover:text-gold transition-colors duration-200"
      >
        {profile.email}
      </a>
      <span className="font-mono text-xs text-muted2">© {year}</span>
    </footer>
  );
}
