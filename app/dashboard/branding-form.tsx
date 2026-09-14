"use client";

import { useState } from "react";

export default function BrandingForm({
  initialPrimary,
  initialAccent,
}: {
  initialPrimary: string;
  initialAccent: string;
}) {
  const [primary, setPrimary] = useState(initialPrimary);
  const [accent, setAccent] = useState(initialAccent);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    await fetch("/api/user/branding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brandPrimary: primary, brandAccent: accent }),
    });

    setLoading(false);
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
      <div>
        <label className="text-sm text-slate">Couleur principale</label>
        <input
          type="color"
          value={primary}
          onChange={(e) => setPrimary(e.target.value)}
          className="mt-1 block h-10 w-16 cursor-pointer rounded-sm border border-line"
        />
      </div>
      <div>
        <label className="text-sm text-slate">Couleur d&rsquo;accent</label>
        <input
          type="color"
          value={accent}
          onChange={(e) => setAccent(e.target.value)}
          className="mt-1 block h-10 w-16 cursor-pointer rounded-sm border border-line"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-sm border border-ink px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ink hover:text-paper disabled:opacity-60"
      >
        {loading ? "Enregistrement…" : "Enregistrer les couleurs"}
      </button>
      {saved && <p className="text-sm text-ink">Couleurs mises à jour.</p>}
    </form>
  );
}
