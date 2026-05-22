import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import { notFound } from "next/navigation";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slugRaw = (resolvedParams as any)?.slug ?? null;
  const slug = typeof slugRaw === "string" ? decodeURIComponent(slugRaw) : slugRaw;

  let post: SanityDocument | null = null;
  try {
    post = await client.fetch<SanityDocument>(POST_QUERY, { slug }, options);
    console.log("[PostPage] fetched post (first attempt):", post);
  } catch (err) {
    console.error("[PostPage] error fetching post for slug (first attempt):", slug, err);
    throw err;
  }

  // If nothing found, try a slugified fallback (lowercase, spaces -> hyphens) which
  // can match common slug conventions if Sanity stores slugified strings.
  if (!post && typeof slug === "string") {
    const slugified = slug
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    if (slugified && slugified !== slug) {
      try {
        console.log("[PostPage] trying fallback slugified value:", slugified);
        post = await client.fetch<SanityDocument>(POST_QUERY, { slug: slugified }, options);
        console.log("[PostPage] fetched post (fallback attempt):", post);
      } catch (err) {
        console.error("[PostPage] error fetching post for slug (fallback attempt):", slugified, err);
      }
    }
  }

  if (!post) {
    console.warn("[PostPage] no post returned for slug:", slug);
    notFound();
  }

  const postImageUrl = post?.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}
