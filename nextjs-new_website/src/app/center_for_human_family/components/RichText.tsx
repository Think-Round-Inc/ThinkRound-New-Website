import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { CSSProperties } from "react";
import { safeEmail, safeLink } from "../links";
import type { BodyContent } from "../types";

const components: PortableTextComponents = {
  block: {
    // The page already has an h1; editorial h1 blocks become section headings.
    h1: ({ children }) => <h3>{children}</h3>,
    h2: ({ children }) => <h3>{children}</h3>,
  },
  marks: {
    link: ({ children, value }) => {
      const candidate = value?.href;
      const email =
        typeof candidate === "string" && candidate.startsWith("mailto:")
          ? safeEmail(candidate.slice(7))
          : undefined;
      const href =
        safeLink(candidate, true) ??
        (email ? `mailto:${encodeURIComponent(email)}` : undefined);
      return href ? <a href={href}>{children}</a> : <>{children}</>;
    },
  },
};

export default function RichText({
  value,
  groupGap = 16,
  className = "",
}: {
  value: BodyContent;
  groupGap?: number;
  className?: string;
}) {
  if (value.kind === "portableText") {
    return (
      <div className={`chf-rich-text ${className}`}>
        <PortableText value={value.blocks} components={components} />
      </div>
    );
  }
  return (
    <div
      className={className}
      style={{ "--chf-rich-group-gap": `${groupGap}px` } as CSSProperties}
    >
      {value.groups.map((group, index) => (
        <div className="chf-rich-group" key={index}>
          {group.map((paragraph, paragraphIndex) => (
            <p className="m-0" key={paragraphIndex}>
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
