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

export default async function TtoTPage() {
    const ttot = await getTtoT();
    return (
        <div>
            {
                ttot.map(t => (
                    <div key={t._id}>
                         <div className="text-2xl">{t.title}</div>
                        <Image src={urlFor(t.mainImage).width(150).height(1500).url()}
                            alt={t.title}
                            width={150}
                            height={150}
                            className="rounded-lg object-cover"
                        />
                        <div className="">{t.description}</div>
                        {
                            t.links.map(
                                link => (
                                    <div key={link[0]}>
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