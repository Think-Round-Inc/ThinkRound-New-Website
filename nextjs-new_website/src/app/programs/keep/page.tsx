import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextBlock } from "@portabletext/react";

import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";

const KEEP_QUERY = `
  *[_type == "keep"][0] {
    title,
    subtitle,
    image1,
    caption1,
    image2,
    caption2,
    image3,
    caption3,
    image4,
    image5,
    caption5,
    image6,
    body,
    link {
      linkname,
      linkurl
    }
  }
`;

export const revalidate = 60;

type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: string;
  };
};

type KeepPageData = {
  title?: string;
  subtitle?: string;

  image1?: SanityImage;
  caption1?: string;

  image2?: SanityImage;
  caption2?: string;

  image3?: SanityImage;
  caption3?: string;

  image4?: SanityImage;

  image5?: SanityImage;
  caption5?: string;

  image6?: SanityImage;

  body?: PortableTextBlock[];

  link?: {
    linkname?: string;
    linkurl?: string;
  };
};

export default async function KidsEnvironmentalEducationPage() {
  const data: KeepPageData | null = await client.fetch(KEEP_QUERY);

  if (!data) {
    return (
      <main className="keep-empty">
        <h1>KEEP page content was not found.</h1>
        <p>Please create and publish the KEEP document in Sanity Studio.</p>
      </main>
    );
  }

  return (
    <main className="keep-page">
      <section className="keep-hero">
        <h1 className="keep-logo-text">{data.title || "KEEP!"}</h1>

        <h2 className="keep-title">
          {data.subtitle || "Kid’s\nEnvironmental\nEducation\nProgram"}
        </h2>

        <Link href="/volunteer" className="keep-button">
          VOLUNTEER FOR KEEP!
        </Link>
      </section>

      {data.image1 && (
        <section className="keep-wide-section">
          <Image
            src={urlFor(data.image1).width(1500).url()}
            alt={data.caption1 || "KEEP environmental education program"}
            width={1500}
            height={900}
            className="keep-wide-image"
            priority
          />

          {data.caption1 && (
            <p className="keep-caption keep-wide-caption">
              {data.caption1}
            </p>
          )}
        </section>
      )}

      {data.image2 && (
        <section className="keep-small-section">
          <Image
            src={urlFor(data.image2).width(800).url()}
            alt={data.caption2 || "KEEP field trip"}
            width={800}
            height={560}
            className="keep-small-image"
          />

          {data.caption2 && (
            <p className="keep-caption">{data.caption2}</p>
          )}
        </section>
      )}

      {data.image3 && (
        <section className="keep-medium-section">
          <Image
            src={urlFor(data.image3).width(1100).url()}
            alt={data.caption3 || "KEEP students on a field trip"}
            width={1100}
            height={760}
            className="keep-medium-image"
          />

          {data.caption3 && (
            <p className="keep-caption">{data.caption3}</p>
          )}
        </section>
      )}

      {data.image4 && (
        <section className="keep-medium-section">
          <Image
            src={urlFor(data.image4).width(1100).url()}
            alt="KEEP environmental education activity"
            width={1100}
            height={760}
            className="keep-medium-image"
          />
        </section>
      )}

      {data.image5 && (
        <section className="keep-small-section">
          <Image
            src={urlFor(data.image5).width(800).url()}
            alt={data.caption5 || "KEEP environmental activity"}
            width={800}
            height={560}
            className="keep-small-image"
          />

          {data.caption5 && (
            <p className="keep-caption">{data.caption5}</p>
          )}
        </section>
      )}

      {data.image6 && (
        <section className="keep-medium-section">
          <Image
            src={urlFor(data.image6).width(1100).url()}
            alt="KEEP community field trip"
            width={1100}
            height={760}
            className="keep-medium-image"
          />
        </section>
      )}

      {data.body && data.body.length > 0 && (
        <section className="keep-body">
          <PortableText value={data.body} />
        </section>
      )}

      {data.link?.linkurl && (
        <div className="keep-download">
          <a
            href={data.link.linkurl}
            target="_blank"
            rel="noopener noreferrer"
            className="keep-button"
          >
            {data.link.linkname || "DOWNLOAD KEEP BOOKLET"}
          </a>
        </div>
      )}
    </main>
  );
}