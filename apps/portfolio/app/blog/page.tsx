import { client } from "@/lib/sanity";
import Link from "next/link";
import BlogSearch from "@/components/blog-search";
import CategoryFilter from "@/components/category-filter";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt: string;
  author?: string;
  categories?: string[];
}

async function getPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      categories
    }`
  );
}

async function getCategories(): Promise<string[]> {
  const categories: {categories: string[]}[] = await client.fetch(
    `*[_type == "post" && defined(categories)] { categories }`
  );
  console.log("categories:",categories);
  const allCategories = categories.flatMap((category: {categories: string[]})=> category.categories)
  .filter((category: any): category is string => typeof category === "string" && category.trim() !== "")
  const uniqueCategories = [...new Set(allCategories)]
  console.log("uniqueCategories:",uniqueCategories);
  
  return uniqueCategories;
}

async function searchPosts(query?: string, category?: string): Promise<Post[]> {
  let clientQuery = `*[_type == "post"`
  if (category) {
    clientQuery += ` && "${category}" in categories`;
  }
  if (query && query.trim()) {
    clientQuery += ` && (
      author match $query + "*" || 
      title match $query + "*" || 
      excerpt match $query + "*" || 
      body[].children[].text match $query + "*")`
  }

  clientQuery += `] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author,
    categories
  }`

    if (query) {
      return client.fetch(clientQuery, { query: query.trim() } as any)
    }

    return client.fetch(clientQuery)
}


export default async function Blog({searchParams}: {searchParams: Promise<{query?: string; category?: string}> }) {
  const params = await searchParams;
  const query: string = params.query || "";
  const category: string = params.category || "";
  const posts: Post[] = await searchPosts(query, category);
  const categories: string[] = await getCategories();
  return (
    <main className="min-h-screen bg-white dark:bg-black pt-15 flex flex-col items-center mx-5 md:mx-10px-4">
      <div className="container py-16">
        <div className="flex items-center justify-between w-full mb-12">
          <h1 className="text-5xl font-bold text-center">Blog</h1>
          <div className="flex items-center gap-4 flex-col-reverse md:flex-row">
            <CategoryFilter categories={categories} />
            <BlogSearch />
            
          </div>
        </div>

        <div className="grid gap-8">
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
                <p className="text-gray-600 dark:text-gray-200 mb-4">{post.excerpt}</p>
              )}
              <div className="flex justify-between text-sm text-gray-500">
                <span>{post.author || "Anonymous"}</span>
                <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
              </div>
              <div className="flex gap-2 mt-2">
                {post.categories && post.categories.map((category) => (
                  <span key={category} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm text-gray-700 mr-2">
                    {category}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}