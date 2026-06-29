"use client";
import React, { useState } from "react";
import Interest from "@/app/volunteer/components/Interest";
import Subject from "@/app/subscribe/components/Subject";

type Props = {
  id: string;
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
  const isVolunteer = id === "volunteer";
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});
  const [modalError, setModalError] = useState<string | null>(null);
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

    if (isVolunteer) {
      if (!values.interest) e.interest = "Please select an option";
    } else {
      if (!values.subject.trim()) e.subject = "Subject is required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validateForm()) return;

    const payload = isVolunteer
      ? {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          interest: values.interest,
          message: values.message,
        }
      : {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          subject: values.subject,
          message: values.message,
        };

    try {
      const response = await fetch(
        isVolunteer ? "/api/forms/volunteer" : "/api/forms/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setModalError(data.error || "Submission failed");
        setValues(initialValues);
        return;
        // throw new Error(data.error || "Submission failed");
      }

      alert("Form submitted successfully.");
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      console.error(error);
      // alert(error instanceof Error ? error.message : "Submission failed");
      setModalError(
        error instanceof Error ? error.message : "Submission failed",
      );
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
          <label className="block font-medium">First Name *</label>
          <input
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
          <label className="block font-medium">Last Name *</label>
          <input
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
        <label className="block font-medium">Email *</label>
        <input
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

      {isVolunteer ? (
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
        <label className="block font-medium">Message *</label>
        <textarea
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
        className="bg-purple-900 text-white px-9 py-5"
        style={{ cursor: "pointer", letterSpacing: "0.3em" }}
      >
        SUBMIT
      </button>
      {modalError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-3">Submission error</h2>
            <p className="mb-6 text-xl text-gray-700">{modalError}</p>
            <button
              type="button"
              onClick={() => setModalError(null)}
              className="rounded bg-purple-900 py-3 px-7 text-white text-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
