import type { Metadata } from "next";
import Link from "next/link";
import { SiNpm, SiGithub } from "react-icons/si";
import { Button } from "kora-ui";
import "./globals.css";
import { ThemeSwitcher } from "@/components/theme-switcher";

export const metadata: Metadata = {
  title: {
    default: "kora-ui — React + Tailwind component library",
    template: "%s — kora-ui",
  },
  description:
    "A TypeScript-first React UI component library styled with Tailwind CSS. Ships 6 swappable themes (default, vintage, futuristic, electric, oceanic, botanical).",
  metadataBase: new URL("https://kora-ui.istmocode.com"),
  openGraph: {
    title: "kora-ui",
    description: "React + Tailwind component library with swappable themes.",
    type: "website",
  },
};

const PAYPAL_URL =
  "https://www.paypal.com/donate/?hosted_button_id=N46Z7WUY5T3AQ";

/* Hydrates the stored theme before React mounts, preventing a flash of the
 * default theme on navigation. Safe inline script — pure DOM, no deps. */
const themeInit = `(()=>{try{var t=localStorage.getItem("kora-theme")||"default";document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","default");}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="default"
      className="antialiased"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <ThemeSwitcher />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-10 border-b backdrop-blur"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "color-mix(in oklab, var(--color-background) 70%, transparent)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          kora<span style={{ color: "var(--color-foreground-subtle)" }}>-ui</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="rounded-md px-2 py-1 text-sm transition-colors"
            style={{ color: "var(--color-foreground-muted)" }}
          >
            Home
          </Link>
          <Link
            href="/docs"
            className="rounded-md px-2 py-1 text-sm transition-colors"
            style={{ color: "var(--color-foreground-muted)" }}
          >
            Docs
          </Link>
          <Button
            variant="secondary"
            size="sm"
            href="https://www.npmjs.com/package/kora-ui"
            target="_blank"
            rel="noreferrer"
            aria-label="View on npm"
          >
            <SiNpm size={14} />
            <span className="hidden sm:inline">npm</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            href="https://github.com/isaaldair/kora-ui"
            target="_blank"
            rel="noreferrer"
            aria-label="View on GitHub"
          >
            <SiGithub size={14} />
            <span className="hidden sm:inline">GitHub</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            href={PAYPAL_URL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Support via PayPal"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-accent-foreground)",
            }}
          >
            <svg
              aria-hidden="true"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21s-7.5-4.5-9.7-9.1C.6 7.5 3.5 3 7.5 3c2 0 3.6 1 4.5 2.5C12.9 4 14.5 3 16.5 3c4 0 6.9 4.5 5.2 8.9C19.5 16.5 12 21 12 21z" />
            </svg>
            <span className="hidden sm:inline">Support</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer
      className="mt-24 border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium">kora-ui</p>
        <p
          className="text-sm"
          style={{ color: "var(--color-foreground-subtle)" }}
        >
          MIT © Isaac Avila
        </p>
      </div>
    </footer>
  );
}
