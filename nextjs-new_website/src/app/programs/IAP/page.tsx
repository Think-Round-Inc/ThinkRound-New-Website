import { createClient } from 'next-sanity'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const client = createClient({
  projectId: 's3cfqcyr',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
})

interface IapPageData {
  _id: string
  title: string
  heroImage1?: {
    asset: {
      url: string
      metadata?: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }
  heroImage2?: {
    asset: {
      url: string
      metadata?: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }
  heroImage3?: {
    asset: {
      url: string
      metadata?: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }
  heroImage4?: {
    asset: {
      url: string
      metadata?: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }
  body?: any[]
  studentProjectsBody?: any[]
  studentProject1?: any[]
  studentProject2?: any[]
  studentProject3?: any[]
  studentProject4?: any[]
  studentProject5?: any[]
}

async function getIapPageData() {
  return client.fetch<IapPageData>(`
    *[_type == "iapPage"][0] {
      _id, title,
      heroImage1 { asset->{url, metadata {dimensions}} },
      heroImage2 { asset->{url, metadata {dimensions}} },
      heroImage3 { asset->{url, metadata {dimensions}} },
      heroImage4 { asset->{url, metadata {dimensions}} },
      body[] {
        ...,
        asset->{url, metadata {dimensions}}
      },
      studentProjectsBody[] {
        ...,
        image { asset->{url, metadata {dimensions}} },
        asset->{url, metadata {dimensions}},
        widthPercentage
      },
      studentProject1[] {
        ...,
        image { asset->{url, metadata {dimensions}} },
        asset->{url, metadata {dimensions}},
        widthPercentage
      },
      studentProject2[] {
        ...,
        image { asset->{url, metadata {dimensions}} },
        asset->{url, metadata {dimensions}},
        widthPercentage
      },
      studentProject3[] {
        ...,
        image { asset->{url, metadata {dimensions}} },
        asset->{url, metadata {dimensions}},
        widthPercentage
      },
      studentProject4[] {
        ...,
        image { asset->{url, metadata {dimensions}} },
        asset->{url, metadata {dimensions}},
        widthPercentage
      },
      studentProject5[] {
        ...,
        image { asset->{url, metadata {dimensions}} },
        asset->{url, metadata {dimensions}},
        widthPercentage
      }
    }
  `)
}

export default async function IapPage() {
  const iapData = await getIapPageData()

  return (
    <main className="bg-white min-h-screen font-sans text-gray-900">
      <Navbar />
      {/* HERO SECTION - Image Gallery with Title */}
      <section className="pt-20 pb-0 px-6 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Intergenerational Afterschool Program
          </h1>
        </div>

        {/* Hero Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
          {/* Image 1 */}
          <div 
            className="relative w-full rounded-lg overflow-hidden bg-gray-200 shadow-lg"
            style={{
              aspectRatio: iapData?.heroImage1?.asset?.metadata?.dimensions 
                ? `${iapData.heroImage1.asset.metadata.dimensions.width}/${iapData.heroImage1.asset.metadata.dimensions.height}`
                : '1/1'
            }}
          >
            {iapData?.heroImage1 ? (
              <Image
                src={iapData.heroImage1.asset.url}
                alt="Hero Image 1"
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
            )}
          </div>

          {/* Image 2 */}
          <div 
            className="relative w-full rounded-lg overflow-hidden bg-gray-200 shadow-lg"
            style={{
              aspectRatio: iapData?.heroImage2?.asset?.metadata?.dimensions 
                ? `${iapData.heroImage2.asset.metadata.dimensions.width}/${iapData.heroImage2.asset.metadata.dimensions.height}`
                : '1/1'
            }}
          >
            {iapData?.heroImage2 ? (
              <Image
                src={iapData.heroImage2.asset.url}
                alt="Hero Image 2"
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
            )}
          </div>

          {/* Image 3 */}
          <div 
            className="relative w-full rounded-lg overflow-hidden bg-gray-200 shadow-lg"
            style={{
              aspectRatio: iapData?.heroImage3?.asset?.metadata?.dimensions 
                ? `${iapData.heroImage3.asset.metadata.dimensions.width}/${iapData.heroImage3.asset.metadata.dimensions.height}`
                : '1/1'
            }}
          >
            {iapData?.heroImage3 ? (
              <Image
                src={iapData.heroImage3.asset.url}
                alt="Hero Image 3"
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
            )}
          </div>

          {/* Image 4 */}
          <div 
            className="relative w-full rounded-lg overflow-hidden bg-gray-200 shadow-lg"
            style={{
              aspectRatio: iapData?.heroImage4?.asset?.metadata?.dimensions 
                ? `${iapData.heroImage4.asset.metadata.dimensions.width}/${iapData.heroImage4.asset.metadata.dimensions.height}`
                : '1/1'
            }}
          >
            {iapData?.heroImage4 ? (
              <Image
                src={iapData.heroImage4.asset.url}
                alt="Hero Image 4"
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - Text with Purpose */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        {iapData?.body ? (
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            {iapData.body.map((block: any, index: number) => {
              if (block._type === 'block') {
                return (
                  <p key={index} className="text-xl leading-relaxed">
                    {block.children?.map((child: any) => child.text).join('')}
                  </p>
                )
              } else if (block._type === 'image' && block.asset?.url) {
                return (
                  <div 
                    key={index} 
                    className="relative w-full rounded-lg overflow-hidden my-6"
                    style={{
                      aspectRatio: block.asset?.metadata?.dimensions 
                        ? `${block.asset.metadata.dimensions.width}/${block.asset.metadata.dimensions.height}`
                        : '4/3'
                    }}
                  >
                    <Image
                      src={block.asset.url}
                      alt="Section content"
                      fill
                      className="object-contain"
                    />
                  </div>
                )
              }
              return null
            })}
          </div>
        ) : (
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-xl leading-relaxed">
              The Intergenerational Afterschool Program provides students with the opportunity to develop high-level art and 21st-century skills in a safe environment. It is an after-school program that brings together artists aged 60+ to work alongside young people to create collaborative public murals and other art forms.
            </p>
            
            <p className="text-xl leading-relaxed">
              Intergenerational Afterschool Program provides students with the opportunity to create high-end public artworks for display in their own community while enrolled in Afterschool activities. Building creative ownership, civic pride and contribution, art skills, and camaraderie pervade our intentions as children, youth, and teens interact with our artists/instructors over sixty and our youth interns in college. The next opportunity we hope to provide our students is a small business entrepreneurship program so that children can begin to learn the business of art, that entrepreneurship can be fun as well as beneficial to their own families, their school, their community, the city of San Francisco, and well beyond. Their artworks are conceived to be the centerpiece of public artworks for The Center for the Human Family and within The Paradise Project itself.
            </p>

            <p className="text-xl leading-relaxed">
              For more information, and more images of our Intergenerational Afterschool Program (IAP), please visit TRI's website PROGRAMS tab: STREAM OF CONSCIOUSNESS. There you can read about our largest, most recent public artwork created in IAP. Please enjoy the video explaining how we teach our students to think round as they learn invaluable art and science lessons about the precious nature of Air, Water, and Soil, and their impact on Plants, Animals, and People. Also, see and enjoy the scope and quality of our IAP students and artist/instructors' creations as evidenced in this seminal public artwork.
            </p>
          </div>
        )}
      </section>

      {/* IMAGE SHOWCASE - Grid of Student Projects */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold text-gray-900 mb-12 text-center">Student Art Works</h2>

        {(iapData?.studentProjectsBody && iapData.studentProjectsBody.length > 0) ||
        iapData?.studentProject1?.length ||
        iapData?.studentProject2?.length ||
        iapData?.studentProject3?.length ||
        iapData?.studentProject4?.length ||
        iapData?.studentProject5?.length ? (
          <div className="space-y-16">
            {/* studentProjectsBody Section */}
            {iapData.studentProjectsBody && iapData.studentProjectsBody.length > 0 && (
              <div className="space-y-6">
                <div className="space-y-8">
                  {iapData.studentProjectsBody.map((block: any, index: number) => {
                    // Handle new named object type
                    if (block._type === 'studentProjectImage' && block.image?.asset?.url) {
                      const widthPercentage = block.widthPercentage || 100;
                      return (
                        <div 
                          key={`studentProjectsBody-${index}`}
                          className="flex justify-center"
                        >
                          <div 
                            className="relative rounded-lg overflow-hidden"
                            style={{
                              width: `${widthPercentage}%`,
                              maxWidth: '600px',
                              aspectRatio: '1/1',
                              margin: '0 auto'
                            }}
                          >
                            <Image
                              src={block.image.asset.url}
                              alt="Student project"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      )
                    }
                    // Handle old plain image type
                    if (block._type === 'image' && block.asset?.url) {
                      return (
                        <div 
                          key={`studentProjectsBody-${index}`}
                          className="flex justify-center"
                        >
                          <div 
                            className="relative rounded-lg overflow-hidden"
                            style={{
                              width: '100%',
                              maxWidth: '600px',
                              aspectRatio: '1/1',
                              margin: '0 auto'
                            }}
                          >
                            <Image
                              src={block.asset.url}
                              alt="Student project"
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
                {iapData.studentProjectsBody.map((block: any, index: number) => {
                  if (block._type === 'block') {
                    return (
                      <p key={`body-${index}`} className="text-lg leading-relaxed text-gray-700">
                        {block.children?.map((child: any) => child.text).join('')}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            )}

            {/* studentProject1 Section */}
            {iapData.studentProject1 && iapData.studentProject1.length > 0 && (
              <div className="space-y-6">
                <div className="space-y-8">
                  {iapData.studentProject1.map((block: any, index: number) => {
                    // Handle new named object type
                    if (block._type === 'studentProject1Image' && block.image?.asset?.url) {
                      const widthPercentage = block.widthPercentage || 100;
                      return (
                        <div 
                          key={`studentProject1-${index}`}
                          className="flex justify-center"
                        >
                          <div 
                            className="relative rounded-lg overflow-hidden"
                            style={{
                              width: `${widthPercentage}%`,
                              maxWidth: '600px',
                              aspectRatio: '1/1',
                              margin: '0 auto'
                            }}
                          >
                            <Image
                              src={block.image.asset.url}
                              alt="Student project"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      )
                    }
                    // Handle old plain image type
                    if (block._type === 'image' && block.asset?.url) {
                      return (
                        <div 
                          key={`studentProject1-${index}`}
                          className="flex justify-center"
                        >
                          <div 
                            className="relative rounded-lg overflow-hidden"
                            style={{
                              width: '100%',
                              maxWidth: '600px',
                              aspectRatio: '1/1',
                              margin: '0 auto'
                            }}
                          >
                            <Image
                              src={block.asset.url}
                              alt="Student project"
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
                {iapData.studentProject1.map((block: any, index: number) => {
                  if (block._type === 'block') {
                    return (
                      <p key={`project1-text-${index}`} className="text-lg leading-relaxed text-gray-700">
                        {block.children?.map((child: any) => child.text).join('')}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            )}

            {/* studentProject2 Section */}
            {iapData.studentProject2 && iapData.studentProject2.length > 0 && (
              <div className="space-y-6">
                <div className="space-y-8">
                  {iapData.studentProject2.map((block: any, index: number) => {
                    // Handle new named object type
                    if (block._type === 'studentProject2Image' && block.image?.asset?.url) {
                      const widthPercentage = block.widthPercentage || 100;
                      return (
                        <div 
                          key={`studentProject2-${index}`}
                          className="flex justify-center"
                        >
                          <div 
                            className="relative rounded-lg overflow-hidden"
                            style={{
                              width: `${widthPercentage}%`,
                              maxWidth: '600px',
                              aspectRatio: '1/1',
                              margin: '0 auto'
                            }}
                          >
                            <Image
                              src={block.image.asset.url}
                              alt="Student project"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      )
                    }
                    // Handle old plain image type
                    if (block._type === 'image' && block.asset?.url) {
                      return (
                        <div 
                          key={`studentProject2-${index}`}
                          className="flex justify-center"
                        >
                          <div 
                            className="relative rounded-lg overflow-hidden"
                            style={{
                              width: '100%',
                              maxWidth: '600px',
                              aspectRatio: '1/1',
                              margin: '0 auto'
                            }}
                          >
                            <Image
                              src={block.asset.url}
                              alt="Student project"
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
                {iapData.studentProject2.map((block: any, index: number) => {
                  if (block._type === 'block') {
                    return (
                      <p key={`project2-text-${index}`} className="text-lg leading-relaxed text-gray-700">
                        {block.children?.map((child: any) => child.text).join('')}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            )}

            {/* studentProject3 Section */}
            {iapData.studentProject3 && iapData.studentProject3.length > 0 && (
              <div className="space-y-6">
                <div className="space-y-8">
                  {iapData.studentProject3.map((block: any, index: number) => {
                    // Handle new named object type
                    if (block._type === 'studentProject3Image' && block.image?.asset?.url) {
                      const widthPercentage = block.widthPercentage || 100;
                      return (
                        <div 
                          key={`studentProject3-${index}`}
                          className="flex justify-center"
                        >
                          <div 
                            className="relative rounded-lg overflow-hidden"
                            style={{
                              width: `${widthPercentage}%`,
                              maxWidth: '600px',
                              aspectRatio: '1/1',
                              margin: '0 auto'
                            }}
                          >
                            <Image
                              src={block.image.asset.url}
                              alt="Student project"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      )
                    }
                    // Handle old plain image type
                    if (block._type === 'image' && block.asset?.url) {
                      return (
                        <div 
                          key={`studentProject3-${index}`}
                          className="flex justify-center"
                        >
                          <div 
                            className="relative rounded-lg overflow-hidden"
                            style={{
                              width: '100%',
                              maxWidth: '600px',
                              aspectRatio: '1/1',
                              margin: '0 auto'
                            }}
                          >
                            <Image
                              src={block.asset.url}
                              alt="Student project"
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
                {iapData.studentProject3.map((block: any, index: number) => {
                  if (block._type === 'block') {
                    return (
                      <p key={`project3-text-${index}`} className="text-lg leading-relaxed text-gray-700">
                        {block.children?.map((child: any) => child.text).join('')}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            )}

            {/* studentProject4 Section */}
            {iapData.studentProject4 && iapData.studentProject4.length > 0 && (
              <div className="space-y-6">
                <div className="space-y-8">
                  {iapData.studentProject4.map((block: any, index: number) => {
                    // Handle new named object type
                    if (block._type === 'studentProject4Image' && block.image?.asset?.url) {
                      const widthPercentage = block.widthPercentage || 100;
                      return (
                        <div 
                          key={`studentProject4-${index}`}
                          className="flex justify-center"
                        >
                          <div 
                            className="relative rounded-lg overflow-hidden"
                            style={{
                              width: `${widthPercentage}%`,
                              maxWidth: '600px',
                              aspectRatio: '1/1',
                              margin: '0 auto'
                            }}
                          >
                            <Image
                              src={block.image.asset.url}
                              alt="Student project"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      )
                    }
                    // Handle old plain image type
                    if (block._type === 'image' && block.asset?.url) {
                      return (
                        <div 
                          key={`studentProject4-${index}`}
                          className="flex justify-center"
                        >
                          <div 
                            className="relative rounded-lg overflow-hidden"
                            style={{
                              width: '100%',
                              maxWidth: '600px',
                              aspectRatio: '1/1',
                              margin: '0 auto'
                            }}
                          >
                            <Image
                              src={block.asset.url}
                              alt="Student project"
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
                {iapData.studentProject4.map((block: any, index: number) => {
                  if (block._type === 'block') {
                    return (
                      <p key={`project4-text-${index}`} className="text-lg leading-relaxed text-gray-700">
                        {block.children?.map((child: any) => child.text).join('')}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            )}

            {/* studentProject5 Section */}
            {iapData.studentProject5 && iapData.studentProject5.length > 0 && (
              <div className="space-y-6">
                <div className="space-y-8">
                  {iapData.studentProject5.map((block: any, index: number) => {
                    // Handle new named object type
                    if (block._type === 'studentProject5Image' && block.image?.asset?.url) {
                      const widthPercentage = block.widthPercentage || 100;
                      return (
                        <div 
                          key={`studentProject5-${index}`}
                          className="flex justify-center"
                        >
                          <div 
                            className="relative rounded-lg overflow-hidden"
                            style={{
                              width: `${widthPercentage}%`,
                              maxWidth: '600px',
                              aspectRatio: '1/1',
                              margin: '0 auto'
                            }}
                          >
                            <Image
                              src={block.image.asset.url}
                              alt="Student project"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      )
                    }
                    // Handle old plain image type
                    if (block._type === 'image' && block.asset?.url) {
                      return (
                        <div 
                          key={`studentProject5-${index}`}
                          className="flex justify-center"
                        >
                          <div 
                            className="relative rounded-lg overflow-hidden"
                            style={{
                              width: '100%',
                              maxWidth: '600px',
                              aspectRatio: '1/1',
                              margin: '0 auto'
                            }}
                          >
                            <Image
                              src={block.asset.url}
                              alt="Student project"
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
                {iapData.studentProject5.map((block: any, index: number) => {
                  if (block._type === 'block') {
                    return (
                      <p key={`project5-text-${index}`} className="text-lg leading-relaxed text-gray-700">
                        {block.children?.map((child: any) => child.text).join('')}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Gallery Coming Soon</h3>
            <p className="text-gray-600">
              Visit Sanity Studio to add student artworks
            </p>
          </div>
        )}
      </section>

      {/* SOCIAL MEDIA SECTION */}
      <section className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center gap-8">
            {/* Facebook */}
            <a 
              href="https://www.facebook.com/thinkroundinc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Twitter/X */}
            <a 
              href="https://x.com/ThinkRound_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
              aria-label="X (formerly Twitter)"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.807-5.979 6.807H2.306l7.644-8.74L.754 2.25h6.844l4.707 6.225zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Instagram Dropdown */}
            <div className="relative group">
              <button 
                className="text-gray-600 hover:text-pink-600 transition-colors flex items-center gap-1"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 rounded-lg shadow-lg bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <ul className="py-2">
                  <li>
                    <a 
                      href="https://www.instagram.com/thinkroundinc/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      Think Round Inc.
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.instagram.com/thinkround/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700 border-t border-gray-200"
                    >
                      Fine Arts Gallery
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* YouTube */}
            <a 
              href="https://www.youtube.com/channel/UCWwDo1uREn4oE02onTvMUaw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600 transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}