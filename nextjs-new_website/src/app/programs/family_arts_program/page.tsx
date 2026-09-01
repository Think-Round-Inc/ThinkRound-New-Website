import Image from "next/image";
import Link from "next/link";
import {
  PortableText,
  type PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";
import { client, urlFor } from "@/sanity/client";
import { League_Spartan } from "next/font/google";
import UpdatedSocialLinks from "@/components/UpdatedSocialLinks";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
});

const FAMILY_ARTS_PROGRAM_QUERY = `
  *[_type == "familyArtsProgram"][0] {
    title,
    mainImage,
    paragraph1,
    image1,
    paragraph2,
    image2,
    paragraph3,
    image3,
    paragraph4,
       link {
      linkname,
      linkEmail
    },
    paragraph5,
    image4,
    paragraph6,
    }`;

export const revalidate = 60;

type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: string;
  };
};

type FamilyArtsProgramData = {
  title?: string;
  mainImage?: SanityImage;
  paragraph1?: PortableTextBlock[];

  image1?: SanityImage;
  paragraph2?: PortableTextBlock[];

  image2?: SanityImage;
  paragraph3?: PortableTextBlock[];
  image3?: SanityImage;
  paragraph4?: PortableTextBlock[];

  link?: {
    linkname?: string;
    linkEmail?: string;
  };
  paragraph5?: PortableTextBlock[];
  image4?: SanityImage;
  paragraph6?: PortableTextBlock[];
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6">{children}</p>,
  },
};

export default async function FamilyArtsProgramPage() {
  const data: FamilyArtsProgramData | null = await client.fetch(
    FAMILY_ARTS_PROGRAM_QUERY,
  );

  if (!data) {
    return (
      <div className=" min-h-screen bg-white  text-[#2e2e2e]">
        <main
          className="keep-empty"
          style={{ fontFamily: leagueSpartan.style.fontFamily }}
        >
          <h1>Family Arts Program page content was not found.</h1>
          <p>
            Please create and publish the Family Arts Program document in Sanity
            Studio.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white  text-[#2e2e2e]">
      <main
        className="mx-auto  px-4 py-8 sm:px-6 lg:px-8 "
        style={{ fontFamily: leagueSpartan.style.fontFamily }}
      >
        <section className="grid items-center gap-12 grid-cols-[1fr_1fr] mt-20 lg:mt-40">
          {data.mainImage && (
            <div>
              <Image
                src={urlFor(data.mainImage).width(2143).height(1435).url()}
                alt="Family Arts Program Image"
                width={2143}
                height={1435}
              />
            </div>
          )}

          {data.title && (
            <div className="mb-8 text-2xl lg:text-8xl font-bold">
              {data.title}
            </div>
          )}
        </section>
        <div className="max-w-4xl text-2xl lg:text-3xl mx-0 sm:mx-15 md:mx-25 lg:mx-auto">
          {data.paragraph1 && data.paragraph1.length > 0 && (
            <section className="mt-12 lg:mt-24  leading-relaxed   text-[#777777]">
              <PortableText value={data.paragraph1} components={components} />
            </section>
          )}

          {data.image1 && (
            <section className="sm:max-xl:mx-20">
              <Image
                src={urlFor(data.image1).width(973).height(761).url()}
                alt="Family Arts Program Image 1"
                width={973}
                height={761}
              />
            </section>
          )}

          {data.paragraph2 && data.paragraph2.length > 0 && (
            <section className="mt-12 lg:mt-24 leading-relaxed   text-[#777777]">
              <PortableText value={data.paragraph2} components={components} />
            </section>
          )}

          {data.image2 && (
            <section className="sm:max-xl:mx-20">
              <Image
                src={urlFor(data.image2).width(1000).height(670).url()}
                alt="Family Arts Program Image 2"
                width={1000}
                height={670}
              />
            </section>
          )}

          {data.paragraph3 && data.paragraph3.length > 0 && (
            <section className="mt-12 lg:mt-24  leading-relaxed   text-[#777777]">
              <PortableText value={data.paragraph3} components={components} />
            </section>
          )}

          {data.image3 && (
            <section className="sm:max-xl:mx-20">
              <Image
                src={urlFor(data.image3).width(1000).height(1494).url()}
                alt="Family Arts Program Image 3"
                width={1000}
                height={1494}
              />
            </section>
          )}

          {data.paragraph4 && data.paragraph4.length > 0 && (
            <section className="mt-12 lg:mt-24 leading-relaxed   text-[#777777]">
              <PortableText value={data.paragraph4} components={components} />
            </section>
          )}

          <section
            className="flex justify-center gap-4 mt-6"
            style={{ fontSize: " 0.8em" }}
          >
            {data.link?.linkname && (
              <Link
                href={"mailto:" + data.link.linkEmail}
                className="rounded-0 bg-purple-900 hover:bg-purple-800 text-white px-7 py-5 lg:px-10 lg:py-7 tracking-[0.05em] font-bold transition"
              >
                {data.link.linkname}
              </Link>
            )}
          </section>

          {data.paragraph5 && data.paragraph5.length > 0 && (
            <section className="mt-12 pt-12 lg:mt-24  leading-relaxed   text-[#777777] border-t border-gray-200">
              <PortableText value={data.paragraph5} components={components} />
            </section>
          )}
          {data.image4 && (
            <section className="sm:max-xl:mx-20">
              <Image
                src={urlFor(data.image4).width(1000).height(645).url()}
                alt="Free family arts making classes"
                width={1000}
                height={645}
              />
            </section>
          )}

          {data.paragraph6 && data.paragraph6.length > 0 && (
            <section className="mt-12  lg:mt-24  leading-relaxed   text-[#777777] ">
              <PortableText value={data.paragraph6} components={components} />
            </section>
          )}
        </div>
        <section className="max-w-4xl  mx-auto">
          <UpdatedSocialLinks />
        </section>
      </main>
    </div>
  );
}
