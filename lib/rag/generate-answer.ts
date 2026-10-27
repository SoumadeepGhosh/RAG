import { ai } from "@/lib/ai/client";

const PRIMARY_MODEL = "gemini-flash-lite-latest";
const FALLBACK_MODELS = ["gemini-3.5-flash-lite", "gemini-3.8-flash"];

/**
 * Generate the final answer from the RAG prompt.
 */
export async function generateAnswer(
  prompt: string
): Promise<string> {
  const content = prompt.trim();

  if (!content) {
    throw new Error("Prompt cannot be empty.");
  }

  const modelsToTry = [PRIMARY_MODEL, ...FALLBACK_MODELS];
  let lastError: unknown;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: content,
      });

      const answer = response.text?.trim();

      if (answer) {
        return answer;
      }
    } catch (err) {
      console.warn(
        `Model ${model} failed:`,
        err instanceof Error ? err.message : err
      );
      lastError = err;
    }
  }

  throw new Error(
    `Failed to generate answer: ${
      lastError instanceof Error ? lastError.message : "All candidate models failed."
    }`
  );
}
