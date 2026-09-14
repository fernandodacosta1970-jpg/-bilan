import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifySessionToken } from "@/lib/session";

export async function getCurrentUser() {
  const token = cookies().get("session")?.value;
  if (!token) return null;

  const session = await verifySessionToken(token);
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });
  return user;
}
