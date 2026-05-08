// src/app/service/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  LayoutGrid,
  List,
  Building,
  Lightbulb,
  Glasses,
  Images,
  Heart,
  Gem,
  Newspaper,
} from "lucide-react";

/* =========================================================================
   SCHEMA + DATA (kept in this file exactly as requested)
   ------------------------------------------------------------------------- */

type Category =
  | "best-sellers"
  | "business"
  | "tech"
  | "fashion"
  | "entertainment"
  | "lifestyle"
  | "luxury"
  | "news";

type Publication = {
  slug: string;              // kebab-case unique id
  name: string;              // canonical display name
  altName?: string;          // when you gave a second label (e.g., "USA Today Interview")
  priceUSD: number;          // numeric price for sorting and cart
  categories: Category[];    // one or many, depending where it appears in your lists
  bestSeller?: boolean;      // flagged "Best Seller" in your source
  featured?: boolean;        // flagged "featured" in your source
  link: string | null;       // provided URL (null if you didn’t provide)
};

// helper to make slugs consistent
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* ---------------------------
   Logo mapping (optional)
----------------------------*/
const LOGO_MAP: Record<string, string> = {
  "Forbes US": "https://s99pr.com/wp-content/uploads/2025/01/fTQSaTwoeNCp3Og9MxIwZHirJxQ.png",
  Wired: "https://s99pr.com/wp-content/uploads/2025/07/wired-logo-png_seeklogo-153317-removebg-preview.png",
  "USA Today": "https://ext.same-assets.com/3266188084/3339134189.webp",
  "Venture Beat": "https://ext.same-assets.com/3266188084/3229324110.webp",
  "Apple News": "https://s99pr.com/wp-content/uploads/2025/03/Apple-News-Grit-Daily-1.png",
  "LA Weekly": "https://s99pr.com/wp-content/uploads/2025/03/LA-Weekly.png",
  "Digital Journal": "https://s99pr.com/wp-content/uploads/2025/03/Digital-Journal.png",
  Time: "https://s99pr.com/wp-content/uploads/2025/03/time-logo-black-transparent.png",
  Maxim: "https://s99pr.com/wp-content/uploads/2025/03/Maxim-Full-Feature.png",
};

/* Build a logo URL (uses LOGO_MAP first; otherwise attempts a predictable path on s99pr) */
function getLogoUrl(name: string, customLogo?: string) {
  if (customLogo) return customLogo;
  if (LOGO_MAP[name]) return LOGO_MAP[name];
  const safeName = name.replace(/[^a-zA-Z0-9]/g, "-");
  return `https://s99pr.com/wp-content/uploads/2025/03/${safeName}.png`;
}

/* ===== DATA =====  (verbatim) */
const publications: Publication[] = [
  // -------- BEST SELLERS (block 1) --------
  {
    slug: slug("Forbes US"),
    name: "Forbes US",
    priceUSD: 7500,
    categories: ["best-sellers", "business", "tech", "fashion", "entertainment", "lifestyle", "luxury", "news"],
    bestSeller: true,
    featured: true,
    link: "https://www.forbes.com/sites/kristenphilipkoski/2025/06/20/this-ceramic-artist-started-at-the-table-now-shes-lighting-up-the-room/?ss=lifestyle",
  },
  {
    slug: slug("Digital Journal"),
    name: "Digital Journal",
    priceUSD: 1000,
    categories: ["best-sellers", "business", "tech", "fashion", "entertainment", "lifestyle", "news"],
    bestSeller: true,
    link: "https://www.digitaljournal.com/business/from-the-netherlands-to-new-york-a-journey-of-passion-and-persistence/article",
  },
  {
    slug: slug("Apple News"),
    name: "Apple News",
    priceUSD: 1125,
    categories: ["best-sellers", "news"],
    bestSeller: true,
    link: "https://apple.news/AgADB71PURa6RXmkW4xTJ9g",
  },
  {
    slug: slug("LA Weekly"),
    name: "LA Weekly",
    priceUSD: 1375,
    categories: ["best-sellers", "fashion", "entertainment", "lifestyle", "news"],
    bestSeller: true,
    link: "https://www.laweekly.com/liora-kats-storied-journey-to-acting-success/",
  },
  {
    slug: slug("IB Times UK"),
    name: "IB Times UK",
    priceUSD: 1500,
    categories: ["best-sellers", "business", "tech", "news"],
    bestSeller: true,
    link: "https://www.ibtimes.co.uk/alex-eremia-bringing-artificial-intelligence-literacy-all-1731325",
  },
  {
    slug: slug("Haute Living"),
    name: "Haute Living",
    priceUSD: 1500,
    categories: ["best-sellers", "fashion", "lifestyle", "luxury"],
    bestSeller: true,
    link: "https://hauteliving.com/2025/01/jasmine-karamel-revolutionizing-clean-beauty/762649/",
  },
  {
    slug: slug("Tech Times"),
    name: "Tech Times",
    priceUSD: 1625,
    categories: ["best-sellers", "tech", "business", "news"],
    bestSeller: true,
    link: "https://www.techtimes.com/articles/309414/20250218/ai-meets-creator-economy-chelsey-moris-legal-revolution.htm",
  },
  {
    slug: slug("Radar Online"),
    name: "Radar Online",
    priceUSD: 1875,
    categories: ["best-sellers", "entertainment", "lifestyle", "news"],
    bestSeller: true,
    link: "https://radaronline.com/p/ivy-yee-changs-rise-to-international-musical-prominence/",
  },
  {
    slug: slug("Fast Company MX"),
    name: "Fast Company MX",
    priceUSD: 1875,
    categories: ["best-sellers", "business", "tech", "news"],
    bestSeller: true,
    link: "https://fastcompany.mx/",
  },
  {
    slug: slug("Star Magazine"),
    name: "Star Magazine",
    priceUSD: 2000,
    categories: ["best-sellers", "entertainment", "lifestyle", "news"],
    bestSeller: true,
    link: "https://starmagazine.com/vicki-gunvalson-of-rhoc-gets-candid-about-divorce-regrets-on-the-ex-files-podcast-with-amy-lass-adultery-is-a-character-flaw/",
  },
  {
    slug: slug("National Enquirer"),
    name: "National Enquirer",
    priceUSD: 2000,
    categories: ["best-sellers", "entertainment", "news"],
    bestSeller: true,
    link: "https://nationalenquirer.com/who-is-baby-angelina-the-infant-at-the-heart-of-the-los-angeles-dcfs-protest-uprising/",
  },
  {
    slug: slug("LA Mag"),
    name: "LA Mag",
    priceUSD: 2125,
    categories: ["best-sellers", "lifestyle", "news"],
    bestSeller: true,
    link: "https://lamag.com/contributor-content/leap-into-career-success-leap-academys-proven-recipe-for-professional-growth",
  },
  {
    slug: slug("Yahoo Entertainment"),
    name: "Yahoo Entertainment",
    altName: "Yahoo News / Entertainment",
    priceUSD: 2125,
    categories: ["best-sellers", "news", "entertainment"],
    bestSeller: true,
    link: "https://www.yahoo.com/entertainment/",
  },
  {
    slug: slug("Marie Claire NL"),
    name: "Marie Claire NL",
    priceUSD: 2500,
    categories: ["best-sellers", "fashion", "lifestyle"],
    bestSeller: true,
    link: "https://www.marieclaire.nl/",
  },
  {
    slug: slug("Sporting News"),
    name: "Sporting News",
    priceUSD: 2500,
    categories: ["best-sellers", "news", "entertainment"],
    bestSeller: true,
    link: "https://www.sportingnews.com/us",
  },
  {
    slug: slug("Harper's Bazaar AU"),
    name: "Harper's Bazaar AU",
    priceUSD: 2500,
    categories: ["best-sellers", "fashion", "lifestyle", "luxury"],
    bestSeller: true,
    link: "https://harpersbazaar.com.au/how-ai-innovation-is-impacting-professional-services-across-australia/",
  },
  {
    slug: slug("Esquire AU"),
    name: "Esquire (Australia)",
    altName: "Esquire AU",
    priceUSD: 2500,
    categories: ["best-sellers", "fashion", "lifestyle"],
    bestSeller: true,
    link: "https://www.esquire.com.au/how-to-choose-mens-wedding-bands",
  },
  {
    slug: slug("OK! Magazine"),
    name: "OK! Magazine",
    priceUSD: 2500,
    categories: ["best-sellers", "fashion", "entertainment", "lifestyle"],
    bestSeller: true,
    link: "https://okmagazine.com/p/from-lawyer-fashion-innovator-shradha-suds-evolution-akara/",
  },
  {
    slug: slug("Billboard Italy"),
    name: "Billboard (Italy)",
    priceUSD: 2500,
    categories: ["best-sellers", "entertainment"],
    bestSeller: true,
    link: "https://billboard.it/",
  },
  {
    slug: slug("Women's Health AU"),
    name: "Women's Health AU",
    priceUSD: 2500,
    categories: ["best-sellers", "lifestyle"],
    bestSeller: true,
    link: "https://womenshealth.com.au/heres-how-one-brand-is-making-modern-day-sustainability-a-reality/",
  },
  {
    slug: slug("Men's Health AU"),
    name: "Men's Health AU",
    priceUSD: 2500,
    categories: ["best-sellers", "lifestyle"],
    bestSeller: true,
    link: "https://menshealth.com.au/live-with-lloyd/",
  },
  {
    slug: slug("GQ SA"),
    name: "GQ SA",
    priceUSD: 2875,
    categories: ["best-sellers", "fashion", "lifestyle"],
    bestSeller: true,
    link: "https://www.gq.co.za/wealth/the-ceo-who-believes-smaller-is-better-brady-brim-deforest-is-challenging-the-traditions-of-the-consulting-world-2300154c-cdb6-4e3e-8e02-2e283b60c409",
  },
  {
    slug: slug("Fashion Times"),
    name: "Fashion Times",
    priceUSD: 3000,
    categories: ["best-sellers", "fashion"],
    bestSeller: true,
    link: "https://www.fashiontimes.com/",
  },
  {
    slug: slug("Variety AU"),
    name: "Variety AU",
    priceUSD: 3125,
    categories: ["best-sellers", "entertainment", "news"],
    bestSeller: true,
    link: "https://au.variety.com/2024/more/news/marko-stout-brings-a-fresh-perspective-to-art-and-entertainment-culture-19051/",
  },
  {
    slug: slug("Rolling Stone AU"),
    name: "Rolling Stone (Australia)",
    altName: "Rolling Stone AU",
    priceUSD: 3125,
    categories: ["best-sellers", "entertainment"],
    bestSeller: true,
    link: "https://au.rollingstone.com/music/music-news/harfouchs-peace-anthem-echoes-through-dubai-with-orlando-bloom-71102/",
  },
  {
    slug: slug("Bustle"),
    name: "Bustle",
    priceUSD: 3125,
    categories: ["best-sellers", "fashion", "lifestyle"],
    bestSeller: true,
    link: "https://www.bustle.com/entertainment/how-wild-horses-are-fueling-the-next-wave-in-ecotourism",
  },
  {
    slug: slug("Elle Quebec"),
    name: "Elle Quebec",
    priceUSD: 3125,
    categories: ["best-sellers", "fashion"],
    bestSeller: true,
    link: "https://www.ellecanada.com/vip/elle-extra/how-tech-personalization-can-create-a-new-era-of-skincare/",
  },
  {
    slug: slug("The Zoe Report"),
    name: "The Zoe Report",
    priceUSD: 3125,
    categories: ["best-sellers", "fashion", "lifestyle"],
    bestSeller: true,
    link: "https://www.thezoereport.com/wellness/why-formula-wellness-takes-a-holistic-approach-to-health-optimization",
  },
  {
    slug: slug("Nylon"),
    name: "Nylon",
    priceUSD: 3125,
    categories: ["best-sellers", "fashion", "lifestyle"],
    bestSeller: true,
    link: "https://www.nylon.com/life/how-to-elevate-your-home-design-with-custom-cabinetry",
  },
  {
    slug: slug("Entrepreneur UK"),
    name: "Entrepreneur UK",
    priceUSD: 3750,
    categories: ["best-sellers", "business"],
    bestSeller: true,
    link: "https://www.entrepreneur.com/en-gb",
  },
  {
    slug: slug("Entrepreneur ME"),
    name: "Entrepreneur ME",
    priceUSD: 3750,
    categories: ["best-sellers", "business"],
    bestSeller: true,
    link: "https://www.entrepreneur.com/en-ae",
  },
  {
    slug: slug("Digital Trends"),
    name: "Digital Trends",
    priceUSD: 3750,
    categories: ["best-sellers", "tech", "business"],
    bestSeller: true,
    link: "https://www.digitaltrends.com/contributor-content/ai-powered-personalized-phone-calls-on-your-behalf-enter-an-era-of-convenience-with-voxme/",
  },
  {
    slug: slug("Muscle & Fitness"),
    name: "Muscle & Fitness",
    priceUSD: 3750,
    categories: ["best-sellers", "lifestyle"],
    bestSeller: true,
    link: "https://www.muscleandfitness.com/nutrition/healthy-eating/not-hydrating-enough-drink-it-in-with-this-innovative-solution/",
  },
  {
    slug: slug("Cosmopolitan ME"),
    name: "Cosmopolitan ME",
    priceUSD: 3750,
    categories: ["best-sellers", "fashion", "lifestyle"],
    bestSeller: true,
    link: "https://www.cosmopolitanme.com/fashion/styling-with-sustainable-brands",
  },
  {
    slug: slug("Investing"),
    name: "Investing",
    priceUSD: 3750,
    categories: ["best-sellers", "business", "tech", "news"],
    bestSeller: true,
    link: "https://www.investing.com/studios/article-382655",
  },
  {
    slug: slug("Paper Mag"),
    name: "Paper Mag",
    priceUSD: 5000,
    categories: ["best-sellers", "entertainment", "fashion"],
    bestSeller: true,
    link: "https://www.papermag.com/making-pet-care-part-of-our-culture-how-maya-is-turning-dog-wellness-into-a-lifestyle-movement",
  },
  {
    slug: slug("Wired"),
    name: "Wired",
    priceUSD: 5000,
    categories: ["best-sellers", "tech"],
    bestSeller: true,
    link: "https://www.wired.com/",
  },
  {
    slug: slug("USA Today"),
    name: "USA Today",
    priceUSD: 5000,
    categories: ["best-sellers", "news"],
    bestSeller: true,
    link: "https://www.usatoday.com/story/special/contributor-content/2025/06/29/dr-simbiat-adighije-asks-what-if-mental-health-care-were-as-routine-as-a-physical/84409075007/",
  },
  {
    slug: slug("Venture Beat"),
    name: "Venture Beat",
    priceUSD: 5000,
    categories: ["best-sellers", "tech", "business"],
    bestSeller: true,
    link: "https://venturebeat.com/business/how-pump-is-redefining-cloud-cost-savings",
  },
  {
    slug: slug("Hypebae AU"),
    name: "Hypebae AU",
    priceUSD: 9500,
    categories: ["best-sellers", "fashion", "lifestyle"],
    bestSeller: true,
    link: "https://hypebae.com/",
  },
  {
    slug: slug("Time"),
    name: "Time",
    priceUSD: 11500,
    categories: ["best-sellers", "news", "business", "lifestyle"],
    bestSeller: false,
    link: "https://partners.time.com/partners/bcc/navigating-the-complexities-of-global-trade-insights-from-kerim-kfuris-supply/?prx_t=ao0JAOgJtA9k0PA&utm_campaign=216036&ntv_ui=a10a8d4e-5160-41c3-a9ee-628292e7db06&ntv_ht=nF-RZwA",
  },

  // --------- BUSINESS BLOCK (merged) ---------
  { slug: slug("Press Release"), name: "Press Release", priceUSD: 875, categories: ["business", "tech", "news"], link: null },
  { slug: slug("IB Times AP"), name: "IB Times AP", priceUSD: 1000, categories: ["business", "tech", "entertainment", "lifestyle", "news"], link: "https://www.ibtimes.sg/" },
  { slug: slug("Global Banking & Finance"), name: "Global Banking & Finance", priceUSD: 1000, categories: ["business"], link: "https://www.globalbankingandfinance.com/" },
  { slug: slug("VC Post"), name: "VC Post", priceUSD: 1000, categories: ["business", "tech"], link: "https://www.vcpost.com/" },
  { slug: slug("Fintech Finance News"), name: "Fintech Finance News", priceUSD: 1000, categories: ["business", "tech"], link: "https://ffnews.com/" },
  { slug: slug("Vegas News"), name: "Vegas News", priceUSD: 1000, categories: ["business", "lifestyle", "news"], link: "https://www.vegasnews.com/" },
  { slug: slug("Financial Tech Times"), name: "Financial Tech Times", priceUSD: 1000, categories: ["business", "tech"], link: null }, // ambiguous brand, left null
  { slug: slug("California Business"), name: "California Business", priceUSD: 1000, categories: ["business"], link: "https://calbizjournal.com/" },
  { slug: slug("Finance Digest"), name: "Finance Digest", priceUSD: 1000, categories: ["business"], link: "https://www.financedigest.com/" },
  { slug: slug("HackerNoon"), name: "HackerNoon", priceUSD: 1000, categories: ["business", "tech"], link: "https://hackernoon.com/" },
  { slug: slug("Finance Feeds"), name: "Finance Feeds", priceUSD: 1125, categories: ["business"], link: "https://financefeeds.com/" },
  { slug: slug("CEO World Biz"), name: "CEO World Biz", priceUSD: 1125, categories: ["business"], link: "https://ceoworld.biz/" },
  { slug: slug("Fast Company AF"), name: "Fast Company AF", priceUSD: 1375, categories: ["business", "tech"], link: "https://fastcompany.co.za/" },
  { slug: slug("Haute Beauty"), name: "Haute Beauty", priceUSD: 1500, categories: ["fashion", "lifestyle", "luxury", "business"], link: "https://hauteliving.com/hautebeauty/" },
  { slug: slug("The Defiant"), name: "The Defiant", priceUSD: 1625, categories: ["tech", "business"], link: "https://thedefiant.io/" },
  { slug: slug("Harper's Bazaar VN"), name: "Harper's Bazaar VN", priceUSD: 1875, categories: ["fashion", "lifestyle"], link: "https://bazaarvietnam.vn/" },
  { slug: slug("Miami Herald PR"), name: "Miami Herald PR", priceUSD: 1875, categories: ["news", "business"], link: "https://www.miamiherald.com/press-releases/" },
  { slug: slug("Barchart PR"), name: "Barchart PR", priceUSD: 1875, categories: ["business"], link: "https://www.barchart.com/press-releases" },
  { slug: slug("L'Officiel Austria"), name: "L'Officiel Austria", priceUSD: 1875, categories: ["fashion", "lifestyle", "luxury"], link: "https://lofficiel.at/" },
  { slug: slug("Mashable NL"), name: "Mashable NL", priceUSD: 2000, categories: ["tech", "entertainment", "news"], link: "https://nl.mashable.com/" },
  { slug: slug("Smart Company AU"), name: "Smart Company AU", priceUSD: 2500, categories: ["business"], link: "https://www.smartcompany.com.au/" },
  { slug: slug("GQ SA (dup)"), name: "GQ SA", priceUSD: 2875, categories: ["fashion", "lifestyle"], link: "https://www.gq.co.za/" },
  { slug: slug("Forbes MX"), name: "Forbes MX", priceUSD: 3000, categories: ["business", "tech", "fashion", "entertainment", "lifestyle", "luxury", "news"], featured: true, link: "https://www.forbes.com.mx/" },
  { slug: slug("Forbes Colombia"), name: "Forbes Colombia", priceUSD: 3000, categories: ["business"], featured: true, link: "https://forbes.co/" },
  { slug: slug("Entrepreneur IN"), name: "Entrepreneur IN", priceUSD: 3000, categories: ["business"], link: "https://www.entrepreneur.com/in" },
  { slug: slug("IB Times NA"), name: "IB Times NA", priceUSD: 3125, categories: ["news", "business"], link: "https://www.ibtimes.com/" },
  { slug: slug("Medical Daily"), name: "Medical Daily", priceUSD: 3125, categories: ["news", "lifestyle"], link: "https://www.medicaldaily.com/" },
  { slug: slug("Due + MSN"), name: "Due + MSN", priceUSD: 3125, categories: ["business", "news"], link: "https://www.due.com/" },
  { slug: slug("Forbes TR"), name: "Forbes TR", priceUSD: 3750, categories: ["business"], featured: true, link: "https://www.forbes.com.tr/" },
  { slug: slug("CEO Middle East"), name: "CEO Middle East", priceUSD: 3750, categories: ["business", "lifestyle"], link: "https://www.ceomiddleeast.com/" },
  { slug: slug("Entrepreneur AP"), name: "Entrepreneur AP", priceUSD: 4250, categories: ["business"], link: "https://www.entrepreneur.com/ap" },
  { slug: slug("Geekwire"), name: "Geekwire", priceUSD: 5000, categories: ["tech", "business"], link: "https://www.geekwire.com/" },
  { slug: slug("HuffPost"), name: "HuffPost", priceUSD: 5625, categories: ["news", "lifestyle"], link: "https://www.huffpost.com/" },
  { slug: slug("Forbes ARG"), name: "Forbes (Italy) / Forbes ARG", priceUSD: 5625, categories: ["business"], link: "https://www.forbesargentina.com/" },
  { slug: slug("The Biz Journals Miami"), name: "The Biz Journals Miami", priceUSD: 5625, categories: ["business", "news"], link: "https://www.bizjournals.com/southflorida/" },
  { slug: slug("The Biz Journals Chicago"), name: "The Biz Journals Chicago", priceUSD: 5625, categories: ["business", "news"], link: "https://www.bizjournals.com/chicago/" },
  { slug: slug("The Biz Journals Los Angeles"), name: "The Biz Journals Los Angeles", priceUSD: 5625, categories: ["business", "news"], link: "https://labusinessjournal.com/" },
  { slug: slug("The Biz Journals New York"), name: "The Biz Journals New York", priceUSD: 5625, categories: ["business", "news"], link: "https://www.bizjournals.com/newyork/" },
  { slug: slug("The Biz Journals Dallas"), name: "The Biz Journals Dallas", priceUSD: 5625, categories: ["business", "news"], link: "https://www.bizjournals.com/dallas/" },
  { slug: slug("Maxim"), name: "Maxim", priceUSD: 6250, categories: ["entertainment", "fashion", "lifestyle"], link: "https://www.maxim.com/" },
  { slug: slug("USA Today Interview"), name: "USA Today Digital Interview", altName: "USA Today Interview", priceUSD: 6250, categories: ["news"], link: "https://www.usatoday.com/" },
  { slug: slug("Forbes AU"), name: "Forbes AU", priceUSD: 7500, categories: ["business"], link: "https://www.forbes.com.au/" },
  { slug: slug("Forbes IT"), name: "Forbes IT", priceUSD: 7500, categories: ["business"], featured: true, link: "https://forbes.it/" },
  { slug: slug("WWD"), name: "WWD", priceUSD: 8000, categories: ["fashion", "lifestyle", "luxury"], link: "https://wwd.com/" },
  { slug: slug("Sourcing Journal"), name: "Sourcing Journal", priceUSD: 8000, categories: ["fashion", "business"], link: "https://sourcingjournal.com/" },

  // -------- TECH (unique not already added) --------
  { slug: slug("Techgyd"), name: "Techgyd", priceUSD: 1000, categories: ["tech"], link: "https://www.techgyd.com/" },
  { slug: slug("Science Times"), name: "Science Times", priceUSD: 1000, categories: ["tech", "news"], link: "https://www.sciencetimes.com/" },
  { slug: slug("Geek Extreme"), name: "Geek Extreme", priceUSD: 1125, categories: ["tech"], link: "https://www.geekextreme.com/" },
  { slug: slug("Tech Round"), name: "Tech Round", priceUSD: 1125, categories: ["tech"], link: "https://techround.co.uk/" },
  { slug: slug("Swagger Magazine"), name: "Swagger Magazine", priceUSD: 1250, categories: ["fashion", "lifestyle"], link: "https://www.swaggermagazine.com/" },
  { slug: slug("Technori"), name: "Technori", priceUSD: 1750, categories: ["tech"], link: "https://technori.com/" },
  { slug: slug("DevX"), name: "DevX", priceUSD: 1875, categories: ["tech"], link: "https://www.devx.com/" },
  { slug: slug("Readwrite"), name: "Readwrite", priceUSD: 1875, categories: ["tech"], link: "https://readwrite.com/" },
  { slug: slug("Forbes TR (dup)"), name: "Forbes TR", priceUSD: 3750, categories: ["business"], featured: true, link: "https://www.forbes.com.tr/" },
  { slug: slug("ZDNET"), name: "ZDNET", priceUSD: 5000, categories: ["tech"], link: "https://www.zdnet.com/" },
  { slug: slug("Extreme Tech"), name: "Extreme Tech", priceUSD: 5000, categories: ["tech"], link: "https://www.extremetech.com/" },
  { slug: slug("Ask Men"), name: "Ask Men", priceUSD: 5000, categories: ["lifestyle"], link: "https://www.askmen.com/" },
  { slug: slug("PC Mag"), name: "PC Mag", priceUSD: 5625, categories: ["tech"], link: "https://www.pcmag.com/" },

  // -------- FASHION (unique not already added) --------
  { slug: slug("Vegas News (dup)"), name: "Vegas News", priceUSD: 1000, categories: ["news", "lifestyle"], link: "https://www.vegasnews.com/" },
  { slug: slug("Fashion Week Daily"), name: "Fashion Week Daily", priceUSD: 1000, categories: ["fashion"], link: "https://fashionweekdaily.com/" },
  { slug: slug("Galore Magazine"), name: "Galore Magazine", priceUSD: 1250, categories: ["fashion", "entertainment"], link: "https://galoremag.com/" },
  { slug: slug("Female First"), name: "Female First", priceUSD: 1250, categories: ["entertainment", "lifestyle"], link: "https://www.femalefirst.co.uk/" },
  { slug: slug("Bust Magazine"), name: "Bust Magazine", priceUSD: 1375, categories: ["fashion", "lifestyle"], link: "https://bust.com/" },
  { slug: slug("Village Voice"), name: "Village Voice", priceUSD: 1375, categories: ["entertainment"], link: "https://www.villagevoice.com/" },
  { slug: slug("Flaunt Magazine"), name: "Flaunt Magazine", priceUSD: 2125, categories: ["fashion", "entertainment"], link: "https://flaunt.com/" },
  { slug: slug("Wonderwall"), name: "Wonderwall", priceUSD: 1875, categories: ["entertainment"], link: "https://www.wonderwall.com/" },
  { slug: slug("InStyle MX"), name: "InStyle MX", priceUSD: 3125, categories: ["fashion"], link: "https://www.instyle.mx/" },
  { slug: slug("Elle IN"), name: "Elle IN", priceUSD: 3125, categories: ["fashion"], link: "https://www.elle.in/" },
  { slug: slug("Elle Canada"), name: "Elle Canada", priceUSD: 3125, categories: ["fashion"], link: "https://www.ellecanada.com/" },
  { slug: slug("Marie Claire UA"), name: "Marie Claire UA", priceUSD: 3750, categories: ["fashion"], link: "https://marieclaire.ua/" },
  { slug: slug("Harper's Bazaar AR"), name: "Harper's Bazaar AR", priceUSD: 3750, categories: ["fashion", "luxury"], link: "https://www.harpersbazaararabia.com/" },
  { slug: slug("Grazia Magazine"), name: "Grazia Magazine", priceUSD: 3750, categories: ["fashion"], link: "https://www.grazia.com/" },
  { slug: slug("Harper's Bazaar TR"), name: "Harper's Bazaar TR", priceUSD: 3750, categories: ["fashion"], link: "https://www.harpersbazaar.com.tr/" },
  { slug: slug("Esquire TR"), name: "Esquire TR", priceUSD: 3750, categories: ["fashion"], link: "https://www.esquire.com.tr/" },
  { slug: slug("GQ TR"), name: "GQ TR", priceUSD: 3750, categories: ["fashion"], link: "https://gq.com.tr/" },
  { slug: slug("Vogue TR"), name: "Vogue TR", priceUSD: 3750, categories: ["fashion", "luxury"], link: "https://www.vogue.com.tr/" },
  { slug: slug("WWD (dup)"), name: "WWD", priceUSD: 8000, categories: ["fashion", "luxury"], link: "https://wwd.com/" },
  { slug: slug("Foot Wear News"), name: "Foot Wear News", priceUSD: 8000, categories: ["fashion"], link: "https://footwearnews.com/" },
  { slug: slug("Hypebeast AU"), name: "Hypebeast AU", priceUSD: 9500, categories: ["fashion", "lifestyle"], link: "https://hypebeast.com/" },
  { slug: slug("Vogue UA"), name: "Vogue UA", priceUSD: 11500, categories: ["fashion", "luxury"], link: "https://vogue.ua/" },
  { slug: slug("Variety (global)"), name: "Variety", priceUSD: 17500, categories: ["entertainment", "news"], link: "https://variety.com/" },

  // -------- ENTERTAINMENT (unique not already added) --------
  { slug: slug("Ladygunn"), name: "Ladygunn", priceUSD: 1250, categories: ["entertainment", "fashion"], link: "https://www.ladygunn.com/" },
  { slug: slug("Sauce Magazine"), name: "Sauce Magazine", priceUSD: 1500, categories: ["lifestyle"], link: "https://www.saucemagazine.com/" },
  { slug: slug("Perez Hilton"), name: "Perez Hilton", priceUSD: 1500, categories: ["entertainment"], link: "https://perezhilton.com/" },
  { slug: slug("Hollywood Life"), name: "Hollywood Life", priceUSD: 1875, categories: ["entertainment"], link: "https://hollywoodlife.com/" },
  { slug: slug("Kaltbult Magazine"), name: "Kaltbult Magazine", priceUSD: 1875, categories: ["fashion"], link: "https://www.kaltblut-magazine.com/" },
  { slug: slug("Playboy NL"), name: "Playboy NL", priceUSD: 2000, categories: ["entertainment"], link: "https://playboy.nl/" },
  { slug: slug("Hollywood Unlocked"), name: "Hollywood Unlocked", priceUSD: 2125, categories: ["entertainment"], link: "https://www.hollywoodunlocked.com/" },
  { slug: slug("Fault Magazine"), name: "Fault Magazine", priceUSD: 2500, categories: ["fashion", "entertainment"], link: "https://fault-magazine.com/" },
  { slug: slug("Paste Magazine"), name: "Paste Magazine", priceUSD: 2875, categories: ["entertainment"], link: "https://www.pastemagazine.com/" },
  { slug: slug("Jezebel"), name: "Jezebel", priceUSD: 2875, categories: ["entertainment", "lifestyle"], link: "https://jezebel.com/" },
  { slug: slug("Inverse"), name: "Inverse", priceUSD: 3125, categories: ["tech", "entertainment"], link: "https://www.inverse.com/" },
  { slug: slug("Rolling Stone MENA"), name: "Rolling Stone (MENA)", priceUSD: 3125, categories: ["entertainment"], link: null },
  { slug: slug("Rolling Stone UK"), name: "Rolling Stone (UK)", priceUSD: 3125, categories: ["entertainment"], link: "https://www.rollingstone.co.uk/" },
  { slug: slug("Elite Daily"), name: "Elite Daily", priceUSD: 3125, categories: ["entertainment", "lifestyle"], link: "https://www.elitedaily.com/" },
  { slug: slug("Billboard Africa"), name: "Billboard Africa", priceUSD: 4250, categories: ["entertainment"], link: null },
  { slug: slug("Variety (dup AU)"), name: "Variety AU", priceUSD: 3125, categories: ["entertainment"], link: "https://au.variety.com/" },
  { slug: slug("Rolling Stone (global)"), name: "Rolling Stone", priceUSD: 22500, categories: ["entertainment"], link: "https://www.rollingstone.com/" },

  // -------- LIFESTYLE (unique not already added) --------
  { slug: slug("Retail Insider"), name: "Retail Insider", priceUSD: 1000, categories: ["lifestyle", "business"], link: "https://retail-insider.com/" },
  { slug: slug("Upscale Living"), name: "Upscale Living", priceUSD: 1125, categories: ["lifestyle", "luxury"], link: "https://www.upscalelivingmag.com/" },
  { slug: slug("Green Matters"), name: "Green Matters", priceUSD: 1250, categories: ["lifestyle"], link: "https://www.greenmatters.com/" },
  { slug: slug("House & Garden AF"), name: "House & Garden AF", priceUSD: 2500, categories: ["lifestyle"], link: "https://www.houseandgarden.co.za/" },
  { slug: slug("AV Club"), name: "AV Club", priceUSD: 2875, categories: ["entertainment"], link: "https://avclub.com/" },
  { slug: slug("Travel and Leisure MX"), name: "Travel and Leisure MX", priceUSD: 3000, categories: ["lifestyle"], link: "https://www.travelandleisure.com.mx/" },
  { slug: slug("Inverse (dup)"), name: "Inverse", priceUSD: 3125, categories: ["tech", "entertainment"], link: "https://www.inverse.com/" },
  { slug: slug("Mic"), name: "Mic", priceUSD: 3125, categories: ["lifestyle", "news"], link: "https://www.mic.com/" },
  { slug: slug("The Manual"), name: "The Manual", priceUSD: 3125, categories: ["lifestyle"], link: "https://www.themanual.com/" },
  { slug: slug("Self"), name: "Self", priceUSD: 8750, categories: ["lifestyle"], link: "https://www.self.com/" },
  { slug: slug("Thrive Global"), name: "Thrive Global", priceUSD: 5625, categories: ["business", "lifestyle"], link: "https://thriveglobal.com/" },
  { slug: slug("Self (dup news block)"), name: "Self", priceUSD: 8750, categories: ["lifestyle"], link: "https://www.self.com/" },
  { slug: slug("Epicurious"), name: "Epicurious", priceUSD: 8750, categories: ["lifestyle"], link: "https://www.epicurious.com/" },
  { slug: slug("Ars Technica"), name: "Ars Technica", priceUSD: 8750, categories: ["tech"], link: "https://arstechnica.com/" },
  { slug: slug("Teen Vogue"), name: "Teen Vogue", priceUSD: 8750, categories: ["fashion", "lifestyle"], link: "https://www.teenvogue.com/" },
  { slug: slug("Bon Appetit"), name: "Bon Appétit", priceUSD: 8750, categories: ["lifestyle"], link: "https://www.bonappetit.com/" },
  { slug: slug("Pitchfork"), name: "Pitchfork", priceUSD: 8750, categories: ["entertainment"], link: "https://pitchfork.com/" },
  { slug: slug("Allure"), name: "Allure", priceUSD: 8750, categories: ["lifestyle", "fashion"], link: "https://www.allure.com/" },
  { slug: slug("Conde Nast Traveler"), name: "Condé Nast Traveler", priceUSD: 8750, categories: ["lifestyle"], link: "https://www.cntraveler.com/" },
  { slug: slug("Glamour (global)"), name: "Glamour", priceUSD: 8750, categories: ["fashion", "lifestyle"], link: "https://www.glamour.com/" },
  { slug: slug("Architectural Digest"), name: "Architectural Digest", priceUSD: 8750, categories: ["lifestyle", "luxury"], link: "https://www.architecturaldigest.com/" },

  // -------- LUXURY (unique not already added) --------
  { slug: slug("Robb Report MX"), name: "Robb Report MX", priceUSD: 3125, categories: ["luxury", "lifestyle"], link: "https://robbreport.mx/" },
  { slug: slug("Robb Report IT"), name: "Robb Report IT", priceUSD: 8000, categories: ["luxury", "lifestyle"], link: "https://robbreport.it/" },

  // -------- NEWS (unique not already added) --------
  { slug: slug("Distractify+MSN"), name: "Distractify+MSN", priceUSD: 1250, categories: ["news", "entertainment"], link: "https://www.distractify.com/" },
  { slug: slug("San Diego Reader"), name: "San Diego Reader", priceUSD: 1125, categories: ["news"], link: "https://www.sandiegoreader.com/" },
  { slug: slug("SF Examiner"), name: "SF Examiner", priceUSD: 1250, categories: ["news"], link: "https://www.sfexaminer.com/" },
  { slug: slug("SF Weekly"), name: "SF Weekly", priceUSD: 1250, categories: ["news"], link: "https://www.sfweekly.com/" },
  { slug: slug("Silicon Valley"), name: "Silicon Valley", priceUSD: 1875, categories: ["news", "tech"], link: "https://www.siliconvalley.com/" },
  { slug: slug("LA Mag (dup)"), name: "LA Mag", priceUSD: 2125, categories: ["news", "lifestyle"], link: "https://www.lamag.com/" },
  { slug: slug("Yahoo Entertainment (dup)"), name: "Yahoo Entertainment", priceUSD: 2125, categories: ["news", "entertainment"], link: "https://www.yahoo.com/entertainment/" },
  { slug: slug("Techopedia"), name: "Techopedia", priceUSD: 2500, categories: ["tech", "news"], link: "https://www.techopedia.com/" },
  { slug: slug("Splinter"), name: "Splinter", priceUSD: 2875, categories: ["news"], link: "https://www.splinter.com/" },
  { slug: slug("Entrepreneur ME (dup)"), name: "Entrepreneur ME", priceUSD: 3750, categories: ["business"], link: "https://www.entrepreneur.com/en-ae" },
  { slug: slug("Esquire ME"), name: "Esquire ME", priceUSD: 3750, categories: ["fashion", "lifestyle"], link: "https://www.esquireme.com/" },
  { slug: slug("GQ TR (dup)"), name: "GQ TR", priceUSD: 3750, categories: ["fashion"], link: "https://gq.com.tr/" },
  { slug: slug("Vogue TR (dup)"), name: "Vogue TR", priceUSD: 3750, categories: ["fashion", "luxury"], link: "https://www.vogue.com.tr/" },
  { slug: slug("Investing AU"), name: "Investing AU", priceUSD: 3750, categories: ["business", "news"], link: "https://au.investing.com/" },
  { slug: slug("Investing China"), name: "Investing China", priceUSD: 3750, categories: ["business", "news"], link: "https://cn.investing.com/" },
  { slug: slug("Investing UK"), name: "Investing UK", priceUSD: 3750, categories: ["business", "news"], link: "https://uk.investing.com/" },
  { slug: slug("Investing HK"), name: "Investing HK", priceUSD: 3750, categories: ["business", "news"], link: "https://hk.investing.com/" },
  { slug: slug("Investing CA"), name: "Investing CA", priceUSD: 3750, categories: ["business", "news"], link: "https://ca.investing.com/" },
  { slug: slug("Forbes Israel"), name: "Forbes Israel", priceUSD: 3750, categories: ["business", "news"], link: "https://forbes.co.il/" },
  { slug: slug("Top Gear ME"), name: "Top Gear ME", priceUSD: 3750, categories: ["news"], link: "https://www.topgear.com/" },
  { slug: slug("Mashable (global)"), name: "Mashable", priceUSD: 5000, categories: ["tech", "news"], link: "https://mashable.com/" },
  { slug: slug("CNET"), name: "CNET", priceUSD: 5000, categories: ["tech", "news"], link: "https://www.cnet.com/" },
  { slug: slug("Lifehacker"), name: "Lifehacker", priceUSD: 5000, categories: ["tech", "news"], link: "https://lifehacker.com/" },
  { slug: slug("Daily Express"), name: "Daily Express", priceUSD: 5000, categories: ["news"], link: "https://www.express.co.uk/" },
  { slug: slug("Daily Star"), name: "Daily Star", priceUSD: 5000, categories: ["news"], link: "https://www.dailystar.co.uk/" },
  { slug: slug("The Sun"), name: "The Sun", priceUSD: 5000, categories: ["news"], link: "https://www.thesun.co.uk/" },
  { slug: slug("The Independent"), name: "The Independent", priceUSD: 5000, categories: ["news"], link: "https://www.independent.co.uk/" },
  { slug: slug("Mirror UK"), name: "Mirror UK", priceUSD: 5700, categories: ["news"], link: "https://www.mirror.co.uk/" },
  { slug: slug("Metro UK"), name: "Metro UK", priceUSD: 5700, categories: ["news"], link: "https://metro.co.uk/" },
  { slug: slug("Forbes Business Council"), name: "Forbes Business Council", priceUSD: 6000, categories: ["business"], link: "https://www.forbes.com/sites/forbesbusinesscouncil/" },
  { slug: slug("Time Africa"), name: "Time Africa", priceUSD: 7000, categories: ["news"], link: "https://time.com/africa/" },
  { slug: slug("Daily Mail"), name: "Daily Mail", priceUSD: 11000, categories: ["news"], link: "https://www.dailymail.co.uk/" },
  { slug: slug("People"), name: "People", priceUSD: 12000, categories: ["news", "entertainment"], link: "https://people.com/" },
  { slug: slug("BBC"), name: "BBC", priceUSD: 12000, categories: ["news"], link: "https://www.bbc.com/" },
  { slug: slug("The Hollywood Reporter"), name: "The Hollywood Reporter", priceUSD: 0, categories: ["entertainment", "news"], link: "https://www.hollywoodreporter.com/" },
];

// Optional helpers (kept file-local)
const publicationMap: Record<string, Publication> = Object.fromEntries(
  publications.map((p) => [p.slug, p])
);

const MISSING_LINKS = publications
  .filter((p) => !p.link)
  .map((p) => p.name)
  .filter((name, i, arr) => arr.indexOf(name) === i);

/* =========================================================================
   UI CONFIG
   ------------------------------------------------------------------------- */
type UiCategory = Category | "all";
const CATEGORIES: { key: UiCategory; label: string; icon: React.ElementType }[] = [
  { key: "all", label: "All", icon: LayoutGrid },
  { key: "best-sellers", label: "Best Seller", icon: List },
  { key: "business", label: "Business", icon: Building },
  { key: "tech", label: "Tech", icon: Lightbulb },
  { key: "fashion", label: "Fashion", icon: Glasses },
  { key: "entertainment", label: "ENT", icon: Images },
  { key: "lifestyle", label: "Lifestyle", icon: Heart },
  { key: "luxury", label: "Luxury", icon: Gem },
  { key: "news", label: "News", icon: Newspaper },
];

/* =========================================================================
   PAGE
   ------------------------------------------------------------------------- */

export default function ServicesPage() {
  const [active, setActive] = useState<UiCategory>("all");

  const filtered = useMemo(() => {
    if (active === "all") return publications;
    return publications.filter((p) => p.categories.includes(active));
  }, [active]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <Header />

      {/* HERO */}
      <section className="pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
            Publications
          </h1>
          <p className="mt-3 text-zinc-400">
            Curated outlets across Business, Tech, Fashion, Entertainment, Lifestyle & News
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const isActive = active === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  className={`flex flex-col items-center justify-center w-28 h-28 rounded-2xl border text-sm font-semibold transition-all backdrop-blur-sm
                  ${isActive
                      ? "border-transparent text-black bg-gradient-to-r from-cyan-300 to-emerald-300 shadow-lg shadow-cyan-500/10 scale-105"
                      : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:border-white/20"
                    }`}
                >
                  <Icon className="w-7 h-7 mb-2 opacity-90" />
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Adjust grid columns based on screen size */}
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {filtered.map((item) => {
              const src = getLogoUrl(item.name);
              const href =
                item.link ||
                `https://www.google.com/search?q=${encodeURIComponent(item.name + " official site")}`;

              return (
                <Link
                  key={item.slug}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.name}
                  className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 h-80 flex flex-col items-center justify-start
                             ring-0 hover:ring-2 hover:ring-cyan-300/40 transition-all duration-300 hover:-translate-y-0.5
                             shadow-sm hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  {item.bestSeller && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 text-black shadow">
                        Best Seller
                      </div>
                    </div>
                  )}

                  {/* Logo plate (bigger) */}
                  <div className="mt-2 flex items-center justify-center">
                    <div className="w-full max-w-[260px] h-[110px] rounded-xl bg-white/95 border border-zinc-200 shadow-sm flex items-center justify-center p-4">
                     <PublicationLogo name={item.name} srcPrimary={src} link={item.link} />
                    </div>
                  </div>

                  {/* Name */}
                  <div className="mt-4 text-base sm:text-lg text-zinc-100 text-center leading-tight line-clamp-2">
                    {item.altName ?? item.name}
                  </div>

                  {/* Subtle chips */}
                  <div className="mt-3 flex flex-wrap gap-1 justify-center">
                    {item.categories.slice(0, 2).map((c) => (
                      <span
                        key={c}
                        className="px-2 py-1 text-[10px] uppercase tracking-wide rounded-full bg-white/10 text-zinc-300 border border-white/10"
                      >
                        {c}
                      </span>
                    ))}
                    {item.featured && (
                      <span className="px-2 py-1 text-[10px] uppercase tracking-wide rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/20">
                        featured
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Missing links helper (optional) */}
      {/* {MISSING_LINKS.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <details className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-300">
              <summary className="cursor-pointer text-zinc-100 font-semibold">
                Missing links ({MISSING_LINKS.length})
              </summary>
              <ul className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                {MISSING_LINKS.map((n) => (
                  <li key={n} className="truncate">{n}</li>
                ))}
              </ul>
            </details>
          </div>
        </section>
      )} */}

      <Footer />
    </div>
  );
}

/* Logo with progressive fallback:
   - main logo URL
   - site favicon (via Google S2) if main fails
   - text fallback
*/
function PublicationLogo({
  name,
  srcPrimary,
  link,
}: {
  name: string;
  srcPrimary: string;
  link: string | null;
}) {
  const [stage, setStage] = useState<0 | 1 | 2>(0); // 0=primary, 1=favicon, 2=text

  // Build favicon URL if we have a link
  let faviconSrc: string | null = null;
  try {
    if (link) {
      const origin = new URL(link).origin;
      faviconSrc = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(origin)}&sz=128`;
    }
  } catch {
    // ignore bad URLs
  }

  if (stage === 2 || (!srcPrimary && !faviconSrc)) {
    return <span className="text-[12px] tracking-wide text-zinc-500">{name}</span>;
  }

  const imgSrc = stage === 0 ? srcPrimary : (faviconSrc as string);

  return (
    <Image
      src={imgSrc}
      alt={name}
      width={220}
      height={110}
      className="max-h-[90px] w-auto object-contain transition-transform group-hover:scale-[1.03] max-w-full"
      onError={() => setStage((s) => (s === 0 && faviconSrc ? 1 : 2))}
      unoptimized
    />
  );
}

