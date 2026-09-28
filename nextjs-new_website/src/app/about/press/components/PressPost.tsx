import { urlFor } from "@/sanity/client";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import type { PortableTextComponents } from "@portabletext/react";
import Buttons from "@/app/about/press/components/Buttons";
import LazyImage from "@/app/about/press/components/LazyImage";

interface Post {
  _id: string;
  title: string;
  image: { asset: { _ref: string } };
  body?: PortableTextBlock[];
}

type PressAction = {
  title: string;
  name: string;
  href: string;
  variant: "solid" | "outline";
};

const buttons: PressAction[] = [
  {
    title: "Heid Hardin co-authored Yoga for the Brain",
    name: "Buy Book",
    href: "https://www.amazon.com/Life-Wisdom-Word-Search-Brain/dp/1642934755/ref=pd_lpo_14_img_0/144-6927114-7206550?_encoding=UTF8&pd_rd_i=1642934755&pd_rd_r=d181d1dc-8466-44d1-960f-12a55118cbd4&pd_rd_w=yCgX7&pd_rd_wg=JOtgt&pf_rd_p=7b36d496-f366-4631-94d3-61b87b52511b&pf_rd_r=7J42KGQVCZ8JM3ET3DAZ&psc=1&refRID=7J42KGQVCZ8JM3ET3DAZ",
    variant: "solid",
  },
  {
    title: "Heid Hardin co-authored Yoga for the Brain",
    name: "Watch Video",
    href: "https://youtu.be/CYhDt-97mGY",
    variant: "outline",
  },
  {
    title: "Featured on The New Fillmore Nov 08.19",
    name: "Learn More",
    href: "http://newfillmore.com/wp-content/uploads/2019/11/2019_11.pdf",
    variant: "solid",
  },
  {
    title: "CARAVAN Global Citizen SHORT FILM FESTIVAL:",
    name: "Learn More",
    href: "https://www.oncaravan.org/global-citizen",
    variant: "solid",
  },
  {
    title: "FAMILIES OF ABRAHAM ON SF EXAMINER",
    name: "Learn More",
    href: "https://www.sfexaminer.com/entertainment/good-day-oct-3-5-2019/",
    variant: "solid",
  },
];

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="m-0 text-sm leading-6 text-[#675f6d] sm:text-base sm:leading-7">
        {children}
      </p>
    ),
  },
};

export default function PressPost({ post }: { post: Post }) {
  const postButtons = buttons.filter((button) => post.title === button.title);

  return (
    <article className="grid items-center gap-6 rounded-[22px] bg-[#f3eef7] p-4 shadow-[0_10px_30px_rgba(112,32,160,0.06)] sm:p-6 md:grid-cols-[minmax(240px,0.9fr)_1.4fr] md:gap-8 md:p-8 lg:gap-10 lg:p-10">
      <div className="overflow-hidden rounded-[18px] border-2 border-white bg-white shadow-sm">
        <LazyImage
          src={urlFor(post.image).width(720).height(720).url()}
          alt={post.title}
          width={720}
          height={720}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-5 md:gap-6">
        <h2 className="m-0 text-2xl font-semibold leading-tight text-[#241a2a] sm:text-3xl">
          {post.title}
        </h2>

        {post.body?.length ? (
          <div className="max-w-3xl">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        ) : null}

        {postButtons.length ? (
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {postButtons.map((button) => (
              <Buttons
                key={button.href}
                name={button.name}
                href={button.href}
                variant={button.variant}
              />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
