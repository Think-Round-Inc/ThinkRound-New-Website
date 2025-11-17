"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
    { label: "SHOP ART", href: "/shop_art" },
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
          href: "/about/past_exhibitions",
        },
      ],
    },
    {
      label: "VISIONS",
      links: [
        {
          name: "CENTER FOR THE HUMAN FAMILY",
          href: "/about/center_for_the_human_family",
        },
        {
          name: "PARADISE PROJECT - 7 INSTALLATIONS",
          href: "/about/paradise_project_7_installations",
        },
        {
          name: "PARADISE PROJECT",
          href: "/about/paradise_project",
        },
      ],
    },
    {
      label: "PROGRAMS",
      links: [
        { name: "CLASSES AT THINK ROUND", href: "/programs/classes" },
      ],
    },
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
          onMouseEnter={menu.links ? () => handleMouseEnter(menu.label) : undefined}
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
              className="inline-flex items-center h-10 px-3 py-2 font-medium text-gray-800 hover:text-blue-600 whitespace-nowrap"
            >
              {menu.label}
            </Link>
          )}

          {menu.links && openMenu === menu.label && (
            <div className="absolute left-0 top-full mt-1 w-56 rounded-md border bg-white shadow-lg z-50">
              <ul className="flex flex-col">
                {menu.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                      onClick={() => setOpenMenu(null)}
                    >
                      {link.name}
                    </Link>
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