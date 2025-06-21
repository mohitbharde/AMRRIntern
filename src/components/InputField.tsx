import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  rows?: number;
  cols?: number | undefined;
  accept?: string;
  multiple?: boolean;
}

export const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  cols,
  rows,
  accept,
  multiple = false,
}: InputFieldProps) => {
  return (
    <div className="mb-6 relative">
      <label
        htmlFor={name}
        className="text-sm ml-2 p-2 -mt-4 bg-white font-medium text-blue-600 absolute"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {type == "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          cols={cols}
          rows={rows}
          className={`w-full px-4 py-2 border rounded-md mt-1 focus:outline-none ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className={`w-full px-4 py-2 border rounded-md mt-1 focus:outline-none ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          accept={accept}
          multiple={multiple}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
