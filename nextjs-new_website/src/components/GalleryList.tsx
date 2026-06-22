import Link from "next/link";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface GalleryListProps {
  galleries: SanityDocument[];
}

export default function GalleryList({ galleries }: GalleryListProps) {
  return (
    <section className="bg-[#7AB2D3] rounded-lg shadow-md p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">
        Gallery
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries.map((gallery) => (
          <Link
            href={`/${gallery.slug.current}`}
            key={gallery._id}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Image Container */}
            <div className="aspect-square bg-[#DFF2EB] flex items-center justify-center">
              {gallery.image ? (
                <Image
                  src={urlFor(gallery.image).width(600).height(600).url()}
                  alt={gallery.image.alt || gallery.title || "Gallery image"}
                  width={600}
                  height={600}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={urlFor(gallery.image)
                    .width(20)
                    .height(20)
                    .blur(10)
                    .url()}
                />
              ) : (
                <span className="text-[#4A628A] text-lg font-medium">
                  {gallery.title}
                </span>
              )}
            </div>

            {/* Card Footer */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#4A628A]/90 to-transparent p-4 pt-8">
              <h2 className="text-xl font-bold text-white">{gallery.title}</h2>
              <div className="flex justify-between items-center mt-2">
                <p className="text-[#B9E5E8] text-sm">
                  {new Date(gallery.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <span className="bg-[#B9E5E8] text-[#4A628A] text-xs font-bold px-2 py-1 rounded-full">
                  View
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
