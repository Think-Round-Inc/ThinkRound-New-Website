"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, Menu, X } from "lucide-react";

const formatMenuLabel = (label: string) =>
  label
    .toLowerCase()
    .replace(/(?<!['’])\b\w/g, (character) => character.toUpperCase());

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
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
    {
      label: "VISIONS",
      links: [
        {
          name: "PARADISE PROJECT - 7 INSTALLATIONS",
          href: "/about/paradise_project_7_installations",
        },
        {
          name: "PARADISE PROJECT",
          href: "/paradise_project",
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

  if (!isMediumScreen) {
    return (
      <div className="relative  bg-white">
        <div className="relative z-20 flex items-center justify-between bg-white p-3">
          <section className="w-70">
            <Image
              src={ThinkRoundLogoPath}
              alt="Think Round Logo"
              width={500}
              height={196}
            />
          </section>

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
            className="min-h-screen mobile-navigation-open border-t bg-[#68B7FD] border-gray-200 px-6 py-4"
          >
            <ul className="flex flex-col text-3xl gap-3">
              {menuItems.map((menu) => {
                return (
                  <li key={menu.label}>
                    {menu.links ? (
                      <button
                        type="button"
                        // className="block w-full text-left font-bold text-[#70169c] hover:text-[#FA7D00]"
                        className="block w-full text-left font-bold text-white cursor-pointer"
                        onClick={() => setMobileSubmenu(menu.label)}
                      >
                        {formatMenuLabel(menu.label)}
                        <span className="text-gray-600">{` >>`}</span>
                      </button>
                    ) : (
                      <Link
                        href={menu.href!}
                        // className="block font-bold text-[#70169c] hover:text-[#FA7D00]"
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
                    // className="mb-10 inline-flex items-center gap-1 font-bold text-[#70169c] hover:text-[#FA7D00]"
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
                            // className="block font-bold text-black hover:text-[#FA7D00]"
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
    <nav className=" bg-white grid grid-cols-[0.3fr_1.7fr] items-center xl:gap-x-10 p-8">
      <div>
        <section className=" md:max-lg:mx-10 md:max-lg:w-40 xl:w-sm ">
          <Image
            src={ThinkRoundLogoPath}
            alt="Think Round Logo"
            width={500}
            height={196}
          />
        </section>
      </div>
      <div className="flex md:max-lg:flex-wrap flex-row justify-end  md:max-lg:text-sm p-4">
        {menuItems.map((menu) => (
          <div
            key={menu.label}
            className=" relative inline-flex  items-center "
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
                          className={`block px-4  text-black font-bold hover:text-[#FA7D00]   whitespace-nowrap `}
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
  );
}
