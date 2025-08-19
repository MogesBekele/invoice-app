import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex flex-col h-screen max-w-5xl mx-auto">
      {/* Top section: buttons */}
      <div className="flex justify-end gap-4 p-6">
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>

        <Button asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>

      {/* Middle section: h1 */}
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-5xl font-bold text-center">Invoicing-app</h1>
      </div>
    </main>
  );
}
