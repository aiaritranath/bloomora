import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = { app: "ok", database: "not configured" };

  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("@/lib/db/prisma");
      await prisma.$queryRaw`SELECT 1`;
      status.database = "ok";
    } catch {
      status.database = "unreachable";
    }
  }

  return NextResponse.json(status);
}
