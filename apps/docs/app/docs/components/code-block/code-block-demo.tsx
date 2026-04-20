"use client";

import { useState } from "react";
import { CodeBlock } from "kora-ui/client";

const INITIAL = `function greet(name: string) {
  const greeting = \`Hello, \${name}!\`;
  return greeting;
}

greet("Isaac");
`;

export function CodeBlockDemo() {
  const [code, setCode] = useState(INITIAL);
  return (
    <div className="flex flex-col gap-3">
      <CodeBlock
        code={code}
        onCodeChange={setCode}
        language="ts"
        filename="playground.ts"
      />
      <p className="font-mono text-xs text-neutral-500">
        {code.split("\n").length} lines · {code.length} chars
      </p>
    </div>
  );
}
