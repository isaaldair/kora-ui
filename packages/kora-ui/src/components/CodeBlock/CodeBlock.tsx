"use client";

import {
  useMemo,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Button } from "../Button/Button";

export type CodeBlockLanguage =
  | "tsx"
  | "ts"
  | "typescript"
  | "jsx"
  | "js"
  | "javascript"
  | "json"
  | "css"
  | "html"
  | "bash"
  | "sh"
  | "shell"
  | "plain";

export interface CodeBlockProps {
  /** Source code. Treated as controlled when `onCodeChange` is provided. */
  code: string;
  /** Optional controlled change handler — providing it enables editing. */
  onCodeChange?: (code: string) => void;
  /** Force editable mode without a controlled handler. */
  editable?: boolean;
  /** Language identifier. Default: `"tsx"`. */
  language?: CodeBlockLanguage;
  /** Optional filename shown above the block. */
  filename?: string;
  /** Show the copy button. Default: true. */
  copyable?: boolean;
  /** Hide the language pill. Default: false. */
  hideLanguage?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Tokenizer
// ---------------------------------------------------------------------------

type TokenType =
  | "keyword"
  | "string"
  | "comment"
  | "number"
  | "func"
  | "type"
  | "tag"
  | "attr"
  | "prop"
  | "selector"
  | "boolean"
  | "punct"
  | "op"
  | "text";

type Token = { type: TokenType; value: string };

const JS_KEYWORDS = new Set([
  "const", "let", "var", "function", "class", "extends", "implements",
  "interface", "type", "enum", "namespace", "module", "declare", "satisfies",
  "import", "export", "from", "as", "default", "return", "if", "else",
  "for", "while", "do", "switch", "case", "break", "continue", "try",
  "catch", "finally", "throw", "async", "await", "yield", "new", "this",
  "super", "typeof", "instanceof", "in", "of", "void", "delete",
  "public", "private", "protected", "readonly", "static", "abstract",
  "override", "keyof", "infer", "never", "unknown", "any", "string",
  "number", "boolean", "object", "symbol", "bigint",
]);

const JS_BOOLEANS = new Set(["true", "false", "null", "undefined"]);

const BASH_KEYWORDS = new Set([
  "if", "then", "else", "elif", "fi", "for", "while", "do", "done",
  "case", "esac", "in", "function", "return", "local", "export",
  "echo", "cd", "ls", "pwd", "mkdir", "rm", "cp", "mv", "cat",
  "grep", "sed", "awk", "chmod", "chown", "sudo", "source", "npm",
  "yarn", "pnpm", "node", "git",
]);

function normalize(lang: string): CodeBlockLanguage {
  const l = lang.toLowerCase();
  if (l === "typescript") return "ts";
  if (l === "javascript") return "js";
  if (l === "shell" || l === "sh") return "bash";
  return (l as CodeBlockLanguage) ?? "plain";
}

function tokenize(code: string, language: CodeBlockLanguage): Token[] {
  switch (language) {
    case "tsx":
    case "jsx":
    case "ts":
    case "js":
    case "typescript":
    case "javascript":
      return tokenizeJs(code);
    case "json":
      return tokenizeJson(code);
    case "css":
      return tokenizeCss(code);
    case "html":
      return tokenizeHtml(code);
    case "bash":
    case "sh":
    case "shell":
      return tokenizeBash(code);
    default:
      return [{ type: "text", value: code }];
  }
}

function scan(
  code: string,
  pattern: RegExp,
  map: (name: string, value: string) => TokenType,
): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const match of code.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last) {
      tokens.push({ type: "text", value: code.slice(last, start) });
    }
    const groups = match.groups ?? {};
    let emitted = false;
    for (const [name, value] of Object.entries(groups)) {
      if (typeof value === "string") {
        tokens.push({ type: map(name, value), value });
        emitted = true;
        break;
      }
    }
    if (!emitted) tokens.push({ type: "text", value: match[0] });
    last = start + match[0].length;
  }
  if (last < code.length) {
    tokens.push({ type: "text", value: code.slice(last) });
  }
  return tokens;
}

function tokenizeJs(code: string): Token[] {
  const pattern = new RegExp(
    [
      "(?<comment>\\/\\*[\\s\\S]*?\\*\\/|\\/\\/[^\\n]*)",
      "(?<string>\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|`(?:[^`\\\\]|\\\\.)*`)",
      "(?<tag><\\/?[A-Za-z][\\w.:-]*)",
      "(?<number>\\b\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?n?\\b)",
      "(?<ident>\\b[A-Za-z_$][\\w$]*\\b)",
      "(?<punct>[{}()\\[\\];,.])",
      "(?<op>=>|[+\\-*/%=<>!&|^~?:]+)",
    ].join("|"),
    "g",
  );
  return scan(code, pattern, (name, value) => {
    if (name === "comment") return "comment";
    if (name === "string") return "string";
    if (name === "tag") return "tag";
    if (name === "number") return "number";
    if (name === "punct") return "punct";
    if (name === "op") return "op";
    if (name === "ident") {
      if (JS_BOOLEANS.has(value)) return "boolean";
      if (JS_KEYWORDS.has(value)) return "keyword";
      if (/^[A-Z]/.test(value)) return "type";
      return "text";
    }
    return "text";
  });
}

function tokenizeJson(code: string): Token[] {
  const pattern = new RegExp(
    [
      "(?<key>\"[^\"\\\\]*(?:\\\\.[^\"\\\\]*)*\")(?=\\s*:)",
      "(?<string>\"[^\"\\\\]*(?:\\\\.[^\"\\\\]*)*\")",
      "(?<number>-?\\b\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?\\b)",
      "(?<boolean>\\b(?:true|false|null)\\b)",
      "(?<punct>[{}\\[\\],:])",
    ].join("|"),
    "g",
  );
  return scan(code, pattern, (name) => {
    if (name === "key") return "prop";
    if (name === "string") return "string";
    if (name === "number") return "number";
    if (name === "boolean") return "boolean";
    if (name === "punct") return "punct";
    return "text";
  });
}

function tokenizeCss(code: string): Token[] {
  const pattern = new RegExp(
    [
      "(?<comment>\\/\\*[\\s\\S]*?\\*\\/)",
      "(?<selector>[.#]?[A-Za-z_][\\w-]*(?=\\s*\\{))",
      "(?<prop>[-a-zA-Z]+(?=\\s*:))",
      "(?<string>\"[^\"]*\"|'[^']*')",
      "(?<number>\\b\\d+(?:\\.\\d+)?(?:px|em|rem|%|s|ms|fr|vh|vw|deg)?\\b)",
      "(?<atRule>@[a-zA-Z-]+)",
      "(?<punct>[{}()\\[\\];,:])",
    ].join("|"),
    "g",
  );
  return scan(code, pattern, (name) => {
    if (name === "comment") return "comment";
    if (name === "selector") return "selector";
    if (name === "prop") return "prop";
    if (name === "string") return "string";
    if (name === "number") return "number";
    if (name === "atRule") return "keyword";
    if (name === "punct") return "punct";
    return "text";
  });
}

function tokenizeHtml(code: string): Token[] {
  const pattern = new RegExp(
    [
      "(?<comment><!--[\\s\\S]*?-->)",
      "(?<tag><\\/?[A-Za-z][\\w-]*)",
      "(?<attr>\\b[a-zA-Z-]+(?==))",
      "(?<string>\"[^\"]*\"|'[^']*')",
      "(?<punct>[<>\\/=])",
    ].join("|"),
    "g",
  );
  return scan(code, pattern, (name) => {
    if (name === "comment") return "comment";
    if (name === "tag") return "tag";
    if (name === "attr") return "attr";
    if (name === "string") return "string";
    if (name === "punct") return "punct";
    return "text";
  });
}

function tokenizeBash(code: string): Token[] {
  const pattern = new RegExp(
    [
      "(?<comment>#[^\\n]*)",
      "(?<string>\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*')",
      "(?<flag>\\s-{1,2}[A-Za-z][\\w-]*)",
      "(?<varRef>\\$[A-Za-z_][\\w]*|\\$\\{[^}]+\\})",
      "(?<ident>\\b[A-Za-z_][\\w-]*\\b)",
      "(?<punct>[|&;()<>])",
    ].join("|"),
    "g",
  );
  return scan(code, pattern, (name, value) => {
    if (name === "comment") return "comment";
    if (name === "string") return "string";
    if (name === "flag") return "attr";
    if (name === "varRef") return "number";
    if (name === "punct") return "op";
    if (name === "ident") {
      if (BASH_KEYWORDS.has(value.trim())) return "keyword";
      return "text";
    }
    return "text";
  });
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

/* Syntax colors use mid-weight Tailwind hues that each kora-ui theme
 * redefines in `themes.css`. On `default` the hues follow the OS light/dark
 * scheme via Tailwind's own palette; on the opinionated themes (vintage,
 * futuristic, …) the theme's own ramp takes over, so the same utility stays
 * legible against every background.
 */
const TOKEN_CLASSES: Record<TokenType, string> = {
  keyword: "text-violet-600",
  string: "text-emerald-600",
  comment: "italic opacity-70",
  number: "text-orange-600",
  func: "text-blue-600",
  type: "text-teal-600",
  tag: "text-pink-600",
  attr: "text-amber-600",
  prop: "text-sky-600",
  selector: "text-pink-600",
  boolean: "text-violet-600",
  punct: "opacity-60",
  op: "opacity-75",
  text: "",
};

function applyFuncHeuristic(tokens: Token[]): Token[] {
  const result: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const tk = tokens[i]!;
    if (tk.type === "text" && /^[a-zA-Z_$][\w$]*$/.test(tk.value)) {
      let next: Token | undefined;
      for (let j = i + 1; j < tokens.length; j++) {
        const candidate = tokens[j]!;
        if (candidate.type === "text" && /^\s+$/.test(candidate.value)) continue;
        next = candidate;
        break;
      }
      if (next && next.type === "punct" && next.value === "(") {
        result.push({ type: "func", value: tk.value });
        continue;
      }
    }
    result.push(tk);
  }
  return result;
}

const LANGUAGE_LABEL: Record<string, string> = {
  tsx: "TSX",
  ts: "TypeScript",
  typescript: "TypeScript",
  jsx: "JSX",
  js: "JavaScript",
  javascript: "JavaScript",
  json: "JSON",
  css: "CSS",
  html: "HTML",
  bash: "Bash",
  sh: "Bash",
  shell: "Bash",
  plain: "Plain",
};

export function CodeBlock({
  code,
  onCodeChange,
  editable,
  language = "tsx",
  filename,
  copyable = true,
  hideLanguage = false,
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [internal, setInternal] = useState(code);
  const isEditable = editable || Boolean(onCodeChange);
  const controlled = onCodeChange !== undefined;
  const current = controlled ? code : isEditable ? internal : code;

  const lang = normalize(language);
  const label = LANGUAGE_LABEL[lang] ?? lang.toUpperCase();

  const tokens = useMemo(() => {
    const raw = tokenize(
      // Preserve a trailing newline when editing so the highlight layer keeps
      // pace with the textarea's height as the user adds blank lines.
      isEditable ? current : current.trim(),
      lang,
    );
    return lang === "ts" || lang === "tsx" || lang === "js" || lang === "jsx"
      ? applyFuncHeuristic(raw)
      : raw;
  }, [current, lang, isEditable]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(current);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const handleChange = (value: string) => {
    if (controlled) onCodeChange?.(value);
    else setInternal(value);
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const { selectionStart, selectionEnd, value } = target;
      const next =
        value.slice(0, selectionStart) + "  " + value.slice(selectionEnd);
      handleChange(next);
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = selectionStart + 2;
      });
    }
  };

  return (
    <div
      className={[
        "overflow-hidden rounded-xl border text-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-background-secondary)",
        color: "var(--color-foreground)",
      }}
    >
      <div
        className="flex items-center justify-between gap-2 border-b px-3 py-2"
        style={{
          borderColor: "var(--color-border-subtle)",
          backgroundColor: "var(--color-background-tertiary)",
        }}
      >
        <span
          className="min-w-0 truncate font-mono text-xs"
          style={{ color: "var(--color-foreground-subtle)" }}
        >
          {filename ?? "\u00a0"}
        </span>
        <div className="flex items-center gap-2">
          {isEditable && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-accent-foreground)",
              }}
            >
              Editable
            </span>
          )}
          {!hideLanguage && (
            <span
              className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-foreground-muted)",
              }}
            >
              {label}
            </span>
          )}
          {copyable && (
            <Button variant="ghost" size="sm" onClick={copy}>
              {copied ? "Copied" : "Copy"}
            </Button>
          )}
        </div>
      </div>

      {isEditable ? (
        <div className="relative font-mono">
          <pre
            aria-hidden
            className="pointer-events-none overflow-x-auto whitespace-pre p-4 leading-relaxed"
          >
            <code>
              {tokens.map((tk, i) => renderToken(tk, i))}
              {/* trailing newline guard so caret on empty last line is visible */}
              {"\n"}
            </code>
          </pre>
          <textarea
            value={current}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKey}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            className="absolute inset-0 resize-none overflow-x-auto whitespace-pre bg-transparent p-4 leading-relaxed text-transparent outline-none"
            style={{
              fontFamily: "inherit",
              fontSize: "inherit",
              tabSize: 2,
              caretColor: "var(--color-foreground)",
            }}
          />
        </div>
      ) : (
        <pre className="overflow-x-auto p-4 leading-relaxed">
          <code className="font-mono">
            {tokens.map((tk, i) => renderToken(tk, i))}
          </code>
        </pre>
      )}
    </div>
  );
}

function renderToken(token: Token, key: number): ReactNode {
  const cls = TOKEN_CLASSES[token.type];
  if (!cls) return token.value;
  return (
    <span key={key} className={cls}>
      {token.value}
    </span>
  );
}
