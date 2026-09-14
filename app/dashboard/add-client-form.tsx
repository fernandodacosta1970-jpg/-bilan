"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddClientForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Une erreur est survenue.");
      setLoading(false);
      return;
    }

    setName("");
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        required
        placeholder="Nom du client"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 rounded-sm border border-line px-3 py-2 text-ink outline-none focus:border-ink"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-sm bg-accent px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-95 disabled:opacity-60"
      >
        {loading ? "Ajout…" : "Ajouter"}
      </button>
      {error && <p className="text-sm text-red-700">{error}</p>}
    </form>
  );
}
