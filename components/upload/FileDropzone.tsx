"use client";

import React, { useRef, useState, DragEvent, ChangeEvent } from "react";
import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE_MB } from "@/lib/upload/constants";

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function FileDropzone({ onFileSelect, disabled = false }: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      onFileSelect(droppedFile);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      onFileSelect(selectedFile);
      // Reset input value so re-selecting same file triggers change
      e.target.value = "";
    }
  };

  const handleBrowseClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
        disabled
          ? "cursor-not-allowed border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50"
          : isDragOver
          ? "border-neutral-900 bg-neutral-100/70 dark:border-neutral-100 dark:bg-neutral-900/70"
          : "border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-600"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_EXTENSIONS.join(",")}
        onChange={handleFileInputChange}
        disabled={disabled}
        className="hidden"
        aria-label="Upload document file"
      />

      {/* Upload Cloud Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.75}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
          Drag &amp; drop your file here
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          or click below to choose from your device
        </p>
      </div>

      <button
        type="button"
        onClick={handleBrowseClick}
        disabled={disabled}
        className="mt-4 inline-flex items-center rounded-lg bg-neutral-900 px-4 py-2 text-xs font-medium text-white shadow-xs transition hover:bg-neutral-800 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Browse Files
      </button>

      <div className="mt-6 border-t border-neutral-200 pt-4 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        <span className="font-medium text-neutral-700 dark:text-neutral-300">
          Supported Formats:
        </span>{" "}
        PDF, DOCX, TXT (up to {MAX_FILE_SIZE_MB}MB)
      </div>
    </div>
  );
}

