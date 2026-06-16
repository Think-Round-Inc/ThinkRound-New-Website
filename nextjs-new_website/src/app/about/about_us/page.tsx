import { client } from "@/sanity/client"; 
import { urlFor } from "@/sanity/client"; 
import Image from "next/image"; 
import Link from "next/link"; 
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"; 

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

  return (
    //need to map the menu and the actual text 
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-[#f7f7f7]">
        {/* PAGE HEADER */} 
        <div className="bg-gray-100 border-b border-gray-200 py-16 px-4 mb-12">
          <h1 className="text-5xl font-bold text-center text-gray-900"> About Us </h1>
          <p className="text-lg text-gray-600 text-center mt-4 max-w-3xl mx-auto"> Learn more about our mission, programs, partnerships, and community impact. </p>
        </div>
        <div className="w-full max-w-7xl mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto space-y-10">
            {abouts.map((about) => ( 
            <div key={about._id} className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100" >
              <h2 className="text-3xl font-bold mb-5 text-black"> {about.title} </h2>
              <p className="text-gray-700 leading-8 text-lg whitespace-pre-line"> {about.description} </p>
            </div>
            ))} 
          </div>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-10"> Past Partners </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pPartners.map((partner) => ( 
              <div key={partner._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-center h-40" > 
                <Image src={urlFor(partner.logo).width(300).height(300).url()} alt={partner.name || "Partner logo"} width={180} height={100} className="object-contain max-h-24 w-auto" /> 
              </div>
              ))} 
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-20">
            <h2 className="text-4xl font-bold text-center mb-10">
              Current Partners
            </h2>
            <div className="w-full flex justify-center">
              {cPartners.map((partner) => (
              <Link
              key={partner._id}
              href={partner.hyperlink || "#"}
              target="_blank"
              >
              <div className="w-full px-4 md:px-8 lg:px-12">
                <Image
                  src={urlFor(partner.logo).url()}
                  alt="Current Partners"
                  width={2000}
                  height={800}
                  className="w-full px-2"
                  />
              </div>
              </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div> 
  ); 
}