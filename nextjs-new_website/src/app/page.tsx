import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostList from "@/components/PostList";
import GalleryList from "@/components/GalleryList";
import { client } from "@/sanity/client";

import {
  PortableText,
  PortableTextBlock,
  type SanityDocument,
} from "next-sanity";

import { homeComponents } from "./homeComponents";

const home_QUERY = `*[_type in ["post", "gallery"]] | order(publishedAt desc)`;
const options = { next: { revalidate: 30 } };

interface Homepage {
  title: string;
  content: PortableTextBlock[];
}

async function getHomepage() {
  const query = `*[_type == "homePageBuilder"][0] {
    title,
    content[]{
      ..., // Fetches basic fields like 'text', 'variant', 'url'

      // 🖼️ IMAGE: Get metadata for height/width/LQIP (blur)
      _type == "image" => {
        ...,
        asset->{
          ...,
          metadata {
            dimensions,
            lqip
          }
        }
      },

      // 🎥 VIDEO: Follow the reference to get the actual file URL
      _type == "videoBlock" => {
        ...,
        url, // For YouTube/Vimeo
        videoFile {
          asset->{
            url,
            mimeType
          }
        }
      },

      // 🔘 BUTTON: Ensure all custom fields are grabbed
      _type == "button" => {
        text,
        url,
        variant,
        alignment,
        target
      }
    } 
  }`;

  return await client.fetch<Homepage>(query, {}, options);
}

interface Blog {
  title: string;
  author: string;
  publishedAt: string;
  body: PortableTextBlock[];
}

export default async function IndexPage() {
  // const contents = await client.fetch<SanityDocument[]>(
  //   home_QUERY,
  //   {},
  //   options,
  // );

  //const posts = contents.filter((content) => content._type === "post");

  const homepage = await getHomepage();

  return (
    <>
      <Navbar />
      <article className="min-h-screen bg-white py-24 px-6 md:px-12 w-full flex flex-col items-center">
        <section className="prose prose-neutral text-gray-800 w-full max-w-4xl flex flex-col items-center text-center prose-p:text-center prose-p:leading-relaxed prose-p:mb-8">
          <PortableText value={homepage.content} components={homeComponents} />
        </section>
      </article>
      <Footer />
    </>
  );
}
