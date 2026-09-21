import { store } from "@/lib/config";
import { readAccess } from "@/lib/access";
import { redirect } from "next/navigation";

export default async function SuccessPage({
  searchParams
}: {
  searchParams: { session_id?: string; ready?: string };
}) {
  if (searchParams.session_id && searchParams.ready !== "1") {
    redirect(`/api/session?session_id=${searchParams.session_id}`);
  }

  const access = await readAccess();

  return (
    <main>
      <section className="prose">
        <p className="kicker">Receipt</p>
        <h1>You are in.</h1>
        {access ? (
          <p className="ok">
            Access is unlocked on this browser
            {access.email ? ` for ${access.email}` : ""}.
          </p>
        ) : (
          <p>
            If you just paid, wait a moment and refresh. If checkout is not
            configured, no cookie will appear.
          </p>
        )}
        <p>
          Stripe emails the receipt. Open the library or grab the sample file
          that ships with the repo.
        </p>
        <div className="row">
          <a className="btn" href="/library">
            Open library
          </a>
          <a className="btn ghost" href="/downloads/starter-pack.txt">
            Sample download
          </a>
        </div>
        <p className="muted">Need help? {store.supportEmail}</p>
      </section>
    </main>
  );
}
