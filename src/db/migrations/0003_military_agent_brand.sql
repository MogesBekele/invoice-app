CREATE TABLE "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"create_ts" timestamp DEFAULT now() NOT NULL,
	"description" text NOT NULL,
	"email" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_customersId_invoices_id_fk";
--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customersId_customers_id_fk" FOREIGN KEY ("customersId") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;