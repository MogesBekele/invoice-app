"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { SubmitButton } from "@/components/SubmitButton";
import { createAction } from "@/app/actions";
import { useState, SyntheticEvent, startTransition } from "react";
export default function Invoices() {
  const [state, setState] = useState("ready");
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (state === "pending") return;
    setState("pending");
    const target = event.target as HTMLFormElement;
    
    startTransition(async () => {
      const formData = new FormData(target);
      await createAction(formData);
      console.log("submitted");
    });
  };
  return (
    <main className=" flex flex-col gap-6 justify-center h-full sm:p-10 max-w-5xl mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold"> Create Invoices</h1>
      </div>

      <form
        action={createAction}
        onSubmit={handleSubmit}
        className="grid gap-4 max-w-xs"
      >
        <div>
          <Label htmlFor="name" className="block mb-2 text-sm font-semibold">
            Billing Name
          </Label>
          <Input name="name" id="name" type="text" />
        </div>
        <div>
          <Label htmlFor="email" className="block mb-2 text-sm font-semibold">
            Billing Email
          </Label>
          <Input name="email" id="email" type="email" />
        </div>
        <div>
          <Label htmlFor="value" className=" block mb-2 text-sm font-semibold">
            Value
          </Label>
          <Input name="value" id="value" type="text" />
        </div>
        <div>
          <Label
            htmlFor="decription"
            className="block mb-2 text-sm font-semibold"
          >
            Description
          </Label>
          <Textarea name="description" id="description"></Textarea>
        </div>
        <div>
          <SubmitButton />
        </div>
      </form>
    </main>
  );
}
