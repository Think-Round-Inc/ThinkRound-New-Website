import UpdatedSocialLinks from "@/components/UpdatedSocialLinks";
import { urlFor } from "@/sanity/image";
import { createClient } from "next-sanity";
import { League_Spartan } from "next/font/google";
import Image from "next/image";

const client = createClient({
    projectId: "s3cfqcyr",
    dataset: "production",
    apiVersion: "2023-05-03",
    useCdn: false,
});

const leagueSpartan = League_Spartan({
    subsets: ["latin"],
});

interface ImageAsset {
    asset?: {
        _ref: string;
        _type: "reference";
    };
    dimensions?: { width: number; height: number };
    alt?: string;
}

interface StudentBlock {
    _type: string;
    image?: ImageAsset;
    asset?: ImageAsset["asset"];
    dimensions?: ImageAsset["dimensions"];
    widthPercentage?: number;
    children?: { text: string }[];
}

interface IapPageData {
    title: string;
    heroImages: ImageAsset[];
    body?: StudentBlock[];
    studentProjectsBody?: StudentBlock[];
}

interface SanityIapPageData {
    title: string;
    heroImage1?: ImageAsset;
    heroImage2?: ImageAsset;
    heroImage3?: ImageAsset;
    heroImage4?: ImageAsset;
    body?: StudentBlock[];
    studentProjectsBody?: StudentBlock[];
}

async function getIapPageData(): Promise<IapPageData> {
    const data = await client.fetch<SanityIapPageData>(`
    *[_type == "iapPage"][0] {
      title,
      heroImage1 { ..., "dimensions": asset->metadata.dimensions },
      heroImage2 { ..., "dimensions": asset->metadata.dimensions },
      heroImage3 { ..., "dimensions": asset->metadata.dimensions },
      heroImage4 { ..., "dimensions": asset->metadata.dimensions },
      body[]{..., asset, "dimensions": asset->metadata.dimensions},
      studentProjectsBody[]{..., image{..., "dimensions": asset->metadata.dimensions}, asset, "dimensions": asset->metadata.dimensions, widthPercentage},

    }
  `);

    return {
        title: data.title,
        heroImages: [
            data.heroImage1,
            data.heroImage2,
            data.heroImage3,
            data.heroImage4,
        ].filter((img): img is ImageAsset => img !== undefined),
        body: data.body,
        studentProjectsBody: data.studentProjectsBody,
    };
}

function RenderBlocks({ blocks }: { blocks?: StudentBlock[] }) {
    if (!blocks?.length) return null;

    return (
        <div className='space-y-8'>
            {blocks.map((block, index) => {
                if (block._type === "block") {
                    return (
                        <p
                            key={index}
                            style={{
                                fontFamily: leagueSpartan.style.fontFamily,
                            }}
                            className='text-2xl md:text-3xl lg:text-4xl font-normal leading-[1.6em] text-gray-500'
                        >
                            {block.children?.map(
                                (c: { text: string; marks?: string[] }, i) =>
                                    c.marks?.includes("strong") ? (
                                        <strong key={i} className='font-bold'>
                                            {c.text}
                                        </strong>
                                    ) : (
                                        <span key={i}>{c.text}</span>
                                    ),
                            )}
                        </p>
                    );
                }

                const isImage =
                    block._type === "image" ||
                    block._type === "studentProjectImage" ||
                    block._type.includes("studentProject");

                if (isImage) {
                    const image = block.image ??
                        (block.asset ? { asset: block.asset } : undefined);
                    if (!image?.asset?._ref) return null;

                    const dimensions = block.image?.dimensions ?? block.dimensions;
                    const aspectRatio = dimensions
                        ? `${dimensions.width}/${dimensions.height}`
                        : "1/1";

                    return (
                        <div key={index}>
                            <div
                                className='relative rounded-lg overflow-hidden'
                                style={{
                                    width: `${block.widthPercentage ?? 100}%`,
                                    aspectRatio,
                                }}
                            >
                                <Image
                                    src={urlFor(image).width(1400).url()}
                                    alt='Student artwork'
                                    fill
                                    className='object-contain'
                                />
                            </div>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
}

export default async function IapPage() {
    const iap = await getIapPageData();

    return (
        <main className=' min-h-screen '>
            <section className='pt-20 px-4 md:px-6 max-w-7xl mx-auto'>
                <div className='grid md:grid-cols-2 gap-4 md:gap-6'>
                    {iap.heroImages[0] && (
                        <div
                            className='md:col-span-2 relative w-full rounded-lg overflow-hidden shadow-lg'
                            style={{
                                aspectRatio: iap.heroImages[0]?.dimensions
                                    ? `${iap.heroImages[0].dimensions.width}/${iap.heroImages[0].dimensions.height}`
                                    : "16/9",
                            }}
                        >
                            {iap.heroImages[0]?.asset?._ref && (
                                <Image
                                    src={urlFor(iap.heroImages[0])
                                        .width(1600)
                                        .url()}
                                    alt='Hero image'
                                    fill
                                    className='object-contain'
                                />
                            )}
                        </div>
                    )}

                    {iap.heroImages[1] && (
                        <div className='md:col-span-2 flex flex-row gap-4 md:gap-6'>
                            <div
                                className='relative w-[65%] rounded-lg overflow-hidden  shadow-lg'
                                style={{
                                    aspectRatio: iap.heroImages[1]?.dimensions
                                        ? `${iap.heroImages[1].dimensions.width}/${iap.heroImages[1].dimensions.height}`
                                        : "1/1",
                                }}
                            >
                                {iap.heroImages[1]?.asset?._ref && (
                                    <Image
                                        src={urlFor(iap.heroImages[1])
                                            .width(1200)
                                            .url()}
                                        alt='Hero image'
                                        fill
                                        className='object-contain'
                                    />
                                )}
                            </div>

                            <div className='flex items-center justify-center w-[40%]'>
                                <h1 className='text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold'>
                                    {iap.title}
                                </h1>
                            </div>
                        </div>
                    )}

                    {iap.heroImages.slice(2).map((img, i) => (
                        <div
                            key={i + 2}
                            className='md:col-span-2 relative w-full rounded-lg overflow-hidden shadow-lg'
                            style={{
                                aspectRatio: img?.dimensions
                                    ? `${img.dimensions.width}/${img.dimensions.height}`
                                    : "16/9",
                            }}
                        >
                            {img?.asset?._ref && (
                                <Image
                                    src={urlFor(img).width(1200).url()}
                                    alt='Hero image'
                                    fill
                                    className='object-contain'
                                />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section className='pt-20 px-6 max-w-5xl mx-auto prose prose-lg'>
                <RenderBlocks blocks={iap.body} />
            </section>

            <section className='py-10 px-6 max-w-5xl mx-auto'>
                {[iap.studentProjectsBody].some(
                    (section) => section?.length,
                ) && (
                    <div className='space-y-20'>
                        <RenderBlocks blocks={iap.studentProjectsBody} />
                    </div>
                )}
            </section>

            <section className='max-w-4xl  mx-auto'>
                <UpdatedSocialLinks />
            </section>
        </main>
    );
}
