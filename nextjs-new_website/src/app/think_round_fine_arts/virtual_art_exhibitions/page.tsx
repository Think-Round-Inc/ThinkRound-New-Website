import Navbar from "@/components/Navbar";
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from "@/sanity/client";

interface VirtualExhibitionCard {
    exhibitionTitle: string;
    exhibitionUrl: string;
}

interface VirtualExhibitionsData {
    mainTitle: string;
    subTitle: string;
    image: {
        asset: { _ref: string; _type: string };
        alt?: string;
        hotspot?: { x: number; y: number };
    };
    description: any[];
    virtualExhibitions: VirtualExhibitionCard[];
}

const options = { next: { revalidate: 30 } }

const QUERY = `*[_type == "virtualExhibitions3D"][0]{
  mainTitle,
  subTitle,
  image,
  description,
  virtualExhibitions
}`

async function GetVirtualExhibitionsData(): Promise<VirtualExhibitionsData | null> {
    return client.fetch<VirtualExhibitionsData>(
        QUERY,
        {},
        options
    );
}

export default async function VirtualArtiExhibitionsPage() {
    
    const virtualExhibitionsData = await GetVirtualExhibitionsData();

    if(!virtualExhibitionsData) {
        return (
            <>
                <Navbar />
                <main className='min-h-screen bg-white px-6 py-16'>
                    <h1>Exhibition data not found.</h1>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className='min-h-screen bg-white px-6 py-16'>
                <div className='max-w-[1400px] mx-auto'>
                    {/* Page Title */}
                    <h1 className='text-4xl md:text-5xl font-light uppercase leading-tight tracking-tight text-black text-center mb-16'>
                       {virtualExhibitionsData.mainTitle}
                    </h1>
                    {/* Page Sub Title */}
                    <p className='text-2xl md:text-2xl font-light leading-tight tracking-tight text-black text-center mb-16'>
                        {virtualExhibitionsData?.subTitle}
                    </p>
                    {/* Image */}
                    <Image
                        src={urlFor(virtualExhibitionsData.image).width(1200).url()}
                        alt={virtualExhibitionsData.mainTitle}
                        width={1200}
                        height={675}
                        className="mb-6 rounded-lg"
                    />
                    {/* Description */}
                    <div className="mb-10">
                        <PortableText value={virtualExhibitionsData.description} />
                    </div>
                    {/* Virtual Exhibitions */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                        {virtualExhibitionsData.virtualExhibitions.map((exhibition: VirtualExhibitionCard, index: number) => (
                            <div key={index}>
                                <h3 className="text-2xl font-semibold mb-4">
                                    {exhibition.exhibitionTitle}
                                </h3>
                                <iframe
                                    src={exhibition.exhibitionUrl}
                                    className="w-full min-h-[600px] rounded-lg border"
                                    allow="fullscreen; xr-spatial-tracking"
                                    allowFullScreen
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
