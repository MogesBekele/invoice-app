import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Button
        asChild
        className="px-6 py-3 bg-cyan-600 text-white rounded-lg shadow-lg hover:bg-cyan-700 transition"
      >
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </main>
  );
}
