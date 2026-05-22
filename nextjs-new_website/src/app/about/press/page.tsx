import Navbar from "@/components/Navbar";
import { client } from "@/sanity/client";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import { PortableText } from "next-sanity";
import Buttons from "@/components/Buttons";

interface Post {
  _id: string;
  title: string;
  body: string;
  image: { asset: { _ref: string } };
}

async function getPress() {
  const query = `*[_type == "post"]{
    _id,
    title,
    body,
    image
  }`;
  return client.fetch<Post[]>(query);
}

export default async function PressPage() {
  const pressPosts = await getPress();

  return (
    <div className="w-full min-h-screen mx-auto  bg-white">
      <Navbar />
      <div className="flex flex-col  pt-30">
        {pressPosts.map((post) => (
          <div key={post._id} className="flex flex-col md:flex-row p-10 ">
            {/* Left: Photo */}
            <div className="sm:max-md:shrink-0 md:w-5/12">
              <Image
                src={urlFor(post.image).width(500).height(500).url()}
                alt={post.title}
                width={500}
                height={500}
                className=" rounded-lg object-cover "
              />
            </div>

            {/* Right: Title, description and buttons */}
            <div className="flex flex-col flex-1 justify-start pt-6 md:w-7/12">
              <div>
                <div className="text-xl lg:text-3xl text-black font-bold">
                  {post.title}
                </div>
              </div>
              <div className="text-xl lg:text-3xl text-gray-500 pt-6">
                {Array.isArray(post.body) && <PortableText value={post.body} />}
              </div>
              <div className="pt-6 ">
                <Buttons href={"https://youtu.be/CYhDt-97mGY"} />
              </div>
              <div className="pt-6">
                <Buttons
                  href={
                    "https://www.amazon.com/Life-Wisdom-Word-Search-Brain/dp/1642934755/ref=pd_lpo_14_img_0/144-6927114-7206550?_encoding=UTF8&pd_rd_i=1642934755&pd_rd_r=d181d1dc-8466-44d1-960f-12a55118cbd4&pd_rd_w=yCgX7&pd_rd_wg=JOtgt&pf_rd_p=7b36d496-f366-4631-94d3-61b87b52511b&pf_rd_r=7J42KGQVCZ8JM3ET3DAZ&psc=1&refRID=7J42KGQVCZ8JM3ET3DAZ"
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
