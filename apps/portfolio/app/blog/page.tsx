import { client } from "@/lib/sanity";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt: string;
  author?: string;
}

async function getPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author
    }`
  );
}

export default async function Blog() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-12">Blog</h1>
        <div className="grid gap-8 max-w-4xl">
          {posts.map((post) => (
            <article
              key={post._id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
            >
              <Link href={`/blog/${post.slug.current}`}>
                <h2 className="text-2xl font-bold mb-2 text-indigo-600 hover:text-indigo-800">
                  {post.title}
                </h2>
              </Link>
              {post.excerpt && (
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
              )}
              <div className="flex justify-between text-sm text-gray-500">
                <span>{post.author || "Anonymous"}</span>
                <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}