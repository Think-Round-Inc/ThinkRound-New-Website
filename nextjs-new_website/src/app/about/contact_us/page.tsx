import {client} from '@/sanity/client'
import {Instrument_Sans, League_Spartan} from 'next/font/google'
import ContactFormClient from '@/components/contact-page/ContactFormClient'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument-sans',
})

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  variable: '--font-league-spartan',
})

interface ContactUsData {
  pageTitle?: string
  officeHeading?: string
  addressLine1?: string
  addressLine2?: string
  country?: string
  email?: string
  phone?: string
}

export const revalidate = 30

export default async function ContactUsPage() {
  const data = await client.fetch<ContactUsData>(
    `*[_type == "contactUs"][0]{
      pageTitle,
      officeHeading,
      addressLine1,
      addressLine2,
      country,
      email,
      phone
    }`,
  )

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black">
            Contact Us content not found
          </h1>

          <p className="mt-4 text-gray-600">
            Create and publish the Contact Us document in Sanity Studio.
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
        py-12
        font-[var(--font-league-spartan)]
        text-[#424242]
        sm:px-12
        sm:py-16
        lg:px-12
      `}
    >
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-[1750px]
          gap-10
          lg:grid-cols-[2fr_1fr]
        "
      >
        {/* LEFT SIDE - Contact form */}
        <div>
          <h1
            className="
              mb-20
              text-5xl
              font-semibold
              tracking-tight
              text-[#2e2e2e]
              sm:text-6xl
            "
          >
            {data.pageTitle || 'Contact Us'}
          </h1>

          {/* API-connected Contact Form */}
          <ContactFormClient />
        </div>

        {/* RIGHT SIDE - Office information */}
        <aside className="pt-2">
          <h2
            className="
              mb-3
              text-2xl
              font-bold
              text-[#2e2e2e]
            "
          >
            {data.officeHeading || 'Our Office'}
          </h2>

          <div
            className="
              text-xl
              leading-10
              text-[#828282]
              sm:text-2xl
            "
          >
            {/* Address */}
            {data.addressLine1 && (
              <p>{data.addressLine1}</p>
            )}

            {data.addressLine2 && (
              <p>{data.addressLine2}</p>
            )}

            {data.country && (
              <p>{data.country}</p>
            )}

            {/* Email */}
            {data.email && (
              <div className="mt-8 flex items-baseline gap-2">
                <span>Email:</span>

                <a
                  href={`mailto:${data.email}`}
                  className="hover:underline"
                >
                  {data.email}
                </a>
              </div>
            )}

            {/* Phone */}
            {data.phone && (
              <div className="mt-6 flex items-baseline gap-3">
                <span>Phone:</span>

                <a
                  href={`tel:${data.phone}`}
                  className="hover:underline"
                >
                  {data.phone}
                </a>
              </div>
            )}

            {/* Google Map */}
            <div className="mt-8 w-full overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=2140+Bush+Street+Suite+1+San+Francisco+CA+94115&output=embed"
                width="100%"
                height="420"
                style={{border: 0}}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Think Round Office Location"
                className="w-full"
              />
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}