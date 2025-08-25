import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-cyan-600 text-white rounded-lg shadow-lg hover:bg-cyan-700 transition text-lg font-semibold"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}
