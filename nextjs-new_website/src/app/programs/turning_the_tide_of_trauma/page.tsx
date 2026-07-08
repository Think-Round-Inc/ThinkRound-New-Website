import { client, urlFor } from "@/sanity/client";
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { League_Spartan } from "next/font/google";
import UpdatedSocialLinks from "@/components/UpdatedSocialLinks";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
});

interface LinkItem {
  _key?: string;
  linkname?: string;
  linkurl?: string;
}

interface TtoT {
  _id: string;
  title: string;
  mainImage?: { asset: { _ref: string } };
  description?: PortableTextBlock[];
  paragraph1?: PortableTextBlock[];
  paragraph2?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  action?: PortableTextBlock[];
  quote1?: PortableTextBlock[];
  paragraph3?: PortableTextBlock[];
  quote2?: PortableTextBlock[];
  links?: LinkItem[];
  footer?: PortableTextBlock[];
}

export const revalidate = 60;

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mb-6 text-4xl font-semibold tracking-tight text-[#2e2e2e] md:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 text-3xl font-semibold text-[#2e2e2e] md:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 mt-8 text-2xl font-semibold text-[#2e2e2e] md:text-3xl">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-2xl text-center leading-8 text-[#4b556392]">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-1 border-[#4b556392] pl-5 text-2xl text-[#4b556392]">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value.href;
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-yellow-400 underline decoration-yellow-400 underline-offset-4"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-lg text-[#575757]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 text-lg text-[#575757]">
        {children}
      </ol>
    ),
  },
};

const leftAlignedComponents: PortableTextComponents = {
  ...portableTextComponents,
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-2xl text-left leading-8 text-[#4b556392]">
        {children}
      </p>
    ),
  },
};

async function getTtoT() {
  const query = `*[_type == "turningTheTide"][0]{
    _id,
    title,
    mainImage,
    description,
    paragraph1,
    paragraph2,
    solution,
    action,
    quote1,
  paragraph3,
    quote2,
    links[],
    footer
  }`;

  return client.fetch<TtoT>(query);
}

export default async function TtoTPage() {
  const ttot = await getTtoT();

  if (!ttot) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6 text-center">
        <p className="text-xl text-gray-700">Content not available yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#2e2e2e]">
      <Navbar />

      <main className=" flex flex-col w-full max-w-4xl  mx-auto px-6 py-16 sm:px-8 lg:px-12">
        <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {ttot.title}
            </h1>
          </div>

          {ttot.mainImage && (
            <div className="flex justify-center lg:justify-end">
              <Image
                src={urlFor(ttot.mainImage).width(900).height(900).url()}
                alt={ttot.title}
                width={900}
                height={900}
                className="h-auto w-full max-w-[520px] rounded-2xl object-cover shadow-xl"
              />
            </div>
          )}
        </section>
        <section>
          <div
            className="my-8 text-3xl sm:text-4xl lg:text-5xl  text-center leading-8 "
            style={{
              fontWeight: 500,
              color: "#828282",
              fontFamily: leagueSpartan.style.fontFamily,
              lineHeight: "1.15em",
              letterSpacing: ".02em",
            }}
          >
            {ttot.description && <PortableText value={ttot.description} />}
          </div>
          <div className="mb-5 text-2xl text-center leading-8 text-[#000000]">
            {ttot.paragraph1 && <PortableText value={ttot.paragraph1} />}
          </div>
          <div>
            {ttot.paragraph2 && (
              <PortableText
                value={ttot.paragraph2}
                components={portableTextComponents}
              />
            )}
          </div>
          <div>
            {ttot.solution && (
              <PortableText
                value={ttot.solution}
                components={portableTextComponents}
              />
            )}
          </div>
          <div>
            {ttot.action && (
              <PortableText
                value={ttot.action}
                components={portableTextComponents}
              />
            )}
          </div>
          <div>
            {ttot.quote1 && (
              <PortableText
                value={ttot.quote1}
                components={portableTextComponents}
              />
            )}
          </div>
          <div>
            {ttot.paragraph3 && (
              <PortableText
                value={ttot.paragraph3}
                components={leftAlignedComponents}
              />
            )}
          </div>
          <div>
            {ttot.quote2 && (
              <PortableText
                value={ttot.quote2}
                components={portableTextComponents}
              />
            )}
          </div>
        </section>

        {ttot.links && ttot.links.length > 0 && (
          <section className="my-10 flex flex-wrap justify-center gap-4">
            {ttot.links.map((link) => (
              <Link
                key={link._key ?? link.linkname}
                href={link.linkurl ?? "#"}
                target={link.linkurl?.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.linkurl?.startsWith("http") ? "noreferrer" : undefined
                }
                className="rounded-0 bg-purple-900 px-6 py-3 xl:px-10 xl:py-5 text-center text-sm xl:text-lg font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-purple-800"
              >
                {link.linkname}
              </Link>
            ))}
          </section>
        )}

        <section>
          <div>
            {ttot.footer && (
              <PortableText
                value={ttot.footer}
                components={leftAlignedComponents}
              />
            )}
          </div>
        </section>
        <UpdatedSocialLinks />
      </main>
    </div>
  );
}
