import { store } from "@/lib/config";

export default function LegalPage() {
  return (
    <main>
      <section className="prose">
        <p className="kicker">Legal</p>
        <h1>Terms and privacy</h1>
        <h2>Terms</h2>
        <p>
          Digital products are delivered immediately. You may request a refund
          within 14 days if you have not made substantial use of the files.
          Memberships cancel at period end. The owner of this store is{" "}
          {store.ownerName}.
        </p>
        <h2>Privacy</h2>
        <p>
          We collect the email Stripe already needs to send a receipt. We store
          a signed access cookie on your device after payment. We do not sell
          personal data. Payment details never touch this server — Stripe
          handles cards.
        </p>
        <h2>Contact</h2>
        <p>
          <a href={`mailto:${store.supportEmail}`}>{store.supportEmail}</a>
        </p>
      </section>
    </main>
  );
}
