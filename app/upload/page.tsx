import Link from "next/link";
import { UploadForm } from "@/components/upload/UploadForm";

export default function UploadPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            <svg
              className="h-3.5 w-3.5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
            Upload Documents
          </h1>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Upload PDF, DOCX, or TXT documents to store and track them in PostgreSQL.
          </p>
        </div>

        {/* Upload Container */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-950">
          <UploadForm />
        </div>
      </div>
    </main>
  );
}
