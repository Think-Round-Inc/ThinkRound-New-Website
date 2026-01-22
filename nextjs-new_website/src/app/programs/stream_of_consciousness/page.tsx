import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/client";
import { Instrument_Sans, League_Spartan } from "next/font/google";
import { PortableText, PortableTextBlock } from "next-sanity";
import Image from "next/image";

const instrumentSans = Instrument_Sans({
    subsets: ["latin"],
    weight: "700",
});

const leagueSpartan = League_Spartan({
    subsets: ["latin"],
});

export const revalidate = 30;

interface SanityImage {
    image: {
        asset: {
            _ref: string;
            _type: string;
        };
    };
    widthPercentage?: number;
}

interface StreamOfConsciousnessData {
    images?: SanityImage[];
    pdfUrl?: string;
    videoUrl?: string;
    videoText?: PortableTextBlock[];
    paragraph1Title?: PortableTextBlock[];
    paragraph1Text?: PortableTextBlock[];
    paragraph2Title?: PortableTextBlock[];
    paragraph2Text?: PortableTextBlock[];
    paragraph3Title?: PortableTextBlock[];
    paragraph3Text?: PortableTextBlock[];
    bottomImages?: SanityImage[];
    paragraph4Text?: PortableTextBlock[];
}

interface PortableTextComponentProps {
    children?: React.ReactNode;
}

function getYouTubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

const portableTextComponents = {
    block: {
        h1: ({ children }: PortableTextComponentProps) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
        h2: ({ children }: PortableTextComponentProps) => <h2 className="text-3xl font-bold my-3">{children}</h2>,
        h3: ({ children }: PortableTextComponentProps) => <h3 className="text-2xl font-bold my-2">{children}</h3>,
        h4: ({ children }: PortableTextComponentProps) => <h4 className="text-xl font-bold my-2">{children}</h4>,
        h5: ({ children }: PortableTextComponentProps) => <h5 className="text-lg font-bold my-2">{children}</h5>,
        h6: ({ children }: PortableTextComponentProps) => <h6 className="font-bold my-2">{children}</h6>,
        blockquote: ({ children }: PortableTextComponentProps) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>,
        normal: ({ children }: PortableTextComponentProps) => <p className="mb-4 last:mb-0">{children}</p>,
    },
};

export default async function StreamOfConsciousnessPage() {
    const data = await client.fetch<StreamOfConsciousnessData>(
        `*[_type == "streamOfConsciousness"][0]{
            ...,
            "pdfUrl": pdf.asset->url,
            "videoUrl": videoUrl,
            "videoText": videoText,
            "paragraph1Title": paragraph1Title,
            "paragraph1Text": paragraph1Text,
            "paragraph2Title": paragraph2Title,
            "paragraph2Text": paragraph2Text,
            "paragraph3Title": paragraph3Title,
            "paragraph3Text": paragraph3Text,
            "bottomImages": bottomImages,
            "paragraph4Text": paragraph4Text
        }`
    );

    if (!data) {
        return (
            <main className="min-h-screen bg-white text-black p-8 flex justify-center items-center">
                <h1 className="text-4xl font-bold">Content not found</h1>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-white text-black p-8 flex flex-col items-center">
            <h1
                className={`${instrumentSans.className} mb-12 text-center`}
                style={{
                    fontSize: '64px',
                    fontWeight: 700,
                    lineHeight: '64px',
                    color: 'rgb(46, 46, 46)',
                    fontStyle: 'normal'
                }}
            >
                Stream of
                <br />
                Consciousness
            </h1>

            <div className="flex flex-col gap-12 w-full items-center">
                {data.images?.map((item: SanityImage, index: number) => (
                    <div key={index} className="w-full flex justify-center">
                        {item.image && (
                            <div style={{ width: `${item.widthPercentage || 100}%`, position: 'relative' }}>
                                <Image
                                    src={urlFor(item.image).width(1920).url()}
                                    alt={`Stream of Consciousness ${index + 1}`}
                                    width={1920}
                                    height={1080}
                                    className="object-contain rounded-sm w-full h-auto"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {data.pdfUrl && (
                <a
                    href={data.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 mt-12 px-7 py-3
               bg-purple-600 text-white rounded-full font-semibold
               hover:bg-purple-700 transition-all"
                >
                    See all Panels
                    <span className="transition-transform group-hover:translate-x-1">
                        →
                    </span>
                </a>
            )}

            <br />
            <br />
            {data.videoUrl && getYouTubeId(data.videoUrl) && (
                <div className="mt-12 flex flex-col items-center gap-4 w-full max-w-2xl">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            src={`https://www.youtube.com/embed/${getYouTubeId(data.videoUrl)}`}
                            title="Stream of Consciousness Video"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    {data.videoText && (
                        <div
                            className="text-center max-w-2xl text-[24px]"
                            style={{
                                color: '#828282',
                                fontFamily: leagueSpartan.style.fontFamily,
                                lineHeight: '1.6em',
                                letterSpacing: '.02em'
                            }}
                        >
                            <PortableText value={data.videoText} components={portableTextComponents} />
                        </div>
                    )}
                </div>
            )}

            {(data.paragraph1Title || data.paragraph1Text) && (
                <div className="mt-12 flex flex-col items-center gap-4 w-full max-w-2xl text-center">
                    {data.paragraph1Title && (
                        <div className="text-4xl text-left w-[720px]" style={{ color: '#424242' }}>
                            <PortableText value={data.paragraph1Title} components={portableTextComponents} />
                        </div>
                    )}
                    {data.paragraph1Text && (
                        <div
                            className="text-left w-[720px] text-[24px]"
                            style={{
                                fontWeight: 400,
                                color: '#828282',
                                fontFamily: leagueSpartan.style.fontFamily,
                                lineHeight: '1.6em',
                                letterSpacing: '.02em'
                            }}
                        >
                            <PortableText value={data.paragraph1Text} components={portableTextComponents} />
                        </div>
                    )}
                </div>
            )}

            {(data.paragraph2Title || data.paragraph2Text) && (
                <div className="mt-12 flex flex-col items-center gap-4 w-full max-w-2xl text-center">
                    {data.paragraph2Title && (
                        <div className="text-center w-[720px] text-[24px]">
                            <PortableText value={data.paragraph2Title} components={portableTextComponents} />
                        </div>
                    )}
                    {data.paragraph2Text && (
                        <div
                            className="text-left w-[720px] text-[24px]"
                            style={{
                                fontWeight: 400,
                                color: '#828282',
                                fontFamily: leagueSpartan.style.fontFamily,
                                lineHeight: '1.6em',
                                letterSpacing: '.02em'
                            }}
                        >
                            <PortableText value={data.paragraph2Text} components={portableTextComponents} />
                        </div>
                    )}
                </div>
            )}

            {(data.paragraph3Title || data.paragraph3Text) && (
                <div className="mt-12 flex flex-col items-center gap-4 w-full max-w-2xl text-center">
                    {data.paragraph3Title && (
                        <div className="text-center w-[720px] text-[24px]" style={{ color: '#828282' }}>
                            <PortableText value={data.paragraph3Title} components={portableTextComponents} />
                        </div>
                    )}
                    {data.paragraph3Text && (
                        <div
                            className="text-left w-[720px] text-[24px]"
                            style={{
                                fontWeight: 400,
                                color: '#828282',
                                fontFamily: leagueSpartan.style.fontFamily,
                                lineHeight: '1.6em',
                                letterSpacing: '.02em'
                            }}
                        >
                            <PortableText value={data.paragraph3Text} components={portableTextComponents} />
                        </div>
                    )}
                </div>
            )}

            {data.bottomImages && data.bottomImages.length > 0 && (
                <div className="flex flex-col gap-12 w-full items-center mt-12">
                    {data.bottomImages.map((item: SanityImage, index: number) => (
                        <div key={index} className="w-full flex justify-center">
                            {item.image && (
                                <div style={{ width: `${item.widthPercentage || 100}%`, position: 'relative' }}>
                                    <Image
                                        src={urlFor(item.image).width(1920).url()}
                                        alt={`Bottom Image ${index + 1}`}
                                        width={1920}
                                        height={1080}
                                        className="object-contain rounded-sm w-full h-auto"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {data.paragraph4Text && (
                <div className="mt-12 flex flex-col items-center gap-4 w-full max-w-2xl text-center">
                    <div
                        className="text-left w-[720px] text-[24px]"
                        style={{
                            fontWeight: 400,
                            color: '#828282',
                            fontFamily: leagueSpartan.style.fontFamily,
                            lineHeight: '1.6em',
                            letterSpacing: '.02em'
                        }}
                    >
                        <PortableText value={data.paragraph4Text} components={portableTextComponents} />
                    </div>
                </div>
            )}
        </main>
    );
}
