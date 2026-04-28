import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import Navbar from '@/components/Navbar';

interface TtoT {
    _id: string;
    title: string;
    mainImage: { asset: { _ref: string } };
    description: string;
    links: []
}
export const revalidate = 60;

async function getTtoT() {
  const query = 
  `*[_type == "turningTheTide"]{
    _id,
    title,
    mainImage,
    description,
    links[]
  }`;
  return client.fetch<TtoT[]>(query);
}

//maybe arrays of paragraphs would be better
//update markdown to incroporate links
//check for line breaks?
function readMarkdown(text: string){
    var toReturn = text;
    //  //Blockquote
    toReturn = toReturn.replace(/\>(.+)/g,"<blockquote>$1</blockquote>");
    //Bolden
    toReturn = toReturn.replace(/\*\*(.+?)\*\*/gm, '<strong>$1</strong>')
    //link replacer
    toReturn = toReturn.replace(/\[(.+?)\]\((.+?)\)/gm,"<a style='color: orange;' href='$2'>$1</a>");
    //heading replacer
    toReturn = toReturn.replace(/\#(.+)/g,"<div style='font-size:xx-large'>$1</div>")
    return (
        <div>
            <div className="returnText" dangerouslySetInnerHTML={{ __html:toReturn}}></div>
        </div>
    );
}

export default async function TtoTPage() {
    const ttot = await getTtoT();
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            {
                ttot.map(t => (
                    <div key={t._id} className="py-10">
                        <div className="text-4xl text-center text-gray-800">{t.title}</div>
                        <Image src={urlFor(t.mainImage).width(550).height(550).url()}
                            alt={t.title}
                            width={550}
                            height={550}
                            className="max-w-md mx-auto py-6 px-4 rounded-lg object-cover"
                        />
                        <div className="text-center text-gray-800 px-48 py-12">{readMarkdown(t.description)}</div>
                        {
                            t.links.map(
                                link => (
                                    <div className="grid place-items-center" key={link.linkname}>
                                        <Link href={link.linkurl}>
                                            <button className="text-center bg-purple-600 hover:bg-purple-700 my-1 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out">{link.linkname}</button>
                                        </Link>
                                    </div>
                                )
                            )
                        }
                    </div>
                ))
            }
        </div>
    );
}