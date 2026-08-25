import Navbar from "@/components/Navbar";
import { client } from "@/sanity/client";

interface PrefaceCard {
    imageSrc: string;
    text: string;
}

interface VirtualExhibitionCard {
    title: string;
    virtualExhibitLink: string;
}

async function GetPreface(): Promise<PrefaceCard> {
    return client.fetch<PrefaceCard>(
        `
        `,
    );
}

async function GetVirtualExhibitions(): Promise<VirtualExhibitionCard[]> {
    return client.fetch<VirtualExhibitionCard[]>(
        `
        `,
    );
}

export default async function VirtualArtiExhibitionsPage() {
    return (
        <>
            <Navbar />
            <main className='min-h-screen bg-white px-6 py-16'>
                <div className='max-w-[1400px] mx-auto'>
                    {/* Page Title */}
                    <h1 className='text-4xl md:text-5xl font-light uppercase leading-tight tracking-tight text-black text-center mb-16'>
                        Virtual Exhibitions in 3D
                    </h1>
                    <p className='text-2xl md:text-2xl font-light leading-tight tracking-tight text-black text-center mb-16'>
                        Explore and experience the exhibitions in 3D
                    </p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                        {/* TODO: Exhibition Components here */}
                    </div>
                </div>
            </main>
        </>
    );
}
