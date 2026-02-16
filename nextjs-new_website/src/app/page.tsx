import Navbar from "@/components/Navbar";
import PostList from "@/components/PostList";
import GalleryList from "@/components/GalleryList";
import { client } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";

const home_QUERY = `*[_type in ["post", "gallery"]] | order(publishedAt desc)`;
const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const contents = await client.fetch<SanityDocument[]>(
    home_QUERY,
    {},
    options
  );

  const posts = contents.filter((content) => content._type === "post");

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-5xl p-4 md:p-8 space-y-12">
        <PostList posts={posts} />
      </main>
    </div>
  );
}
