"use client";

import React from "react";
import { UploadedDocumentData } from "@/lib/upload/types";

interface UploadStatusProps {
  error?: string | null;
  successDocument?: UploadedDocumentData | null;
  onClearError?: () => void;
  onUploadAnother?: () => void;
}

export function UploadStatus({
  error,
  successDocument,
  onClearError,
  onUploadAnother,
}: UploadStatusProps) {
  if (error) {
    return (
      <div
        role="alert"
        className="flex items-start justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
      >
        <div className="flex items-start gap-3">
          <svg
            className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400"
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
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          <div>
            <p className="font-semibold">Upload Failed</p>
            <p className="mt-0.5 text-xs text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>

        {onClearError && (
          <button
            type="button"
            onClick={onClearError}
            aria-label="Dismiss error"
            className="shrink-0 rounded-md p-1 text-red-500 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/50 dark:hover:text-red-100"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }

  if (successDocument) {
    return (
      <div
        role="status"
        className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-emerald-900 dark:text-emerald-100">
              Document Uploaded Successfully!
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              Metadata persisted into database with status:{" "}
              <span className="font-mono font-semibold">{successDocument.processingStatus}</span>
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-1 rounded-lg bg-white/70 p-3 font-mono text-xs text-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-300">
          <p className="truncate">
            <span className="text-neutral-400">Original:</span> {successDocument.originalName}
          </p>
          <p className="truncate">
            <span className="text-neutral-400">Stored:</span> {successDocument.storedName}
          </p>
          <p>
            <span className="text-neutral-400">Size:</span> {(successDocument.fileSize / 1024).toFixed(1)} KB
          </p>
        </div>

        {onUploadAnother && (
          <button
            type="button"
            onClick={onUploadAnother}
            className="mt-4 inline-flex items-center rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Upload Another Document
          </button>
        )}
      </div>
    );
  }

  return null;
}

