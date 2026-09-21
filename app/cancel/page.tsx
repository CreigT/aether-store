export default function CancelPage() {
  return (
    <main>
      <section className="prose">
        <p className="kicker">Checkout</p>
        <h1>No charge was made</h1>
        <p>You left Stripe before finishing. Nothing was billed.</p>
        <a className="btn" href="/catalog">
          Return to catalog
        </a>
      </section>
    </main>
  );
}
