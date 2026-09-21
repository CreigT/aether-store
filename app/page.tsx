import { store } from "@/lib/config";
import { formatPrice, membership, oneTimeProducts } from "@/lib/products";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div>
          <p className="kicker">A small digital store</p>
          <h1>{store.tagline}</h1>
          <p className="lead">
            Three packs. One low monthly library. Plain pages, fair prices, and
            a checkout that takes a minute.
          </p>
          <div className="row">
            <a className="btn" href="/catalog">
              See the catalog
            </a>
            <a className="btn ghost" href="/pricing">
              Membership · {formatPrice(membership.priceCents)}/mo
            </a>
          </div>
        </div>
        <aside className="card-note">
          <strong>How this store works</strong>
          You pick a pack or a membership. Stripe takes the payment. You get a
          download or library access. The owner is not in the loop unless
          something breaks.
        </aside>
      </section>

      <section>
        <p className="kicker">Catalog</p>
        <h2>Reasonable prices. Clear contents.</h2>
        <div className="grid3" style={{ marginTop: 22 }}>
          {oneTimeProducts.map((p) => (
            <article className="card" key={p.slug}>
              {p.badge ? <div className="badge">{p.badge}</div> : null}
              <h3>{p.name}</h3>
              <div className="price">{formatPrice(p.priceCents)}</div>
              <p className="muted grow">{p.blurb}</p>
              <a className="btn" href={`/product/${p.slug}`}>
                View {p.name}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section>
        <p className="kicker">Paywall</p>
        <h2>The library sits behind nine dollars.</h2>
        <p className="lead">
          Buy a pack once, or subscribe for the living library. No dark
          patterns. Cancel from the Stripe receipt.
        </p>
        <a className="btn" href="/pricing">
          Open membership
        </a>
      </section>
    </main>
  );
}
