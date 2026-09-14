"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteAccountButton() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await fetch("/api/user/delete", { method: "POST" });
    router.push("/");
  }

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="text-sm text-red-700 underline"
      >
        Supprimer mon compte
      </button>
    );
  }

  return (
    <div className="rounded-sm border border-red-300 bg-red-50 p-4">
      <p className="text-sm text-red-800">
        Cette action est définitive : votre compte, vos clients et tous
        vos bilans seront supprimés. Confirmez-vous ?
      </p>
      <div className="mt-3 flex gap-3">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="rounded-sm bg-red-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Suppression…" : "Oui, supprimer définitivement"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded-sm border border-line px-4 py-2 text-sm text-ink"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
