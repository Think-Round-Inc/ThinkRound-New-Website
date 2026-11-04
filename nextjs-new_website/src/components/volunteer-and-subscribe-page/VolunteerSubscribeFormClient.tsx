"use client";
import React, { useState } from "react";
import Interest from "@/app/volunteer/components/Interest";
import Subject from "@/app/subscribe/components/Subject";
import Modal from "./Modal";
import type { FormMode } from "@/types/common";

type Props = {
  id: FormMode;
};

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  interest: string;
  subject: string;
};

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
  interest: "",
  subject: "",
};

const emailPattern = /^\S+@\S+\.\S+$/;

export default function VolunteerSubscribeFormClient({ id }: Props) {
  const extraField = id === "volunteer" ? "interest" : "subject";
  const endpoint = `/api/forms/${id}`;
  const [values, setValues] = useState<FormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});
  const [modalError, setModalError] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState<string | null>(null);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const e: Partial<Record<keyof FormValues, string>> = {};

    if (!values.firstName.trim()) e.firstName = "First name is required";
    if (!values.lastName.trim()) e.lastName = "Last name is required";
    if (!values.email.trim()) e.email = "Email is required";
    else if (!emailPattern.test(values.email)) e.email = "Email is invalid";
    if (!values.message.trim()) e.message = "Message is required";

    if (!values[extraField].trim()) {
      e[extraField] = extraField === "interest"
        ? "Please select an option"
        : "Subject is required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          message: values.message,
          [extraField]: values[extraField],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setModalError(data.error || "Submission failed");
        return;
      }

      setSuccessModal("Form submitted successfully.");
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      console.error(error);

      setModalError(
        error instanceof Error ? error.message : "Submission failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg"
      style={{ fontSize: "clamp(1em, 4vw, 1.9em)" }}
    >
      <div className="flex flex-row">
        <div className="w-full me-5">
          <label htmlFor="firstName" className="block font-medium">
            First Name *
          </label>
          <input
            id="firstName"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            type="text"
            className="mt-1 w-full border rounded px-3 py-2 bg-gray-100 focus:ring focus:ring-blue-300"
          />
          {errors.firstName && (
            <p className="text-red-600 mt-1" style={{ fontSize: "0.8em" }}>
              {errors.firstName}
            </p>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="lastName" className="block font-medium">
            Last Name *
          </label>
          <input
            id="lastName"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            type="text"
            className="mt-1 w-full border rounded px-3 py-2 bg-gray-100 focus:ring focus:ring-blue-300"
          />
          {errors.lastName && (
            <p className="text-red-600 mt-1" style={{ fontSize: "0.8em" }}>
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block font-medium">
          Email *
        </label>
        <input
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          type="email"
          className="mt-1 w-full border rounded px-3 py-2 bg-gray-100 focus:ring focus:ring-blue-300"
        />
        {errors.email && (
          <p className="text-red-600 mt-1" style={{ fontSize: "0.8em" }}>
            {errors.email}
          </p>
        )}
      </div>

      {id === "volunteer" ? (
        <Interest
          value={values.interest}
          onChange={(value) =>
            setValues((prev) => ({ ...prev, interest: value }))
          }
          error={errors.interest}
        />
      ) : (
        <Subject
          value={values.subject}
          onChange={(value) =>
            setValues((prev) => ({ ...prev, subject: value }))
          }
          error={errors.subject}
        />
      )}

      <div>
        <label htmlFor="message" className="block font-medium">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          rows={4}
          className="mt-1 w-full border rounded px-3 py-2 bg-gray-100 focus:ring focus:ring-blue-300"
        ></textarea>
        {errors.message && (
          <p className="text-red-600 mt-1" style={{ fontSize: "0.8em" }}>
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-purple-900 text-white px-9 py-5 disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          letterSpacing: "0.3em",
        }}
      >
        {isSubmitting ? "SUBMITTING…" : "SUBMIT"}
      </button>
      {modalError && (
        <Modal
          title="Submission error"
          tone="error"
          message={modalError}
          onClose={() => setModalError(null)}
        />
      )}
      {successModal && (
        <Modal
          title="Success"
          tone="success"
          message={successModal}
          onClose={() => setSuccessModal(null)}
        />
      )}
    </form>
  );
}
