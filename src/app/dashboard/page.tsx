import { CirclePlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { Invoices, Customers } from "@/db/schema";
import Container from "@/components/Container";
import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    return;
  }
  const results = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Customers.id, Invoices.customersId))
    .where(eq(Invoices.userId, userId));

    const invoices= results?.map(({invoices, customers})=>{
      return {
        ...invoices,
        customer: customers
      }
    })

  return (
    <main className=" h-full">
      <Container>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold pl-4">Invoices</h1>

          <p>
            <Button variant="ghost" className="inline-flex gap-2" asChild>
              <Link href="/invoices/new">
                <CirclePlus className="h-4 w-4 hover:cursor-pointer" />
                Create Invoices
              </Link>
            </Button>
          </p>
        </div>

        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] p-4">Date</TableHead>
              <TableHead className="p-4">Customer</TableHead>
              <TableHead className="p-4">Email</TableHead>
              <TableHead className="text-center p-4">Status</TableHead>
              <TableHead className="text-right p-4">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((result) => {
              return (
                <TableRow key={result.id} className=" hover:bg-gray-200">
                  <TableCell className="font-medium text-left p-0 ">
                    <Link
                      href={`/invoices/${result.id}`}
                      className="p-4 font-semibold block"
                    >
                      {new Date(result.createTs).toDateString()}
                    </Link>
                  </TableCell>
                  <TableCell className="text-left p-0 ">
                    <Link
                      href={`/invoices/${result.id}`}
                      className="font-semibold p-4 block"
                    >
                      {result.customer.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-left p-0">
                    <Link className="block p-4" href={`/invoices/${result.id}`}>
                    { result.customer.email }
                    </Link>
                  </TableCell>
                  <TableCell className="text-center p-0">
                    <Link className="block p-4" href={`/invoices/${result.id}`}>
                      {" "}
                      <Badge
                        className={cn(
                          `rounded-full capitalize`,
                          result.status === "open" && "bg-blue-500",
                          result.status === "paid" && "bg-green-600",
                          result.status === "void" && "bg-zinc-500",
                          result.status === "uncollectible" && "bg-red-500"
                        )}
                      >
                        {result.status}
                      </Badge>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right p-0">
                    <Link
                      href={`/invoices/${result.id}`}
                      className="font-semibold block p-4"
                    >
                      Birr {(result.value / 100).toFixed(2)}
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Container>
    </main>
  );
}
