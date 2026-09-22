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
                <main className="virtual-exhibitions-page">
                    <h1 className="virtual-exhibitions-title">
                        Exhibition data not found.
                    </h1>
                </main>
            </>
        );
    }

    return (
        <>
            <main className="virtual-exhibitions-page">
                <div className="virtual-exhibitions-container">
                    {/* Page Title */}
                    <h1 className="virtual-exhibitions-title">
                        {virtualExhibitionsData.mainTitle}
                    </h1>
                    {/* Page Sub Title */}
                    <p className="virtual-exhibitions-subtitle">
                        {virtualExhibitionsData?.subTitle}
                    </p>
                    {/* Image */}
                    <div className="virtual-exhibitions-image-row">
                        <div className="virtual-exhibitions-image-col">
                            <Image
                                src={urlFor(virtualExhibitionsData.image)
                                    .width(1200)
                                    .url()}
                                alt={virtualExhibitionsData.mainTitle}
                                width={0}
                                height={0}
                                className="virtual-exhibitions-image"
                                sizes="100vw"
                                style={{ width: "100%", height: "auto" }}
                            />
                            {/* Description */}
                            <div className="virtual-exhibitions-description">
                                <PortableText
                                    value={virtualExhibitionsData.description}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Virtual Exhibitions */}
                    <div className="virtual-exhibitions-grid">
                        {virtualExhibitionsData.virtualExhibitions.map(
                            (
                                exhibition: VirtualExhibitionCard,
                                index: number
                            ) => (
                                <div key={index} className="virtual-exhibitions-card">
                                    <h3 className="virtual-exhibitions-card-title">
                                        {exhibition.exhibitionTitle}
                                    </h3>
                                    <iframe
                                        src={exhibition.exhibitionUrl}
                                        className="virtual-exhibitions-iframe"
                                        allow="fullscreen; xr-spatial-tracking"
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
