import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { Cormorant_Infant, Cormorant_SC, Lato } from "next/font/google";
import CommunitiesSection from "./CommunitiesSection";


export const revalidate = 30;

const cormorantSC = Cormorant_SC({
    subsets: ["latin"],
    weight: ["400", "500"],
});

const cormorantInfant = Cormorant_Infant({
    subsets: ["latin"],
    weight: ["500"],
});

const lato = Lato({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default async function ParadiseProjectPage() {
    const query = `*[_type == "paradiseProject"][0]{
    ...,
    heroImage,
    communities[] {
      name,
      subtitle,
      slug,
      image,
      familyCount,
      paintingCount,
      comingSoon,
      launchDate
    }
  }`;

    const data = await client.fetch(query);

    const heroImageUrl = data?.heroImage?.asset?._ref
      ? urlFor(data.heroImage).width(1920).height(928).url()
      : undefined;
    const communities = (data?.communities ?? []).map((community: {
      image?: { asset?: { _ref: string; _type: "reference" }; alt?: string };
      slug?: { current?: string };
    }) => ({
      ...community,
      imageUrl: community.image?.asset?._ref
        ? urlFor(community.image).width(600).height(450).url()
        : community.slug?.current === "indigenous"
          ? "/indigenous-part-v.jpg"
          : undefined,
    }));

    return (
        <div className='min-h-screen flex flex-col'>
            {/* 
        Main container: 
        - Desktop (lg): Fixed 1920px (120rem) artboard, relative for absolute overlays.
        - Mobile: Flex column for sequential flow.
      */}
<main
  className="
    relative
    w-full
    max-w-[120rem]
    mx-auto
    min-h-[54rem]
    lg:min-h-[58rem]
    overflow-hidden
    bg-cover
    bg-center
    bg-no-repeat
  "
  style={{
    backgroundImage: heroImageUrl
      ? `url(${heroImageUrl})`
      : "none",
  }}
>
  {/* LEFT READABILITY GRADIENT */}
  <div
    className="
      absolute
      inset-0
      z-0
      pointer-events-none
      bg-gradient-to-r
      from-[#f6f2e9]/95
      via-[#f6f2e9]/72
      via-[35%]
      to-transparent
      lg:to-[65%]
    "
  />

  {/* HERO CONTENT */}
  <div
    className="
      relative
      z-10
      min-h-[54rem]
      lg:min-h-[58rem]
      flex
      items-center
      px-6
      sm:px-10
      md:px-14
      lg:px-20
      xl:px-24
    "
  >
    <div className="w-full max-w-[38rem]">

      {/* THE */}
      <div className="mb-2">
        <span
          className={`
            ${cormorantSC.className}
            text-[1.5rem]
            sm:text-[1.8rem]
            lg:text-[2rem]
            leading-none
            text-black
          `}
          style={{ letterSpacing: "0.35em" }}
        >
          The
        </span>
      </div>

      {/* PARADISE */}
      <h1
        className={`
          ${cormorantSC.className}
          text-[3.4rem]
          sm:text-[4.5rem]
          md:text-[5.5rem]
          lg:text-[6.5rem]
          leading-[0.9]
          text-black
          font-normal
        `}
        style={{ letterSpacing: "0.12em" }}
      >
        Paradise
      </h1>

      {/* PROJECT */}
      <h1
        className={`
          ${cormorantSC.className}
          text-[3.4rem]
          sm:text-[4.5rem]
          md:text-[5.5rem]
          lg:text-[6.5rem]
          leading-[0.9]
          text-black
          font-normal
          mt-2
        `}
        style={{ letterSpacing: "0.12em" }}
      >
        Project
      </h1>

      {/* SUB HEADER */}
      {data?.subHeader && (
        <div className="flex items-center gap-4 mt-8 lg:mt-10">
          <div className="w-12 lg:w-16 h-[1px] bg-[#8a5a22]" />

          <h2
            className={`
              ${cormorantSC.className}
              text-[1rem]
              sm:text-[1.1rem]
              lg:text-[1.25rem]
              text-black
              font-medium
              uppercase
            `}
            style={{ letterSpacing: "0.22em" }}
          >
            {data.subHeader}
          </h2>
        </div>
      )}

      {/* BODY TEXT */}
      {data?.bodyText && (
        <div className="mt-7 max-w-[34rem]">
          <p
            className={`
              ${cormorantInfant.className}
              text-[1.1rem]
              sm:text-[1.2rem]
              lg:text-[1.4rem]
              leading-[1.55]
              text-black
              font-medium
              whitespace-pre-wrap
            `}
          >
            {data.bodyText}
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="hidden mt-8 lg:mt-10">
        <a
          href="#content-section"
          className="
            group
            inline-flex
            items-center
            justify-between
            gap-10
            min-w-[17rem]
            bg-[#173b2a]
            text-white
            px-7
            py-4
            hover:bg-black
            transition-colors
            duration-300
          "
        >
          <span
            className={`
              ${cormorantSC.className}
              text-[0.95rem]
              lg:text-[1rem]
              uppercase
            `}
            style={{ letterSpacing: "0.2em" }}
          >
            {data?.ctaLabel || "Enter Paradise"}
          </span>

          <span
            className="
              text-[1.4rem]
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </a>
      </div>

    </div>
  </div>

  {/* SCROLL INDICATOR */}
  <a
    href="#content-section"
    className="
      absolute
      z-10
      bottom-7
      left-1/2
      -translate-x-1/2
      hidden
      md:flex
      flex-col
      items-center
      text-white
      group
    "
  >
    <span
      className={`
        ${lato.className}
        text-[0.65rem]
        uppercase
        tracking-[0.3em]
        mb-3
      `}
    >
      Scroll to explore
    </span>

    <div
      className="
        w-10
        h-10
        rounded-full
        border
        border-white/80
        flex
        items-center
        justify-center
        group-hover:bg-white
        group-hover:text-black
        transition
      "
    >
      ↓
    </div>
  </a>

  <div
    id="content-section"
    className="absolute bottom-0 h-px"
  />
</main>
      <CommunitiesSection communities={communities} />
    </div>
  );
}
