"use server"
import {db} from "@/db"
import {Invoices} from "@/db/schema"
export async function createAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const value = Math.floor(parseFloat(String(formData.get('value')))*100);
  const description = formData.get('description') as string;
 
  await db.insert(Invoices).values({ value, description, status: 'open'})
  console.log(value, name, email, description)

}