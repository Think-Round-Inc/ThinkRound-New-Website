import Image from "next/image";
import { urlFor } from "@/sanity/client";

export const ptComponents = {
  types: {
    image: ({ value }: any) => {
      // Use natural dimensions from Sanity metadata
      const { width, height } = value.asset?.metadata?.dimensions || {
        width: 800,
        height: 600,
      };
      return (
        <div className="my-16 w-full flex justify-center">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Blog content image"}
            width={width}
            height={height}
            className="rounded-sm h-auto max-w-full"
          />
        </div>
      );
    },
  },
  block: {
    normal: ({ children }: any) => (
      <p className="text-justify text-lg font-light text-gray-800 mb-8 leading-relaxed">
        {children}
      </p>
    ),

    h1: ({ children }: any) => (
      <h1 className="text-5xl uppercase tracking-wide text-gray-800 mt-20 mb-10 text-left">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-6xl uppercase tracking-wide text-gray-800 mt-16 mb-8 text-left">
        {children}
      </h2>
    ),
  },
};
