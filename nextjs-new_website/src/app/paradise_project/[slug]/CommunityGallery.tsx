"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

const THUMBS_PER_PAGE = 12;

type Painting = {
  _id: string;
  title: string;
  artistName: string;
  dateProduced: string;
  description: string;
  category?: string;
  imageUrl: string;
};

type Community = {
  name: string;
  slug: { current: string };
  comingSoon: boolean;
};

type Props = {
  communityName: string;
  communitySlug: string;
  groupNumber: number;
  paintings: Painting[];
  allCommunities: Community[];
};

export default function CommunityGallery({
  communityName,
  communitySlug,
  groupNumber,
  paintings,
  allCommunities,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [thumbPage, setThumbPage] = useState(0);
  const [readMore, setReadMore] = useState(false);
  const [allGroupsOpen, setAllGroupsOpen] = useState(false);
  const [sortByOpen, setSortByOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Default");
  const sortByRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortByRef.current && !sortByRef.current.contains(e.target as Node)) {
        setSortByOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = ["Default", ...Array.from(new Set(paintings.map((p) => p.category?.trim()).filter(Boolean))) as string[]];

  const filteredPaintings =
    selectedCategory === "Default"
      ? paintings
      : paintings.filter((p) => p.category === selectedCategory);

  const selected = filteredPaintings[selectedIndex] ?? filteredPaintings[0];
  const totalThumbPages = Math.ceil(filteredPaintings.length / THUMBS_PER_PAGE);
  const thumbStart = thumbPage * THUMBS_PER_PAGE;
  const visibleThumbs = filteredPaintings.slice(thumbStart, thumbStart + THUMBS_PER_PAGE);

  const prev = () => {
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : filteredPaintings.length - 1;
    setSelectedIndex(newIndex);
    setThumbPage(Math.floor(newIndex / THUMBS_PER_PAGE));
  };

  const next = () => {
    const newIndex = selectedIndex < filteredPaintings.length - 1 ? selectedIndex + 1 : 0;
    setSelectedIndex(newIndex);
    setThumbPage(Math.floor(newIndex / THUMBS_PER_PAGE));
  };

  return (
    <div className={`${lato.className} min-h-screen flex flex-col bg-white`}>
      <Navbar />

      <main className="flex-grow">
        {/* Header row */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
          <Link
            href="/paradise_project"
            className="flex items-center gap-2 text-2xl font-medium text-black hover:opacity-70 transition-opacity"
          >
            ‹ Return
          </Link>
          <h1 className="text-[3.5rem] font-bold text-black">
            Group {groupNumber}: {communityName}
          </h1>
          <div className="relative">
            <button
              onClick={() => setAllGroupsOpen(!allGroupsOpen)}
              className="flex items-center gap-2 text-2xl font-medium text-black hover:opacity-70 transition-opacity"
            >
              All Groups ▼
            </button>
            {allGroupsOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                <ul className="flex flex-col py-1">
                  {allCommunities.map((c) => (
                    <li key={c.slug?.current}>
                      <Link
                        href={`/paradise_project/${c.slug?.current}`}
                        className={`block px-4 py-2 hover:bg-gray-100 text-sm ${
                          c.slug?.current === communitySlug ? "font-semibold" : ""
                        } ${c.comingSoon ? "text-gray-400" : "text-black"}`}
                        onClick={() => setAllGroupsOpen(false)}
                      >
                        {c.name} {c.comingSoon ? "(Coming Soon)" : ""}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Sort bar */}
        <div className="flex items-center px-8 py-3 border-b border-gray-100">
          {/* Left */}
          <span className="flex-1 text-2xl text-black">Currently Sorted By: {selectedCategory}</span>

          {/* Center */}
          <div className="relative flex-none" ref={sortByRef}>
            <button
              onClick={() => setSortByOpen(!sortByOpen)}
              className="flex items-center gap-1 text-2xl text-black hover:opacity-70"
            >
              Sort By {sortByOpen ? "▴" : "▾"}
            </button>
            {sortByOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-white border border-gray-200 shadow-xl z-50 py-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedIndex(0);
                      setThumbPage(0);
                      setSortByOpen(false);
                    }}
                    className={`block w-full text-center text-2xl py-2 px-4 hover:opacity-70 transition-opacity ${
                      cat === selectedCategory
                        ? "text-purple-700 underline"
                        : "text-black"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Eye icon */}
          <div className="flex-1 flex justify-end">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-black">
              <path
                d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {paintings.length > 0 ? (
          <div className="flex px-8 py-6 gap-6">
            {/* Left: large viewer */}
            <div className="flex-1 min-w-0">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: "4/3" }}>
                {/* Counter */}
                <div className="absolute top-3 left-3 bg-black/60 text-white text-sm px-2 py-1 rounded z-10">
                  {selectedIndex + 1}/{filteredPaintings.length}
                </div>

                {/* Fullscreen */}
                {selected?.imageUrl && (
                  <a
                    href={selected.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 bg-black/60 text-white p-1.5 rounded z-10 hover:bg-black/80"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                    </svg>
                  </a>
                )}

                {/* Prev arrow */}
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow text-xl z-10"
                >
                  ‹
                </button>

                {/* Next arrow */}
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow text-xl z-10"
                >
                  ›
                </button>

                {selected?.imageUrl && (
                  <img
                    src={selected.imageUrl}
                    alt={selected.title || "Painting"}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Metadata row */}
              <div className="flex justify-between mt-4 pb-4 border-b border-gray-200 text-2xl font-medium text-black">
                <span>{selected?.title || "Painting Title"}</span>
                <span>{selected?.artistName || "Artist Name"}</span>
                <span>{selected?.dateProduced || "Date Produced"}</span>
              </div>

              {/* Description */}
              {selected?.description && (
                <div className="mt-4">
                  <p className={`text-xl text-black leading-relaxed whitespace-pre-wrap ${!readMore ? "line-clamp-4" : ""}`}>
                    {selected.description}
                  </p>
                  <button
                    onClick={() => setReadMore(!readMore)}
                    className="mt-2 flex items-center gap-1 text-lg font-medium text-black hover:opacity-70"
                  >
                    {readMore ? "Read Less ▴" : "Read More ▾"}
                  </button>
                </div>
              )}

              {/* Back to top */}
              <div className="flex justify-center mt-16 mb-4">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="flex flex-col items-center gap-1 text-sm text-black hover:opacity-70"
                >
                  <span>▲</span>
                  <span>Back to top</span>
                </button>
              </div>
            </div>

            {/* Right: thumbnail grid */}
            <div className="w-[22rem] flex-shrink-0 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-2">
                {visibleThumbs.map((painting, i) => {
                  const globalIndex = thumbStart + i;
                  const isSelected = globalIndex === selectedIndex;
                  return (
                    <button
                      key={painting._id}
                      onClick={() => {
                        setSelectedIndex(globalIndex);
                        setReadMore(false);
                      }}
                      className="group relative aspect-square rounded-lg overflow-hidden bg-gray-200 transition-opacity"
                    >
                      {painting.imageUrl && (
                        <img
                          src={painting.imageUrl}
                          alt={painting.title || ""}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {isSelected ? (
                        <div className="absolute inset-0 bg-purple-700/80 flex items-center justify-center p-1">
                          <span className="text-white text-xs font-medium text-center leading-tight">
                            Currently Selected
                          </span>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-medium text-center leading-tight">
                            {painting.title || "Painting Title"}
                          </span>
                          <span className="text-white text-xs text-center leading-tight mt-1">
                            {painting.artistName || "Artist Name"}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Pagination dots */}
              {totalThumbPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setThumbPage(Math.max(0, thumbPage - 1))}
                    className="text-gray-500 hover:text-black text-sm"
                  >
                    ◀
                  </button>
                  {Array.from({ length: totalThumbPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setThumbPage(i)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        i === thumbPage ? "bg-purple-700" : "bg-gray-300"
                      }`}
                    />
                  ))}
                  <button
                    onClick={() => setThumbPage(Math.min(totalThumbPages - 1, thumbPage + 1))}
                    className="text-gray-500 hover:text-black text-sm"
                  >
                    ▶
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-24 text-gray-400 text-lg">
            No paintings added yet. Upload paintings in Sanity Studio.
          </div>
        )}
      </main>
    </div>
  );
}
