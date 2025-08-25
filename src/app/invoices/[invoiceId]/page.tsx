import { notFound } from "next/navigation";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { eq } from "drizzle-orm";
import Invoice from "./Invoice";
import { Customers } from "@/db/schema";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function InvoicePage({ params }: any) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const invoiceId = parseInt(resolvedParams.invoiceId);

  const [result] = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Customers.id, Invoices.customersId))
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  if (!result) notFound();

  const invoice = { ...result.invoices, customer: result.customers };

  return <Invoice invoice={invoice} />;
}
