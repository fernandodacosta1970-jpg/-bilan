import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const client = await prisma.client.findUnique({
    where: { id: params.id },
  });
  if (!client || client.userId !== user.id) {
    return NextResponse.json({ error: "Client introuvable." }, { status: 404 });
  }

  const { month, year, leads, revenue, hours, highlight } =
    await request.json();

  if (
    typeof month !== "number" ||
    month < 1 ||
    month > 12 ||
    typeof year !== "number"
  ) {
    return NextResponse.json(
      { error: "Mois ou année invalide." },
      { status: 400 }
    );
  }

  const entry = await prisma.monthlyEntry.upsert({
    where: {
      clientId_month_year: { clientId: client.id, month, year },
    },
    update: {
      leads: leads ?? null,
      revenue: revenue ?? null,
      hours: hours ?? null,
      highlight: highlight ?? null,
    },
    create: {
      clientId: client.id,
      month,
      year,
      leads: leads ?? null,
      revenue: revenue ?? null,
      hours: hours ?? null,
      highlight: highlight ?? null,
    },
  });

  return NextResponse.json({ entry });
}
