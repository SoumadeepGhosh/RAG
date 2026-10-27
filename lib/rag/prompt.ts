import type { RetrievedChunk } from "./types";

/**
 * Build the prompt sent to Gemini.
 */
export function buildPrompt(
  question: string,
  chunks: RetrievedChunk[]
): string {
  const context = chunks
    .map((chunk, index) => {
      return `
Document ${index + 1}
--------------------
Document ID : ${chunk.documentId}
Chunk Index : ${chunk.chunkIndex}
Page Number : ${chunk.pageNumber ?? "Unknown"}

${chunk.content}
`;
    })
    .join("\n\n");

  return `
You are an intelligent AI assistant.

Your job is to answer ONLY using the provided context.

Rules:

1. Never make up information.
2. If the answer is not found in the context, reply:
   "I couldn't find that information in the uploaded documents."
3. Keep answers concise but complete.
4. If multiple documents contain relevant information, combine them.
5. Do not mention similarity scores or internal IDs.

==========================
CONTEXT
==========================

${context}

==========================
QUESTION
==========================

${question}

==========================
ANSWER
==========================
`;
}