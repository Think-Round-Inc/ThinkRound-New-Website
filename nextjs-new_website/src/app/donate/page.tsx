import Image from "next/image";
import { client } from "@/sanity/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    socialLinks
  }`;
  return await client.fetch(query);
}

export default async function DonatePage() {
  const data = await getDonatePage();

  if (!data) {
    return <div className="p-10 text-center">No donate page content found.</div>;
  }

  return (
    <>
      <Navbar />

      <section className="max-w-3xl mx-auto py-8 px-5 space-y-4 text-center">
        {data.Image?.asset?.url && (
          <div className="relative w-full h-100 mt-0">
            <Image
              src={data.Image.asset.url}
              alt={data.title || "Donate image"}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        )}

        <h1 className="text-3xl font-bold">{data.title}</h1>

        <div className="flex justify-center gap-4 mt-6">
          {data.ButtonText && (
            <button className="bg-blue-600 text-white px-5 py-1 rounded-lg hover:bg-blue-700 transition">
              {data.ButtonText}
            </button>
          )}
        </div>

        <p className="text-2xl text-black-800">{data.introText}</p>
        <p className="text-sm text-black-600">{data.supportingContent}</p>

        <div className="flex justify-center gap-4 mt-6">
          {data.secondaryButtonText && (
            <button className="bg-blue-600 text-white px-5 py-1 rounded-lg hover:bg-blue-700 transition">
              {data.secondaryButtonText}
            </button>
          )}
        </div>

        {data.socialLinks?.length > 0 && (
          <div className="flex justify-center gap-6 mt-8">
            {data.socialLinks.map((link: any, idx: number) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {link.platform}
              </a>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
