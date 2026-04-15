import { client, urlFor } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Past Exhibitions Archive | ThinkRound",
  description:
    "Browse ThinkRound's archive of past fine art exhibitions featuring diverse artists and mediums.",
};

interface PastExhibitionCard {
  _id: string;
  title: string;
  cardTitle?: string;
  slug: { _type: "slug"; current: string };
  startDate: string;
  endDate: string;
  coverImage: {
    asset: { _ref: string; _type: string };
    alt?: string;
    hotspot?: { x: number; y: number };
  };
}

async function getExhibitions(): Promise<PastExhibitionCard[]> {
  return client.fetch<PastExhibitionCard[]>(
    `*[_type == "pastExhibition"] | order(startDate desc) {
      _id,
      title,
      cardTitle,
      slug,
      startDate,
      endDate,
      coverImage
    }`
  );
}

function formatDateRange(startDate: string, endDate: string): string {
  const [sy, sm, sd] = startDate.split("-").map(Number);
  const [ey, em, ed] = endDate.split("-").map(Number);
  const start = new Date(sy, sm - 1, sd);
  const end = new Date(ey, em - 1, ed);
  const startStr = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const endStr = end.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${startStr} – ${endStr}`;
}

function getYear(dateStr: string): string {
  const [y] = dateStr.split("-");
  return y;
}

export default async function PastExhibitionsPage() {
  const exhibitions = await getExhibitions();

  if (!exhibitions || exhibitions.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white text-black p-8 flex justify-center items-center">
          <h1 className="text-4xl font-bold">No past exhibitions found.</h1>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white px-6 py-16">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl font-light uppercase leading-tight tracking-tight text-black text-center mb-16">
            Past Exhibitions Archive
          </h1>

          {/* Exhibition Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {exhibitions.map((exhibition, index) => (
              <Link
                key={exhibition._id}
                href={`/think_round_fine_arts/past_exhibitions/${exhibition.slug.current}`}
                className="group block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image Container - fixed height, image contained within */}
                <div className="relative aspect-[4/3] bg-white overflow-hidden">
                  <Image
                    src={urlFor(exhibition.coverImage)
                      .width(1200)
                      .url()}
                    alt={
                      exhibition.coverImage.alt ||
                      `${exhibition.title} exhibition cover`
                    }
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    {...(index < 4
                      ? { priority: true }
                      : {
                          placeholder: "blur" as const,
                          blurDataURL: urlFor(exhibition.coverImage)
                            .width(20)
                            .blur(10)
                            .url(),
                        })}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>

                {/* Card Text */}
                <div className="px-4 py-3 bg-white">
                  <h2 className="text-sm font-semibold text-black group-hover:text-gray-600 transition-colors">
                    {exhibition.cardTitle ?? exhibition.title}{" "}
                    <span className="text-gray-400 font-normal">
                      ({getYear(exhibition.startDate)})
                    </span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatDateRange(exhibition.startDate, exhibition.endDate)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
