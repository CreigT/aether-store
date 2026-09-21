import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { getStripe } from "@/lib/stripe";
import { store } from "@/lib/config";

export async function POST(req: Request) {
  try {
    const { slug } = (await req.json()) as { slug?: string };
    const product = slug ? getProduct(slug) : undefined;
    if (!product) {
      return NextResponse.json({ error: "Unknown product." }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: product.mode,
      customer_creation: product.mode === "payment" ? "always" : undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: product.priceCents,
            recurring:
              product.mode === "subscription"
                ? { interval: "month" }
                : undefined,
            product_data: {
              name: product.name,
              description: product.blurb
            }
          }
        }
      ],
      metadata: {
        slug: product.slug,
        entitlement: product.entitlement
      },
      allow_promotion_codes: true,
      success_url: `${store.appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${store.appUrl}/cancel`
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
