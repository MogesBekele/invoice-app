
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const { id, status } = await request.json();
  await db.update(Invoices).set({ status }).where(eq(Invoices.id, id));
  return new Response(null, { status: 200, statusText: "OK" });
}