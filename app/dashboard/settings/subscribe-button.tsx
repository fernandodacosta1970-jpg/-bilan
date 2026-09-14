"use client";

import { useState } from "react";

export default function SubscribeButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Impossible d'ouvrir le paiement.");
        setLoading(false);
      }
    } catch {
      setError("Impossible d'ouvrir le paiement.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-95 disabled:opacity-60"
      >
        {loading ? "Ouverture…" : "S'abonner — 39 €/mois"}
      </button>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}
