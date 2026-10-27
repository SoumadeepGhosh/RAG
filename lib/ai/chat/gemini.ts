import { ai } from "@/lib/ai/client";

const PRIMARY_MODEL = "gemini-flash-lite-latest";
const FALLBACK_MODELS = ["gemini-3.5-flash-lite", "gemini-3.8-flash"];

export async function generateChatResponse(
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

      const text = response.text?.trim();

      if (text) {
        return text;
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
    `Failed to generate response: ${
      lastError instanceof Error ? lastError.message : "All candidate models failed."
    }`
  );
}

}