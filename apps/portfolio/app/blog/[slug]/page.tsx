import { client } from "@/lib/sanity";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  body: PortableTextBlock[];
  publishedAt: string;
  author?: string;
  image?: {
    alt?: string;
  };
}

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      body,
      publishedAt,
      author,
      image,
    }`,
    { slug }
  );
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br dark:from-black from-white transition-all duration-300 py-20">
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 dark:text-gray-200">{post.title}</h1>
          {post.image && (
            <div className="mb-8">
              <Image src={urlFor(post.image).url()} alt={post.image.alt || post.title} width={1000} height={1000} />
            </div>
          )}
          <div className="flex gap-4 text-gray-600 dark:text-gray-300 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
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
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <PortableText value={post.body} />
          </div>
        </div>
      </article>
    </main>
  );
}