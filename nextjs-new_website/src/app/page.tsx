import { client } from "@/sanity/client";

import { PortableText, PortableTextBlock } from "next-sanity";

import { homeComponents } from "./homeComponents";

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

      // IMAGE: Get metadata for height/width/LQIP (blur)
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

      // VIDEO: Follow the reference to get the actual file URL
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

      _type == "videoFeatureBlock" => {
        ...,
        videoFile{
          asset->{
            url,
            mimeType,
            metadata { dimensions }
          }
        }
      },

      _type == "buttonRow" => {
        ...,
        buttons[]{
          ...
        }
      }
    }
  }`;

  return await client.fetch<Homepage>(query, {}, options);
}

export default async function IndexPage() {
  const homepage = await getHomepage();

  return (
      <article className="min-h-screen bg-white py-24 px-6 md:px-12 w-full flex flex-col items-center">
        <section className="prose prose-neutral w-full max-w-4xl text-left text-gray-800 prose-headings:text-left prose-p:text-left prose-p:leading-relaxed prose-blockquote:text-left">
          <PortableText value={homepage.content} components={homeComponents} />
        </section>
      </article>
  );
}

