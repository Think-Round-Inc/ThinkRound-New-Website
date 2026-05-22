import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import CommunityGallery from "./CommunityGallery";

type Community = {
  name: string;
  slug: { current: string };
  comingSoon: boolean;
};

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [projectData, paintings] = await Promise.all([
    client.fetch(`*[_type == "paradiseProject"][0]{
      communities[] {
        name,
        slug,
        comingSoon
      }
    }`),
    client.fetch(
      `*[_type == "painting" && communitySlug == $slug] | order(order asc) {
        _id,
        title,
        artistName,
        dateProduced,
        description,
        category,
        "imageUrl": image.asset->url
      }`,
      { slug }
    ),
  ]);

  const communities: Community[] = projectData?.communities ?? [];
  const community = communities.find((c) => c.slug?.current === slug);

  if (!community) notFound();

  const groupNumber = communities.findIndex((c) => c.slug?.current === slug) + 1;

  return (
    <CommunityGallery
      communityName={community.name}
      communitySlug={slug}
      groupNumber={groupNumber}
      paintings={paintings ?? []}
      allCommunities={communities}
    />
  );
}
