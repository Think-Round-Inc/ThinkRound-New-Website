import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/client";
import { Instrument_Sans } from "next/font/google";

const instrumentSans = Instrument_Sans({
    subsets: ["latin"],
    weight: "700",
});

export const revalidate = 30;

export default async function StreamOfConsciousnessPage() {
    const data = await client.fetch(
        `*[_type == "streamOfConsciousness"][0]`
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
                Stream of Consciousness
            </h1>
            <div className="flex flex-col gap-12 w-full max-w-4xl items-center">
                {data.images?.map((image: any, index: number) => (
                    <div key={index} className="w-full flex justify-center">
                        {image && (
                            <img
                                src={urlFor(image).width(800).url()}
                                alt={`Stream of Consciousness ${index + 1}`}
                                className="w-auto max-h-[80vh] object-contain rounded-sm"
                            />
                        )}
                    </div>
                ))}
            </div>
        </main>
    );
}

