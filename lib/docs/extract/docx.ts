import { basename } from "node:path";
import mammoth from "mammoth";

import type { ExtractionResult } from "./types";

/**
 * Extract text from a DOCX document.
 */
export async function extractDocx(
  filePath: string
): Promise<ExtractionResult> {
  const result = await mammoth.extractRawText({
    path: filePath,
  });

  return {
    text: result.value,

    pageCount: null,

    metadata: {
      fileType: "docx",
      fileName: basename(filePath),
    },
  };
}