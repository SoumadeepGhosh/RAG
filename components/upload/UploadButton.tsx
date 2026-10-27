"use client";

import React from "react";

interface UploadButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isUploading?: boolean;
}

export function UploadButton({
  onClick,
  disabled = false,
  isUploading = false,
}: UploadButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isUploading}
      className="inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-neutral-800 focus:outline-hidden disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:disabled:bg-neutral-800 dark:disabled:text-neutral-500"
    >
      {isUploading ? (
        <span className="inline-flex items-center gap-2">
          <svg
            className="h-4 w-4 animate-spin text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Uploading Document...
        </span>
      ) : (
        "Upload Document"
      )}
    </button>
  );
}

