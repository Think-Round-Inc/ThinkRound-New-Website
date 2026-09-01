'use client'

import {useState} from 'react'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <form
      className="space-y-7"
      onSubmit={handleSubmit}
    >
      {/* Name */}
      <div>
        <label className="mb-3 block text-2xl text-[#828282]">
          Name
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-[#999999]">
              First Name
              <span className="ml-1">(required)</span>
            </label>

            <input
              type="text"
              required
              className="
                h-14
                w-full
                border
                border-[#aaaaaa]
                bg-white
                px-3
                outline-none
                focus:border-[#666666]
              "
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-[#999999]">
              Last Name
              <span className="ml-1">(required)</span>
            </label>

            <input
              type="text"
              required
              className="
                h-14
                w-full
                border
                border-[#aaaaaa]
                bg-white
                px-3
                outline-none
                focus:border-[#666666]
              "
            />
          </div>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-2xl text-[#828282]">
          Email
          <span className="ml-2 text-xs text-[#999999]">
            (required)
          </span>
        </label>

        <input
          type="email"
          required
          className="
            h-14
            w-full
            border
            border-[#aaaaaa]
            bg-white
            px-3
            outline-none
            focus:border-[#666666]
          "
        />
      </div>

      {/* Subject */}
      <div>
        <label className="mb-2 block text-2xl text-[#828282]">
          Subject
          <span className="ml-2 text-xs text-[#999999]">
            (required)
          </span>
        </label>

        <input
          type="text"
          required
          className="
            h-14
            w-full
            border
            border-[#aaaaaa]
            bg-white
            px-3
            outline-none
            focus:border-[#666666]
          "
        />
      </div>

      {/* Message */}
      <div>
        <label className="mb-2 block text-2xl text-[#828282]">
          Message
          <span className="ml-2 text-xs text-[#999999]">
            (required)
          </span>
        </label>

        <textarea
          required
          rows={4}
          className="
            w-full
            resize-none
            border
            border-[#aaaaaa]
            bg-white
            p-3
            outline-none
            focus:border-[#666666]
          "
        />
      </div>

      <button
        type="submit"
        className="
          mt-5
          h-[85px]
          w-[255px]
          bg-[#4b0082]
          text-lg
          font-bold
          uppercase
          tracking-[0.35em]
          text-white
          transition
          hover:opacity-90
        "
      >
        Submit
      </button>

      {submitted && (
        <p className="mt-6 text-xl font-semibold text-[#424242]">
          Thank you! Your message has been submitted.
        </p>
      )}
    </form>
  )
}