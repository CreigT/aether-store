import { formatPrice, products } from "@/lib/products";

export default function CatalogPage() {
  return (
    <main>
      <section>
        <p className="kicker">Catalog</p>
        <h1>Everything for sale</h1>
        <p className="lead">
          Four items. That is the whole store. Buy once or subscribe.
        </p>
        <div className="grid3">
          {products.map((p) => (
            <article className="card" key={p.slug}>
              {p.badge ? <div className="badge">{p.badge}</div> : null}
              <h3>{p.name}</h3>
              <div className="price">
                {formatPrice(p.priceCents)}
                {p.mode === "subscription" ? <span className="muted"> /mo</span> : null}
              </div>
              <p className="muted grow">{p.blurb}</p>
              <a className="btn" href={`/product/${p.slug}`}>
                Details
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
