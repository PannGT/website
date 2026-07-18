import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Renderer konten markdown-lite untuk isi artikel Zixpedia.
 * Mendukung: paragraf, heading (##, ###), blockquote (>), daftar (-, 1.),
 * blok kode (~~~ atau ```), serta inline **tebal**, *miring*, `kode`, [tautan](url).
 */

type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang: string; code: string };

const FENCE_RE = /^(~~~|```)(\w*)\s*$/;
const SPECIAL_RE = /^(#{2,3}\s|>\s|-\s|\d+\.\s|~~~|```)/;

function parseBlocks(content: string): Block[] {
  const lines = content.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    // Blok kode berpagar
    const fence = trimmed.match(FENCE_RE);
    if (fence) {
      const lang = fence[2] || "code";
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !FENCE_RE.test(lines[i].trim())) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1; // lewati pagar penutup
      blocks.push({ type: "code", lang, code: codeLines.join("\n") });
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", text: trimmed.slice(4) });
      i += 1;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.slice(3) });
      i += 1;
      continue;
    }
    if (trimmed.startsWith("> ")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quote.push(lines[i].trim().slice(2));
        i += 1;
      }
      blocks.push({ type: "quote", text: quote.join(" ") });
      continue;
    }
    if (/^- /.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^- /.test(lines[i].trim())) {
        items.push(lines[i].trim().slice(2));
        i += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }
    if (/^\d+\. /.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\. /, ""));
        i += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // Paragraf: kumpulkan baris hingga baris kosong atau blok spesial
    const para: string[] = [];
    while (i < lines.length && lines[i].trim()) {
      if (para.length > 0 && SPECIAL_RE.test(lines[i].trim())) break;
      para.push(lines[i].trim());
      i += 1;
    }
    blocks.push({ type: "p", text: para.join(" ") });
  }

  return blocks;
}

/** Render format inline: **tebal**, *miring*, `kode`, [tautan](url) */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  );

  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;

    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={key} className="font-semibold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={key}
          className="rounded-md bg-blue-50 px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-blue-700 dark:bg-blue-500/10 dark:text-sky-300"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={key}
          href={link[2]}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 transition-colors hover:text-blue-700 dark:text-sky-400 dark:decoration-sky-400/40 dark:hover:text-sky-300"
        >
          {link[1]}
        </a>
      );
    }
    return <span key={key}>{part}</span>;
  });
}

/** Blok kode dengan label bahasa dan tombol salin */
function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard tidak tersedia
    }
  };

  return (
    <div className="group/code relative my-6 overflow-hidden rounded-xl border border-navy-800 bg-navy-950">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="font-mono text-xs font-medium tracking-wide text-sky-400 uppercase">
          {lang}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-400" /> Tersalin
            </>
          ) : (
            <>
              <Copy className="size-3.5" /> Salin
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-sm leading-relaxed text-slate-200">
          {code}
        </code>
      </pre>
    </div>
  );
}

/** Komponen utama: render string konten menjadi elemen artikel */
export default function ContentRenderer({ content }: { content: string }) {
  const blocks = parseBlocks(content);

  return (
    <div>
      {blocks.map((block, i) => {
        const key = `block-${i}`;
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={key}
                className="mt-10 mb-4 font-display text-2xl font-bold text-slate-900 dark:text-white"
              >
                {renderInline(block.text, key)}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={key}
                className="mt-8 mb-3 font-display text-xl font-bold text-slate-900 dark:text-white"
              >
                {renderInline(block.text, key)}
              </h3>
            );
          case "quote":
            return (
              <blockquote
                key={key}
                className="my-6 rounded-r-xl border-l-4 border-blue-500 bg-blue-50/70 px-5 py-4 text-base leading-relaxed text-slate-700 italic dark:border-sky-400 dark:bg-blue-500/5 dark:text-slate-300"
              >
                {renderInline(block.text, key)}
              </blockquote>
            );
          case "ul":
            return (
              <ul
                key={key}
                className="my-5 list-disc space-y-2 pl-6 leading-relaxed text-slate-700 marker:text-blue-500 dark:text-slate-300 dark:marker:text-sky-400"
              >
                {block.items.map((item, j) => (
                  <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={key}
                className="my-5 list-decimal space-y-2 pl-6 leading-relaxed text-slate-700 marker:font-semibold marker:text-blue-600 dark:text-slate-300 dark:marker:text-sky-400"
              >
                {block.items.map((item, j) => (
                  <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
                ))}
              </ol>
            );
          case "code":
            return <CodeBlock key={key} lang={block.lang} code={block.code} />;
          default:
            return (
              <p
                key={key}
                className="mb-5 text-base leading-relaxed text-slate-700 dark:text-slate-300"
              >
                {renderInline(block.text, key)}
              </p>
            );
        }
      })}
    </div>
  );
}
