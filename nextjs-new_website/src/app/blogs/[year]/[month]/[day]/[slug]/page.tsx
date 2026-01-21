import { client } from "@/sanity/client";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { ptComponents } from "./ptComponents";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Blog {
  title: string;
  author: string;
  publishedAt: string;
  body: PortableTextBlock[];
}

async function getBlog(params: { date: string; slug: string }) {
  const query = `*[_type == "blogs" && publishedAt match $date + "*" && slug.current == $slug][0] {
  title,
  publishedAt,
  author,
  body[]{
    ...,
    _type == "image" => {
      ...,
      "asset": asset->{
        ...,
        metadata
      }
    }
  }
}`;

  return client.fetch<Blog>(query, params);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ year: string; month: string; day: string; slug: string }>;
}) {
  const { year, month, day, slug } = await params;
  const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

  const blog = await getBlog({ date: formattedDate, slug });

  if (!blog)
    return (
      <div className="bg-white min-h-screen p-20 text-center">
        Post not found.
      </div>
    );

  return (
    <>
      <Navbar />
      <article className="min-h-screen bg-white py-24 px-6 md:px-12 w-full">
        <div className="max-w-3xl mx-auto flex flex-col items-start">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-6">
            {blog.author} <span className="mx-2 text-gray-300">•</span>{" "}
            {new Date(blog.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>

          <header className="mb-12 w-full text-left">
            <h1 className="text-4xl md:text-5xl font-light uppercase leading-tight tracking-tight text-black">
              {blog.title}
            </h1>
          </header>

          <section className="prose prose-neutral text-gray-800 max-w-none w-full text-left prose-p:text-justify prose-p:leading-relaxed prose-p:mb-8">
            <PortableText value={blog.body} components={ptComponents} />
          </section>
        </div>
      </article>
      <Footer />
    </>
  );
}
