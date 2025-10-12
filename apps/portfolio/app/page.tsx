import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Hi, I&apos;m Nick
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Full-stack developer building amazing web experiences
          </p>
          <div className="flex gap-4">
            <Link
              href="/blog"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Read My Blog
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-50 transition"
            >
              About Me
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
