import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { sendReportForEntry } from "@/lib/send-report";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const client = await prisma.client.findUnique({ where: { id: params.id } });
  if (!client || client.userId !== user.id) {
    return NextResponse.json({ error: "Client introuvable." }, { status: 404 });
  }

  const { month, year } = await request.json();

  const entry = await prisma.monthlyEntry.findUnique({
    where: { clientId_month_year: { clientId: client.id, month, year } },
  });

  if (!entry) {
    return NextResponse.json(
      { error: "Aucun bilan enregistré pour ce mois." },
      { status: 400 }
    );
  }

  try {
    await sendReportForEntry(entry.id);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur d'envoi.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
