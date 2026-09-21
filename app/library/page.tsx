import { readAccess, hasEntitlement } from "@/lib/access";
import { formatPrice, membership } from "@/lib/products";

const notes = [
  {
    title: "Week 1 — Write one offer on one page",
    body: "Name the buyer. Name the problem. Name the price. Stop there."
  },
  {
    title: "Week 2 — Publish three useful pages",
    body: "A home page, a product page, and a refund page. That is enough store."
  },
  {
    title: "Week 3 — Charge a fair price",
    body: "If a stranger would pay it without a pitch deck, the price is close."
  }
];

export default async function LibraryPage() {
  const access = await readAccess();
  const open = hasEntitlement(access, ["member:library", "pack:operator", "pack:founder"]);

  return (
    <main>
      <section>
        <p className="kicker">Library</p>
        <h1>Living notes behind the paywall</h1>
        {!open ? (
          <div className="paywall">
            <h2>This shelf is locked</h2>
            <p>
              Join the library for {formatPrice(membership.priceCents)} / month,
              or buy the Operator or Founder pack for permanent notes.
            </p>
            <div className="row">
              <a className="btn" href="/pricing">
                Unlock membership
              </a>
              <a className="btn ghost" href="/catalog">
                Buy a pack
              </a>
            </div>
          </div>
        ) : (
          <p className="ok">You have access{access?.email ? ` · ${access.email}` : ""}.</p>
        )}

        {open ? (
          <div className="grid3" style={{ marginTop: 24 }}>
            {notes.map((n) => (
              <article className="card" key={n.title}>
                <h3>{n.title}</h3>
                <p className="muted">{n.body}</p>
              </article>
            ))}
            <article className="card">
              <h3>Downloads</h3>
              <p className="muted">
                Placeholder files ship with the repo. Replace them in
                /public/downloads when you have real packs.
              </p>
              <a className="btn ghost" href="/downloads/starter-pack.txt">
                Starter sample
              </a>
            </article>
          </div>
        ) : (
          <p className="muted">
            Public preview: the library is short weekly notes, not a course dump.
          </p>
        )}
      </section>
    </main>
  );
}
