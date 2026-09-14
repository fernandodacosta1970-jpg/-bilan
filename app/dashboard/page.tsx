import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import AddClientForm from "./add-client-form";
import BrandingForm from "./branding-form";
import LogoutButton from "./logout-button";



export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const clients = await prisma.client.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
            <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-medium text-ink">
          Vos clients suivis
        </h1>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/settings" className="text-sm text-slate underline">
            Réglages
          </Link>
          <LogoutButton />
        </div>
      </div>


      {clients.length === 0 ? (
        <div className="mt-10 rounded-sm border border-line bg-white p-6">
          <p className="text-slate">
            Aucun client suivi pour l&rsquo;instant. Ajoutez le premier —
            ça prend une minute.
          </p>
          <div className="mt-4">
            <AddClientForm />
          </div>
        </div>
      ) : (
        <>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {clients.map((client) => (
              <li key={client.id} className="py-4">
                <Link
                  href={`/dashboard/clients/${client.id}`}
                  className="font-medium text-ink underline"
                >
                  {client.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <AddClientForm />
          </div>
        </>
      )}
          <div className="mt-16 border-t border-line pt-8">
        <h2 className="font-serif text-lg font-medium text-ink">
          Couleurs de vos rapports
        </h2>
        <div className="mt-4">
          <BrandingForm
            initialPrimary={user.brandPrimary}
            initialAccent={user.brandAccent}
          />
        </div>
      </div>
    </main>
  );
}
