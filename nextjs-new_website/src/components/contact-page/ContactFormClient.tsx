"use client";

import {useState} from "react";
import Modal from "@/components/volunteer-and-subscribe-page/Modal";

export default function ContactFormClient() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [successModal, setSuccessModal] = useState<string | null>(null);
  const [errorModal, setErrorModal] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch("/api/forms/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorModal(data.error || "Submission failed.");
        return;
      }

      setSuccessModal("Thank you! Your message has been submitted successfully.");

      setFirstName("");
      setLastName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Contact form submission failed:", error);

      setErrorModal("Unable to submit the form right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-7">
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
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
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
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
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {submitting ? "Sending..." : "Submit"}
        </button>
      </form>

      {successModal && (
        <Modal
          title="Thank you!"
          textColor="green"
          message={successModal}
          onClose={() => setSuccessModal(null)}
        />
      )}

      {errorModal && (
        <Modal
          title="Submission error"
          textColor="red"
          message={errorModal}
          onClose={() => setErrorModal(null)}
        />
      )}
    </>
  );
}