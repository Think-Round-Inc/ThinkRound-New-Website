"use client";

import Link from "next/link";
import clsx from "clsx";

interface ButtonProps {
  name: string;
  href: string;
  variant: "solid" | "outline";
}

export default function Buttons(props: ButtonProps) {
  if (!props.href) {
    return null;
  }

  return (
    <Link
      href={props.href}
      className={clsx(
        "inline-flex min-h-11 items-center justify-center rounded-md px-6 py-3 text-sm font-semibold tracking-[0.02em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7020a0] sm:px-7",
        props.variant === "solid"
          ? "bg-[#7020a0] text-white hover:bg-[#5d1987]"
          : "border-2 border-[#7020a0] bg-white text-[#7020a0] hover:bg-[#7020a0] hover:text-white",
      )}
    >
      {props.name}
    </Link>
  );
}
