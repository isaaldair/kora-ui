"use client";

import { useState } from "react";
import { CodeEditor } from "kora-ui/client";

const INITIAL = `import { Button } from "kora-ui";

export function SaveBar() {
  return (
    <div className="flex gap-2">
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Cancel</Button>
    </div>
  );
}
`;

export function CodeEditorDemo() {
  const [code, setCode] = useState(INITIAL);

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-6">
      <CodeEditor
        value={code}
        onChange={setCode}
        language="typescript"
        height={320}
      />
      <p className="font-mono text-xs text-neutral-500">
        {code.split("\n").length} lines · {code.length} chars
      </p>
    </section>
  );
}
