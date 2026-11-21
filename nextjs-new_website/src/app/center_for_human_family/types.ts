import type { PortableTextBlock } from "@portabletext/react";

export type BodyContent =
  | { kind: "portableText"; blocks: PortableTextBlock[] }
  | { kind: "fallback"; groups: readonly (readonly string[])[] };

export interface SanityImage {
  _key?: string;
  _type?: "image";
  asset?: { _ref?: string; _type?: "reference" } | null;
  assetExists?: boolean;
  alt?: string | null;
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; width: number; height: number };
}

interface SanitySection {
  _key?: string;
  kind?: string | null;
  body?: PortableTextBlock[] | null;
  statement?: string | null;
  image?: SanityImage | null;
  caption?: string | null;
}

export interface ChfDocument {
  _id?: string;
  title?: string | null;
  partnersHeading?: string | null;
  partners?:
    | ({
        _key?: string;
        name?: string | null;
        logo?: SanityImage | null;
        hyperlink?: string | null;
      } | null)[]
    | null;
  storyHeading?: string | null;
  storyBody?: PortableTextBlock[] | null;
  storyImage?: SanityImage | null;
  videoHeading?: string | null;
  videoUrl?: string | null;
  aboutHeading?: string | null;
  aboutBody?: PortableTextBlock[] | null;
  aboutImage?: SanityImage | null;
  galleryImages?: (SanityImage | null)[] | null;
  floorsHeading?: string | null;
  floors?:
    | ({
        _key?: string;
        title?: string | null;
        description?: string | null;
      } | null)[]
    | null;
  artistsHeading?: string | null;
  artistsBody?: PortableTextBlock[] | null;
  artistsImage?: SanityImage | null;
  activitiesHeading?: string | null;
  activities?:
    | ({
        _key?: string;
        title?: string | null;
        description?: string | null;
      } | null)[]
    | null;
  paradiseHeading?: string | null;
  paradiseBody?: PortableTextBlock[] | null;
  paradiseImage?: SanityImage | null;
  paradiseSections?: (SanitySection | null)[] | null;
  culinaryFeature?: {
    image?: SanityImage | null;
    caption?: string | null;
    quote?: string | null;
  } | null;
  culinarySections?: (SanitySection | null)[] | null;
  closingText?: string | null;
  contactEmail?: string | null;
  socialText?: string | null;
  socialLinks?:
    | ({
        _key?: string;
        platform?: string | null;
        url?: string | null;
      } | null)[]
    | null;
  supportHeading?: string | null;
  supportBody?: PortableTextBlock[] | null;
  supportImage?: SanityImage | null;
  buttonText?: string | null;
  buttonLink?: string | null;
}

export interface ImageData {
  src?: string;
  label: string;
}

export interface Partner {
  _key: string;
  name: string;
  logo: ImageData;
  href?: string;
}

export interface TextCard {
  _key: string;
  title: string;
  body: string;
}

export interface ContentSection {
  heading: string;
  body: BodyContent;
  image: ImageData;
}

export interface SplitBlockData {
  _key: string;
  imageSide: "left" | "right";
  imageRatio: string;
  image: ImageData;
  caption: string;
  statement: string;
  body: BodyContent;
}

export interface SocialLink {
  _key: string;
  platform: string;
  href?: string;
}

export type VideoSource =
  | { kind: "embed"; src: string }
  | { kind: "file"; src: string }
  | { kind: "link"; src: string };

export interface ChfContent {
  hero: {
    title?: string;
    titleLines: readonly string[];
    partnersHeading: string;
    partners: Partner[];
  };
  story: ContentSection;
  about: ContentSection;
  artists: ContentSection;
  video: { heading: string; source?: VideoSource };
  floors: {
    heading: string;
    items: TextCard[];
    gallery: { label: string; items: (ImageData & { _key: string })[] };
  };
  whatWeDo: { heading: string; cards: TextCard[] };
  paradise: {
    heading: string;
    intro: BodyContent;
    image: ImageData;
    blocks: SplitBlockData[];
  };
  culinary: {
    feature: { image: ImageData; caption: string; quote: string };
    blocks: SplitBlockData[];
  };
  closingNote: {
    invitation: string;
    email?: string;
    socialText: string;
    socialLinks: SocialLink[];
  };
  support: {
    title: string;
    heading: string;
    body: BodyContent;
    image: ImageData;
    ctaLabel: string;
    ctaHref?: string;
  };
}
