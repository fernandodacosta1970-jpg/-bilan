import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { brandPrimary, brandAccent } = await request.json();

  const hexPattern = /^#[0-9A-Fa-f]{6}$/;
  if (!hexPattern.test(brandPrimary) || !hexPattern.test(brandAccent)) {
    return NextResponse.json(
      { error: "Couleurs invalides." },
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { brandPrimary, brandAccent },
  });

  return NextResponse.json({ ok: true });
}
