import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export default function Interest({ value, onChange, error }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label className="block font-medium">Interest *</label>
      <select
        name="interest"
        value={value}
        onChange={handleChange}
        className="mt-1 w-full border rounded px-3 py-2 bg-gray-100 focus:ring focus:ring-blue-300"
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
      {error && (
        <p className="text-red-600 mt-1" style={{ fontSize: "0.8em" }}>
          {error}
        </p>
      )}
    </div>
  );
}
