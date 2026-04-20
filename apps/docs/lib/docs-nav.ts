export type DocsNavLink = {
  label: string;
  href: string;
};

export type DocsNavGroup = {
  label: string;
  items: DocsNavLink[];
};

export type DocsNavEntry = DocsNavLink | DocsNavGroup;

export type DocsNavSection = {
  title: string;
  items: DocsNavEntry[];
};

export function isGroup(entry: DocsNavEntry): entry is DocsNavGroup {
  return "items" in entry;
}

export const docsNav: DocsNavSection[] = [
  {
    title: "Getting started",
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Design",
    items: [
      { label: "Electric palette", href: "/docs/palette" },
    ],
  },
  {
    title: "Components",
    items: [
      { label: "Alert", href: "/docs/components/alert" },
      { label: "Avatar", href: "/docs/components/avatar" },
      { label: "Badge", href: "/docs/components/badge" },
      { label: "Button", href: "/docs/components/button" },
      { label: "Card", href: "/docs/components/card" },
      { label: "Checkbox", href: "/docs/components/checkbox" },
      { label: "Input", href: "/docs/components/input" },
      { label: "Label", href: "/docs/components/label" },
      { label: "Separator", href: "/docs/components/separator" },
      { label: "Textarea", href: "/docs/components/textarea" },
    ],
  },
  {
    title: "Social",
    items: [
      {
        label: "Floating",
        items: [
          { label: "WhatsApp float", href: "/docs/components/whatsapp-float" },
        ],
      },
    ],
  },
];
