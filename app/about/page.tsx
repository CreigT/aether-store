import { store } from "@/lib/config";

export default function AboutPage() {
  return (
    <main>
      <section className="prose">
        <p className="kicker">About</p>
        <h1>{store.name} is a small store that runs itself</h1>
        <p>
          The legal owner is {store.ownerName}. The owner is not the cashier,
          the support desk, or the marketing team. Those jobs belong to simple
          software and, later, to agents.
        </p>
        <p>
          This first module is the public store: landing page, catalog, product
          pages, a membership paywall, and Stripe checkout. You deploy it by
          setting environment variables and pushing to Vercel.
        </p>
        <p>
          Questions:{" "}
          <a href={`mailto:${store.supportEmail}`}>{store.supportEmail}</a>
        </p>
      </section>
    </main>
  );
}
