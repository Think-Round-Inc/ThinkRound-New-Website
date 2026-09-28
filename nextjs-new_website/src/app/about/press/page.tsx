import { client } from "@/sanity/client";
import type { PortableTextBlock } from "next-sanity";

import PressPost from "@/app/about/press/components/PressPost";

interface Post {
  _id: string;
  title: string;
  image: { asset: { _ref: string } };
  body?: PortableTextBlock[];
}

async function getPress() {
  const query = `*[_type == "post"] | order(publishedAt asc){
    _id,
    title,
    
    image,
    body,
    
  }`;
  return client.fetch<Post[]>(query);
}

export default async function PressPage() {
  const pressPosts = await getPress();

  return (
    <div className="min-h-screen w-full bg-white px-5 py-14 sm:px-8 md:px-10 md:py-20 lg:px-14">
      <header className="mx-auto mb-10 max-w-6xl text-center md:mb-14">
        <h1 className="text-3xl font-semibold tracking-[0.08em] text-[#7020a0] md:text-4xl">
          Press
        </h1>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:gap-10">
        {pressPosts.map((post) => {
          return <PressPost key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
}
