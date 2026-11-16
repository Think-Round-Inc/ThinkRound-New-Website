import type { PortableTextBlock } from "@portabletext/react";
import { urlFor } from "@/sanity/image";
import * as fallback from "./content";
import { safeEmail, safeLink, videoSource } from "./links";
import type {
  BodyContent,
  ChfContent,
  ChfDocument,
  ImageData,
  SanityImage,
  SplitBlockData,
  TextCard,
} from "./types";

const requiredText = (value: unknown, defaultValue: string) =>
  typeof value === "string" && value.trim() ? value.trim() : defaultValue;
// Missing optional values inherit the fallback; an explicit blank clears them.
const optionalText = (value: unknown, defaultValue = "") =>
  typeof value === "string" ? value.trim() : defaultValue;
const key = (value: unknown, prefix: string, index: number) =>
  requiredText(value, `${prefix}-${index}`);

export function fallbackBody(
  groups: readonly (readonly string[])[],
): BodyContent {
  return { kind: "fallback", groups };
}

function body(
  value: PortableTextBlock[] | null | undefined,
  defaultValue: BodyContent,
): BodyContent {
  if (!Array.isArray(value)) return defaultValue;
  // Empty arrays deliberately clear the body. Invalid data must not break rendering.
  const blocks = value.filter(
    (block) =>
      block && block._type === "block" && Array.isArray(block.children),
  );
  return value.length && !blocks.length
    ? defaultValue
    : { kind: "portableText", blocks };
}

function image(
  value: SanityImage | null | undefined,
  defaultValue: ImageData,
  ratio: string,
  contain = false,
): ImageData {
  if (!value) return defaultValue;
  const ref = value?.asset?._ref;
  if (
    typeof ref !== "string" ||
    !/^image-[a-z0-9]+-\d+x\d+-[a-z0-9]+$/i.test(ref) ||
    value?.assetExists === false
  )
    return defaultValue;
  try {
    const [width, height] = ratio.split("/").map(Number);
    const src = urlFor(value)
      .width(width * 2)
      .height(height * 2)
      .fit(contain ? "max" : "crop")
      .url();
    return { src, label: requiredText(value?.alt, defaultValue.label) };
  } catch {
    return defaultValue;
  }
}

function localImage(src: string, label: string): ImageData {
  return { src: src || undefined, label };
}

function cards(
  value: ChfDocument["floors"],
  defaults: readonly { title: string; body: string }[],
  prefix: string,
): TextCard[] {
  if (!Array.isArray(value))
    return defaults.map((item, index) => ({
      ...item,
      _key: `${prefix}-${index}`,
    }));
  return value.flatMap((item, index) => {
    if (!item) return [];
    // Never borrow a different card's content solely because it occupies the same index.
    const match = defaults.find((entry) => entry.title === item.title);
    const title = requiredText(item.title, match?.title ?? "");
    const text = requiredText(item.description, match?.body ?? "");
    return title || text
      ? [{ _key: key(item._key, prefix, index), title, body: text }]
      : [];
  });
}

const paradiseKinds = ["earth", "armatures", "ceiling"];
const culinaryKinds = ["kitchens", "balcony"];

function splitBlocks(
  value: ChfDocument["paradiseSections"],
  culinary: boolean,
): SplitBlockData[] {
  const defaults = culinary
    ? fallback.culinary.blocks
    : fallback.paradise.blocks;
  const kinds = culinary ? culinaryKinds : paradiseKinds;
  const sources = culinary
    ? [fallback.images.culinaryKitchens, fallback.images.balcony]
    : [
        fallback.images.paradiseHolographicEarth,
        fallback.images.paradiseArmatures,
        fallback.images.paradiseStainedGlassCeiling,
      ];
  const defaultBlocks = defaults.map((item, index): SplitBlockData => ({
    _key: `${culinary ? "culinary" : "paradise"}-${kinds[index]}`,
    imageSide: item.imageSide,
    imageRatio: culinary
      ? "673 / 378"
      : "imageRatio" in item
        ? item.imageRatio
        : "458 / 234",
    image: localImage(sources[index], item.imageLabel),
    caption: item.caption,
    statement: "",
    body: fallbackBody(item.paragraphs.map((paragraph) => [paragraph])),
  }));
  if (!Array.isArray(value)) return defaultBlocks;
  return value.flatMap((item, index) => {
    if (!item) return [];
    const kindIndex = kinds.indexOf(item.kind ?? "");
    // Legacy entries have no kind. Their position only supplies layout; it must
    // not attach an unrelated fallback image or paragraph after a reorder.
    const preset = defaultBlocks[kindIndex >= 0 ? kindIndex : index];
    const matched = kindIndex >= 0 ? preset : undefined;
    const ratio = preset?.imageRatio ?? (culinary ? "673 / 378" : "458 / 234");
    return [
      {
        _key: key(item._key, culinary ? "culinary" : "paradise", index),
        imageSide: preset?.imageSide ?? (index % 2 ? "left" : "right"),
        imageRatio: ratio,
        image: image(
          item.image,
          matched?.image ?? {
            label: culinary ? "Culinary Academy" : fallback.paradise.heading,
          },
          ratio,
        ),
        caption: optionalText(item.caption, matched?.caption),
        statement: optionalText(item.statement),
        body: body(item.body, matched?.body ?? fallbackBody([])),
      },
    ];
  });
}

export function normalizeChfContent(document?: ChfDocument | null): ChfContent {
  const data = document ?? {};
  const {
    hero,
    story,
    about,
    artists,
    gallery,
    floors,
    whatWeDo,
    paradise,
    culinary,
    closingNote,
    support,
    images,
    video,
  } = fallback;
  const title = requiredText(data.title, "") || undefined;
  const fallbackGallery = gallery.items.map((label, index) => ({
    ...localImage(images.gallery[index], label),
    _key: `gallery-${index}`,
  }));
  const feature = data.culinaryFeature;
  return {
    hero: {
      title,
      titleLines: hero.titleLines,
      partnersHeading: requiredText(data.partnersHeading, hero.partnersHeading),
      partners: Array.isArray(data.partners)
        ? data.partners.flatMap((partner, index) => {
            if (!partner) return [];
            const name = requiredText(
              partner.name,
              requiredText(partner.logo?.alt, ""),
            );
            return name
              ? [
                  {
                    _key: key(partner._key, "partner", index),
                    name,
                    logo: image(
                      partner.logo,
                      { label: name },
                      "103 / 103",
                      true,
                    ),
                    href: safeLink(partner.hyperlink),
                  },
                ]
              : [];
          })
        : hero.partners.map((name, index) => ({
            _key: `partner-${index}`,
            name,
            logo: { label: name },
          })),
    },
    story: {
      heading: requiredText(data.storyHeading, story.heading),
      body: body(
        data.storyBody,
        fallbackBody(story.paragraphs.map((paragraph) => [paragraph])),
      ),
      image: image(
        data.storyImage,
        localImage(images.story, "rendering of The Center"),
        "458 / 401",
      ),
    },
    about: {
      heading: requiredText(data.aboutHeading, about.heading),
      body: body(data.aboutBody, fallbackBody(about.paragraphGroups)),
      image: image(
        data.aboutImage,
        localImage(images.about, "interior rendering of The Center"),
        "456 / 692",
      ),
    },
    artists: {
      heading: requiredText(data.artistsHeading, artists.heading),
      body: body(data.artistsBody, fallbackBody(artists.paragraphGroups)),
      image: image(
        data.artistsImage,
        localImage(images.artists, "gallery space for Bay Area artists"),
        "456 / 488",
      ),
    },
    video: {
      heading: requiredText(data.videoHeading, video.heading),
      source: videoSource(data.videoUrl),
    },
    floors: {
      heading: requiredText(data.floorsHeading, floors.heading),
      items: cards(data.floors, floors.items, "floor"),
      gallery: {
        label: gallery.label,
        items: Array.isArray(data.galleryImages)
          ? data.galleryImages.map((entry, index) => ({
              ...image(
                entry,
                fallbackGallery[index] ?? { label: gallery.label },
                "236 / 420",
              ),
              _key: key(entry?._key, "gallery", index),
            }))
          : fallbackGallery,
      },
    },
    whatWeDo: {
      heading: requiredText(data.activitiesHeading, whatWeDo.heading),
      cards: cards(data.activities, whatWeDo.cards, "activity"),
    },
    paradise: {
      heading: requiredText(data.paradiseHeading, paradise.heading),
      intro: body(data.paradiseBody, fallbackBody([[paradise.intro]])),
      image: image(
        data.paradiseImage,
        localImage(images.paradiseDome, paradise.heroImageLabel),
        "1089 / 616",
      ),
      blocks: splitBlocks(data.paradiseSections, false),
    },
    culinary: {
      feature: {
        image: image(
          feature?.image,
          localImage(images.visitorsAndPortraits, culinary.feature.imageLabel),
          "673 / 369",
        ),
        caption: optionalText(feature?.caption, culinary.feature.caption),
        quote: optionalText(feature?.quote, culinary.feature.quote),
      },
      blocks: splitBlocks(data.culinarySections, true),
    },
    closingNote: {
      invitation: optionalText(data.closingText, closingNote.lines[0]),
      email: safeEmail(
        optionalText(data.contactEmail, closingNote.contactEmail),
      ),
      socialText: optionalText(data.socialText, closingNote.lines[1]),
      socialLinks: Array.isArray(data.socialLinks)
        ? data.socialLinks.flatMap((entry, index) => {
            const platform = requiredText(entry?.platform, "");
            const href = safeLink(entry?.url);
            return platform && href
              ? [{ _key: key(entry?._key, "social", index), platform, href }]
              : [];
          })
        : closingNote.socialLabels.map((platform, index) => ({
            _key: `social-${index}`,
            platform,
          })),
    },
    support: {
      title: title ?? support.title,
      heading: requiredText(data.supportHeading, support.heading),
      body: body(
        data.supportBody,
        fallbackBody(support.paragraphs.map((paragraph) => [paragraph])),
      ),
      image: image(
        data.supportImage,
        localImage(images.support, "supporters at The Center"),
        "458 / 492",
      ),
      ctaLabel: optionalText(data.buttonText, support.ctaLabel),
      ctaHref:
        typeof data.buttonLink === "string" && !data.buttonLink.trim()
          ? undefined
          : (safeLink(data.buttonLink, true) ?? support.ctaHref),
    },
  };
}
