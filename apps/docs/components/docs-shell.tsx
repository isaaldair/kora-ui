"use client";

import { DocsSidebar, DocsMobileNav } from "./docs-sidebar";

export function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-6 py-10 lg:gap-12 lg:py-14">
      <DocsSidebar />
      <main className="min-w-0 flex-1">
        <DocsMobileNav />
        {children}
      </main>
    </div>
  );
}
