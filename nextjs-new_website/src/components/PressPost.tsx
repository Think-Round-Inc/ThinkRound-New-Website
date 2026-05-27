import Image from "next/image";
import { client, urlFor } from "@/sanity/client";
import { PortableText } from "next-sanity";
import Buttons from "@/components/Buttons";

interface Post {
  _id: string;
  title: string;
  image: { asset: { _ref: string } };
  body: string;
}

const buttons = [
  {
    title: "Heid Hardin co-authored Yoga for the Brain",
    name: "WATCH CRISTINA'S INTERVIEW WITH HEIDI",
    href: "https://youtu.be/CYhDt-97mGY",
    type: "orange",
  },
  {
    title: "Heid Hardin co-authored Yoga for the Brain",
    name: "GET YOUR COPY HERE",
    href: "https://www.amazon.com/Life-Wisdom-Word-Search-Brain/dp/1642934755/ref=pd_lpo_14_img_0/144-6927114-7206550?_encoding=UTF8&pd_rd_i=1642934755&pd_rd_r=d181d1dc-8466-44d1-960f-12a55118cbd4&pd_rd_w=yCgX7&pd_rd_wg=JOtgt&pf_rd_p=7b36d496-f366-4631-94d3-61b87b52511b&pf_rd_r=7J42KGQVCZ8JM3ET3DAZ&psc=1&refRID=7J42KGQVCZ8JM3ET3DAZ",
    type: "purple",
  },
  {
    title: "Featured on The New Fillmore Nov 08.19",
    name: "LEARN MORE",
    href: "http://newfillmore.com/wp-content/uploads/2019/11/2019_11.pdf",
    type: "purple",
  },
  {
    title: "CARAVAN Global Citizen SHORT FILM FESTIVAL:",
    name: "LEARN MORE",
    href: "https://www.oncaravan.org/global-citizen",
    type: "purple",
  },
  {
    title: "FAMILIES OF ABRAHAM ON SF EXAMINER",
    name: "LEARN MORE",
    href: "https://www.sfexaminer.com/entertainment/good-day-oct-3-5-2019/",
    type: "purple",
  },
];

export default async function PressPost({ post }: { post: Post }) {
  return (
    <div className="flex flex-col md:flex-row p-10 gap-10">
      Left: Photo
      <div className="sm:max-md:shrink-0   md:w-1/3">
        <Image
          src={urlFor(post.image).width(500).height(500).url()}
          alt={post.title}
          width={500}
          height={500}
          className=" rounded-lg object-cover "
        />
      </div>
      {/* Right: Title, description and buttons */}
      <div className="flex flex-col flex-1 justify-start pt-6 md:w-2/3">
        <div>
          <div className="text-xl lg:text-3xl text-black font-bold">
            {post.title}
          </div>
        </div>
        <div className="text-xl lg:text-3xl text-gray-500 pt-6">
          {Array.isArray(post.body) && <PortableText value={post.body} />}
        </div>

        <div className="pt-6 flex flex-col gap-4">
          {buttons.map((button) =>
            post.title === button.title ? (
              <div className="pt-6 " key={button.href}>
                <Buttons
                  key={button.href}
                  title={button.title}
                  name={button.name}
                  href={button.href}
                  type={button.type}
                />
              </div>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
