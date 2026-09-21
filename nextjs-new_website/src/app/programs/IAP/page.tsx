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
        url: string;
        metadata?: {
            dimensions?: {
                width: number;
                height: number;
            };
        };
    };
}

interface StudentBlock {
    _type: string;
    image?: ImageAsset;
    asset?: ImageAsset["asset"];
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
      heroImage1 { asset->{url, metadata{dimensions}} },
      heroImage2 { asset->{url, metadata{dimensions}} },
      heroImage3 { asset->{url, metadata{dimensions}} },
      heroImage4 { asset->{url, metadata{dimensions}} },
      body[]{..., asset->{url, metadata{dimensions}}},
      studentProjectsBody[]{..., image{asset->{url, metadata{dimensions}}}, asset->{url, metadata{dimensions}}, widthPercentage},

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
                    const asset = block.image?.asset || block.asset;
                    if (!asset?.url) return null;

                    const aspectRatio = asset.metadata?.dimensions
                        ? `${asset.metadata.dimensions.width}/${asset.metadata.dimensions.height}`
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
                                    src={asset.url}
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
                                aspectRatio: iap.heroImages[0]?.asset?.metadata
                                    ?.dimensions
                                    ? `${iap.heroImages[0].asset.metadata.dimensions.width}/${iap.heroImages[0].asset.metadata.dimensions.height}`
                                    : "16/9",
                            }}
                        >
                            {iap.heroImages[0]?.asset?.url && (
                                <Image
                                    src={iap.heroImages[0].asset.url}
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
                                    aspectRatio: iap.heroImages[1]?.asset
                                        ?.metadata?.dimensions
                                        ? `${iap.heroImages[1].asset.metadata.dimensions.width}/${iap.heroImages[1].asset.metadata.dimensions.height}`
                                        : "1/1",
                                }}
                            >
                                {iap.heroImages[1]?.asset?.url && (
                                    <Image
                                        src={iap.heroImages[1].asset.url}
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
                                aspectRatio: img?.asset?.metadata?.dimensions
                                    ? `${img.asset.metadata.dimensions.width}/${img.asset.metadata.dimensions.height}`
                                    : "16/9",
                            }}
                        >
                            {img?.asset?.url && (
                                <Image
                                    src={img.asset.url}
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
