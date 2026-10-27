import path from "node:path";

import { extractPdf } from "./pdf";
import { extractDocx } from "./docx";
import { extractTxt } from "./txt";

import type { ExtractionResult } from "./types";

export async function extractDocument(
  filePath: string
): Promise<ExtractionResult> {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".pdf":
      return extractPdf(filePath);

    case ".docx":
      return extractDocx(filePath);

    case ".txt":
      return extractTxt(filePath);

    default:
      throw new Error(`Unsupported file type: ${extension}`);
  }
}