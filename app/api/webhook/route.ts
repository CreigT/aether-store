import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { secrets } from "@/lib/config";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig || !secrets.stripeWebhook || secrets.stripeWebhook === "whsec_replace_me") {
    return NextResponse.json({ error: "Webhook is not configured." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, secrets.stripeWebhook);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  console.log(
    JSON.stringify({
      kind: "stripe_event",
      id: event.id,
      type: event.type,
      created: event.created
    })
  );

  return NextResponse.json({ received: true, type: event.type });
}
