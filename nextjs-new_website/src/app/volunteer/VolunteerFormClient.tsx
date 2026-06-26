"use client";
import React, { useState } from "react";

type Props = {
  initialForm: any;
};

export default function VolunteerFormClient({ initialForm }: Props) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dropdown: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setValues((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!values.firstName.trim()) e.firstName = "First name is required";
    if (!values.lastName.trim()) e.lastName = "Last name is required";
    if (!values.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = "Email is invalid";
    if (!values.dropdown) e.dropdown = "Please select an option";
    if (!values.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    // Replace with API submission when ready
    console.log(
      "Volunteer form submitted:",
      values,
      "initialForm:",
      initialForm,
    );
    alert("Form submitted — check console for details.");
    // Optionally reset form
    setValues({
      firstName: "",
      lastName: "",
      email: "",
      dropdown: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-lg"
      style={{ fontSize: "clamp(1em, 4vw, 1.9em)" }}
    >
      <div className="flex flex-row">
        <div className="w-full me-5">
          <label className="block  font-medium">First Name *</label>
          <input
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            type="text"
            className="mt-1 w-full border rounded px-3 py-2 bg-gray-100 focus:ring focus:ring-blue-300"
          />
          {errors.firstName && (
            <p className="text-red-600  mt-1" style={{ fontSize: "0.8em" }}>
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
            className="mt-1 w-full border rounded px-3 py-2 bg-gray-100  focus:ring focus:ring-blue-300"
          />
          {errors.lastName && (
            <p className="text-red-600 mt-1" style={{ fontSize: "0.8em" }}>
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block  font-medium">Email *</label>
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          type="email"
          className="mt-1 w-full border rounded px-3 py-2 bg-gray-100  focus:ring focus:ring-blue-300"
        />
        {errors.email && (
          <p className="text-red-600 mt-1" style={{ fontSize: "0.8em" }}>
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label className="block font-medium">Interest *</label>
        <select
          name="dropdown"
          value={values.dropdown}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-3 py-2 bg-gray-100  focus:ring focus:ring-blue-300"
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="UX/UI Developer">UX/UI Developer</option>
          <option value="Unity XR and 3D Gaming">Unity XR and 3D Gaming</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="3D Architecture, Drafting and Rendering">
            3D Architecture, Drafting and Rendering
          </option>
          <option value="4D Cinema">4D Cinema</option>
          <option value="Social Media Marketing">Social Media Marketing</option>
          <option value="Video/Short Film Making/Editing">
            Video/Short Film Making/Editing
          </option>
          <option value="Business Development & Partnerships Specialist">
            Business Development & Partnerships Specialist
          </option>
          <option value="Curriculum Development">Curriculum Development</option>
          <option value="Blog Writing">Blog Writing</option>
          <option value="Generative AI Prompt Engineering">
            Generative AI Prompt Engineering
          </option>
          <option value="Peace by 2030 Team Members">
            Peace by 2030 Team Members
          </option>
          <option value="Other, please specify in the message box.">
            Other, please specify in the message box.
          </option>
        </select>
        {errors.dropdown && (
          <p className="text-red-600  mt-1" style={{ fontSize: "0.8em" }}>
            {errors.dropdown}
          </p>
        )}
      </div>

      <div>
        <label className="block font-medium">Message *</label>
        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          rows={4}
          className="mt-1 w-full border rounded px-3 py-2 bg-gray-100  focus:ring focus:ring-blue-300"
        ></textarea>
        {errors.message && (
          <p className="text-red-600 mt-1" style={{ fontSize: "0.8em" }}>
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className=" bg-purple-900 text-white px-9 py-5"
        style={{ cursor: "pointer", letterSpacing: "0.3em" }}
      >
        SUBMIT
      </button>
    </form>
  );
}
