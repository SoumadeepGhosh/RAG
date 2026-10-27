import { basename } from "node:path";
import { readFile } from "node:fs/promises";
import { extractText } from "unpdf";

import type { ExtractionResult } from "./types";

export async function extractPdf(
  filePath: string
): Promise<ExtractionResult> {
  const buffer = await readFile(filePath);

  const result = await extractText(new Uint8Array(buffer), { mergePages: true });

  const text =
    typeof result.text === "string"
      ? result.text
      : Array.isArray(result.text)
      ? (result.text as string[]).join("\n\n")
      : "";

  return {
    text,
    pageCount: result.totalPages ?? null,
    metadata: {
      fileType: "pdf",
      fileName: basename(filePath),
    },
  };
}
