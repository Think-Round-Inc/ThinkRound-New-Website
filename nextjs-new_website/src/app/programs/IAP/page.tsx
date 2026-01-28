import { createClient } from 'next-sanity'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

/* ---------------- SANITY CLIENT ---------------- */

const client = createClient({
  projectId: 's3cfqcyr',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
})

/* ---------------- TYPES ---------------- */

interface ImageAsset {
  asset?: {
    url: string
    metadata?: {
      dimensions?: {
        width: number
        height: number
      }
    }
  }
}

interface StudentBlock {
  _type: string
  image?: ImageAsset
  asset?: ImageAsset['asset']
  widthPercentage?: number
  children?: { text: string }[]
}

interface IapPageData {
  title: string
  heroImages: ImageAsset[]
  body?: StudentBlock[]
  studentProjectsBody?: StudentBlock[]

}

/* ---------------- FETCH DATA ---------------- */

async function getIapPageData(): Promise<IapPageData> {
  const data = await client.fetch<any>(`
    *[_type == "iapPage"][0] {
      title,
      heroImage1 { asset->{url, metadata{dimensions}} },
      heroImage2 { asset->{url, metadata{dimensions}} },
      heroImage3 { asset->{url, metadata{dimensions}} },
      heroImage4 { asset->{url, metadata{dimensions}} },
      body[]{..., asset->{url, metadata{dimensions}}},
      studentProjectsBody[]{..., image{asset->{url, metadata{dimensions}}}, asset->{url, metadata{dimensions}}, widthPercentage},

    }
  `)

  return {
    title: data.title,
    heroImages: [
      data.heroImage1,
      data.heroImage2,
      data.heroImage3,
      data.heroImage4,
    ],
    body: data.body,
    studentProjectsBody: data.studentProjectsBody,

  }
}

/* ---------------- RENDER BLOCKS ---------------- */

function RenderBlocks({ blocks }: { blocks?: StudentBlock[] }) {
  if (!blocks?.length) return null

  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
        /* TEXT */
        if (block._type === 'block') {
          return (
            <p key={index} className="text-lg text-gray-700 leading-relaxed">
              {block.children?.map(c => c.text).join('')}
            </p>
          )
        }

        /* IMAGES (ALL STUDENT TYPES) */
        const isImage =
          block._type === 'image' ||
          block._type === 'studentProjectImage' ||
          block._type.includes('studentProject')

        if (isImage) {
          const asset = block.image?.asset || block.asset
          if (!asset?.url) return null

          const aspectRatio =
            asset.metadata?.dimensions
              ? `${asset.metadata.dimensions.width}/${asset.metadata.dimensions.height}`
              : '1/1'

          return (
            <div key={index} className="flex justify-center">
              <div
                className="relative rounded-lg overflow-hidden"
                style={{
                  width: `${block.widthPercentage ?? 100}%`,
                  maxWidth: '600px',
                  aspectRatio,
                }}
              >
                <Image
                  src={asset.url}
                  alt="Student artwork"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}

/* ---------------- PAGE ---------------- */

export default async function IapPage() {
  const iap = await getIapPageData()

  return (
    <main className="bg-white min-h-screen text-gray-900">
      <Navbar />

      {/* HERO */}
      <section className="pt-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-20">
          {iap.title}
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {iap.heroImages.map((img, i) => (
            <div
              key={i}
              className="relative w-full rounded-lg overflow-hidden bg-gray-200 shadow-lg"
              style={{
                aspectRatio: img?.asset?.metadata?.dimensions
                  ? `${img.asset.metadata.dimensions.width}/${img.asset.metadata.dimensions.height}`
                  : '1/1',
              }}
            >
              {img?.asset?.url && (
                <Image
                  src={img.asset.url}
                  alt="Hero image"
                  fill
                  className="object-contain"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 px-6 max-w-5xl mx-auto prose prose-lg">
        <RenderBlocks blocks={iap.body} />
      </section>

      {/* STUDENT ART WORK */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16">
          Student Art Works 🎨
        </h2>

        {[
          iap.studentProjectsBody,

        ].some(section => section?.length) && (
            <div className="space-y-20">
              <RenderBlocks blocks={iap.studentProjectsBody} />

            </div>
          )}
      </section>

      {/* SOCIAL MEDIA */}
      <section className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center gap-8">

            {/* Facebook */}
            <a href="https://www.facebook.com/thinkroundinc" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* X */}
            <a href="https://x.com/ThinkRound_" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.807-5.979 6.807H2.306l7.644-8.74L.754 2.25h6.844l4.707 6.225z" />
              </svg>
            </a>

            {/* Instagram Dropdown */}
            <div className="relative group flex items-center justify-center">
              <button className="text-gray-600 hover:text-pink-600 transition-colors flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <a href="https://www.instagram.com/thinkroundinc/" target="_blank" className="block px-4 py-2 hover:bg-gray-100">
                  Think Round Inc.
                </a>
                <a href="https://www.instagram.com/thinkround/" target="_blank" className="block px-4 py-2 hover:bg-gray-100 border-t">
                  Fine Arts Gallery
                </a>
              </div>
            </div>

            {/* YouTube */}
            <a href="https://www.youtube.com/channel/UCWwDo1uREn4oE02onTvMUaw" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
