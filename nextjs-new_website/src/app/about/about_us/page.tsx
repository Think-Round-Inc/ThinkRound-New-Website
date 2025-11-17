import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link"

interface AboutUs {
    _id: string;
    title: string;
    description: string
}
interface CurrentPartner {
  _id: string;
  name: string;
  logo: { asset: { _ref: string } };
  hyperlink: string
}
interface PastPartner {
  _id: string;
  name: string;
  logo: { asset: { _ref: string } };
}

export const revalidate = 60;

async function getAboutUs() {
  const query = 
  `*[_type == "aboutUs"]{
    _id,
    title,
    description
  }`;
  return client.fetch<AboutUs[]>(query);
}
async function getCurrentPartners(){
  const query = 
  `*[_type == "partnerCurrent"]{
    _id,
    name,
    logo,
    hyperlink
  }`;
  return client.fetch<CurrentPartner[]>(query);
}
async function getPastPartners(){
   const query = 
  `*[_type == "partnerPast"]{
    _id,
    name,
    logo
  }`; 
  return client.fetch<PastPartner[]>(query)
}

export default async function AboutUsPage() {

  
    const cPartners = await getCurrentPartners();
    const pPartners = await getPastPartners();
    const abouts = await getAboutUs();
    //may need to nest the sidebar in another div so column is frozen but keeps the sidebar persistently on the side
    //will need to search for enboldened or italic text and replace it before returning
      //Will need to search for triple then duo then single asterisk
    return ( //need to map the menu and the actual text
        <div className="w-full max-w-7xl mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex-shrink-0" id="sideBar"> 
              {abouts.map((about) => (
                <div key={about._id} className="">
                  {about.title}
                </div>
              ))}
            </div>
            <div className="mainText">
              {abouts.map((about) => (
                <div key={about._id} className="p-3">
                  <div className="text-2xl">{about.title}</div>
                  <div className="">{about.description}</div>
                </div>
              ))}
            </div>
            <div className ="pastPartners">
              {pPartners.map((partner) => (
                <div key={partner._id}>
                  <Image
                    src={urlFor(partner.logo).width(150).height(1500).url()}
                    alt={partner.name}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover"
                  />
                </div>
              ))
              }
            </div>
            <div className="currentPartners">
              {cPartners.map((partner) => (
                <div key={partner._id}>
                  <Link href={partner.hyperlink}>
                  <Image
                    src={urlFor(partner.logo).width(150).height(1500).url()}
                    alt={partner.name}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover"
                  />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
    );
}