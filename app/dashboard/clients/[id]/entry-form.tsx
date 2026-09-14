"use client";

import { useState } from "react";

type InitialValues = {
  leads: number | null;
  revenue: number | null;
  hours: number | null;
  highlight: string | null;
} | null;

export default function EntryForm({
  clientId,
  month,
  year,
  initialValues,
}: {
  clientId: string;
  month: number;
  year: number;
  initialValues: InitialValues;
}) {
  const [leads, setLeads] = useState(initialValues?.leads?.toString() ?? "");
  const [revenue, setRevenue] = useState(
    initialValues?.revenue?.toString() ?? ""
  );
  const [hours, setHours] = useState(initialValues?.hours?.toString() ?? "");
  const [highlight, setHighlight] = useState(initialValues?.highlight ?? "");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    setError(null);

    const res = await fetch(`/api/clients/${clientId}/entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        month,
        year,
        leads: leads ? Number(leads) : null,
        revenue: revenue ? Number(revenue) : null,
        hours: hours ? Number(hours) : null,
        highlight: highlight || null,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Une erreur est survenue.");
      setLoading(false);
      return;
    }

    setSaved(true);
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="text-sm text-slate">Leads générés</label>
        <input
          type="number"
          value={leads}
          onChange={(e) => setLeads(e.target.value)}
          className="mt-1 w-full rounded-sm border border-line px-3 py-2 text-ink outline-none focus:border-ink"
        />
      </div>
      <div>
        <label className="text-sm text-slate">
          Chiffre d&rsquo;affaires généré (€)
        </label>
        <input
          type="number"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
          className="mt-1 w-full rounded-sm border border-line px-3 py-2 text-ink outline-none focus:border-ink"
        />
      </div>
      <div>
        <label className="text-sm text-slate">Heures investies</label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="mt-1 w-full rounded-sm border border-line px-3 py-2 text-ink outline-none focus:border-ink"
        />
      </div>
      <div>
        <label className="text-sm text-slate">
          Fait marquant du mois (optionnel)
        </label>
        <textarea
          value={highlight}
          onChange={(e) => setHighlight(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-sm border border-line px-3 py-2 text-ink outline-none focus:border-ink"
        />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      {saved && <p className="text-sm text-ink">Bilan enregistré.</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-sm bg-ink px-6 py-3 font-sans text-sm font-semibold text-paper transition hover:brightness-110 disabled:opacity-60"
      >
        {loading ? "Enregistrement…" : "Enregistrer le bilan"}
      </button>
    </form>
  );
}
