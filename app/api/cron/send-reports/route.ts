import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendReportForEntry } from "@/lib/send-report";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const now = new Date();
  const previousMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const month = previousMonthDate.getMonth() + 1;
  const year = previousMonthDate.getFullYear();

  const entries = await prisma.monthlyEntry.findMany({
    where: { month, year, sentAt: null },
    include: { client: true },
  });

  let sent = 0;
  let failed = 0;

  for (const entry of entries) {
    if (!entry.client.email) continue;
    try {
      await sendReportForEntry(entry.id);
      sent++;
    } catch {
      failed++;
    }
  }

  return NextResponse.json({ sent, failed, total: entries.length });
}
