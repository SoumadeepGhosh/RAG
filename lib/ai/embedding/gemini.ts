import { EMBEDDING_DIMENSIONS, EMBEDDING_MODEL } from "./constants";
import type { EmbeddingResult } from "./types";
import { ai } from "../client";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY is missing. Please add it to your .env file."
  );
}

/**
 * Generate an embedding for a single piece of text.
 */
export async function generateEmbedding(
  text: string
): Promise<EmbeddingResult> {
  const content = text.trim();

  if (!content) {
    throw new Error("Cannot generate an embedding for empty text.");
  }

  const response = await ai.models.embedContent({
    model: EMBEDDING_MODEL,
    contents: content,
  });

  const embedding = response.embeddings?.[0]?.values;

  if (!embedding) {
    throw new Error("Gemini did not return an embedding.");
  }

  if (embedding.length !== EMBEDDING_DIMENSIONS) {
    throw new Error(
      `Unexpected embedding dimension. Expected ${EMBEDDING_DIMENSIONS}, received ${embedding.length}.`
    );
  }

  return {
    embedding,
    dimensions: embedding.length,
    model: EMBEDDING_MODEL,
  };
}