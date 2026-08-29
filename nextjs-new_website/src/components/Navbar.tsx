"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, Menu, X, Search } from "lucide-react";
import UpdatedSocialLinks from "./UpdatedSocialLinks";

const formatMenuLabel = (label: string) =>
  label
    .toLowerCase()
    .replace(/(?<!['’])\b\w/g, (character) => character.toUpperCase());

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const ThinkRoundLogoPath = "/Think_Round_logo_NavBar.webp";
  const menuItems = [
    {
      label: "ABOUT",
      links: [
        { name: "OUR BOARD", href: "/about/our_board" },
        { name: "ABOUT US", href: "/about/about_us" },
        { name: "OUR ARTISTS", href: "/about/our-artists" },
        { name: "PRESS", href: "/about/press" },
        { name: "CONTACT US", href: "/about/contact_us" },
      ],
    },
    { label: "DONATE", href: "/donate" },
    { label: "SHOP ART", href: "/shop_art" },
    {
      label: "PROGRAMS",
      links: [
        {
          name: "KEEP(KID’S ENVIRONMENTAL EDUCATION PROGRAM)",
          href: "/programs/keep",
        },
        {
          name: "STREAM OF CONSCIOUSNESS",
          href: "/programs/stream_of_consciousness",
        },
        {
          name: "INTERGENERATIONAL AFTER SCHOOL PROGRAM",
          href: "/programs/IAP",
        },
        { name: "CLASSES AT THINK ROUND", href: "/programs/classes" },
        { name: "FAMILY ARTS PROGRAM", href: "/programs/family_arts_program" },
        {
          name: "TURNING THE TIDE OF TRAUMA",
          href: "/programs/turning_the_tide_of_trauma",
        },
        {
          name: "CHILDREN'S MURAL PROGRAM",
          href: "nextjs-new_website\\src\\app\\programs\\children_mural_program\\page.tsx",
        },
      ],
    },
    {
      label: "THINK ROUND FINE ARTS",
      links: [
        {
          name: "VIRTUAL ART EXHIBITIONS",
          href: "/about/virtual_art_exhibitions",
        },
        {
          name: "CURRENT & UPCOMING EXHIBITIONS",
          href: "/about/current_upcoming_exhibitions",
        },
        {
          name: "PAST EXHIBITIONS",
          href: "/think_round_fine_arts/past_exhibitions",
        },
      ],
    },
    {
      label: "CENTER FOR THE HUMAN FAMILY",
      links: [
        {
          name: "EXTERIOR",
          href: "/center_for_human_family/exterior",
          disabled: true,
        },
        {
          name: "SUSTAINABLE LIVING - LEARNING CENTERS",
          href: "/center_for_human_family/sustainable-living-learning-centers",
          disabled: true,
        },
        {
          name: "1ST FLOOR",
          href: "/center_for_human_family/1st-floor",
          disabled: true,
        },
        {
          name: "LOBBY - STREAM OF CONSCIOUSNESS",
          href: "/center_for_human_family/lobby-stream-of-consciousness",
          disabled: true,
        },
        {
          name: "AQUAPONICS & FISH FARMS",
          href: "/center_for_human_family/aquaponics-fish-farms",
          disabled: true,
        },
        {
          name: "RESTAURANT / CAFE / CULINARY ACADEMY",
          href: "/center_for_human_family/restaurant-cafe-culinary-academy",
          disabled: true,
        },
        {
          name: "2ND FLOOR",
          href: "/center_for_human_family/2nd-floor",
          disabled: true,
        },
        {
          name: "HEALING ROOMS",
          href: "/center_for_human_family/healing-rooms",
          disabled: true,
        },
        {
          name: "AIR, WATER, SOIL EXHIBIT",
          href: "/center_for_human_family/air-water-soil-exhibit",
          disabled: true,
        },
        {
          name: "3RD FLOOR",
          href: "/center_for_human_family/3rd-floor",
          disabled: true,
        },
        { name: "PARADISE PROJECT", href: "/paradise_project" },
      ],
    },

    { label: "BLOGS", href: "/blogs" },
    { label: "VOLUNTEER", href: "/volunteer" },
    { label: "SUBSCRIBE", href: "/subscribe" },
  ];

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenMenu(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 150);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      console.log("Searching for:", searchTerm);
      // Add your search functionality here
      // For example: redirect to search results page
      // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateScreenSize = () => setIsMediumScreen(mediaQuery.matches);

    updateScreenSize();
    mediaQuery.addEventListener("change", updateScreenSize);

    return () => {
      mediaQuery.removeEventListener("change", updateScreenSize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  if (!isMediumScreen) {
    return (
      <div className="relative  bg-white">
        <div className="relative z-20 flex items-center justify-between bg-white p-3">
          <Link href="/" aria-label="Think Round home" className="w-70">
            <Image
              src={ThinkRoundLogoPath}
              alt="Think Round Logo"
              width={500}
              height={196}
            />
          </Link>

          <button
            type="button"
            className="p-2 text-[#70169c] hover:text-[#FA7D00]"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              setIsMobileMenuOpen((isOpen) => !isOpen);
              setMobileSubmenu(null);
            }}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="fixed inset-0 z-10 h-[100dvh] max-h-[100dvh] mobile-navigation-open overflow-hidden overscroll-none border-t border-gray-200 bg-[#68B7FD] px-6 pb-4 pt-40"
          >
            <ul className="flex h-full flex-col  gap-5 text-2xl leading-tight">
              {menuItems.map((menu) => {
                return (
                  <li key={menu.label}>
                    {menu.links ? (
                      <button
                        type="button"
                        className="block w-full text-left font-bold text-white cursor-pointer"
                        onClick={() => setMobileSubmenu(menu.label)}
                      >
                        {formatMenuLabel(menu.label)}
                        <span className="text-gray-600">{` >>`}</span>
                      </button>
                    ) : (
                      <Link
                        href={menu.href!}
                        className="block font-bold text-white "
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {formatMenuLabel(menu.label)}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            {mobileSubmenu && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Mobile submenu"
                className="z-10 absolute inset-x-0 top-0 mt-10  min-h-screen overflow-y-auto bg-[#68B7FD] px-6 pb-4 pt-28"
              >
                {mobileSubmenu && (
                  <button
                    type="button"
                    className="mb-10 inline-flex items-center gap-1 font-bold text-white text-3xl cursor-pointer"
                    onClick={() => setMobileSubmenu(null)}
                  >
                    <ArrowLeft size={20} aria-hidden="true" />
                    <span>Back</span>
                  </button>
                )}
                <ul className=" flex flex-col text-xl gap-3">
                  {menuItems
                    .find((menu) => menu.label === mobileSubmenu)
                    ?.links?.map((link) => (
                      <li key={link.name}>
                        {link.disabled ? (
                          <span className="block text-gray-500 cursor-not-allowed">
                            {formatMenuLabel(link.name)}
                          </span>
                        ) : (
                          <Link
                            href={link.href}
                            className="block font-bold text-black "
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setMobileSubmenu(null);
                            }}
                          >
                            {formatMenuLabel(link.name)}
                          </Link>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
  return (
    <main>
      <div className="bg-[#68B7FD] px-5 py-2 flex justify-between ">
        <div className="flex flex-start pl-7 text-white">
          {" "}
          <a
            href="https://www.facebook.com/thinkroundinc"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:text-blue-600 px-3 py-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href="https://x.com/ThinkRound_"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:text-black px-3 py-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.807-5.979 6.807H2.306l7.644-8.74L.754 2.25h6.844l4.707 6.225z" />
            </svg>
          </a>
          <div className="relative group flex items-center justify-center px-3 py-2">
            <button className=" hover:text-pink-600 transition-colors flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                  ry="5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 top-full mb-2 w-56 text-black bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a
                href="https://www.instagram.com/thinkroundinc/"
                target="_blank"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Think Round Inc.
              </a>
              <a
                href="https://www.instagram.com/thinkround/"
                target="_blank"
                className="block px-4 py-2 hover:bg-gray-100 border-t"
              >
                Fine Arts Gallery
              </a>
            </div>
          </div>
          <a
            href="https://www.youtube.com/channel/UCWwDo1uREn4oE02onTvMUaw"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:text-red-600 px-3 py-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>
        <div className="pr-7 ">
          <div className="relative flex items-center">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyPress}
              className="bg-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:border-white placeholder-gray-500 text-gray-800 text-md transition-all duration-200 pr-10"
              placeholder="SEARCH"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="absolute right-3 text-gray-500 hover:cursor-pointer transition-colors duration-200 flex items-center justify-center"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
      <nav className=" bg-white grid grid-cols-[0.2fr_0.8fr] gap-x-5 items-center p-5 lg:p-15">
        <div>
          <Link href="/" aria-label="Think Round home">
            <Image
              className="md:max-lg:mx-10 w-sm "
              src={ThinkRoundLogoPath}
              alt="Think Round Logo"
              width={500}
              height={196}
            />
          </Link>
        </div>
        <div className="flex md:max-xl:flex-wrap flex-row justify-end  text-sm lg:text-xl xl:text-lg ">
          {menuItems.map((menu) => (
            <div
              key={menu.label}
              className=" relative inline-flex  items-center lg:p-3 xl:p-0"
              onMouseEnter={
                menu.links ? () => handleMouseEnter(menu.label) : undefined
              }
              onMouseLeave={menu.links ? handleMouseLeave : undefined}
            >
              {menu.links ? (
                <button
                  className={` inline-flex items-center h-7 px-3 py-2 font-bold text-[#70169c] hover:text-[#FA7D00] border-0 whitespace-nowrap ${openMenu === menu.label ? "text-[#FA7D00]" : ""}`}
                  type="button"
                >
                  {menu.label}
                </button>
              ) : (
                <Link
                  href={menu.href!}
                  className={` inline-flex  items-center h-7 px-3 py-2 font-bold  text-[#70169c] hover:text-[#FA7D00] whitespace-nowrap `}
                >
                  {menu.label}
                </Link>
              )}

              {menu.links && openMenu === menu.label && (
                <div className="absolute left-0 top-full w-80 z-1 pt-2">
                  <ul className="flex flex-col bg-white ">
                    {menu.links.map((link) => (
                      <li key={link.name}>
                        {link.disabled ? (
                          <span className="block px-4  whitespace-nowrap text-gray-500 cursor-not-allowed select-none">
                            {link.name}
                          </span>
                        ) : (
                          <Link
                            href={link.href}
                            className={`block px-4  text-black font-bold hover:text-[#FA7D00]   whitespace-nowrap  `}
                            onClick={() => setOpenMenu(null)}
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </main>
  );
}
