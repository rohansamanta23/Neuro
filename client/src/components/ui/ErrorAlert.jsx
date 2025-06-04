import React from "react";

export default function ErrorAlert({ error, onClose }) {
  if (!error) return null;
  return (
    <div className="mb-2 text-red-400 bg-red-900/30 border border-red-400 rounded px-3 py-2 text-sm font-medium animate-fade-in flex items-center justify-between gap-2">
      <span>{error}</span>
      <button
        type="button"
        aria-label="Dismiss error"
        className="ml-2 text-red-300 hover:text-red-100 focus:outline-none"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
