import { prisma } from "@/lib/db";

const PIXEL = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBTAA7",
  "base64"
);

export async function GET(
  _request: Request,
  { params }: { params: { entryId: string } }
) {
  try {
    const entry = await prisma.monthlyEntry.findUnique({
      where: { id: params.entryId },
    });

    if (entry && !entry.readAt) {
      await prisma.monthlyEntry.update({
        where: { id: params.entryId },
        data: { readAt: new Date() },
      });
    }
  } catch {
    // On ignore toute erreur : l'image doit toujours s'afficher.
  }

  return new Response(PIXEL, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
