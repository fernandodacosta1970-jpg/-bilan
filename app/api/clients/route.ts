import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { name } = await request.json();
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json(
      { error: "Le nom du client est requis." },
      { status: 400 }
    );
  }

  const client = await prisma.client.create({
    data: { name: name.trim(), userId: user.id },
  });

  return NextResponse.json({ client });
}
