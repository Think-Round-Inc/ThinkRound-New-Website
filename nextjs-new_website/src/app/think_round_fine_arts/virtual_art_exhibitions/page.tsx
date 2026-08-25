import Navbar from "@/components/Navbar";

export default async function VirtualArtiExhibitionsPage() {
    return (
        <>
            <Navbar />
            <main className='min-h-screen bg-white px-6 py-16'>
                <div className='max-w-[1400px] mx-auto'>
                    {/* Page Title */}
                    <h1 className='text-4xl md:text-5xl font-light uppercase leading-tight tracking-tight text-black text-center mb-16'>
                        Virtual Art Exhibitions
                    </h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                        {/* TODO: Exhibition Components here */}
                    </div>
                </div>
            </main>
        </>
    );
}
