import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-black p-8 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Exhibition Not Found</h1>
      <Link
        href="/think_round_fine_arts/current_upcoming_exhibitions"
        className="text-blue-600 hover:underline"
      >
        Back to Current & Upcoming Exhibitions
      </Link>
    </main>
  );
}
