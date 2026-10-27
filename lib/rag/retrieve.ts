import { searchSimilarChunks } from "../ai/vector/search";
import { embedQuery } from "./embed-query";

import type { RetrievedChunk } from "./types";

/**
 * Retrieve the most relevant document chunks
 * for a user's question.
 */
export async function retrieveContext(
  question: string,
  limit = 5
): Promise<RetrievedChunk[]> {
  // Validate input
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion) {
    throw new Error("Question cannot be empty.");
  }

  // Generate embedding for the question
  const embedding = await embedQuery(trimmedQuestion);

  // Search pgvector
  const chunks = await searchSimilarChunks(
    embedding,
    limit
  );

  return chunks;
}