import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
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
  metadataBase: new URL("https://kora-ui.vercel.app"),
  openGraph: {
    title: "kora-ui",
    description: "React + Tailwind component library.",
    type: "website",
  },
};

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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          kora<span className="text-neutral-400">-ui</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
          <Link
            href="/"
            className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            Home
          </Link>
          <Link
            href="/docs"
            className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            Docs
          </Link>
          <a
            href="https://www.npmjs.com/package/kora-ui"
            target="_blank"
            rel="noreferrer"
            className="hidden transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 sm:inline"
          >
            npm
          </a>
          <a
            href="https://github.com/isaaldair/kora-ui"
            target="_blank"
            rel="noreferrer"
            className="hidden transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 sm:inline"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            kora-ui
          </p>
          <p className="text-sm text-neutral-500">MIT © Isaac Avila</p>
        </div>
        <a
          href="https://www.paypal.com/donate/?hosted_button_id=N46Z7WUY5T3AQ"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900"
        >
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21s-7.5-4.5-9.7-9.1C.6 7.5 3.5 3 7.5 3c2 0 3.6 1 4.5 2.5C12.9 4 14.5 3 16.5 3c4 0 6.9 4.5 5.2 8.9C19.5 16.5 12 21 12 21z" />
          </svg>
          Support via PayPal
        </a>
      </div>
    </footer>
  );
}
