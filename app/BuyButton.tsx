"use client";

import { useState } from "react";

export function BuyButton({ slug, label }: { slug: string; label: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function buy() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug })
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
      setBusy(false);
    }
  }

  return (
    <div>
      <button className="btn" type="button" onClick={buy} disabled={busy}>
        {busy ? "Opening checkout…" : label}
      </button>
      {error ? <p className="err">{error}</p> : null}
    </div>
  );
}
