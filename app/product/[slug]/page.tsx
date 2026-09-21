import { notFound } from "next/navigation";
import { formatPrice, getProduct, products } from "@/lib/products";
import { isStripeConfigured } from "@/lib/config";
import { BuyButton } from "@/app/BuyButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const ready = isStripeConfigured();

  return (
    <main>
      <section className="hero" style={{ alignItems: "start" }}>
        <div>
          <p className="kicker">Product</p>
          <h1>{product.name}</h1>
          <p className="lead">{product.description}</p>
          <p className="muted">For: {product.audience}</p>
          <p className="muted">Delivery: {product.delivery}</p>
        </div>
        <aside className="card">
          {product.badge ? <div className="badge">{product.badge}</div> : null}
          <div className="price">
            {formatPrice(product.priceCents)}
            {product.mode === "subscription" ? (
              <span className="muted"> / month</span>
            ) : null}
          </div>
          <ul className="clean">
            {product.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {ready ? (
            <BuyButton slug={product.slug} label={`Buy ${product.name}`} />
          ) : (
            <p className="notice">
              Checkout is waiting on Stripe keys. Add them in Vercel (or
              `.env.local`) and redeploy.
            </p>
          )}
        </aside>
      </section>
    </main>
  );
}
