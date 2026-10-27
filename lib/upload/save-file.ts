import fs from "fs/promises";
import path from "path";
import { UPLOAD_DIR_PATH, UPLOAD_DIR_NAME } from "./constants";
import { generateUniqueFileName } from "./generate-file-name";

export interface SaveFileResult {
  storedName: string;
  uploadPath: string;
  absolutePath: string;
}

/**
 * Saves a file buffer locally inside the /uploads directory.
 * Ensures directory exists and generates a unique UUID-based filename.
 */
export async function saveFileLocally(
  file: File,
  customStoredName?: string
): Promise<SaveFileResult> {
  // Ensure the destination uploads directory exists
  await fs.mkdir(UPLOAD_DIR_PATH, { recursive: true });

  const storedName =
    customStoredName ?? generateUniqueFileName(file.name).storedName;
  const absolutePath = path.join(UPLOAD_DIR_PATH, storedName);

  // Read file data into Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Write file to disk (flag 'wx' ensures no overwrite)
  await fs.writeFile(absolutePath, buffer, { flag: "wx" });

  // Store normalized relative path for consistency across OS platforms
  const uploadPath = `${UPLOAD_DIR_NAME}/${storedName}`;

  return {
    storedName,
    uploadPath,
    absolutePath,
  };
}

