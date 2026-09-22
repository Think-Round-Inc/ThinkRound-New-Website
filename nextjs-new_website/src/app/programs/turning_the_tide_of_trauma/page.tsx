import UpdatedSocialLinks from "@/components/UpdatedSocialLinks";
import { client, urlFor } from "@/sanity/client";
import {
    PortableText,
    PortableTextBlock,
    PortableTextComponents,
} from "@portabletext/react";
import { League_Spartan } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

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
      <h1 className="mb-6 text-4xl font-semibold tracking-tight text-dark md:text-5xl">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 text-3xl font-semibold text-dark md:text-4xl">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mb-4 mt-6 text-[22px] font-semibold leading-[1.3] text-[#2e2e2e] md:text-[24px]">
        {children}
      </h3>
    ),

    normal: ({ children }) => (
      <p className="mb-5 text-center text-[18px] leading-[1.45] text-[#9ca3af] md:text-[19px]">
        {children}
      </p>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l border-[#9ca3af] pl-5 text-[18px] leading-[1.45] text-[#9ca3af] md:text-[19px]">
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
      <ul className="mb-6 list-disc space-y-2 pl-6 text-[18px] leading-[1.45] text-[#575757]">
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 text-[18px] leading-[1.45] text-[#575757]">
        {children}
      </ol>
    ),
  },
};

const leftAlignedComponents: PortableTextComponents = {
  ...portableTextComponents,

  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-left text-[18px] leading-[1.45] text-[#9ca3af] md:text-[19px]">
        {children}
      </p>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l border-[#9ca3af] pl-5 text-left text-[18px] leading-[1.45] text-[#9ca3af] md:text-[19px]">
        {children}
      </blockquote>
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
    <div className="min-h-screen">
      <main className="mx-auto flex w-full max-w-6xl flex-col px-6 pt-24 pb-16 sm:px-8 lg:px-12">

        {/* Banner */}
        <section className="flex w-full flex-col items-center">
          <h1 className="max-w-[900px] text-center text-[44px] font-bold uppercase leading-[1.02] tracking-[-0.02em] sm:text-[56px] lg:text-[64px]">
            {ttot.title}
          </h1>

          {ttot.mainImage && (
            <div className="mt-10 w-full max-w-[1080px]">
              <Image
                src={urlFor(ttot.mainImage)
                  .width(1600)
                  .auto("format")
                  .url()}
                alt={ttot.title}
                width={1600}
                height={1200}
                sizes="(max-width: 900px) 100vw, 1080px"
                className="h-auto w-full"
                priority
              />
            </div>
          )}
        </section>

        {/* Quote and body content */}
        <section>
          <div
            className="mx-auto mt-10 mb-10 max-w-[760px] text-center text-[30px]"
            style={{
              fontWeight: 500,
              color: "#828282",
              fontFamily: leagueSpartan.style.fontFamily,
              lineHeight: "1.2em",
              letterSpacing: ".02em",
            }}
          >
            {ttot.description && (
              <PortableText value={ttot.description} />
            )}
          </div>

          <div className="mx-auto mb-7 max-w-[800px] text-center text-[22px] font-semibold leading-[1.25] text-black md:text-[24px]">
            {ttot.paragraph1 && (
              <PortableText value={ttot.paragraph1} />
            )}
          </div>

          <div className="mx-auto max-w-[900px]">
            {ttot.paragraph2 && (
              <PortableText
                value={ttot.paragraph2}
                components={portableTextComponents}
              />
            )}
          </div>

          <div className="mx-auto max-w-[900px]">
            {ttot.solution && (
              <PortableText
                value={ttot.solution}
                components={portableTextComponents}
              />
            )}
          </div>

          <div className="mx-auto max-w-[900px]">
            {ttot.action && (
              <PortableText
                value={ttot.action}
                components={portableTextComponents}
              />
            )}
          </div>

          <div className="mx-auto max-w-[900px]">
            {ttot.quote1 && (
              <PortableText
                value={ttot.quote1}
                components={portableTextComponents}
              />
            )}
          </div>

          <div className="mx-auto max-w-[900px]">
            {ttot.paragraph3 && (
              <PortableText
                value={ttot.paragraph3}
                components={leftAlignedComponents}
              />
            )}
          </div>

          <div className="mx-auto max-w-[900px]">
            {ttot.quote2 && (
              <PortableText
                value={ttot.quote2}
                components={portableTextComponents}
              />
            )}
          </div>
        </section>

        {/* Links */}
        {ttot.links && ttot.links.length > 0 && (
          <section className="my-10 flex flex-wrap justify-center gap-4">
            {ttot.links.map((link) => (
              <Link
                key={link._key ?? link.linkname}
                href={link.linkurl ?? "#"}
                target={
                  link.linkurl?.startsWith("http")
                    ? "_blank"
                    : undefined
                }
                rel={
                  link.linkurl?.startsWith("http")
                    ? "noreferrer"
                    : undefined
                }
                className="bg-purple-900 px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-purple-800 xl:px-10 xl:py-5 xl:text-lg"
              >
                {link.linkname}
              </Link>
            ))}
          </section>
        )}

        {/* Footer content */}
        <section className="mx-auto w-full max-w-[900px]">
          {ttot.footer && (
            <PortableText
              value={ttot.footer}
              components={leftAlignedComponents}
            />
          )}
        </section>

        <UpdatedSocialLinks />
      </main>
    </div>
  );
}
