"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { SubmitButton } from "@/components/SubmitButton";
import { createAction } from "@/app/actions";
import { useState, SyntheticEvent} from "react";
import Form from "next/form";
import Container from "@/components/Container";
export default function Invoices() {
  const [state, setState] = useState("ready");
  const handleSubmit = async (event: SyntheticEvent) => {
    if (state === "pending") {
      event.preventDefault();
      return;
    }
    setState("pending");
  };
  return (
    <main className=" h-full sm:p-10 max-w-5xl mx-auto">
      <Container>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold"> Create Invoices</h1>
      </div>

      <Form
        action={createAction}
        onSubmit={handleSubmit}
        className="grid gap-4 max-w-xs"
      >
        <div>
          <Label htmlFor="name" className="block mb-2 text-sm font-semibold">
            Billing Name
          </Label>
          <Input required name="name" id="name" type="text" />
        </div>
        <div>
          <Label htmlFor="email" className="block mb-2 text-sm font-semibold">
            Billing Email
          </Label>
          <Input required name="email" id="email" type="email" />
        </div>
        <div>
          <Label htmlFor="value" className=" block mb-2 text-sm font-semibold">
            Value
          </Label>
          <Input required name="value" id="value" type="text" />
        </div>
        <div>
          <Label
            htmlFor="decription"
            className="block mb-2 text-sm font-semibold"
          >
            Description
          </Label>
          <Textarea required name="description" id="description"></Textarea>
        </div>
        <div>
          <SubmitButton />
        </div>
      </Form>
      </Container>
    </main>
  );
}
