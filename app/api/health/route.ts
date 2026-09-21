import { NextResponse } from "next/server";
import { isStripeConfigured, store } from "@/lib/config";
import { products } from "@/lib/products";

export async function GET() {
  return NextResponse.json({
    ok: true,
    store: store.name,
    stripeConfigured: isStripeConfigured(),
    productCount: products.length,
    time: new Date().toISOString()
  });
}
