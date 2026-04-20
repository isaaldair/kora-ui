"use client";

import { useEffect, useState } from "react";
import { DocsSidebar, DocsMobileNav } from "./docs-sidebar";

const STORAGE_KEY = "kora-docs-sidebar-collapsed";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "false") setCollapsed(false);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, String(collapsed));
  }, [collapsed, hydrated]);

  return (
    <div
      className={`mx-auto flex px-6 py-10 lg:py-14 ${
        collapsed ? "max-w-5xl gap-4 lg:gap-6" : "max-w-6xl gap-8 lg:gap-12"
      }`}
    >
      <DocsSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
      />
      <main className="min-w-0 flex-1">
        <DocsMobileNav />
        {children}
      </main>
    </div>
  );
}
