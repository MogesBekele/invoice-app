import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col h-screen max-w-5xl mx-auto">
      {/* Top section: buttons */}
   
      {/* Middle section: h1 */}
      <div className="flex flex-col h-screen gap-6  items-center justify-center">
   
         <Button asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
