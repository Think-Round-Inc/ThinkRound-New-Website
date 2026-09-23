import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_SC, Cormorant_Infant, Lato } from "next/font/google";
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

type OtherExhibit = {
  _type: "currentExhibition" | "pastExhibition";
  _id: string;
  title: string;
  cardTitle?: string;
  slug: { current: string };
  coverImage?: { asset?: { url: string }; alt?: string };
  artists?: { name: string }[];
};

async function getOtherExhibits(): Promise<OtherExhibit[]> {
  return client.fetch<OtherExhibit[]>(
    `*[_type in ["currentExhibition", "pastExhibition"]] | order(startDate desc) [0...6] {
      _type,
      _id,
      title,
      cardTitle,
      slug,
      coverImage { asset->{ url }, alt },
      artists[] { name }
    }`
  );
}

export default async function ParadiseProjectPage() {
  const query = `*[_type == "paradiseProject"][0]{
    ...,
    heroImage {
      asset->{ url, metadata { dimensions } },
      alt
    },
    communities[] {
      name,
      subtitle,
      slug,
      image { asset->{ url }, alt },
      familyCount,
      paintingCount,
      comingSoon,
      launchDate
    },
    viewAll {
      familyCount,
      paintingCount
    }
  }`;

  const [data, otherExhibits] = await Promise.all([
    client.fetch(query),
    getOtherExhibits(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
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
    backgroundImage: data?.heroImage?.asset?.url
      ? `url(${data.heroImage.asset.url})`
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
      {/* Community Grid Section */}
      <section
  className="
    bg-[#faf8f3]
    w-full
    py-16
    lg:py-20
    px-6
    md:px-10
    lg:px-16
  "
>
        <div className="max-w-[114rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Discover Other Exhibits Section */}
      {otherExhibits.length > 0 && (
        <section className="bg-white w-full py-12 px-[2.3125rem]">
          <div className="max-w-[114rem] mx-auto">
            <h2 className={`${lato.className} text-[2rem] font-normal text-black text-center mb-8`}>
              Discover other exhibits that might catch your eye
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherExhibits.map((exhibit) => {
                const href =
                  exhibit._type === "currentExhibition"
                    ? `/think_round_fine_arts/current_upcoming_exhibitions/${exhibit.slug.current}`
                    : `/think_round_fine_arts/past_exhibitions/${exhibit.slug.current}`;
                const imageUrl = exhibit.coverImage?.asset?.url;
                const artistNames = exhibit.artists?.map((a) => a.name).join(" & ");

                return (
                  <Link
                    key={exhibit._id}
                    href={href}
                    className="group block overflow-hidden rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-[4/3] bg-gray-100">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={exhibit.coverImage?.alt || exhibit.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            }

return (
  <Link
    key={slug}
    href={`/paradise_project/${slug}`}
    className="
      group
      border
      border-black/10
      bg-[#fffdf8]
      rounded-lg
      overflow-hidden
      flex
      flex-col
      sm:flex-row
      min-h-[17rem]
      hover:shadow-lg
      hover:-translate-y-1
      transition-all
      duration-300
    "
  >
    {/* IMAGE */}
    <div className="sm:w-[42%] p-3 lg:p-4">
      <div className="w-full h-[15rem] sm:h-full overflow-hidden rounded-md bg-gray-100">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={community.image?.alt || community.name}
            className="
              w-full
              h-full
              object-cover
              block
              transition-transform
              duration-500
              group-hover:scale-[1.03]
            "
          />
        )}
      </div>
    </div>

    {/* CONTENT */}
    <div
      className="
        flex-1
        p-6
        lg:p-8
        flex
        flex-col
        justify-center
      "
    >
      <p
        className={`
          ${lato.className}
          text-[0.7rem]
          uppercase
          tracking-[0.2em]
          text-[#9b6c35]
          mb-3
        `}
      >
        Faith & Community
      </p>

      <h3
        className={`
          ${cormorantInfant.className}
          text-[2.2rem]
          lg:text-[2.8rem]
          leading-none
          text-black
        `}
      >
        {community.name}
      </h3>

      <p
        className={`
          ${lato.className}
          text-[0.95rem]
          text-black/70
          mt-4
        `}
      >
        Explore families, traditions, culture and shared stories.
      </p>

      <div className="flex items-end justify-between mt-8">
        <div className="flex items-center gap-5">
          <div>
            <p
              className={`
                ${cormorantInfant.className}
                text-[1.5rem]
                text-black
                leading-none
              `}
            >
              {community.paintingCount || "X"}
            </p>

            <p className={`${lato.className} text-[0.7rem] text-black/60 mt-1`}>
              paintings
            </p>
          </div>

          <div className="w-px h-10 bg-black/15" />

          <div>
            <p
              className={`
                ${cormorantInfant.className}
                text-[1.5rem]
                text-black
                leading-none
              `}
            >
              {community.familyCount || "X"}
            </p>

            <p className={`${lato.className} text-[0.7rem] text-black/60 mt-1`}>
              families
            </p>
          </div>
        </div>

        
      </div>
    </div>
  </Link>
);
})}           

          {/* View All — always last */}
  <Link
  href="/paradise_project/all"
  className="
    group
    border
    border-black/10
    bg-[#fffdf8]
    rounded-lg
    overflow-hidden
    flex
    flex-col
    items-center
    justify-center
    p-8
    min-h-[17rem]
    hover:shadow-lg
    hover:-translate-y-1
    transition-all
    duration-300
  "
>
  <p
    className={`
      ${lato.className}
      text-[0.7rem]
      uppercase
      tracking-[0.2em]
      text-[#9b6c35]
      mb-3
    `}
  >
    Explore Everything
  </p>

  <h3
    className={`
      ${cormorantInfant.className}
      text-[2.8rem]
      lg:text-[3.2rem]
      text-black
      text-center
    `}
  >
    View All
  </h3>

  <div className="flex items-center gap-5 mt-6">
    <div className="text-center">
      <p className={`${cormorantInfant.className} text-[1.5rem]`}>
        {data?.viewAll?.paintingCount || "X"}
      </p>
      <p className={`${lato.className} text-[0.7rem] text-black/60`}>
        paintings
      </p>
    </div>

    <div className="w-px h-10 bg-black/15" />

    <div className="text-center">
      <p className={`${cormorantInfant.className} text-[1.5rem]`}>
        {data?.viewAll?.familyCount || "X"}
      </p>
      <p className={`${lato.className} text-[0.7rem] text-black/60`}>
        families
      </p>
    </div>
  </div>

  <div
    className="
      mt-7
      w-11
      h-11
      rounded-full
      bg-[#b4874e]
      text-white
      flex
      items-center
      justify-center
      text-xl
      group-hover:bg-black
      transition-colors
    "
  >
    →
  </div>
</Link>
</div>
      </section>
    </div>
  );
}