import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import Navbar from '@/components/Navbar';

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

function readMarkdown(text: string){
    var toReturn = text;
    //  //Blockquote
    toReturn = toReturn.replace(/\>(.+)/g,"<blockquote>$1</blockquote>");
    //bolden
    toReturn = toReturn.replace(/\*\*(.+?)\*\*/gm, '<strong>$1</strong>')
    //link replacer
    toReturn = toReturn.replace(/\[(.+?)\]\((.+?)\)/gm,"<a style='color: orange;' href='$2'>$1</a>");
    //bulleted list (general list)
    toReturn = toReturn.replace(/\*(.+)/gm,'<ul style="padding: 0; list-style-position: inside; list-style-type: circle;"><li style="padding: 0;">$1</li></ul>');
    return (
        <div>
            <div className="returnText" dangerouslySetInnerHTML={{ __html:toReturn}}></div>
        </div>
    );
}

function enlargeTitle(text:string){
  var toReturn = text;
  if (/\#(.+)/g.test(toReturn)){
    toReturn = toReturn.replace(/\#(.+)/g,"<div style='font-weight:bold; text-align: center; font-size:xx-large'>$1</div>");
    return (
      <div>
        <div className="returnText" dangerouslySetInnerHTML={{ __html:toReturn}}></div>
      </div>
    );
  }
  return (
    <div>
      <div className="text-2xl font-bold text-center">{text}</div>
    </div>
  )
}

export default async function AboutUsPage() {

    const cPartners = await getCurrentPartners();
    const pPartners = await getPastPartners();
    const abouts = await getAboutUs();
    //may need to nest the sidebar in another div so column is frozen but keeps the sidebar persistently on the side
    //will need to search for enboldened or italic text and replace it before returning
      //Will need to search for triple then duo then single asterisk
    return ( //need to map the menu and the actual text
        <div className="w-full min-h-screen mx-auto bg-white">
          <Navbar />
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 pt-20">THINK ROUND, INC. VISION AND STRATEGIC PLAN (2014 and beyond)</h1>
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="mainText">
              {abouts.map((about) => (
                <div key={about._id} className="p-3 text-gray-800">
                  {enlargeTitle(about.title)}
                  <div className="px-50">{readMarkdown(about.description)}</div>
                </div>
              ))}

              <div className="text-xl p-3 text-gray-800 px-50">Current Partners</div>
              <div id="currentPartners" className="px-50">
                {cPartners.map((partner) => (
                  <div key={partner._id}>
                    <Link href={partner.hyperlink}>
                    <Image
                      src={urlFor(partner.logo).width(150).height(150).url()}
                      alt={partner.name}
                      width={150}
                      height={150}
                      className="rounded-lg object-cover"
                    />
                    </Link>
                  </div>
                ))}
              </div>

            <div className="text-xl p-3 text-gray-800 px-50">Past Partners</div>
            <div id="pastPartners" className="px-50">
              {pPartners.map((partner) => (
                <div key={partner._id}>
                  <Image
                    src={urlFor(partner.logo).width(150).height(150).url()}
                    alt={partner.name}
                    width={150}
                    height={150}
                    className="block rounded-lg object-cover"
                  />
                </div>
              ))
              }
            </div>
            </div>
          </div>
        </div>
    );
}