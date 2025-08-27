import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="-translate-y-10 max-sm:-translate-y-16 text-center px-4">
        {/* Catchy message */}
        <p className="mb-6 px-4 py-3 bg-green-100 border-l-4 border-green-600 text-green-800 text-base sm:text-lg font-medium rounded-md shadow-md">
          🚀 You can access the dashboard without signing in — for now!
        </p>

        {/* Dashboard button */}
        <Link
          href="/dashboard"
          className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 transition transform hover:-translate-y-1 hover:shadow-xl text-base sm:text-lg font-semibold"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
