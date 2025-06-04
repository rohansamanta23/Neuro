import React from "react";

const PasswordField = React.forwardRef(function PasswordField(
  { name, value, onChange, placeholder, onKeyDown },
  ref
) {
  const [show, setShow] = React.useState(false);

  return (
    <div className="relative">
      <input
        ref={ref}
        name={name}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="px-4 py-2 rounded-sm bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-silver border border-gray-700 transition w-full"
        style={{ outlineColor: "#C0C0C0" }}
        value={value}
        onChange={onChange}
        autoComplete="new-password"
        onKeyDown={onKeyDown}
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 focus:outline-none"
        tabIndex={-1}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? (
          // Eye-off SVG
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a11.72 11.72 0 012.89-4.36M6.7 6.7A9.97 9.97 0 0112 5c5 0 9.27 3.11 11 7.5a11.72 11.72 0 01-2.89 4.36M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18"
            />
          </svg>
        ) : (
          // Eye SVG
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        )}
      </button>
    </div>
  );
});

export default PasswordField;
