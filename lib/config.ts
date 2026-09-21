export const store = {
  name: process.env.NEXT_PUBLIC_STORE_NAME || "Aether",
  tagline:
    process.env.NEXT_PUBLIC_STORE_TAGLINE ||
    "Simple tools. Fair prices. Yours in minutes.",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "hello@example.com",
  ownerName: process.env.NEXT_PUBLIC_OWNER_NAME || "Store Owner",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  colors: {
    ink: process.env.NEXT_PUBLIC_COLOR_INK || "#1c1917",
    paper: process.env.NEXT_PUBLIC_COLOR_PAPER || "#f7f3ec",
    accent: process.env.NEXT_PUBLIC_COLOR_ACCENT || "#c45c26"
  }
};

export const secrets = {
  stripeSecret: process.env.STRIPE_SECRET_KEY || "",
  stripeWebhook: process.env.STRIPE_WEBHOOK_SECRET || "",
  accessToken: process.env.ACCESS_TOKEN_SECRET || "dev-only-change-me"
};

export function isStripeConfigured() {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_SECRET_KEY !== "sk_test_replace_me"
  );
}
