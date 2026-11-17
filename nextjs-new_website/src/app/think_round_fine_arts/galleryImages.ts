import { urlFor } from "@/sanity/image";

type SanityImage = Parameters<typeof urlFor>[0] & { alt?: string };

interface ExhibitionGalleryInput {
  title: string;
  coverImage: SanityImage;
  artworkGallery?: {
    image: Parameters<typeof urlFor>[0];
    alt?: string;
    caption?: string;
  }[];
}

export function buildExhibitionGalleryImages(
  exhibition: ExhibitionGalleryInput,
) {
  return [
    {
      src: urlFor(exhibition.coverImage).width(1200).url(),
      thumbSrc: urlFor(exhibition.coverImage).width(160).height(160).url(),
      blurDataURL: urlFor(exhibition.coverImage).width(20).blur(10).url(),
      alt: exhibition.coverImage.alt || `${exhibition.title} exhibition`,
    },
    ...(exhibition.artworkGallery ?? []).map((artwork, index) => ({
      src: urlFor(artwork.image).width(1200).url(),
      thumbSrc: urlFor(artwork.image).width(160).height(160).url(),
      blurDataURL: urlFor(artwork.image).width(20).blur(10).url(),
      alt: artwork.alt || artwork.caption || `Artwork ${index + 1}`,
      caption: artwork.caption,
    })),
  ];
}
