import Stripe from "stripe";
import { secrets } from "./config";

let client: Stripe | null = null;

export function getStripe() {
  if (!secrets.stripeSecret || secrets.stripeSecret === "sk_test_replace_me") {
    throw new Error("Stripe is not configured. Set STRIPE_SECRET_KEY.");
  }
  if (!client) {
    client = new Stripe(secrets.stripeSecret, {
      apiVersion: "2024-06-20",
      typescript: true
    });
  }
  return client;
}
