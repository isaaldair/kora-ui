"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav, isGroup, type DocsNavLink } from "@/lib/docs-nav";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-60 shrink-0 overflow-y-auto pr-2 lg:block">
      <nav className="flex flex-col gap-6 text-sm">
        {docsNav.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <h4 className="px-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {section.title}
            </h4>
            <ul className="flex flex-col">
              {section.items.map((entry) => {
                if (isGroup(entry)) {
                  return (
                    <li key={entry.label} className="mt-2">
                      <span className="block px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        {entry.label}
                      </span>
                      <ul className="flex flex-col border-l border-neutral-200 dark:border-neutral-800 ml-4">
                        {entry.items.map((sub) => (
                          <li key={sub.href}>
                            <SidebarLink item={sub} pathname={pathname} nested />
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
                return (
                  <li key={entry.href}>
                    <SidebarLink item={entry} pathname={pathname} />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function SidebarLink({
  item,
  pathname,
  nested = false,
}: {
  item: DocsNavLink;
  pathname: string;
  nested?: boolean;
}) {
  const active = pathname === item.href;
  const base = nested ? "ml-1 pl-3" : "px-3";
  const activeCls = active
    ? "bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100";
  return (
    <Link
      href={item.href}
      className={`block rounded-md py-1.5 transition-colors ${base} ${activeCls}`}
    >
      {item.label}
    </Link>
  );
}

export function DocsMobileNav() {
  const pathname = usePathname();
  return (
    <div className="lg:hidden">
      <label className="mb-4 flex flex-col gap-2 text-sm">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Navigate
        </span>
        <select
          className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-950"
          value={pathname}
          onChange={(e) => {
            if (typeof window !== "undefined") window.location.href = e.target.value;
          }}
        >
          {docsNav.map((section) => (
            <optgroup key={section.title} label={section.title}>
              {section.items.map((entry) =>
                isGroup(entry) ? (
                  entry.items.map((sub) => (
                    <option key={sub.href} value={sub.href}>
                      {entry.label} — {sub.label}
                    </option>
                  ))
                ) : (
                  <option key={entry.href} value={entry.href}>
                    {entry.label}
                  </option>
                ),
              )}
            </optgroup>
          ))}
        </select>
      </label>
    </div>
  );
}
