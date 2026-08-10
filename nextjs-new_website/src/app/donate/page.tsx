import Image from "next/image";
import { client } from "@/sanity/client";
import Navbar from "@/components/Navbar";
import UpdatedSocialLinks from "@/components/UpdatedSocialLinks";
import { League_Spartan } from "next/font/google";
import Link from "next/link";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
});

export const revalidate = 30; // ISR: revalidate every 30s

async function getDonatePage() {
  const query = `*[_type == "donatePage"][0]{
    title,
    Image{
      asset->{
        url
      }
    },
    ButtonText,
    introText,
    supportingContent,
    secondaryButtonText,
   
  }`;
  return await client.fetch(query);
}

export default async function DonatePage() {
  const data = await getDonatePage();

  if (!data) {
    return (
      <main className="min-h-screen bg-white text-[#2e2e2e]">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div
            className="text-3xl"
            style={{ fontFamily: leagueSpartan.style.fontFamily }}
          >
            No donate page content found.
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#2e2e2e]">
      <Navbar />

      <main
        className=" flex flex-col max-w-7xl mx-auto mt-25 space-y-10 text-center"
        style={{ fontFamily: leagueSpartan.style.fontFamily }}
      >
        {data.Image?.asset?.url && (
          <section className="  w-5/6 h-5/6 mx-auto">
            <Image
              src={data.Image.asset.url}
              alt={data.title || "Donate image"}
              width={1137}
              height={786}
            />
          </section>
        )}

        <section
          className="text-3xl font-bold leading-tight md:text-5xl lg:text-7xl mx-20 lg:mx-40"
          style={{ letterSpacing: "0.01em" }}
        >
          {data.title}
        </section>

        <section className="flex justify-center gap-4 mt-6">
          {data.ButtonText && (
            <Link
              href="https://www.thinkround.org/checkout/donate?donatePageId=61a57b96cb3aea5591db074c"
              className="rounded-0 bg-purple-900 hover:bg-purple-800 text-white px-10 py-3 text-sm xl:text-2xl tracking-[0.2em]  transition"
            >
              {data.ButtonText}
            </Link>
          )}
        </section>

        <section className="  mx-10 md:mx-20 lg:mx-40 text-2xl md:text-4xl lg:text-6xl text-black-800">
          {data.introText}
        </section>
        <section className=" mx-10 md:mx-20 lg:mx-40 text-xl md:text-2xl lg:text-3xl text-black-600">
          {data.supportingContent}
        </section>

        <div className="flex justify-center gap-4 mt-6">
          {data.secondaryButtonText && (
            <Link
              href="https://www.thinkround.org/checkout/donate?donatePageId=61a57b96cb3aea5591db074c"
              className="rounded-0 bg-purple-900 hover:bg-purple-800 text-white px-10 py-3 text-sm xl:text-2xl tracking-[0.2em]  transition"
            >
              {data.secondaryButtonText}
            </Link>
          )}
        </div>

        <section className="mx-10 md:mx-20 lg:mx-40">
          <UpdatedSocialLinks />
        </section>
      </main>
    </div>
  );
}
