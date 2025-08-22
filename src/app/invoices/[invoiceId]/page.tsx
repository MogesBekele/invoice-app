import { notFound } from "next/navigation";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { eq } from "drizzle-orm";
import Invoice from "./Invoice";
import { Customers } from "@/db/schema";

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const invoiceId = parseInt(params.invoiceId);

  const [result] = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Customers.id, Invoices.customersId))
    .where(eq(Invoices.id, invoiceId))
    .limit(1);
console.log("result", result);
  if (!result) {
    notFound();
  }

  const invoice={
    ...result.invoices,
    customer: result.customers
  }

  return (
 <Invoice invoice={invoice}/>
  );
}
