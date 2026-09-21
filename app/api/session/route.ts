import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";
import { accessCookie, signAccess } from "@/lib/access";
import { store } from "@/lib/config";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.redirect(new URL("/cancel", store.appUrl));
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    const paid =
      session.payment_status === "paid" || session.status === "complete";
    if (!paid) {
      return NextResponse.redirect(new URL("/cancel", store.appUrl));
    }
    const product = getProduct(session.metadata?.slug || "");
    const token = await signAccess({
      email:
        session.customer_details?.email || session.customer_email || undefined,
      entitlements: product ? [product.entitlement] : [],
      sessionId
    });
    const res = NextResponse.redirect(new URL("/success?ready=1", store.appUrl));
    const cookie = accessCookie(token);
    res.cookies.set(cookie);
    return res;
  } catch {
    return NextResponse.redirect(new URL("/cancel", store.appUrl));
  }
}
