import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col h-screen bg-gradient-to-b text-gray-900">
      
      {/* Middle hero section */}
      <div className="flex flex-col max-sm:my-[-150px] sm:my-[-100px] h-full gap-6 items-center justify-center">
        <h1 className="text-5xl  font-bold text-cyan-800 text-center">
          Welcome to Invoicing App
        </h1>
        <p className="text-lg text-gray-600 text-center">
          Manage your invoices easily and efficiently
        </p>

        <Button
          asChild
          className="px-6 py-3 bg-cyan-600 text-white rounded-lg shadow-lg hover:bg-cyan-700 transition"
        >
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
