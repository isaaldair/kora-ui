import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import { SiNpm, SiGithub } from "react-icons/si";
import { Button } from "kora-ui";
import "./globals.css";
import { ThemeControls } from "@/components/theme-controls";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "kora-ui — React + Tailwind component library",
    template: "%s — kora-ui",
  },
  description:
    "A TypeScript-first React UI component library styled with Tailwind CSS. Ships an electric color palette.",
  metadataBase: new URL("https://kora-ui.istmocode.com"),
  openGraph: {
    title: "kora-ui",
    description: "React + Tailwind component library.",
    type: "website",
  },
};

const PAYPAL_URL =
  "https://www.paypal.com/donate/?hosted_button_id=N46Z7WUY5T3AQ";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-accent="blue"
      data-k-style="basic"
      className={`${geistSans.variable} ${geistMono.variable} ${dmSerif.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <ThemeControls />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200/60 bg-white/70 backdrop-blur dark:border-neutral-800/60 dark:bg-black/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          kora<span className="text-neutral-400">-ui</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="rounded-md px-2 py-1 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            Home
          </Link>
          <Link
            href="/docs"
            className="rounded-md px-2 py-1 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
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
              backgroundColor: "var(--accent)",
              color: "var(--accent-fg)",
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
    <footer className="mt-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          kora-ui
        </p>
        <p className="text-sm text-neutral-500">MIT © Isaac Avila</p>
      </div>
    </footer>
  );
}
