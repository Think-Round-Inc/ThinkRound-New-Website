import Navbar from "@/components/Navbar";
import { client } from "@/sanity/client";

import PressPost from "@/app/about/press/components/PressPost";

interface Post {
  _id: string;
  title: string;
  image: { asset: { _ref: string } };
  body: string;
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
    <div className="w-full min-h-screen mx-auto  bg-white">
      <Navbar />
      <div className="flex flex-col  pt-40 gap-20 md:gap-0">
        {pressPosts.map((post) => {
          return <PressPost key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
}
