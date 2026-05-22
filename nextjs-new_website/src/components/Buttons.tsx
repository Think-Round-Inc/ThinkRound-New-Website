"use client";

import Link from "next/link";
import clsx from "clsx";

const buttons = [
  {
    name: "WATCH CRISTINA'S INTERVIEW WITH HEIDI",
    href: "https://youtu.be/CYhDt-97mGY",
    type: "orange",
  },
  {
    name: "GET YOUR COPY HERE",
    href: "https://www.amazon.com/Life-Wisdom-Word-Search-Brain/dp/1642934755/ref=pd_lpo_14_img_0/144-6927114-7206550?_encoding=UTF8&pd_rd_i=1642934755&pd_rd_r=d181d1dc-8466-44d1-960f-12a55118cbd4&pd_rd_w=yCgX7&pd_rd_wg=JOtgt&pf_rd_p=7b36d496-f366-4631-94d3-61b87b52511b&pf_rd_r=7J42KGQVCZ8JM3ET3DAZ&psc=1&refRID=7J42KGQVCZ8JM3ET3DAZ",
    type: "purple",
  },
];

export default function Buttons(props: { href: string }) {
  const button = buttons.find((link) => link.href === props.href);

  if (!button) {
    return null; // Return null if the key doesn't match any link
  } else {
    return (
      <Link
        href={button.href}
        className={clsx(
          "     flex  h-[48px] items-center     max-w-fit px-10  text-sm md:max-lg:text-md lg:text-2xl font-bold ",
          {
            "bg-white text-orange-400 border-2 rounded-md border-orange-400 hover:bg-orange-400 hover:text-white ":
              button.type === "orange",
            "bg-purple-800 text-white hover:text-white hover:bg-purple-700 border-0 py-8 lg:py-10":
              button.type === "purple",
          },
        )}
      >
        {button.name}
      </Link>
    );
  }
}
