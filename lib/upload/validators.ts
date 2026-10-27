import path from "path";
import {
  ALLOWED_EXTENSIONS,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from "./constants";
import { FileValidationResult } from "./types";

/**
 * Validates file properties before processing or storage:
 * - Checks file existence
 * - Checks for empty file (0 bytes)
 * - Checks maximum file size limit (20MB)
 * - Checks file extension against allowed list (.pdf, .docx, .txt)
 * - Checks MIME type against allowed list
 */
export function validateFile(file: unknown): FileValidationResult {
  if (!file || typeof file !== "object" || !("name" in file) || !("size" in file)) {
    return {
      isValid: false,
      error: "No file was provided. Please select a valid document to upload.",
    };
  }

  const typedFile = file as { name: string; size: number; type?: string };

  if (!typedFile.name || typedFile.name.trim() === "") {
    return {
      isValid: false,
      error: "Invalid file name. Please ensure the file has a valid name.",
    };
  }

  if (typedFile.size <= 0) {
    return {
      isValid: false,
      error: "The selected file is empty (0 bytes). Please select a valid document.",
    };
  }

  if (typedFile.size > MAX_FILE_SIZE_BYTES) {
    return {
      isValid: false,
      error: `File size exceeds the limit of ${MAX_FILE_SIZE_MB}MB. Current size: ${(
        typedFile.size /
        (1024 * 1024)
      ).toFixed(2)}MB.`,
    };
  }

  const extension = path.extname(typedFile.name).toLowerCase();
  const isExtensionAllowed = ALLOWED_EXTENSIONS.includes(
    extension as (typeof ALLOWED_EXTENSIONS)[number]
  );

  if (!isExtensionAllowed) {
    return {
      isValid: false,
      error: `Unsupported file extension (${extension || "none"}). Only PDF, DOCX, and TXT files are accepted.`,
    };
  }

  const mimeType = typedFile.type?.toLowerCase() || "";
  const isMimeAllowed = ALLOWED_MIME_TYPES.includes(
    mimeType as (typeof ALLOWED_MIME_TYPES)[number]
  );

  // If MIME is provided by client, verify it matches allowed types
  if (mimeType && !isMimeAllowed) {
    return {
      isValid: false,
      error: `Unsupported file type (${mimeType}). Only PDF, DOCX, and TXT files are supported.`,
    };
  }

  return { isValid: true };
}

