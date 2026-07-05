import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { POSTS, SITE_URL, PUBLICATION } from "@/content/posts";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${PUBLICATION} — Brand, Press & Founder Playbooks`,
  description:
    "The Fluenciaga Journal: sharp, no-fluff writing on brand building, press, positioning, and the founders doing it well. Real stories, real lessons.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: PUBLICATION,
    description:
      "Sharp, no-fluff writing on brand building, press, positioning, and the founders doing it well.",
    siteName: PUBLICATION,
  },
};

export default function JournalPage() {
  const [lead, ...rest] = POSTS;

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl px-5 pt-28 pb-20">
        <header className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--fluenciaga-accent)]">
            The Fluenciaga Journal
          </div>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Brand, press & founder playbooks.
          </h1>
          <p className="mt-4 text-lg leading-8 text-white/70">
            No-fluff writing on building a brand people remember — and the founders doing it well.
          </p>
        </header>

        {/* featured / lead post */}
        {lead && (
          <Link
            href={`/blog/${lead.slug}`}
            className="group mt-12 grid gap-6 md:grid-cols-2 rounded-3xl border border-yellow-900/40 bg-[#0f180d] overflow-hidden hover:border-yellow-700/60 transition-colors"
          >
            <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
              <Image
                src={lead.hero}
                alt={lead.heroAlt}
                width={1200}
                height={800}
                priority
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col justify-center p-7 md:p-9">
              <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--fluenciaga-accent)]">
                {lead.category}
              </div>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold leading-tight text-white">
                {lead.title}
              </h2>
              <p className="mt-3 text-white/70 leading-7">{lead.excerpt}</p>
              <div className="mt-5 text-sm text-white/45">
                {lead.author} · {lead.readingTime}
              </div>
            </div>
          </Link>
        )}

        {/* rest grid */}
        {rest.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-2xl border border-yellow-900/40 bg-[#0f180d] overflow-hidden hover:border-yellow-700/60 transition-colors"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.hero}
                    alt={p.heroAlt}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs uppercase tracking-wider text-[color:var(--fluenciaga-accent)]">
                    {p.category}
                  </div>
                  <h3 className="mt-1 font-semibold text-white leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-6 line-clamp-3">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
