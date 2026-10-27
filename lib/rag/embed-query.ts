import { generateEmbedding } from "../ai/embedding/gemini";

/**
 * Generate an embedding for a user's question.
 */
export async function embedQuery(
  question: string
): Promise<number[]> {
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion) {
    throw new Error("Question cannot be empty.");
  }

  const result = await generateEmbedding(trimmedQuestion);

  return result.embedding;
}