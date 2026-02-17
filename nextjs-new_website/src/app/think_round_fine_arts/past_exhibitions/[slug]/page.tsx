import { client, urlFor } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextBlock } from "next-sanity";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExhibitionGallery from "@/components/ExhibitionGallery";
import type { Metadata } from "next";

export const revalidate = 30;

interface Artist {
  name: string;
  bio?: string;
  photo?: {
    asset: { _ref: string; _type: string };
  };
}

interface ArtworkItem {
  image: {
    asset: { _ref: string; _type: string };
    hotspot?: { x: number; y: number };
  };
  caption?: string;
  alt?: string;
}

interface ExhibitionLink {
  label: string;
  url: string;
}

interface PastExhibitionDetail {
  _id: string;
  title: string;
  slug: { current: string };
  startDate: string;
  endDate: string;
  coverImage: {
    asset: { _ref: string; _type: string };
    alt?: string;
  };
  description?: PortableTextBlock[];
  artists?: Artist[];
  artworkGallery?: ArtworkItem[];
  receptionInfo?: string;
  links?: ExhibitionLink[];
  galleryLocation?: string;
}

async function getExhibition(
  slug: string
): Promise<PastExhibitionDetail | null> {
  return client.fetch<PastExhibitionDetail | null>(
    `*[_type == "pastExhibition" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      startDate,
      endDate,
      coverImage,
      description,
      artists,
      artworkGallery,
      receptionInfo,
      links,
      galleryLocation
    }`,
    { slug }
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exhibition = await getExhibition(slug);

  if (!exhibition) {
    return { title: "Exhibition Not Found | ThinkRound" };
  }

  return {
    title: `${exhibition.title} | Past Exhibitions | ThinkRound`,
    description: `View details about the "${exhibition.title}" exhibition at ThinkRound.`,
    openGraph: {
      title: `${exhibition.title} | ThinkRound`,
      images: exhibition.coverImage
        ? [
            {
              url: urlFor(exhibition.coverImage)
                .width(1200)
                .height(630)
                .auto("format")
                .url(),
              width: 1200,
              height: 630,
              alt: exhibition.coverImage.alt || exhibition.title,
            },
          ]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const exhibitions = await client.fetch<{ slug: string }[]>(
    `*[_type == "pastExhibition"]{ "slug": slug.current }`
  );
  return exhibitions.map((e) => ({ slug: e.slug }));
}

const descriptionComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-lg font-light text-gray-700 mb-4 leading-relaxed">
        {children}
      </p>
    ),
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-4xl font-bold text-black mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl font-bold text-black mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl font-bold text-black mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-xl font-bold text-black mt-6 mb-3">{children}</h4>
    ),
    h5: ({ children }: { children?: React.ReactNode }) => (
      <h5 className="text-lg font-bold text-black mt-4 mb-2">{children}</h5>
    ),
    h6: ({ children }: { children?: React.ReactNode }) => (
      <h6 className="text-base font-bold text-black mt-4 mb-2">{children}</h6>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600">
        {children}
      </blockquote>
    ),
  },
};

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const opts: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return `${start.toLocaleDateString("en-US", opts)} – ${end.toLocaleDateString("en-US", opts)}`;
}

export default async function PastExhibitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exhibition = await getExhibition(slug);

  if (!exhibition) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white text-black p-8 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-4">Exhibition Not Found</h1>
          <Link
            href="/think_round_fine_arts/past_exhibitions"
            className="text-blue-600 hover:underline"
          >
            Back to Past Exhibitions
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/think_round_fine_arts/past_exhibitions"
            className="inline-flex items-center text-gray-500 hover:text-black transition-colors mb-8"
          >
            <span className="mr-2">&larr;</span> Back to Past Exhibitions
          </Link>

          {/* Title + Date */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-light uppercase leading-tight tracking-tight text-black">
              {exhibition.title}
            </h1>
            <p className="text-lg text-gray-500 mt-4">
              {formatDateRange(exhibition.startDate, exhibition.endDate)}
            </p>
            {exhibition.galleryLocation && (
              <p className="text-base text-gray-400 mt-1">
                {exhibition.galleryLocation}
              </p>
            )}
          </header>

          {/* Interactive Gallery (cover image + artwork thumbnails) */}
          <ExhibitionGallery
            images={[
              {
                src: urlFor(exhibition.coverImage).width(1200).url(),
                thumbSrc: urlFor(exhibition.coverImage).width(160).height(160).url(),
                blurDataURL: urlFor(exhibition.coverImage).width(20).blur(10).url(),
                alt: exhibition.coverImage.alt || `${exhibition.title} exhibition`,
              },
              ...(exhibition.artworkGallery || []).map((artwork, index) => ({
                src: urlFor(artwork.image).width(1200).url(),
                thumbSrc: urlFor(artwork.image).width(160).height(160).url(),
                blurDataURL: urlFor(artwork.image).width(20).blur(10).url(),
                alt: artwork.alt || artwork.caption || `Artwork ${index + 1}`,
                caption: artwork.caption,
              })),
            ]}
          />

          {/* Reception & Time-Sensitive Info */}
          {exhibition.receptionInfo && (
            <div className="bg-gray-50 rounded-lg p-6 mb-12 border border-gray-200">
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">
                Reception & Event Information
              </h2>
              <p className="text-lg text-gray-700 whitespace-pre-line">
                {exhibition.receptionInfo}
              </p>
            </div>
          )}

          {/* Related Links (video, interviews, etc.) */}
          {exhibition.links && exhibition.links.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-12">
              {exhibition.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-800 text-gray-800 font-semibold rounded-full hover:bg-gray-800 hover:text-white transition-colors"
                >
                  {link.label}
                  <span>&rarr;</span>
                </a>
              ))}
            </div>
          )}

          {/* Featured Artists */}
          {exhibition.artists && exhibition.artists.length > 0 && (
            <section className="mb-12">
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
                Featured Artists
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
                {exhibition.artists.map((artist, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 min-w-[240px] max-w-[300px]"
                  >
                    {artist.photo && (
                      <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={urlFor(artist.photo)
                            .width(96)
                            .height(96)
                            .url()}
                          alt={`${artist.name} portrait`}
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                          sizes="48px"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-black truncate">
                        {artist.name}
                      </h3>
                      {artist.bio && (
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {artist.bio}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Description */}
          {exhibition.description && (
            <section className="mb-16">
              <PortableText
                value={exhibition.description}
                components={descriptionComponents}
              />
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
