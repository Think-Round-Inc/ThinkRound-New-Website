import Image from "next/image";
import { urlFor } from "@/sanity/client";

interface ImageValue {
  _type: string;
  asset?: { _ref: string; metadata?: { dimensions: { width: number; height: number } } };
  alt?: string;
}

interface BlockProps {
  children?: React.ReactNode;
}

export const ptComponents = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      // Use natural dimensions from Sanity metadata
      const { width, height } = value.asset?.metadata?.dimensions || {
        width: 800,
        height: 600,
      };
      return (
        <div className="my-16 w-full flex justify-center">
          <Image
            src={urlFor(value as unknown)
              .width(1200)
              .url()}
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
    normal: ({ children }: BlockProps) => (
      <p className="text-justify text-lg font-light text-gray-800 mb-8 leading-relaxed">
        {children}
      </p>
    ),

    h1: ({ children }: BlockProps) => (
      <h1 className="text-5xl uppercase tracking-wide text-gray-800 mt-20 mb-10 text-left">
        {children}
      </h1>
    ),
    h2: ({ children }: BlockProps) => (
      <h2 className="text-6xl uppercase tracking-wide text-gray-800 mt-16 mb-8 text-left">
        {children}
      </h2>
    ),
    h3: ({ children }: BlockProps) => (
      <h3 className="text-4xl uppercase tracking-wide text-gray-800 mt-14 mb-6 text-left">
        {children}
      </h3>
    ),
  },
};
