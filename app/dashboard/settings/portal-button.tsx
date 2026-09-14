"use client";

import { useState } from "react";

export default function PortalButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="rounded-sm border border-ink px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ink hover:text-paper disabled:opacity-60"
    >
      {loading ? "Ouverture…" : "Gérer mon abonnement"}
    </button>
  );
}
