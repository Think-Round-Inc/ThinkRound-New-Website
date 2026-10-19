"use client";

import clsx from "clsx";
import Link from "next/link";

interface ButtonProps {
    name: string;
    href: string;
    type: string;
}

export default function Buttons(props: ButtonProps) {
    if (!props.href) {
        return null; // Return null if the key doesn't match any link
    } else {
        return (
            <Link
                href={props.href}
                className={clsx(
                    "flex h-[48px]  items-center  w-fit px-10  text-sm lg:text-xl font-bold ",
                    {
                        "bg-background border-2 rounded-md text-foreground":
                            props.type === "orange",
                        "bg-purple-800 text-white hover:text-white hover:bg-purple-700 border-0 py-8 lg:py-10":
                            props.type === "purple",
                    },
                )}
            >
                {props.name}
            </Link>
        );
    }
}
