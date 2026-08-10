import {client, urlFor} from '@/sanity/client'
import {Instrument_Sans, League_Spartan} from 'next/font/google'
import {PortableText, type PortableTextBlock} from 'next-sanity'
import type {PortableTextComponents} from '@portabletext/react'
import Image from 'next/image'
import type {CSSProperties, ReactNode} from 'react'
import SocialLinks from '@/components/SocialLinks'

/*
|--------------------------------------------------------------------------
| Fonts
|--------------------------------------------------------------------------
*/

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument-sans',
})

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  variable: '--font-league-spartan',
})

export const revalidate = 30

/*
|--------------------------------------------------------------------------
| TypeScript types
|--------------------------------------------------------------------------
*/

type RichText = PortableTextBlock[]

interface SanityImage {
  asset?: {
    _ref?: string
    _type?: string
  }

  alt?: string
  caption?: RichText
}

interface GalleryImage extends SanityImage {
  _key?: string
}

interface CMPData {
  pageTitle?: RichText
  mainHeading?: RichText
  heroImage?: SanityImage

  bookletIntroduction?: RichText
  bookletButtonText?: RichText
  bookletUrl?: string

  historySection?: {
    heading?: RichText
    content?: RichText
    videoDescription?: RichText
    videoUrl?: string
    galleryIntroduction?: RichText
    gallery?: GalleryImage[]
  }

  studentSection?: {
    image?: SanityImage
    content?: RichText
  }

  shipyardNews?: RichText

  heidiSection?: {
    description?: RichText
    videoUrl?: string
  }

  outcomesHeading?: RichText
  outcomesVideoUrl?: string

  muralsSection?: {
    heading?: RichText
    content?: RichText
  }

  streamSection?: {
    heading?: RichText
    content?: RichText
    images?: GalleryImage[]
  }

  finalCelebrations?: {
    heading?: RichText
    content?: RichText
    image?: SanityImage
    imageCaption?: RichText
    caption?: RichText
  }

  essayAnthologies?: {
    heading?: RichText
    image?: SanityImage
    description?: RichText
    galleryHeading?: RichText
    awardsGallery?: GalleryImage[]
  }

  finalGalleryDescription?: RichText
  finalGallery?: GalleryImage[]
}

/*
|--------------------------------------------------------------------------
| Font mapping
|--------------------------------------------------------------------------
*/

const fontFamilies: Record<string, string> = {
  'league-spartan': 'var(--font-league-spartan)',
  'instrument-sans': 'var(--font-instrument-sans)',
}

/*
|--------------------------------------------------------------------------
| Portable Text frontend styles
|--------------------------------------------------------------------------
|
| These components display the formatting selected inside Sanity Studio.
|
*/

const portableTextComponents: PortableTextComponents = {
  block: {
    display: ({children}) => (
      <h1
        className="
          my-6
          text-center
          font-bold
          leading-[1.05]
          text-[#2e2e2e]
          text-[clamp(42px,9vw,88px)]
        "
      >
        {children}
      </h1>
    ),

    h1: ({children}) => (
      <h1 className="my-6 text-5xl font-bold leading-tight text-[#2e2e2e]">
        {children}
      </h1>
    ),

    h2: ({children}) => (
      <h2 className="my-5 text-4xl font-bold leading-tight text-[#363636]">
        {children}
      </h2>
    ),

    h3: ({children}) => (
      <h3 className="my-4 text-3xl font-bold leading-tight text-[#424242]">
        {children}
      </h3>
    ),

    h4: ({children}) => (
      <h4 className="my-3 text-2xl font-bold leading-tight text-[#424242]">
        {children}
      </h4>
    ),

    large: ({children}) => (
      <p className="mb-5 text-xl leading-9 sm:text-2xl">
        {children}
      </p>
    ),

    small: ({children}) => (
      <p className="mb-4 text-sm leading-6 sm:text-base">
        {children}
      </p>
    ),

    center: ({children}) => (
      <p className="mb-5 text-center leading-8">
        {children}
      </p>
    ),

    headingCenter: ({children}) => (
      <h2
        className="
          my-6
          text-center
          text-4xl
          font-bold
          uppercase
          leading-tight
          text-[#2e2e2e]
          sm:text-5xl
        "
      >
        {children}
      </h2>
    ),

    normal: ({children}) => (
      <p className="mb-5 leading-8 last:mb-0">
        {children}
      </p>
    ),

    blockquote: ({children}) => (
      <blockquote
        className="
          my-6
          border-l-4
          border-gray-300
          pl-5
          text-xl
          italic
          leading-8
        "
      >
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({children}) => (
      <ul className="mb-5 list-disc space-y-2 pl-7">
        {children}
      </ul>
    ),

    number: ({children}) => (
      <ol className="mb-5 list-decimal space-y-2 pl-7">
        {children}
      </ol>
    ),
  },

  marks: {
    underline: ({children}) => (
      <span className="underline">
        {children}
      </span>
    ),

    'strike-through': ({children}) => (
      <span className="line-through">
        {children}
      </span>
    ),

    link: ({children, value}) => {
      const target = value?.openInNewTab
        ? '_blank'
        : undefined

      return (
        <a
          href={value?.href}
          target={target}
          rel={
            target
              ? 'noopener noreferrer'
              : undefined
          }
          className="
            font-semibold
            text-purple-700
            underline
            underline-offset-4
            hover:text-purple-900
          "
        >
          {children}
        </a>
      )
    },

    textColor: ({children, value}) => (
      <span
        style={{
          color: value?.hex,
        }}
      >
        {children}
      </span>
    ),

    fontSize: ({children, value}) => (
      <span
        style={{
          fontSize: value?.size,
        }}
      >
        {children}
      </span>
    ),

    fontFamily: ({children, value}) => {
      const family =
        fontFamilies[value?.family] ||
        value?.family

      return (
        <span
          style={{
            fontFamily: family,
          }}
        >
          {children}
        </span>
      )
    },
  },

  unknownMark: ({children}) => (
    <>
      {children}
    </>
  ),
}

/*
|--------------------------------------------------------------------------
| Rich text renderer
|--------------------------------------------------------------------------
*/

function RichTextContent({
  value,
  className = '',
  style,
}: {
  value?: RichText
  className?: string
  style?: CSSProperties
}) {
  if (!value?.length) {
    return null
  }

  return (
    <div
      className={className}
      style={style}
    >
      <PortableText
        value={value}
        components={portableTextComponents}
      />
    </div>
  )
}

/*
|--------------------------------------------------------------------------
| YouTube helper
|--------------------------------------------------------------------------
*/

function getYouTubeId(url?: string) {
  if (!url) {
    return null
  }

  const expression =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/

  const match = url.match(expression)

  return match && match[2].length === 11
    ? match[2]
    : null
}

/*
|--------------------------------------------------------------------------
| YouTube component
|--------------------------------------------------------------------------
*/

function YouTubeVideo({
  url,
  title,
}: {
  url?: string
  title: string
}) {
  const videoId = getYouTubeId(url)

  if (!videoId) {
    return null
  }

  return (
    <div
      className="
        relative
        aspect-video
        w-full
        overflow-hidden
        rounded-md
        shadow-lg
      "
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        className="h-full w-full"
        allow="
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture
        "
        allowFullScreen
      />
    </div>
  )
}

/*
|--------------------------------------------------------------------------
| Responsive image
|--------------------------------------------------------------------------
*/

function ResponsiveImage({
  image,
  alt,
  className = '',
}: {
  image?: SanityImage
  alt: string
  className?: string
}) {
  if (!image?.asset) {
    return null
  }

  return (
    <Image
      src={urlFor(image)
        .width(1800)
        .url()}
      alt={image.alt || alt}
      width={1800}
      height={1200}
      className={`
        h-auto
        w-full
        object-contain
        ${className}
      `}
    />
  )
}

/*
|--------------------------------------------------------------------------
| Image carousel gallery
|--------------------------------------------------------------------------
*/

function ImageGallery({
  images,
  title,
  centerThumbnails = false,
}: Readonly<{
  images?: GalleryImage[]
  title: string
  centerThumbnails?: boolean
}>) {
  if (!images?.length) {
    return null
  }

  const validImages = images.filter((image) => image?.asset)

  if (!validImages.length) {
    return null
  }

  return (
    <div className="w-full">

      {/* Large image carousel */}
      <div
        className="
          flex
          w-full
          snap-x
          snap-mandatory
          overflow-x-auto
          scroll-smooth
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {validImages.map((image, index) => (
          <div
            id={`gallery-${title.replace(/\s+/g, '-')}-${index}`}
            key={image._key || index}
            className="
              relative
              w-full
              min-w-full
              flex-none
              snap-center
            "
          >
            <div
              className={`
                relative
                flex
                w-full
                items-center
                justify-center
                overflow-hidden
                bg-white
                ${
                  centerThumbnails
                    ? ''
                    : 'min-h-[400px] sm:min-h-[500px]'
                }
              `}
            >
              <Image
                src={urlFor(image)
                  .width(1800)
                  .url()}
                alt={
                  image.alt ||
                  `${title} image ${index + 1}`
                }
                width={1800}
                height={1200}
                className="
                  max-h-[600px]
                  w-full
                  object-contain
                "
              />

              {/* Previous arrow */}
              {validImages.length > 1 && (
                <a
                  href={`#gallery-${title.replace(/\s+/g, '-')}-${index === 0 ? validImages.length - 1 : index - 1}`}
                  aria-label="Previous image"
                  className="
                    absolute
                    left-4
                    top-1/2
                    z-20
                    flex
                    h-12
                    w-12
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-black/35
                    text-4xl
                    font-light
                    text-white
                    transition
                    hover:bg-black/60
                  "
                >
                  ‹
                </a>
              )}

              {/* Next arrow */}
              {validImages.length > 1 && (
                <a
                  href={`#gallery-${title.replace(/\s+/g, '-')}-${index === validImages.length - 1 ? 0 : index + 1}`}
                  aria-label="Next image"
                  className="
                    absolute
                    right-4
                    top-1/2
                    z-20
                    flex
                    h-12
                    w-12
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-black/35
                    text-4xl
                    font-light
                    text-white
                    transition
                    hover:bg-black/60
                  "
                >
                  ›
                </a>
              )}
            </div>

            <RichTextContent
              value={image.caption}
              className="
                mt-3
                text-center
                text-base
                text-gray-500
              "
            />
          </div>
        ))}
      </div>

      {/* Thumbnail navigation */}
      {validImages.length > 1 && (
        <div
          className={`
            mt-3
            flex
            w-full
            gap-2
            pb-2
            ${
              centerThumbnails
                ? 'flex-wrap justify-center'
                : 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            }
          `}
        >
          {validImages.map((image, index) => (
            <a
              key={image._key || index}
              href={`#gallery-${title.replace(/\s+/g, '-')}-${index}`}
              className="
                relative
                h-20
                w-28
                flex-none
                overflow-hidden
                border-2
                border-transparent
                opacity-60
                transition
                hover:border-gray-500
                hover:opacity-100
              "
              aria-label={`View ${title} image ${index + 1}`}
            >
              <Image
                src={urlFor(image)
                  .width(300)
                  .height(200)
                  .url()}
                alt={
                  image.alt ||
                  `${title} thumbnail ${index + 1}`
                }
                width={300}
                height={200}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            </a>
          ))}
        </div>
      )}

    </div>
  )
}

/*
|--------------------------------------------------------------------------
| Reusable page section
|--------------------------------------------------------------------------
*/

function Section({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={`
        mb-5
        w-full
        max-w-6xl
        ${className}
      `}
    >
      {children}
    </section>
  )
}

/*
|--------------------------------------------------------------------------
| CMP page
|--------------------------------------------------------------------------
*/

export default async function ChildrenMuralProgramPage() {
  const data = await client.fetch<CMPData>(
    `*[_type == "childrenMuralProgram"][0]{
      pageTitle,
      mainHeading,
      heroImage,
      bookletIntroduction,
      bookletButtonText,
      bookletUrl,

      historySection{
        heading,
        content,
        videoDescription,
        videoUrl,
        galleryIntroduction,
        gallery
      },

      studentSection{
        image,
        content
      },

      shipyardNews,

      heidiSection{
        description,
        videoUrl
      },

      outcomesHeading,
      outcomesVideoUrl,

      muralsSection{
        heading,
        content
      },

      streamSection{
        heading,
        content,
        images
      },

      finalCelebrations{
        heading,
        content,
        image,
        imageCaption,
        caption
      },

      essayAnthologies{
        heading,
        image,
        description,
        galleryHeading,
        awardsGallery
      },

      finalGalleryDescription,
      finalGallery
    }`,
  )

  /*
  |--------------------------------------------------------------------------
  | No content found
  |--------------------------------------------------------------------------
  */

  if (!data) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-white
          p-8
          text-black
        "
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            CMP content not found
          </h1>

          <p className="mt-4 text-gray-600">
            Create and publish the Children&apos;s Mural Program
            document in Sanity Studio.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main
      className={`
        ${leagueSpartan.variable}
        ${instrumentSans.variable}
        min-h-screen
        bg-white
        px-5
        py-10
        font-[var(--font-league-spartan)]
        text-[#828282]
        sm:px-8
        sm:py-14
      `}
    >
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-6xl
          flex-col
          items-center
        "
      >
        {/* Page title */}

        <RichTextContent
          value={data.pageTitle}
          className="
            mb-2
            w-full
            text-center
            text-xl
            font-semibold
            text-[#424242]
            sm:text-2xl
          "
        />

        {/* Main heading */}

        <RichTextContent
          value={data.mainHeading}
          className="
            mb-8
            w-full
            text-center
            font-[var(--font-instrument-sans)]
          "
        />

        {/* Hero image */}

        {data.heroImage && (
          <div className="mx-auto mb-10 w-full max-w-6xl">
            <ResponsiveImage
              image={data.heroImage}
              alt="Children's Mural Program"
            />
          </div>
        )}

        {/* Booklet section */}

        {(data.bookletIntroduction?.length ||
          data.bookletUrl) && (
          <Section
            className="
              flex
              flex-col
              items-center
              text-center
            "
          >
            <RichTextContent
              value={data.bookletIntroduction}
              className="
                mb-2
                w-full
                text-xl
                leading-relaxed
                sm:text-2xl
              "
            />

            {data.bookletUrl && (
              <a
                href={data.bookletUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-4
                  inline-flex
                  rounded-full
                  bg-purple-600
                  px-7
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-purple-700
                "
              >
                {data.bookletButtonText?.length ? (
                  <RichTextContent
                    value={data.bookletButtonText}
                  />
                ) : (
                  'Download The CMP Booklet Here →'
                )}
              </a>
            )}
          </Section>
        )}

        {/* History section */}

        {data.historySection && (
          <Section>
            <RichTextContent
              value={data.historySection.heading}
              className="
                font-[var(--font-instrument-sans)]
              "
            />

            <RichTextContent
              value={data.historySection.content}
              className="text-lg sm:text-xl"
            />

            <RichTextContent
              value={
                data.historySection.videoDescription
              }
              className="my-10 text-lg sm:text-xl"
            />

            <YouTubeVideo
              url={data.historySection.videoUrl}
              title="Children's Mural Program documentary"
            />

            <RichTextContent
              value={
                data.historySection.galleryIntroduction
              }
              className="my-10 text-lg sm:text-xl"
            />

            <ImageGallery
              images={data.historySection.gallery}
              title="CMP history"
            />
          </Section>
        )}

        {/* Students section */}

        {data.studentSection && (
          <Section>
            {data.studentSection.image && (
              <div className="mb-8">
                <ResponsiveImage
                  image={data.studentSection.image}
                  alt="Children's Mural Program students"
                />
              </div>
            )}

            <RichTextContent
              value={data.studentSection.content}
              className="
                text-sm
                font-semibold
                leading-6
                text-[#828282]
                sm:text-base
              "
            />
          </Section>
        )}

        {/* Shipyard news */}

        {data.shipyardNews?.length && (
          <Section>
            <RichTextContent
              value={data.shipyardNews}
              className="text-lg sm:text-xl"
            />
          </Section>
        )}

        {/* Heidi section */}

        {data.heidiSection && (
          <Section className="mb-24">
            <RichTextContent
              value={data.heidiSection.description}
              className="mb-10 text-lg sm:text-xl"
            />

            <YouTubeVideo
              url={data.heidiSection.videoUrl}
              title="Heidi Hardin explains the Children's Mural Program"
            />
          </Section>
        )}

        {/* Outcomes heading */}

        {(data.outcomesHeading?.length || data.outcomesVideoUrl) && (
          <Section>
            <RichTextContent
              value={data.outcomesHeading}
              className="
                mb-10
                w-full
                font-[var(--font-instrument-sans)]
              "
            />

            <YouTubeVideo
              url={data.outcomesVideoUrl}
              title="Children's Mural Program Outcomes"
            />
          </Section>
        )}

        {/* Murals section */}

        {data.muralsSection && (
          <Section>
            <RichTextContent
              value={data.muralsSection.heading}
              className="
                font-[var(--font-instrument-sans)]
              "
            />

            <RichTextContent
              value={data.muralsSection.content}
              className="text-lg sm:text-xl"
            />
          </Section>
        )}

        {/* Stream section */}

        {data.streamSection && (
          <Section>
            <RichTextContent
              value={data.streamSection.heading}
              className="
                font-[var(--font-instrument-sans)]
              "
            />

            <RichTextContent
              value={data.streamSection.content}
              className="
                mb-10
                text-lg
                sm:text-xl
              "
            />

            <ImageGallery
              images={data.streamSection.images}
              title="Stream of Consciousness"
            />
          </Section>
        )}

        {/* Final celebrations */}

        {data.finalCelebrations && (
          <Section>
            {/* Final Celebrations heading */}
            <RichTextContent
              value={data.finalCelebrations.heading}
              className="
                mb-8
                w-full
                font-[var(--font-instrument-sans)]
              "
            />

            {/* Existing content */}
            <RichTextContent
              value={data.finalCelebrations.content}
              className="
                mb-10
                text-lg
                sm:text-xl
              "
            />

            {data.finalCelebrations.image && (
              <figure>
                <ResponsiveImage
                  image={data.finalCelebrations.image}
                  alt="CMP Final Celebration"
                />

                {/* Short note under image */}
                {data.finalCelebrations.imageCaption && (
                  <RichTextContent
                    value={data.finalCelebrations.imageCaption}
                    className="
                      mt-4
                      text-center
                      text-sm
                      font-semibold
                      leading-6
                      text-[#7a6d5c]
                    "
                  />
                )}

                {/* long paragraph */}
                {data.finalCelebrations.caption && (
                  <RichTextContent
                    value={data.finalCelebrations.caption}
                    className="
                      mt-6
                      text-lg
                      sm:text-xl
                    "
                  />
                )}
              </figure>
            )}
          </Section>
        )}

        {/* Essay anthologies */}

        {data.essayAnthologies && (
          <Section>
            <RichTextContent
              value={data.essayAnthologies.heading}
              className="
                font-[var(--font-instrument-sans)]
              "
            />

            {data.essayAnthologies.image && (
              <div className="mb-8">
                <ResponsiveImage
                  image={data.essayAnthologies.image}
                  alt="CMP Essay Anthologies"
                />
              </div>
            )}

            <RichTextContent
              value={
                data.essayAnthologies.image?.caption}
              className="
                mb-12
                text-sm
                font-semibold
                text-[#828282]
                leading-6
                sm:text-base
              "
            />

            <RichTextContent
              value={
                data.essayAnthologies.galleryHeading
              }
              className="
                mb-10
                text-center
                text-2xl
                font-bold
                text-[#424242]
                sm:text-3xl
              "
            />

            <ImageGallery
              images={
                data.essayAnthologies.awardsGallery
              }
              title="CMP essays and awards"
            />
          </Section>
        )}

        {/* Final gallery */}

        {(data.finalGalleryDescription?.length ||
          data.finalGallery?.length) && (
          <Section>
            <RichTextContent
              value={data.finalGalleryDescription}
              className="
                mb-12
                text-lg
                sm:text-xl
              "
            />

            <ImageGallery
              images={data.finalGallery}
              title="CMP final celebrations and murals"
              centerThumbnails
            />
          </Section>
        )}

        {/* Social links */}

        <div className="mt-10 flex justify-center">
          <SocialLinks />
        </div>
      </div>
    </main>
  )
}