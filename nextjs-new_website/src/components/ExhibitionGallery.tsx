"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  thumbSrc: string;
  blurDataURL: string;
  alt: string;
  caption?: string;
}

interface ExhibitionGalleryProps {
  images: GalleryImage[];
}

export default function ExhibitionGallery({ images }: ExhibitionGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    },
    [goNext, goPrev]
  );

  if (images.length === 0) return null;

  const active = images[activeIndex];

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="mb-12 outline-none focus-visible:outline-2 focus-visible:outline-black"
    >
      {/* Hero Image - fixed aspect ratio to prevent layout shift */}
      <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden bg-white">
        <Image
          key={activeIndex}
          src={active.src}
          alt={active.alt}
          fill
          className="object-contain"
          {...(activeIndex === 0
            ? { priority: true }
            : {
                placeholder: "blur" as const,
                blurDataURL: active.blurDataURL,
              })}
          sizes="(max-width: 768px) 100vw, 896px"
        />

        {/* Caption overlay */}
        {active.caption && (
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-8">
            <p className="text-sm text-white italic">{active.caption}</p>
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <button
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden border-2 transition-all ${
                i === activeIndex
                  ? "border-black opacity-100"
                  : "border-transparent opacity-60 hover:opacity-90"
              }`}
            >
              <Image
                src={img.thumbSrc}
                alt={img.alt}
                width={160}
                height={160}
                className="object-cover w-full h-full"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
