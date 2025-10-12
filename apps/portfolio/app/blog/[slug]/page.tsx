import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  body: any;
  publishedAt: string;
  author?: string;
}

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      body,
      publishedAt,
      author
    }`,
    { slug }
  );
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex gap-4 text-gray-600 mb-8 pb-8 border-b">
            <span>{post.author || "Anonymous"}</span>
            <span>•</span>
            <time>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <div className="prose prose-lg max-w-none">
            <PortableText value={post.body} />
          </div>
        </div>
      </article>
    </main>
  );
}