import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-10 text-center">
        {/* Header / Hero */}
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl dark:text-neutral-50">
            Mini RAG
          </h1>
          <p className="mx-auto max-w-xl text-base text-neutral-600 sm:text-lg dark:text-neutral-400">
            Learn Retrieval-Augmented Generation from First Principles. Upload your
            knowledge base and chat with your documents.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 text-left">
          {/* Card 1: Upload Documents */}
          <div className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs transition dark:border-neutral-800 dark:bg-neutral-950">
            <div className="space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Upload Documents
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                Upload your PDF, DOCX, or TXT documents. Files are validated, stored locally,
                and tracked in PostgreSQL.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-900">
              <Link
                href="/upload"
                className="inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                Go To Upload &rarr;
              </Link>
            </div>
          </div>

          {/* Card 2: Chat With Documents */}
          <div className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs transition dark:border-neutral-800 dark:bg-neutral-950">
            <div className="space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
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
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v4.518Z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Chat With Documents
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                Interact with the chat interface. Test sending queries and verifying
                real-time response handling from the API.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-900">
              <Link
                href="/chat"
                className="inline-flex w-full items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-xs transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
              >
                Go To Chat &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
