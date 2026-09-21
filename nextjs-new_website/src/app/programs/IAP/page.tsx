import Navbar from "@/components/Navbar";
import UpdatedSocialLinks from "@/components/UpdatedSocialLinks";
import { createClient } from "next-sanity";
import Image from "next/image";

const client = createClient({
    projectId: "s3cfqcyr",
    dataset: "production",
    apiVersion: "2023-05-03",
    useCdn: false,
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
                        <p key={index} className='text-lg leading-relaxed'>
                            {block.children?.map((c) => c.text).join("")}
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
                        <div key={index} className='flex justify-center'>
                            <div
                                className='relative rounded-lg overflow-hidden'
                                style={{
                                    width: `${block.widthPercentage ?? 100}%`,
                                    maxWidth: "600px",
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
        <main className='bg-white min-h-screen'>
            <Navbar />

            <section className='pt-20 px-6 max-w-7xl mx-auto'>
                <h1 className='text-5xl md:text-6xl font-bold text-center mb-20'>
                    {iap.title}
                </h1>

                <div className='grid md:grid-cols-2 gap-6'>
                    {iap.heroImages.map((img, i) => (
                        <div
                            key={i}
                            className='relative w-full rounded-lg overflow-hidden shadow-lg'
                            style={{
                                aspectRatio: img?.asset?.metadata?.dimensions
                                    ? `${img.asset.metadata.dimensions.width}/${img.asset.metadata.dimensions.height}`
                                    : "1/1",
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

            <section className='py-20 px-6 max-w-5xl mx-auto prose prose-lg'>
                <RenderBlocks blocks={iap.body} />
            </section>

            <section className='py-20 px-6 max-w-5xl mx-auto'>
                <h2 className='text-5xl font-bold text-center mb-16'>
                    Student Art Works 🎨
                </h2>

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
