"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ArtistCardProps {
  name: string;
  bio?: string;
  photoUrl?: string;
}

export default function ArtistCard({ name, bio, photoUrl }: ArtistCardProps) {
  const [open, setOpen] = useState(false);
  const hasBio = Boolean(bio && bio.trim().length > 0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const cardContent = (
    <>
      {photoUrl && (
        <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={photoUrl}
            alt={`${name} portrait`}
            width={96}
            height={96}
            className="object-cover w-full h-full"
            sizes="48px"
          />
        </div>
      )}
      <div className="min-w-0 text-left">
        <h3 className="text-sm font-semibold text-black truncate">{name}</h3>
        {hasBio && (
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {bio}
          </p>
        )}
      </div>
    </>
  );

  const cardClasses =
    "flex-shrink-0 flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 min-w-[240px] max-w-[300px]";

  return (
    <>
      {hasBio ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`${cardClasses} text-left cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black`}
          aria-label={`Read bio for ${name}`}
        >
          {cardContent}
        </button>
      ) : (
        <div className={cardClasses}>{cardContent}</div>
      )}

      {open && hasBio && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="artist-bio-title"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 md:p-8"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <h3
              id="artist-bio-title"
              className="text-2xl font-bold text-black mb-4 pr-8"
            >
              {name}
            </h3>
            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
              {bio}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
