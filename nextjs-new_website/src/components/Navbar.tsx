"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    {
      label: "SHOP ART",
      href: "https://www.thinkround.shop",
      external: true,
    },
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
          href: "/programs/children_mural_program",
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
        { name: "EXTERIOR", href: "/center_for_human_family/exterior", disabled: true },
        { name: "SUSTAINABLE LIVING - LEARNING CENTERS", href: "/center_for_human_family/sustainable-living-learning-centers", disabled: true },
        { name: "1ST FLOOR", href: "/center_for_human_family/1st-floor", disabled: true },
        { name: "LOBBY - STREAM OF CONSCIOUSNESS", href: "/center_for_human_family/lobby-stream-of-consciousness", disabled: true },
        { name: "AQUAPONICS & FISH FARMS", href: "/center_for_human_family/aquaponics-fish-farms", disabled: true },
        { name: "RESTAURANT / CAFE / CULINARY ACADEMY", href: "/center_for_human_family/restaurant-cafe-culinary-academy", disabled: true },
        { name: "2ND FLOOR", href: "/center_for_human_family/2nd-floor", disabled: true },
        { name: "HEALING ROOMS", href: "/center_for_human_family/healing-rooms", disabled: true },
        { name: "AIR, WATER, SOIL EXHIBIT", href: "/center_for_human_family/air-water-soil-exhibit", disabled: true },
        { name: "3RD FLOOR", href: "/center_for_human_family/3rd-floor", disabled: true },
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
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav className="flex items-center gap-6 bg-gray-200 p-4">
      {menuItems.map((menu) => (
        <div
          key={menu.label}
          className="relative inline-flex items-center"
          onMouseEnter={
            menu.links ? () => handleMouseEnter(menu.label) : undefined
          }
          onMouseLeave={menu.links ? handleMouseLeave : undefined}
        >
          {menu.links ? (
            <button
              className="inline-flex items-center h-10 px-3 py-2 font-medium text-gray-800 hover:text-blue-600 bg-transparent border-0 whitespace-nowrap"
              type="button"
            >
              {menu.label}
            </button>
          ) : (
            <Link
              href={menu.href!}
              target={menu.external ? "_blank" : undefined}
              rel={menu.external ? "noopener noreferrer" : undefined}
              className="inline-flex items-center h-10 px-3 py-2 font-medium text-gray-800 hover:text-blue-600 whitespace-nowrap"
            >
              {menu.label}
            </Link>
          )}

          {menu.links && openMenu === menu.label && (
            <div className="absolute left-0 top-full mt-1 w-80 rounded-md border bg-white shadow-lg z-50">
              <ul className="flex flex-col">
                {menu.links.map((link) => (
                  <li key={link.name}>
                    {link.disabled ? (
                      <span className="block px-4 py-2 whitespace-nowrap text-gray-400 cursor-not-allowed select-none">
                        {link.name}
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
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
    </nav>
  );
}
