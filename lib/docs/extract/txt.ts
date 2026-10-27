import { basename } from "node:path";
import { readFile } from "node:fs/promises";

import type { ExtractionResult } from "./types";

/**
 * Extract text from a TXT document.
 */
export async function extractTxt(
  filePath: string
): Promise<ExtractionResult> {
  const text = await readFile(filePath, "utf8");

  return {
    text,

    pageCount: null,

    metadata: {
      fileType: "txt",
      fileName: basename(filePath),
    },
  };
}