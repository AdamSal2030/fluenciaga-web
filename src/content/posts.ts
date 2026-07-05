// The Fluenciaga Journal — editorial content store.
// Each post is structured data (typed blocks) so the article page can render clean HTML +
// JSON-LD schema. Add new posts to POSTS. Everything here is real, verifiable editorial —
// no fabricated quotes, metrics, or testimonials.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; title?: string; text: string };

export type FAQ = { q: string; a: string };

export type Post = {
  slug: string;
  title: string;
  dek: string; // sub-headline
  category: string;
  author: string;
  date: string; // ISO YYYY-MM-DD (published)
  updated?: string; // ISO
  readingTime: string;
  hero: string; // /blog/xyz.jpg
  heroAlt: string;
  excerpt: string; // for cards + meta description
  tags: string[];
  body: Block[];
  faq?: FAQ[];
};

export const SITE_URL = "https://fluenciaga.com";
export const PUBLICATION = "The Fluenciaga Journal";

export const POSTS: Post[] = [
  {
    slug: "branding-the-unsexy-badass-logistics",
    title:
      "Branding the Unsexy: How Badass Logistics Built a National Brand Hauling Seven-Figure Machines",
    dek: "Rigging an MRI onto a flatbed is a job most companies quietly sub out and never talk about. One Montana crew made it the whole brand — and there's a lesson in it for every founder in a “boring” industry.",
    category: "Founder Playbook",
    author: "Fluenciaga Editorial",
    date: "2026-07-04",
    readingTime: "6 min read",
    hero: "/blog/mri-delivery.jpg",
    heroAlt:
      "A shrink-wrapped MRI machine on a flatbed outside a hospital while a hi-vis crew member rigs it down with chains",
    excerpt:
      "Heavy rigging is high-stakes, high-value, and almost always invisible. Badass Logistics did the opposite — and turned the least glamorous corner of freight into a memorable brand. Here's the playbook any founder in an unglamorous industry can steal.",
    tags: ["Brand Building", "Positioning", "B2B Marketing", "Founder Playbook"],
    body: [
      {
        type: "p",
        text: "When a hospital takes delivery of a new MRI, the machine on the flatbed is often worth more than the truck, the trailer, and the crew's pickups combined. It's delicate, it's irreplaceable on any short timeline, and it has to be threaded through a live medical campus without a scratch. And yet the company that shows up to rig it into place is usually invisible — a nameless subcontractor that finishes the job and vanishes. That's the default in industrial logistics: high stakes, zero brand.",
      },
      {
        type: "p",
        text: "[Badass Logistics](https://badasslogistics.com) decided to do the opposite. It took the least glamorous corner of freight — heavy rigging, oversize hauling, machinery moving — and built a brand loud enough that you remember it after a single look. There's a lesson buried in that decision, and it isn't really about trucks. It's about what happens when a founder in a “boring” industry refuses to be boring.",
      },
      { type: "h2", text: "Start with a name people can't forget" },
      {
        type: "p",
        text: "In a commodity market, most companies are named like law firms — three surnames, or a compass direction and the word “logistics.” They're instantly forgettable, which means they end up competing on exactly one thing: price. A name like **Badass** does something a lower quote never can — it sticks. You can dislike it, but you won't forget it, and in a field where every competitor blends into the same gray, being unforgettable is a head start.",
      },
      {
        type: "p",
        text: "For a founder, a memorable name is the cheapest leverage you'll ever buy. It costs nothing to run every month, it makes word-of-mouth actually travel, and it signals confidence before you've said a word about capability.",
      },
      { type: "h2", text: "Rigging isn't trucking — so stop selling it like it is" },
      {
        type: "image",
        src: "/blog/rigging-hook.jpg",
        alt: "A rated 5-ton lifting block and hook rigged to steel in an industrial shop",
        caption:
          "A rated lifting block is where a move is won or lost. Pick points, center of gravity, and floor loading decide whether a seven-figure machine lands safe — or becomes a very expensive insurance claim.",
      },
      {
        type: "p",
        text: "Anyone can move a pallet. Almost no one can set a seven-figure MRI, level a CNC machining center back to spec, or walk a 40-ton press through a doorway with an inch to spare. That work is closer to engineering than to driving — you calculate the center of gravity, choose the pick points, check the floor loading, and sequence every lift before a single strap comes off.",
      },
      {
        type: "p",
        text: "The mistake most industrial companies make is burying their hardest capability in a bullet list. Badass leads with it. The principle generalizes to almost any business: **whatever is hardest for a competitor to copy should be the loudest thing on your homepage, not a footnote.**",
      },
      { type: "h2", text: "Show the actual work — real beats polished" },
      {
        type: "image",
        src: "/blog/oversize-load.jpg",
        alt: "A gooseneck flatbed loaded with large fabricated steel structures, strapped and blocked for an oversize move",
        caption:
          "Real freight, real straps, real dunnage — fabricated steel rigged and secured for an oversize haul. Photos like this prove the work in a way a stock library never can.",
      },
      {
        type: "p",
        text: "Stock photos of smiling people in clean hard hats fool no one. A photograph of a real shrink-wrapped MRI being chained down outside a hospital, or a gooseneck stacked with fabricated steel and strapped by hand, does something a stock image can't: it proves the work. Trust in B2B is built from evidence, and evidence is specific. The company that shows its actual jobs wins the buyer who's quietly terrified of handing their most expensive asset to a stranger.",
      },
      { type: "h2", text: "Say exactly what you do — everywhere someone might look" },
      {
        type: "p",
        text: "Rigging. Heavy haul. Machinery moving. CNC machine moving. Plant relocation. There's no guessing what Badass does. Then they took that clarity and multiplied it by geography — building pages for each service in the metros they cover, so when a plant manager searches for the exact thing they need in their exact city, the answer is already sitting there. Clarity plus coverage is a moat: you become the obvious result before a competitor even knows the job exists.",
      },
      { type: "h2", text: "Become the answer, not just an option" },
      {
        type: "image",
        src: "/blog/mri-crew.jpg",
        alt: "A crew member hooking chains to a shrink-wrapped MRI on a flatbed at a hospital dock",
        caption:
          "One accountable crew from the hospital dock to final placement — the part clients actually remember, and the part worth documenting.",
      },
      {
        type: "p",
        text: "Badass publishes genuinely useful guides — how to move a CNC machine without wrecking the spindle, what counts as an oversize load, how to re-level a machine after a move. That content does two jobs at once: it earns the trust of the person researching a move, and it makes the brand the source that search engines — and now AI answer engines — quote back to everyone else. When you're the one who explained the problem clearly, you're the one who gets called to solve it. You can see the full library on [their site](https://badasslogistics.com).",
      },
      {
        type: "quote",
        text: "In a commodity industry, the brand is the only thing that isn't a commodity.",
      },
      { type: "h2", text: "Steal this: the playbook" },
      {
        type: "callout",
        title: "The Badass playbook, in five moves",
        text: "1. Name to be remembered, not to blend in. 2. Lead with your hardest-to-copy capability. 3. Publish real photos of real work — proof over polish. 4. Be ruthlessly clear about what you do and where you do it. 5. Turn expertise into content until you're the reference everyone else cites.",
      },
      {
        type: "p",
        text: "None of this required a bigger truck. It required deciding that being good at the work wasn't enough — that the work had to be *seen*. You can watch the whole approach play out at [badasslogistics.com](https://badasslogistics.com). And if you run something in an industry the world calls unglamorous, the takeaway is simple: **boring is a marketing choice, not a fact.**",
      },
    ],
    faq: [
      {
        q: "Can a “boring” B2B company really build a brand?",
        a: "Yes — arguably it's easier, because so few competitors try. In commodity industries most players compete only on price, so a company that invests in a memorable name, sharp positioning, and real proof of its work stands out with far less effort than it would take in a crowded consumer category.",
      },
      {
        q: "What does a heavy rigging and haul company actually move?",
        a: "The high-value, hard-to-handle things standard freight won't touch — seven-figure MRI and medical imaging machines, CNC mills and lathes, presses, generators, and entire production lines. That's why the work is closer to precision rigging and engineering than to ordinary trucking.",
      },
      {
        q: "How does publishing guides help an industrial business get found?",
        a: "Genuinely useful content earns the trust of buyers who are actively researching a move, and it makes the company the source that Google and AI answer engines cite. That turns hard-won expertise into a durable discovery advantage a price cut can never buy.",
      },
      {
        q: "What's the one lesson for founders in unglamorous industries?",
        a: "Your hardest, least-copyable capability should be the loudest thing you say — not a line buried in a services list. Lead with the work only you can do.",
      },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
export const allSlugs = () => POSTS.map((p) => p.slug);
