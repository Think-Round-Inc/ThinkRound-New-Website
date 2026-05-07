import { client, urlFor } from "@/sanity/client";
import Link from "next/link";
import { PortableText, PortableTextBlock } from "next-sanity";
import Navbar from "@/components/Navbar";
import ExhibitionGallery from "@/components/ExhibitionGallery";
import ArtistCard from "@/components/ArtistCard";
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
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800 transition-colors"
      >
        {children}
      </a>
    ),
  },
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
  const [sy, sm, sd] = startDate.split("-").map(Number);
  const [ey, em, ed] = endDate.split("-").map(Number);
  const start = new Date(sy, sm - 1, sd);
  const end = new Date(ey, em - 1, ed);
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
                  <ArtistCard
                    key={index}
                    name={artist.name}
                    bio={artist.bio}
                    photoUrl={
                      artist.photo
                        ? urlFor(artist.photo).width(96).height(96).url()
                        : undefined
                    }
                  />
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
    </>
  );
}
