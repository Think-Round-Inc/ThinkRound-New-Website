import Image from "next/image";
import { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/client";

export const homeComponents: PortableTextComponents = {
  types: {
    // 🖼 IMAGE
    image: ({ value }) => {
      // Use Sanity metadata for exact aspect ratio (prevents layout shift)
      const { width, height } = value.asset?.metadata?.dimensions || {
        width: 1920,
        height: 1080,
      };

      // Read custom fields directly from the 'value' object
      const isRounded = value.rounded === true;

      return (
        <div className={`my-12 flex justify-center"}`}>
          <div className="max-w-full">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || "Homepage Image"}
              width={width}
              height={height}
              className={`h-auto w-full ${isRounded ? "rounded-lg shadow-md" : ""}`}
            />
            {value.caption && (
              <p className="text-sm text-gray-500 mt-3 text-center italic">
                {value.caption}
              </p>
            )}
          </div>
        </div>
      );
    },

    videoBlock: ({ value }) => {
      const { url, videoUrl, videoFile, autoplay, loop, muted } = value;
      const externalUrl = url || videoUrl;

      // 1. Get original dimensions from metadata
      const originalWidth = videoFile?.asset?.metadata?.dimensions?.width;
      const originalHeight = videoFile?.asset?.metadata?.dimensions?.height;

      // 2. Fallback for YouTube/Vimeo (since they don't have local metadata)
      if (externalUrl) {
        return (
          <div className="my-12 flex justify-center w-full">
            <div className="aspect-video w-full max-w-5xl">
              <iframe
                src={externalUrl}
                className="w-full h-full rounded-lg shadow-md"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        );
      }

      // 3. Render original size for uploaded file
      if (videoFile?.asset?.url) {
        return (
          <div className="my-12 flex justify-center w-full">
            <div
              style={{
                maxWidth: originalWidth ? `${originalWidth}px` : "100%",
                width: "100%",
              }}
            >
              <video
                controls
                className="w-full h-auto rounded-lg shadow-md"
                autoPlay={autoplay}
                loop={loop}
                muted={muted}
                playsInline
                // Optional: Use dimensions to prevent layout shift
                width={originalWidth}
                height={originalHeight}
              >
                <source
                  src={videoFile.asset.url}
                  type={videoFile.asset.mimeType || "video/mp4"}
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        );
      }

      return null;
    },

    videoFeatureBlock: ({ value }) => {
      const {
        sourceType,
        videoUrl,
        videoFile,
        autoplay,
        loop,
        muted,
        headline,
        description,
        layout,
      } = value;

      const isVideoRight = layout === "videoRight";
      const videoNode =
        sourceType === "upload" && videoFile?.asset?.url ? (
          <video
            controls
            className="w-full h-full object-cover rounded-md"
            autoPlay={autoplay}
            loop={loop}
            muted={muted}
            playsInline
          >
            <source
              src={videoFile.asset.url}
              type={videoFile.asset.mimeType || "video/mp4"}
            />
            Your browser does not support the video tag.
          </video>
        ) : videoUrl ? (
          <iframe
            src={videoUrl}
            className="w-full h-full rounded-md"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : null;

      if (!videoNode) return null;

      return (
        <section className="my-14 w-full">
          <div
            className={`grid grid-cols-1 gap-8 items-center lg:grid-cols-2 ${
              isVideoRight ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="w-full aspect-video bg-black/5">{videoNode}</div>
            <div className="text-center lg:text-left px-2 lg:px-6">
              {headline && (
                <h3 className="text-3xl lg:text-4xl font-semibold text-gray-700 mb-4">
                  {headline}
                </h3>
              )}
              {description && (
                <p className="text-xl leading-relaxed text-gray-600 whitespace-pre-line">
                  {description}
                </p>
              )}
            </div>
          </div>
        </section>
      );
    },

    buttonRow: ({ value }) => {
      const baseStyle =
        "inline-block px-6 py-3 text-sm uppercase tracking-wide transition";

      return (
        <div className="my-10 text-center">
          <a
            href={value.url}
            target={value.target || "_self"}
            rel="noopener noreferrer"
            className={`${baseStyle}`}
          >
            {value.text}
          </a>
        </div>
      );
    },
  },

  block: {
    normal: ({ children }) => (
      <p className="text-lg font-light text-gray-800 mb-6 leading-relaxed">
        {children}
      </p>
    ),

    h1: ({ children }) => (
      <h1 className="text-5xl font-bold mt-16 mb-8">{children}</h1>
    ),

    h2: ({ children }) => (
      <h2 className="text-4xl font-semibold mt-14 mb-6">{children}</h2>
    ),

    h3: ({ children }) => (
      <h3 className="text-3xl font-medium mt-12 mb-4">{children}</h3>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-6 italic my-8">
        {children}
      </blockquote>
    ),
  },

  // 🔗 MARKS (inline styles)
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="underline hover:text-gray-600"
      >
        {children}
      </a>
    ),

    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),

    em: ({ children }) => <em className="italic">{children}</em>,
  },
};
