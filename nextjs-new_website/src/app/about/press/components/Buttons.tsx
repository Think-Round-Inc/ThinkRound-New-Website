"use client";

import clsx from "clsx";
import Link from "next/link";

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
                "inline-flex min-h-11 items-center justify-center rounded-md px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800 sm:px-7",
                props.variant === "solid"
                    ? "bg-purple-800 text-white hover:bg-purple-900"
                    : "border-2 border-purple-800 bg-white text-purple-800 hover:bg-purple-800 hover:text-white",
            )}
        >
            {props.name}
        </Link>
    );
}
