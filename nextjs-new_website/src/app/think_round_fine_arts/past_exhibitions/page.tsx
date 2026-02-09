import { client, urlFor } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      slug,
      startDate,
      endDate,
      coverImage
    }`
  );
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
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
  return new Date(dateStr).getFullYear().toString();
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
                {/* Image Container - natural aspect ratio */}
                <div className="relative bg-gray-100 overflow-hidden">
                  <Image
                    src={urlFor(exhibition.coverImage)
                      .width(1200)
                      .url()}
                    alt={
                      exhibition.coverImage.alt ||
                      `${exhibition.title} exhibition cover`
                    }
                    width={1200}
                    height={800}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
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
                <div className="p-4 bg-white">
                  <h2 className="text-lg font-semibold text-black group-hover:text-gray-600 transition-colors">
                    {exhibition.title}{" "}
                    <span className="text-gray-400 font-normal">
                      ({getYear(exhibition.startDate)})
                    </span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDateRange(exhibition.startDate, exhibition.endDate)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
