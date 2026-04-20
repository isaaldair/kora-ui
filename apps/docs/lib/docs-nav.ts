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
    title: "Special components",
    items: [
      {
        label: "Buttons",
        items: [
          { label: "Confetti button", href: "/docs/components/confetti-button" },
        ],
      },
      {
        label: "Data display",
        items: [
          { label: "Code block", href: "/docs/components/code-block" },
          { label: "JSON viewer", href: "/docs/components/json-viewer" },
          { label: "QR code", href: "/docs/components/qr-code" },
        ],
      },
      {
        label: "Input",
        items: [
          { label: "Rating", href: "/docs/components/rating" },
        ],
      },
      {
        label: "Social",
        items: [
          { label: "WhatsApp float", href: "/docs/components/whatsapp-float" },
        ],
      },
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
];
