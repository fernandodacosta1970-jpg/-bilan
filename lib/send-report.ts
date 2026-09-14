import { prisma } from "@/lib/db";
import { sendReportEmail } from "@/lib/email";

export async function sendReportForEntry(entryId: string) {
  const entry = await prisma.monthlyEntry.findUnique({
    where: { id: entryId },
    include: { client: true },
  });

  if (!entry) {
    throw new Error("Bilan introuvable.");
  }

  if (!entry.client.email) {
    throw new Error("Ce client n'a pas d'adresse email enregistrée.");
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const reportUrl = `${origin}/dashboard/clients/${entry.clientId}/report?month=${entry.month}&year=${entry.year}`;
  const trackingUrl = `${origin}/api/track/read/${entry.id}`;

  await sendReportEmail({
    to: entry.client.email,
    clientName: entry.client.name,
    reportUrl,
    trackingUrl,
    month: entry.month,
    year: entry.year,
  });

  await prisma.monthlyEntry.update({
    where: { id: entry.id },
    data: { sentAt: new Date() },
  });
}
