import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

const MONTHS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

export default async function ReportPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { month?: string; year?: string };
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
  const month = searchParams.month
    ? parseInt(searchParams.month, 10)
    : now.getMonth() + 1;
  const year = searchParams.year
    ? parseInt(searchParams.year, 10)
    : now.getFullYear();

  const entry = await prisma.monthlyEntry.findUnique({
    where: {
      clientId_month_year: { clientId: client.id, month, year },
    },
  });

  if (!entry) {
    notFound();
  }

  return (
    <main
      className="mx-auto max-w-2xl px-6 py-16 print:py-0"
      style={{ ["--brand-primary" as string]: user.brandPrimary, ["--brand-accent" as string]: user.brandAccent }}
    >
      <div className="print:hidden">
        <Link
          href={`/dashboard/clients/${client.id}`}
          className="text-sm text-slate underline"
        >
          ← Retour à la fiche client
        </Link>
      </div>

      <div className="mt-8 border-t-4 pt-8" style={{ borderColor: user.brandPrimary }}>
        <p className="text-sm uppercase tracking-wide text-slate">
          Bilan mensuel
        </p>
        <h1
          className="mt-2 font-serif text-3xl font-medium"
          style={{ color: user.brandPrimary }}
        >
          {client.name}
        </h1>
        <p className="mt-1 text-slate">
          {MONTHS[month - 1]} {year}
        </p>

        <div className="mt-10 grid grid-cols-3 gap-6 border-y border-line py-8">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate">
              Leads générés
            </p>
            <p className="mt-1 font-serif text-2xl" style={{ color: user.brandPrimary }}>
              {entry.leads ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate">
              Chiffre d&rsquo;affaires
            </p>
            <p className="mt-1 font-serif text-2xl" style={{ color: user.brandPrimary }}>
              {entry.revenue != null ? `${entry.revenue.toLocaleString("fr-FR")} €` : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate">
              Heures investies
            </p>
            <p className="mt-1 font-serif text-2xl" style={{ color: user.brandPrimary }}>
              {entry.hours ?? "—"}
            </p>
          </div>
        </div>

        {entry.highlight && (
          <div className="mt-8">
            <p className="text-xs uppercase tracking-wide text-slate">
              Fait marquant du mois
            </p>
            <p className="mt-2 leading-relaxed text-ink">{entry.highlight}</p>
          </div>
        )}

        <div
          className="mt-12 inline-block rounded-sm px-4 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: user.brandAccent }}
        >
          Rapport généré automatiquement
        </div>
      </div>
    </main>
  );
}
