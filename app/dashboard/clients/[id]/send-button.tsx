"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SendButton({
  clientId,
  month,
  year,
  hasEmail,
}: {
  clientId: string;
  month: number;
  year: number;
  hasEmail: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSend() {
    setLoading(true);
    setError(null);

    const res = await fetch(`/api/clients/${clientId}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ month, year }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Échec de l'envoi.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
    router.refresh();
  }

  if (!hasEmail) {
    return (
      <p className="text-sm text-slate">
        Ajoutez un email pour ce client afin de pouvoir envoyer le bilan.
      </p>
    );
  }

  return (
    <div>
      <button
        onClick={handleSend}
        disabled={loading}
        className="rounded-sm border border-ink px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ink hover:text-paper disabled:opacity-60"
      >
        {loading ? "Envoi…" : "Envoyer maintenant"}
      </button>
      {sent && <p className="mt-2 text-sm text-ink">Bilan envoyé.</p>}
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}
