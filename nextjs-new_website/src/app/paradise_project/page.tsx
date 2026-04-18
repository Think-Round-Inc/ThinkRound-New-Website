import Navbar from "@/components/Navbar";
import { client } from "@/sanity/client";
import Image from "next/image";
import { Cormorant_SC, Cormorant_Infant } from "next/font/google";

const cormorantSC = Cormorant_SC({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["500"],
});

export default async function ParadiseProjectPage() {
  const query = `*[_type == "paradiseProject"][0]{
    ...,
    heroImage {
      asset->{
        url,
        metadata {
          dimensions
        }
      },
      alt
    }
  }`;
  
  const data = await client.fetch(query);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* 
        Main container: 
        - Desktop (lg): Fixed 1920px (120rem) artboard, relative for absolute overlays.
        - Mobile: Flex column for sequential flow.
      */}
      <main className="flex-grow flex flex-col lg:relative max-w-[120rem] mx-auto w-full lg:min-h-[68.75rem] overflow-hidden">
        
        {/* 
          Hero Section Wrapper:
          Contains the image and the overlayed headings.
        */}
        <div className="relative w-full lg:h-0">
          
          {/* Hero Image */}
          <div 
            className="relative lg:absolute w-full lg:w-[87.15rem] h-[40vh] lg:h-[41.925rem] lg:left-[-4rem] lg:top-[9rem]"
          >
            {data?.heroImage?.asset?.url ? (
              <div className="relative w-full h-full transform scale-x-[-1]">
                <Image
                  src={data.heroImage.asset.url}
                  alt={data.heroImage.alt || "Paradise Project"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gray-100 border border-dashed border-gray-300" />
            )}
          </div>

          {/* Heading Overlays (The Paradise Project) */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col items-start justify-center pl-24 pr-6 lg:block lg:contents">
             {/* 'The' */}
             <div className="relative lg:absolute lg:top-[14.25rem] lg:left-[12.125rem] mb-1 lg:mb-0">
                <span className={`${cormorantSC.className} text-[2rem] lg:text-[3.125rem] leading-none text-black bg-transparent lg:bg-transparent`} style={{ letterSpacing: '0.3em' }}>
                  The
                </span>
             </div>
             
             {/* 'Paradise' */}
             <div className="relative lg:absolute lg:top-[18.0625rem] lg:left-[12.125rem] mb-1 lg:mb-0">
                <span className={`${cormorantSC.className} text-[2rem] lg:text-[6.25rem] leading-none text-black bg-transparent lg:bg-transparent`} style={{ letterSpacing: '0.3em' }}>
                  Paradise
                </span>
             </div>

             {/* 'Project' */}
             <div className="relative lg:absolute lg:top-[25.625rem] lg:left-[12.125rem]">
                <span className={`${cormorantSC.className} text-[2rem] lg:text-[6.25rem] leading-none text-black bg-transparent lg:bg-transparent`} style={{ letterSpacing: '0.3em' }}>
                  Project
                </span>
             </div>
          </div>
        </div>

        {/* 
          Sequential Content (SubHeader & BodyText):
          - Mobile: Spaced below the hero image.
          - Desktop: Back to their absolute positions on the right.
        */}
        <div className="flex flex-col gap-6 pl-6 pr-6 pb-12 pt-4 lg:contents lg:p-0">
          
          {/* Sub-Header */}
          {data?.subHeader && (
            <div className="relative lg:absolute lg:left-[61.5rem] lg:top-[20.6875rem] lg:w-[24.75rem] lg:h-[2.25rem]">
               <h2 className={`${cormorantSC.className} text-[1.25rem] lg:text-[1.875rem] leading-tight text-black font-medium text-center whitespace-normal lg:whitespace-nowrap`} style={{ letterSpacing: '0.15em' }}>
                 {data.subHeader}
               </h2>
            </div>
          )}

          {/* Body Text */}
          {data?.bodyText && (
            <div className="relative lg:absolute lg:left-[61.5rem] lg:top-[28.25rem] lg:w-[55.5rem] lg:max-w-full">
              <p className={`${cormorantInfant.className} text-[1.125rem] lg:text-[1.875rem] leading-relaxed lg:leading-[2.25rem] text-black font-medium`}>
                {data.bodyText.split('|').map((segment, i, arr) => (
                  <span key={i}>
                    {segment}
                    {i < arr.length - 1 && (
                      <>
                        <br className="lg:hidden" />
                        <br className="lg:hidden" />
                        <span className="hidden lg:inline"> </span>
                      </>
                    )}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>

        {/* 
          CTA Section:
          - Mobile: Centered row with flanking lines.
          - Desktop: Absolute bottom layout with flanking lines at specific coords.
        */}
        <div className="flex items-center justify-center w-full px-4 py-12 lg:contents lg:py-0">
          
          {/* Left Line */}
          <div className="flex-grow lg:flex-none border-t-2 border-black/20 lg:border-black/50 lg:absolute lg:top-[61.375rem] lg:left-[3.03125rem] lg:w-[48.5rem]" />

          {/* Enter Paradise Button Area (Wrapped Anchor) */}
          <div className="mx-4 lg:mx-0 relative lg:absolute lg:left-[54.53125rem] lg:top-[59.75rem] lg:w-[10.9375rem]">
              <a 
                href="#content-section" 
                className="group flex flex-col lg:block text-black no-underline hover:opacity-70 transition-opacity"
              >
                {/* Text */}
                <span className={`${cormorantInfant.className} block text-[1.25rem] lg:text-[1.875rem] font-normal lg:font-medium leading-none text-center lg:h-[2.25rem] flex items-end justify-center mt-4 lg:mt-0`}>
                  {data?.ctaLabel || 'Enter Paradise'}
                </span>

                {/* Arrow (Desktop) */}
                <div className="hidden lg:flex items-center justify-center absolute lg:left-[50%] lg:ml-[-1.3125rem] lg:top-[1.875rem] lg:w-[2.625rem] lg:h-[2.625rem]">
                  <svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[1.3125rem] h-auto">
                    <path d="M2.4675 0L10.5 8.015L18.5325 0L21 2.4675L10.5 12.9675L0 2.4675L2.4675 0Z" fill="black"/>
                  </svg>
                </div>

                {/* Arrow (Mobile - Inside flex flow) */}
                <div className="lg:hidden flex justify-center mt-2 text-black/80">
                  <svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[1rem] h-auto">
                    <path d="M2.4675 0L10.5 8.015L18.5325 0L21 2.4675L10.5 12.9675L0 2.4675L2.4675 0Z" fill="currentColor"/>
                  </svg>
                </div>
              </a>
          </div>

          {/* Right Line */}
          <div className="flex-grow lg:flex-none border-t-2 border-black/20 lg:border-black/50 lg:absolute lg:top-[61.375rem] lg:left-[68.46875rem] lg:w-[48.5rem]" />
        </div>

        {/* Anchors for interaction */}
        <div id="content-section" className="h-px lg:absolute lg:top-[68.75rem]" />
      </main>

      {/* Target area for scroll button */}
      <section className="min-h-screen bg-neutral-50 px-6 py-20 flex flex-col items-center justify-center">
         <h3 className={`${cormorantSC.className} text-3xl mb-4 text-neutral-400`}>Exhibit Experience</h3>
         <p className="text-neutral-400 max-w-md text-center">This section will be populated with the Paradise Project virtual experience content in the next phase.</p>
      </section>
    </div>
  );
}
