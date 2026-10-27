"use client";

import React from "react";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  disabled?: boolean;
}

export function FilePreview({ file, onRemove, disabled = false }: FilePreviewProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const getExtension = (filename: string): string => {
    const parts = filename.split(".");
    return parts.length > 1 ? (parts.pop() || "").toUpperCase() : "FILE";
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/60">
      <div className="flex items-center space-x-3 truncate">
        {/* File extension badge */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-xs font-bold text-white dark:bg-neutral-100 dark:text-neutral-900">
          {getExtension(file.name)}
        </div>

        <div className="min-w-0 flex-1 truncate">
          <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {file.name}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {formatFileSize(file.size)}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRemove}
        disabled={disabled}
        aria-label="Remove selected file"
        className="ml-3 shrink-0 rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-200 hover:text-neutral-700 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
}

