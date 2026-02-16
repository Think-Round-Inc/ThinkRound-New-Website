import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link"

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

function readMarkdown(text: string){
    var toReturn = text;
    //bolden
    toReturn = toReturn.replace(/\*\*(.+?)\*\*/gm, '<strong>$1</strong>')
    return (
        <div>
            <div className="returnText" dangerouslySetInnerHTML={{ __html:toReturn}}></div>
        </div>
    );
}

export default async function TtoTPage() {
    const ttot = await getTtoT();
    return (
        <div className="w-full max-w-7xl mx-auto py-12 px-4">
            {
                ttot.map(t => (
                    <div key={t._id}>
                        <div className="text-4xl text-center">{t.title}</div>
                        <Image src={urlFor(t.mainImage).width(550).height(550).url()}
                            alt={t.title}
                            width={550}
                            height={550}
                            className="max-w-md mx-auto py-6 px-4 rounded-lg object-cover"
                        />
                        {/* <div className="text-center" dangerouslySetInnerHTML={{ __html: readMarkdown(t.description)}}></div> */}
                        <div className="text-center">{readMarkdown(t.description)}</div>
                        {
                            t.links.map(
                                link => (
                                    <div key={link.linkname}>
                                        <Link href={link.linkurl}>
                                            <button>{link.linkname}</button>
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