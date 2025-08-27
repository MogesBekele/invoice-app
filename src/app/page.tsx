import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-white ">
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-gray-50  text-gray-800 rounded-lg shadow-lg hover:bg-gray-100 transition text-lg font-semibold"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
