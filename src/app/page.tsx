import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" flex flex-col gap-6 justify-center h-screen text-center max-w-5xl mx-auto">
      <h1 className="text-5xl fond-bold">Invoicing-app</h1>
      <p>
        <Button asChild>
          <Link href="/dashboard">Sign In</Link>
        </Button>
      </p>
    </main>
  );
}
