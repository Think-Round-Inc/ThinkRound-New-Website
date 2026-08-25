import Navbar from "@/components/Navbar";
import { client, urlFor } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { TypedObject } from "sanity";

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
    description: TypedObject[];
    virtualExhibitions: VirtualExhibitionCard[];
}

const options = { next: { revalidate: 30 } };

const QUERY = `*[_type == "virtualExhibitions3D"][0]{
  mainTitle,
  subTitle,
  image,
  description,
  virtualExhibitions
}`;

async function GetVirtualExhibitionsData(): Promise<VirtualExhibitionsData | null> {
    return client.fetch<VirtualExhibitionsData>(QUERY, {}, options);
}

export default async function VirtualArtiExhibitionsPage() {
    const virtualExhibitionsData = await GetVirtualExhibitionsData();

    if (!virtualExhibitionsData) {
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
            <main className='min-h-screen bg-white px-6 py-16 '>
                <div className='max-w-[1400px] mx-auto'>
                    {/* Page Title */}
                    <h1 className='text-4xl md:text-5xl font-bold uppercase leading-tight tracking-tight text-black text-center mb-2'>
                        {virtualExhibitionsData.mainTitle}
                    </h1>
                    {/* Page Sub Title */}
                    <p className='text-2xl md:text-2xl font-bold leading-tight tracking-tight text-black text-center mb-4'>
                        {virtualExhibitionsData?.subTitle}
                    </p>
                    {/* Image */}
                    <div className='grid grid-cols-12 mb-4'>
                        <div className='col-span-12 md:col-span-6 md:col-start-4'>
                            <Image
                                src={urlFor(virtualExhibitionsData.image)
                                    .width(1200)
                                    .url()}
                                alt={virtualExhibitionsData.mainTitle}
                                width={0}
                                height={0}
                                className='mb-6 rounded-lg mx-auto'
                                sizes='100vw'
                                style={{ width: "100%", height: "auto" }}
                            />
                            {/* Description */}
                            <div className='mb-10 text-[#777777] text-[12px]'>
                                <PortableText
                                    value={virtualExhibitionsData.description}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Virtual Exhibitions */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        {virtualExhibitionsData.virtualExhibitions.map(
                            (
                                exhibition: VirtualExhibitionCard,
                                index: number,
                            ) => (
                                <div key={index}>
                                    <h3 className='text-4xl font-semibold mb-4 text-[#424242]'>
                                        {exhibition.exhibitionTitle}
                                    </h3>
                                    <iframe
                                        src={exhibition.exhibitionUrl}
                                        className='w-full min-h-[600px] rounded-lg border'
                                        allow='fullscreen; xr-spatial-tracking'
                                        allowFullScreen
                                        loading='lazy'
                                    />
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
