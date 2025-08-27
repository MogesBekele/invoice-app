import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import { Invoices, Customers } from "@/db/schema";
import { db } from "@/db";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Check, CreditCard } from "lucide-react";
import { creaatePayment, updateStatusAction } from "@/app/actions";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function InvoicePage({ params, searchParams }: any) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const resolvedSearch =
    searchParams instanceof Promise ? await searchParams : searchParams;

  const invoiceId = parseInt(resolvedParams.invoiceId);
  const status = resolvedSearch.status;

  const isSuccess = status === "success";
  const isCanceled = status === "canceled";

  if (isSuccess) {
    const formData = new FormData();
    formData.append("id", String(invoiceId));
    formData.append("status", "paid");
    await updateStatusAction(formData);
    redirect(`/invoices/${invoiceId}/payment`);
  }

  const [result] = await db
    .select({
      id: Invoices.id,
      value: Invoices.value,
      description: Invoices.description,
      status: Invoices.status,
      createTs: Invoices.createTs,
      name: Customers.name,
    })
    .from(Invoices)
    .innerJoin(Customers, eq(Customers.id, Invoices.customersId))
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  if (!result) notFound();

  const invoice = {
    ...result,
    customer: { name: result.name },
  };

  return (
    <main className="h-full w-full">
      <Container>
        {/* Responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Invoice Details */}
          <div>
            <div className="flex flex-wrap items-center justify-between mb-6">
              <h1 className="flex items-center gap-3 text-2xl md:text-3xl font-bold">
                Invoice {invoice.id}
                <Badge
                  className={cn(
                    `rounded-full capitalize px-3 py-1 text-sm md:text-base`,
                    invoice.status === "paid" && "bg-green-600",
                    invoice.status === "void" && "bg-zinc-500",
                    invoice.status === "open" && "bg-blue-500",
                    invoice.status === "uncollectible" && "bg-red-500"
                  )}
                >
                  {invoice.status}
                </Badge>
              </h1>
            </div>
            <p className="text-2xl md:text-3xl font-semibold mb-2">
              ETB {(invoice.value / 100).toFixed(2)}
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-6">
              {invoice.description}
            </p>
          </div>

          {/* Manage Invoice */}
          <div>
            <h2 className="text-lg md:text-xl font-bold mb-4">
              Manage Invoice
            </h2>
            {invoice.status === "open" && (
              <form action={creaatePayment} className="w-full">
                <input type="hidden" name="id" value={invoice.id} />
                <Button className="flex justify-center items-center gap-2 font-bold bg-green-700 hover:bg-green-500">
                  <CreditCard className="w-5 h-5" />
                  Pay Invoice
                </Button>
              </form>
            )}
            {invoice.status === "paid" && (
              <p className="flex gap-2 items-center text-lg md:text-xl font-bold text-green-700">
                <Check className="w-6 h-6 bg-green-500 text-white p-1 rounded-full" />
                Invoice paid
              </p>
            )}
          </div>
        </div>

        {/* Billing Details */}
        <h2 className="font-bold text-lg md:text-xl mb-4">Billing Details:</h2>
        <ul className="grid gap-3">
          <li className="flex gap-2 ">
            <strong className="w-32 font-medium text-sm">Invoice ID:</strong>
            <span>{invoice.id}</span>
          </li>
          <li className="flex gap-2 ">
            <strong className="w-32 font-medium text-sm">Invoice Date:</strong>
            <span>{new Date(invoice.createTs).toDateString()}</span>
          </li>
          <li className="flex  gap-2 ">
            <strong className="w-32 font-medium text-sm">Billing Name:</strong>
            <span>{invoice.customer.name}</span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
