import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white ">
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-900 transition text-lg font-semibold"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
