import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export default function Subject({ value, onChange, error }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      <div>
        <label className="block  font-medium">Subject *</label>
        <input
          name="subject"
          value={value}
          onChange={handleChange}
          type="text"
          className="mt-1 w-full border rounded px-3 py-2 bg-gray-100 focus:ring focus:ring-blue-300"
        />
        {error && (
          <p className="text-red-600 mt-1" style={{ fontSize: "0.8em" }}>
            {error}
          </p>
        )}
      </div>
    </>
  );
}
