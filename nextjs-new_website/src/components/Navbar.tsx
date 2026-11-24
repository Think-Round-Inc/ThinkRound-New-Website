"use client";

import Link from "next/link";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronRight,
  Menu,
  Search,
  X,
} from "lucide-react";
import UpdatedSocialLinksContent from "./UpdatedSocialLinksContent";

type InternalMenuLink = {
  name: string;
  href: Route;
  disabled?: false;
  external?: false;
  links?: never;
};

type DisabledMenuLink = {
  name: string;
  href: string;
  disabled: true;
  external?: never;
  links?: never;
};

type ExternalMenuLink = {
  name: string;
  href: `https://${string}`;
  external: true;
  disabled?: never;
  links?: never;
};

type NestedMenuLink = {
  name: string;
  links: MenuLink[];
  href?: never;
  disabled?: never;
  external?: never;
};

type MenuLink =
  | InternalMenuLink
  | DisabledMenuLink
  | ExternalMenuLink
  | NestedMenuLink;

type MenuItem =
  | { label: string; links: MenuLink[]; href?: never; external?: never }
  | { label: string; links?: never; href: Route; external?: false }
  | {
      label: string;
      links?: never;
      href: `https://${string}`;
      external: true;
    };

const formatMenuLabel = (label: string) =>
  label
    .toLowerCase()
    .replace(/(?<!['’])\b\w/g, (character) => character.toUpperCase());

export default function Navbar() {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileMenuPath, setMobileMenuPath] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const ThinkRoundLogoPath = "/Think_Round_logo_NavBar.webp";
  const menuItems: MenuItem[] = [
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
    { label: "SHOP ART", href: "https://www.thinkround.shop", external: true },
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
          name: "MAGIC OF WHY",
          href: "https://www.magicofwhy.com",
          external: true,
        },
        {
          name: "TURNING THE TIDE OF TRAUMA",
          href: "/programs/turning_the_tide_of_trauma",
        },
        {
          name: "CHILDREN'S MURAL PROGRAM",
          href: "/programs/children_mural_program",
        },
      ],
    },
    {
      label: "THINK ROUND FINE ARTS",
      links: [
        {
          name: "VIRTUAL ART EXHIBITIONS",
          href: "/think_round_fine_arts/virtual_art_exhibitions",
        },
        {
          name: "CURRENT & UPCOMING EXHIBITIONS",
          href: "/think_round_fine_arts/current_upcoming_exhibitions",
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
          links: [
            {
              name: "SUSTAINABLE LIVING - LEARNING CENTERS",
              href: "/center_for_human_family/sustainable-living-learning-centers",
              disabled: true,
            },
          ],
        },
        {
          name: "1ST FLOOR",
          links: [
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
          ],
        },
        {
          name: "2ND FLOOR",
          links: [
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
          ],
        },
        {
          name: "3RD FLOOR",
          links: [
            {
              name: "PARADISE PROJECT",
              links: [
                {
                  name: "3D WALKTHROUGH",
                  href: "https://thinkroundinc123-wq.itch.io/paradise",
                  external: true,
                },
                { name: "VIVID CULTURES", href: "/paradise_project" },
              ],
            },
          ],
        },
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

  const getMobileMenuLinks = (path: string[]) => {
    let links = menuItems.find((menu) => menu.label === path[0])?.links;

    for (const name of path.slice(1)) {
      links = links?.find((link) => link.name === name)?.links;
    }

    return links;
  };

  const renderDesktopLinks = (links: MenuLink[], parentPath: string) => (
    <ul className="flex flex-col bg-white shadow-md">
      {links.map((link) => {
        const path = `${parentPath}/${link.name}`;
        const isExpanded =
          openMenu === path || openMenu?.startsWith(`${path}/`);

        return (
          <li
            key={link.name}
            className="relative"
            onMouseEnter={
              link.links ? () => handleMouseEnter(path) : undefined
            }
          >
            {link.links ? (
              <>
                <button
                  type="button"
                  className={`flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-2 text-left font-bold text-black hover:text-[#FA7D00] whitespace-nowrap ${
                    isExpanded ? "text-[#FA7D00]" : ""
                  }`}
                  onClick={() => setOpenMenu(path)}
                  aria-haspopup="true"
                  aria-expanded={isExpanded}
                >
                  {link.name}
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
                {isExpanded && (
                  <div className="absolute left-full top-0 z-10 pl-1">
                    {renderDesktopLinks(link.links, path)}
                  </div>
                )}
              </>
            ) : link.disabled ? (
              <span className="block px-4 py-2 whitespace-nowrap text-gray-500 cursor-not-allowed select-none">
                {link.name}
              </span>
            ) : link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-black font-bold hover:text-[#FA7D00] whitespace-nowrap"
                onClick={() => setOpenMenu(null)}
              >
                {link.name}
              </a>
            ) : (
              <Link
                href={link.href}
                className="block px-4 py-2 text-black font-bold hover:text-[#FA7D00] whitespace-nowrap"
                onClick={() => setOpenMenu(null)}
              >
                {link.name}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );

  const handleSearch = () => {
    const term = searchTerm.trim();
    setSearchTerm("");
    if (term) router.push(`/search?q=${encodeURIComponent(term)}`);
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
        <div className="relative z-50 flex items-center justify-between bg-white p-3">
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
            className="cursor-pointer p-2 text-[#70169c] hover:text-[#FA7D00]"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              setIsMobileMenuOpen((isOpen) => !isOpen);
              setMobileMenuPath([]);
            }}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="fixed inset-0 z-40 h-[100dvh] max-h-[100dvh] mobile-navigation-open overflow-hidden overscroll-none border-t border-gray-200 bg-[#68B7FD] px-6 pb-4 pt-40"
          >
            <ul className="flex h-full flex-col  gap-5 text-2xl leading-tight">
              {menuItems.map((menu) => {
                return (
                  <li key={menu.label}>
                    {menu.links ? (
                      <button
                        type="button"
                        className="block w-full text-left font-bold text-white cursor-pointer"
                        onClick={() => setMobileMenuPath([menu.label])}
                      >
                        {formatMenuLabel(menu.label)}
                        <span className="text-gray-600">{` >>`}</span>
                      </button>
                    ) : menu.external ? (
                      <a
                        href={menu.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block font-bold text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {formatMenuLabel(menu.label)}
                      </a>
                    ) : (
                      <Link
                        href={menu.href}
                        className="block font-bold text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {formatMenuLabel(menu.label)}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            {mobileMenuPath.length > 0 && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label={`Mobile submenu: ${formatMenuLabel(mobileMenuPath[mobileMenuPath.length - 1])}`}
                className="z-10 absolute inset-x-0 top-0 mt-10  min-h-screen overflow-y-auto bg-[#68B7FD] px-6 pb-4 pt-28"
              >
                <button
                  type="button"
                  className="mb-10 inline-flex items-center gap-1 font-bold text-white text-3xl cursor-pointer"
                  onClick={() =>
                    setMobileMenuPath((path) => path.slice(0, -1))
                  }
                >
                  <ArrowLeft size={20} aria-hidden="true" />
                  <span>Back</span>
                </button>
                <ul className=" flex flex-col text-xl gap-3">
                  {getMobileMenuLinks(mobileMenuPath)?.map((link) => (
                    <li key={link.name}>
                      {link.links ? (
                        <button
                          type="button"
                          className="flex w-full cursor-pointer items-center justify-between text-left font-bold text-black"
                          onClick={() =>
                            setMobileMenuPath((path) => [...path, link.name])
                          }
                        >
                          {formatMenuLabel(link.name)}
                          <ChevronRight size={20} aria-hidden="true" />
                        </button>
                      ) : link.disabled ? (
                        <span className="block text-gray-500 cursor-not-allowed">
                          {formatMenuLabel(link.name)}
                        </span>
                      ) : link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block font-bold text-black"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setMobileMenuPath([]);
                          }}
                        >
                          {formatMenuLabel(link.name)}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="block font-bold text-black "
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setMobileMenuPath([]);
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
          <UpdatedSocialLinksContent />
        </div>
        <div className="pr-7 ">
          <div className="relative flex items-center">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyPress}
              className="bg-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:border-white placeholder-gray-500 text-gray-800 text-lg transition-all duration-200 pr-10"
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
                  className={` inline-flex cursor-pointer items-center h-7 px-3 py-2 font-bold text-[#70169c] hover:text-[#FA7D00] border-0 whitespace-nowrap ${
                    openMenu === menu.label ||
                    openMenu?.startsWith(`${menu.label}/`)
                      ? "text-[#FA7D00]"
                      : ""
                  }`}
                  type="button"
                  onClick={() => setOpenMenu(menu.label)}
                  aria-haspopup="true"
                  aria-expanded={
                    openMenu === menu.label ||
                    Boolean(openMenu?.startsWith(`${menu.label}/`))
                  }
                >
                  {menu.label}
                </button>
              ) : menu.external ? (
                <a
                  href={menu.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpenMenu(null)}
                  className="inline-flex items-center h-7 px-3 py-2 font-bold text-[#70169c] hover:text-[#FA7D00] whitespace-nowrap"
                >
                  {menu.label}
                </a>
              ) : (
                <Link
                  href={menu.href}
                  onClick={() => setOpenMenu(null)}
                  className={` inline-flex  items-center h-7 px-3 py-2 font-bold  text-[#70169c] hover:text-[#FA7D00] whitespace-nowrap `}
                >
                  {menu.label}
                </Link>
              )}

              {menu.links &&
                (openMenu === menu.label ||
                  openMenu?.startsWith(`${menu.label}/`)) && (
                  <div className="absolute left-0 top-full z-50 w-auto pt-2">
                    {renderDesktopLinks(menu.links, menu.label)}
                  </div>
                )}
            </div>
          ))}
        </div>
      </nav>
    </main>
  );
}
