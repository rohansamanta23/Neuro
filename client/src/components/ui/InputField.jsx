import React from "react";

const InputField = React.forwardRef(function InputField(
  { type, name, placeholder, value, onChange, autoComplete, onKeyDown },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      name={name}
      placeholder={placeholder}
      className="px-4 py-2 rounded-sm bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-silver border border-gray-700 transition"
      style={{ outlineColor: "#C0C0C0" }}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      required
      autoFocus={name === "name"} // Autofocus on the name field
      onKeyDown={onKeyDown}
    />
  );
});

export default InputField;
