import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import SubscribeButton from "./subscribe-button";
import PortalButton from "./portal-button";
import DeleteAccountButton from "./delete-account-button";

export default async function Settings() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const isActive = user.subscriptionStatus === "active";

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/dashboard" className="text-sm text-slate underline">
        ← Retour
      </Link>
      <h1 className="mt-4 font-serif text-2xl font-medium text-ink">
        Réglages
      </h1>

      <div className="mt-8 rounded-sm border border-line bg-white p-6">
        <h2 className="font-serif text-lg font-medium text-ink">Compte</h2>
        <p className="mt-2 text-sm text-slate">{user.email}</p>
      </div>

      <div className="mt-6 rounded-sm border border-line bg-white p-6">
        <h2 className="font-serif text-lg font-medium text-ink">
          Abonnement
        </h2>
        <p className="mt-2 text-sm text-slate">
          Statut :{" "}
          <span className="font-semibold text-ink">
            {isActive ? "actif" : "inactif"}
          </span>
        </p>
        <div className="mt-4">
          {isActive ? <PortalButton /> : <SubscribeButton />}
        </div>
      </div>

      <div className="mt-6 rounded-sm border border-line bg-white p-6">
        <h2 className="font-serif text-lg font-medium text-ink">
          Zone dangereuse
        </h2>
        <div className="mt-4">
          <DeleteAccountButton />
        </div>
      </div>
    </main>
  );
}
