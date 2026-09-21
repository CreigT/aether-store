import { formatPrice, membership, oneTimeProducts } from "@/lib/products";
import { isStripeConfigured } from "@/lib/config";
import { BuyButton } from "@/app/BuyButton";

export default function PricingPage() {
  const ready = isStripeConfigured();
  return (
    <main>
      <section>
        <p className="kicker">Membership</p>
        <h1>A small monthly paywall</h1>
        <p className="lead">
          {formatPrice(membership.priceCents)} a month unlocks the library.
          Packs are still available as one-time purchases.
        </p>

        <div className="grid3">
          <article className="card">
            <div className="badge">Membership</div>
            <h3>{membership.name}</h3>
            <div className="price">
              {formatPrice(membership.priceCents)}
              <span className="muted"> /mo</span>
            </div>
            <ul className="clean grow">
              {membership.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {ready ? (
              <BuyButton slug={membership.slug} label="Join the library" />
            ) : (
              <p className="muted">Add Stripe keys to enable checkout.</p>
            )}
          </article>

          {oneTimeProducts.map((p) => (
            <article className="card" key={p.slug}>
              <h3>{p.name}</h3>
              <div className="price">{formatPrice(p.priceCents)}</div>
              <p className="muted grow">{p.blurb}</p>
              <a className="btn ghost" href={`/product/${p.slug}`}>
                Buy once
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
