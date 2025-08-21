"use server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { Invoices, Status } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
export async function createAction(formData: FormData) {
  const { userId } = await auth();

  const value = Math.floor(parseFloat(String(formData.get("value"))) * 100);
  const description = formData.get("description") as string;

  if (!userId) {
    return;
  }

  const results = await db
    .insert(Invoices)
    .values({ value, userId, description, status: "open" })
    .returning({ id: Invoices.id });

  redirect(`/invoices/${results[0].id}`);
}


export async function updateStatusAction(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

  const id = formData.get('id') as string;
  const status = formData.get('status') as Status;

  if (!id || !status) {
    return;
  }

  const results = await db.update(Invoices).set({ status }).where(eq(Invoices.id, parseInt(id)));

  revalidatePath(`/invoices/${id}`, 'page');
console.log('results', results)


}
