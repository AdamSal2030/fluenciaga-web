import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBody from "@/components/blog/ArticleBody";
import { getPost, allSlugs, POSTS, SITE_URL, PUBLICATION } from "@/content/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: `${post.title} | ${PUBLICATION}`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      siteName: PUBLICATION,
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      images: [{ url: post.hero, width: 1600, height: 1067, alt: post.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.hero],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [`${SITE_URL}${post.hero}`],
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { "@type": "Organization", name: post.author, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: PUBLICATION,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags.join(", "),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };
  const faqLd = post.faq && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}

      <article className="mx-auto w-full max-w-3xl px-5 pt-28 pb-20">
        {/* breadcrumb */}
        <nav className="mb-6 text-sm text-white/50">
          <Link href="/" className="hover:text-white/80">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-white/80">Journal</Link>
        </nav>

        <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-[color:var(--fluenciaga-accent)]">
          {post.category}
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight text-white">
          {post.title}
        </h1>
        <p className="mt-5 text-lg md:text-xl leading-8 text-white/70">{post.dek}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/50">
          <span className="text-white/80">{post.author}</span>
          <span>·</span>
          <time dateTime={post.date}>
            {new Date(post.date + "T00:00:00Z").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}
          </time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        {/* hero */}
        <figure className="my-9 overflow-hidden rounded-2xl ring-1 ring-white/10">
          <Image
            src={post.hero}
            alt={post.heroAlt}
            width={1600}
            height={1067}
            priority
            className="w-full h-auto object-cover"
          />
        </figure>

        <ArticleBody blocks={post.body} />

        {/* FAQ */}
        {post.faq && post.faq.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Frequently asked</h2>
            <div className="space-y-3">
              {post.faq.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-yellow-900/40 bg-[#0f180d] p-5 open:bg-[#111a0f]"
                >
                  <summary className="cursor-pointer list-none text-[17px] font-semibold text-white flex justify-between gap-4">
                    {f.q}
                    <span className="text-[color:var(--fluenciaga-accent)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-[16px] leading-7 text-white/70">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* tags */}
        <div className="mt-12 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-yellow-900/40 px-3 py-1 text-xs text-white/60"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-yellow-900/40 bg-[#111a0f] p-8 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-white">
            Want coverage like this for your brand?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Fluenciaga Publishing gets founders and companies featured where it counts — and tells
            the story properly. Let's put your work in front of the right people.
          </p>
          <div className="mt-6 inline-block rounded-full p-[2px] bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-400">
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold bg-[#070f07] text-white hover:bg-white/10"
            >
              Start a conversation
            </Link>
          </div>
        </div>

        {/* related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold text-white mb-5">More from the Journal</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {related.map((p) => (
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
                  <div className="p-4">
                    <div className="text-xs uppercase tracking-wider text-[color:var(--fluenciaga-accent)]">{p.category}</div>
                    <div className="mt-1 font-semibold text-white leading-snug">{p.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
      <Footer />
    </>
  );
}
