import { client } from "@/sanity/client";
import { normalizeChfContent } from "./data";
import type { ChfDocument } from "./types";

const imageFields = `{
  _key, _type, alt, asset{_ref, _type},
  crop{top, bottom, left, right}, hotspot{x, y, width, height},
  "assetExists": defined(asset->_id)
}`;

export const CHF_QUERY = `*[_type == "centerForTheHumanFamily"]
  | order(_createdAt asc, _id asc)[0]{
    _id, title, partnersHeading,
    partners[]{_key, name, hyperlink, logo${imageFields}},
    storyHeading, storyBody, storyImage${imageFields},
    videoHeading, videoUrl,
    aboutHeading, aboutBody, aboutImage${imageFields},
    galleryImages[]${imageFields},
    floorsHeading, floors[]{_key, title, description},
    artistsHeading, artistsBody, artistsImage${imageFields},
    activitiesHeading, activities[]{_key, title, description},
    paradiseHeading, paradiseBody, paradiseImage${imageFields},
    paradiseSections[]{_key, kind, body, statement, caption, image${imageFields}},
    culinaryFeature{caption, quote, image${imageFields}},
    culinarySections[]{_key, kind, body, caption, image${imageFields}},
    closingText, contactEmail, socialText, socialLinks[]{_key, platform, url},
    supportHeading, supportBody, supportImage${imageFields}, buttonText, buttonLink
  }`;

export async function getChfContent() {
  try {
    const document = await client.fetch<ChfDocument | null>(
      CHF_QUERY,
      {},
      {
        perspective: "published",
        useCdn: false,
        cache: "no-store",
      },
    );
    return normalizeChfContent(document);
  } catch (error) {
    console.error(
      "Unable to load CHF content from Sanity; using local fallback content:",
      error,
    );
    return normalizeChfContent(null);
  }
}
