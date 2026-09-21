export type Product = {
  slug: string;
  name: string;
  priceCents: number;
  blurb: string;
  description: string;
  includes: string[];
  audience: string;
  delivery: string;
  badge?: string;
  mode: "payment" | "subscription";
  entitlement: string;
};

function cents(envName: string, fallback: number) {
  const raw = process.env[envName];
  if (!raw) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export const products: Product[] = [
  {
    slug: "starter-pack",
    name: "Starter Pack",
    priceCents: cents("PRICE_STARTER_CENTS", 1900),
    blurb: "A clean set of prompts and checklists to start selling with AI.",
    description:
      "The Starter Pack is the first useful box. Short prompts, a one-page offer worksheet, and a launch checklist you can finish in an afternoon.",
    includes: [
      "40 ready-to-use prompts",
      "One-page offer worksheet",
      "7-day launch checklist",
      "Plain-English setup guide"
    ],
    audience: "People who want a first digital product without a big team.",
    delivery: "Instant download after payment.",
    badge: "Most started here",
    mode: "payment",
    entitlement: "pack:starter"
  },
  {
    slug: "operator-pack",
    name: "Operator Pack",
    priceCents: cents("PRICE_OPERATOR_CENTS", 4900),
    blurb: "Weekly operating rhythms, email scripts, and pricing rules.",
    description:
      "The Operator Pack is for people who already have something to sell and need a simple weekly system: what to publish, what to price, and what to fix.",
    includes: [
      "Everything in Starter Pack",
      "Weekly operating calendar",
      "12 email and support scripts",
      "Pricing and refund rules",
      "Simple KPI sheet"
    ],
    audience: "Solo operators who want a calm weekly rhythm.",
    delivery: "Instant download after payment.",
    mode: "payment",
    entitlement: "pack:operator"
  },
  {
    slug: "founder-pack",
    name: "Founder Pack",
    priceCents: cents("PRICE_FOUNDER_CENTS", 12900),
    blurb: "The full playbook: offer, store, paywall, and owner override.",
    description:
      "The Founder Pack is the complete written system behind this store. Use it to copy the model: a small catalog, a fair paywall, and an owner who only steps in for emergencies.",
    includes: [
      "Everything in Operator Pack",
      "Store and paywall blueprint",
      "Agent responsibility map",
      "Legal and refund templates",
      "90-day growth plan"
    ],
    audience: "Founders who want a complete, simple commerce system.",
    delivery: "Instant download after payment.",
    badge: "Best value",
    mode: "payment",
    entitlement: "pack:founder"
  },
  {
    slug: "library-membership",
    name: "Library Membership",
    priceCents: cents("PRICE_MEMBER_MONTHLY_CENTS", 900),
    blurb: "Nine dollars a month for the living library of updates.",
    description:
      "Membership unlocks the library: updated checklists, new scripts, and short monthly notes. Cancel any time from the Stripe email receipt.",
    includes: [
      "Living library access",
      "Monthly update note",
      "New templates as they ship",
      "Cancel any time"
    ],
    audience: "People who want ongoing updates without another big purchase.",
    delivery: "Access cookie after checkout. Cancel in Stripe.",
    mode: "subscription",
    entitlement: "member:library"
  }
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(centsValue: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(centsValue / 100);
}

export const oneTimeProducts = products.filter((p) => p.mode === "payment");
export const membership = products.find((p) => p.mode === "subscription")!;
