import crypto from "crypto";
import path from "path";

/**
 * Generates a unique filename using UUID v4 while preserving the lowercase original file extension.
 * Example: "report.PDF" -> "a3f5a2b1-6a2f-4a0b-9d2a-43a9686036b1.pdf"
 */
export function generateUniqueFileName(originalName: string): {
  storedName: string;
  extension: string;
} {
  const extension = path.extname(originalName).toLowerCase();
  const uuid = crypto.randomUUID();
  const storedName = `${uuid}${extension}`;

  return { storedName, extension };
}

