// Renders structured article blocks into styled, on-brand HTML. Server component.
// Inline syntax supported inside text: **bold**, *italic*, and [label](href).
// External links are dofollow editorial links (noopener only — deliberately NOT nofollow).
import Image from "next/image";
import type { Block } from "@/content/posts";
import type { ReactNode } from "react";

function renderInline(text: string, keyBase: string): ReactNode[] {
  // tokenize [label](href) | **bold** | *italic*
  const re = /(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("[")) {
      const label = tok.slice(1, tok.indexOf("]"));
      const href = tok.slice(tok.indexOf("(") + 1, tok.length - 1);
      const external = /^https?:\/\//.test(href);
      out.push(
        <a
          key={`${keyBase}-a-${i}`}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener" } : {})}
          className="text-[color:var(--fluenciaga-accent)] underline decoration-yellow-700/40 underline-offset-4 hover:decoration-[color:var(--fluenciaga-accent)] transition-colors"
        >
          {label}
        </a>
      );
    } else if (tok.startsWith("**")) {
      out.push(
        <strong key={`${keyBase}-b-${i}`} className="font-semibold text-white">
          {tok.slice(2, -2)}
        </strong>
      );
    } else {
      out.push(
        <em key={`${keyBase}-i-${i}`} className="italic text-white/90">
          {tok.slice(1, -1)}
        </em>
      );
    }
    last = m.index + tok.length;
    i++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, idx) => {
        const k = `blk-${idx}`;
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={k}
                className="text-2xl md:text-3xl font-bold text-white mt-12 mb-1 tracking-tight"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={k} className="text-xl font-semibold text-white mt-8">
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={k} className="text-[17px] leading-8 text-white/80">
                {renderInline(b.text, k)}
              </p>
            );
          case "ul":
            return (
              <ul key={k} className="space-y-2 pl-1">
                {b.items.map((it, j) => (
                  <li key={`${k}-${j}`} className="flex gap-3 text-[17px] leading-8 text-white/80">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--fluenciaga-accent)]" />
                    <span>{renderInline(it, `${k}-${j}`)}</span>
                  </li>
                ))}
              </ul>
            );
          case "image":
            return (
              <figure key={k} className="my-10">
                <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    width={1600}
                    height={1067}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {b.caption && (
                  <figcaption className="mt-3 text-sm text-white/50 leading-6 border-l-2 border-yellow-800/50 pl-3">
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "quote":
            return (
              <blockquote
                key={k}
                className="my-10 border-l-4 border-[color:var(--fluenciaga-accent)] pl-6 py-2"
              >
                <p className="text-2xl md:text-[28px] font-semibold leading-snug text-white">
                  “{b.text}”
                </p>
                {b.cite && <cite className="mt-3 block text-sm not-italic text-white/50">— {b.cite}</cite>}
              </blockquote>
            );
          case "callout":
            return (
              <div
                key={k}
                className="my-10 rounded-2xl border border-yellow-900/40 bg-[#111a0f] p-6"
              >
                {b.title && (
                  <div className="mb-2 text-sm font-bold uppercase tracking-wider text-[color:var(--fluenciaga-accent)]">
                    {b.title}
                  </div>
                )}
                <p className="text-[17px] leading-8 text-white/85">{renderInline(b.text, k)}</p>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
