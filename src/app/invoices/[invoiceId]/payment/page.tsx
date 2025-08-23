import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";

import { Invoices, Customers } from "@/db/schema";

import { db } from "@/db";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Check, CreditCard } from "lucide-react";

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const invoiceId = parseInt(params.invoiceId);

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
  console.log("result", result);
  if (!result) {
    notFound();
  }

  const invoice = {
    ...result,
    customer: {
      name: result.name,
    },
  };

  return (
    <main className=" h-full w-full">
      <Container>
        <div className="grid grid-cols-2">
          <div>
            <div className="flex justify-between mb-8">
              <h1 className="flex items-center gap-4 text-3xl font-bold">
                Invoice {invoice.id}
                <Badge
                  className={cn(
                    `rounded-full capitalize`,
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
            <p className="text-3xl mb-3">
              {" "}
              Birr {(invoice.value / 100).toFixed(2)}
            </p>
            <p className="text-lg mb-8">{invoice.description}</p>
          </div>
          <div>
            <h1 className="text-xl font-bold mb-4">Manage Invoice</h1>
            {invoice.status === "open" && (
              <form action="">
                <Button className="flex gap-2 font-bold bg-green-700 hover:cursor-pointer hover:bg-green-500">
                  <CreditCard className="w-5 h-auto hover:cursor-pointer" />
                  Pay Invoice
                </Button>
              </form>
            )}
            {invoice.status === "paid" && (
              <p className=" flex gap-2 text-xl font-bold">
                Invoice paid
                <Check />
              </p>
            )}
          </div>
        </div>

        <h2 className="font-bold text-lg mb-4">Billing Details:</h2>

        <ul className="grid gap-2">
          <li className="flex gap-4 ">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice ID:
            </strong>
            <span>{invoice.id}</span>
          </li>
          <li className="flex gap-4 ">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Date:
            </strong>
            <span>{new Date(invoice.createTs).toDateString()}</span>
          </li>
          <li className="flex gap-4 ">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Name:
            </strong>
            <span>{invoice.customer.name}</span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
