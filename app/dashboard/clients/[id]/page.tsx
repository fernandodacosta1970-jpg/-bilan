import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import EntryForm from "./entry-form";
import SendButton from "./send-button";

export default async function ClientPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const client = await prisma.client.findUnique({
    where: { id: params.id },
  });

  if (!client || client.userId !== user.id) {
    notFound();
  }

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const existingEntry = await prisma.monthlyEntry.findUnique({
    where: {
      clientId_month_year: {
        clientId: client.id,
        month: currentMonth,
        year: currentYear,
      },
    },
  });

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/dashboard" className="text-sm text-slate underline">
        ← Tous les clients
      </Link>
      <h1 className="mt-4 font-serif text-2xl font-medium text-ink">
        {client.name}
      </h1>
      <p className="mt-1 text-sm text-slate">
        Bilan de {currentMonth}/{currentYear}
      </p>

      <div className="mt-8 rounded-sm border border-line bg-white p-6">
        <EntryForm
          clientId={client.id}
          month={currentMonth}
          year={currentYear}
          initialValues={
            existingEntry
              ? {
                  leads: existingEntry.leads,
                  revenue: existingEntry.revenue,
                  hours: existingEntry.hours,
                  highlight: existingEntry.highlight,
                }
              : null
          }
        />
      </div>

      {existingEntry && (
        <div className="mt-6 flex flex-col gap-4">
          <Link
            href={`/dashboard/clients/${client.id}/report?month=${currentMonth}&year=${currentYear}`}
            className="text-sm font-semibold text-ink underline"
          >
            Voir le rapport de ce mois →
          </Link>

          <div className="rounded-sm border border-line bg-white p-6">
            <h2 className="font-serif text-lg font-medium text-ink">
              Envoi du bilan
            </h2>
            <p className="mt-1 text-sm text-slate">
              {existingEntry.sentAt
                ? `Envoyé le ${existingEntry.sentAt.toLocaleDateString("fr-FR")}`
                : "Pas encore envoyé."}
              {existingEntry.readAt &&
                ` · Lu le ${existingEntry.readAt.toLocaleDateString("fr-FR")}`}
            </p>
            <div className="mt-4">
              <SendButton
                clientId={client.id}
                month={currentMonth}
                year={currentYear}
                hasEmail={!!client.email}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
