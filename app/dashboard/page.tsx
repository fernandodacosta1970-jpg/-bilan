"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-medium text-ink">
          Bienvenue.
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm text-slate underline"
        >
          Se déconnecter
        </button>
      </div>
      <p className="mt-4 text-slate">
        Votre compte est créé. La saisie de votre premier client suivi
        arrive à l&rsquo;étape suivante.
      </p>
    </main>
  );
}
