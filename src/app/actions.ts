"use server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { Customers, Invoices, Status } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";

const stripe = new Stripe(String(process.env.STRIPE_API_SECRET));
export async function createAction(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return;
  }
  const value = Math.floor(parseFloat(String(formData.get("value"))) * 100);
  const description = formData.get("description") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const [customer] = await db
    .insert(Customers)
    .values({ name, email, userId })
    .returning({ id: Customers.id });

  const results = await db
    .insert(Invoices)
    .values({
      value,
      userId,
      description,
      customersId: customer.id,
      status: "open",
    })
    .returning({ id: Invoices.id });

  redirect(`/invoices/${results[0].id}`);
}

export async function updateStatusAction(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

  const id = formData.get("id") as string;
  const status = formData.get("status") as Status;

  if (!id || !status) {
    return;
  }

  const results = await db
    .update(Invoices)
    .set({ status })
    .where(eq(Invoices.id, parseInt(id)));

  revalidatePath(`/invoices/${id}`, "page");
  console.log("results", results);
}

export async function deleteAction(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

  const id = formData.get("id") as string;
  if (!id) {
    return;
  }

  const results = await db
    .delete(Invoices)
    .where(eq(Invoices.id, parseInt(id)));

  redirect(`/dashboard`);
}
