import path from "path";
import { ProcessingStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { validateFile } from "./validators";
import { saveFileLocally } from "./save-file";
import { UploadedDocumentData } from "./types";

import { cleanText } from "@/lib/text/clean";
import { chunkText } from "@/lib/text/chunk";
import { saveChunks } from "@/lib/chunk/save-chunks";
import { extractDocument } from "@/lib/docs/extract";
import { embedDocument } from "@/lib/ai/embedding/service";

const EXTENSION_TO_MIME: Record<string, string> = {
  ".pdf": "application/pdf",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".txt": "text/plain",
};


export async function processDocumentUpload(file: File): Promise<UploadedDocumentData> {
  // 1. Validation
  const validation = validateFile(file);
  if (!validation.isValid) {
    throw new Error(validation.error || "File validation failed.");
  }

  // Determine reliable MIME type
  const extension = path.extname(file.name).toLowerCase();
  const mimeType =
    file.type && file.type.trim() !== ""
      ? file.type
      : EXTENSION_TO_MIME[extension] || "application/octet-stream";

  // 2. Local File System Persistence
  const savedFile = await saveFileLocally(file);

  let documentId: string | null = null;

  try {
    // 3. Database Initial Metadata Persistence
    const document = await prisma.document.create({
      data: {
        originalName: file.name,
        storedName: savedFile.storedName,
        mimeType: mimeType,
        fileSize: file.size,
        uploadPath: savedFile.uploadPath,
        processingStatus: ProcessingStatus.UPLOADED,
      },
    });
    documentId = document.id;

    // 4. Text Extraction
    const extracted = await extractDocument(savedFile.absolutePath);

    // 5. Text Cleaning
    const cleanedText = cleanText(extracted.text);

    // 6. Text Chunking
    const chunks = chunkText(cleanedText);

    // 7. Save Chunks
    await saveChunks(document.id, chunks);

    // 8. Update Document Metadata & Intermediate Status
    await prisma.document.update({
      where: {
        id: document.id,
      },
      data: {
        totalPages: extracted.pageCount,
        totalChunks: chunks.length,
        processingStatus: ProcessingStatus.CHUNKED,
      },
    });

    // 9. Generate & Save Embeddings for all chunks (transitions status to READY)
    await embedDocument(document.id);

    // 10. Retrieve final document record with READY status
    const finalDocument = await prisma.document.findUniqueOrThrow({
      where: { id: document.id },
    });

    return {
      id: finalDocument.id,
      originalName: finalDocument.originalName,
      storedName: finalDocument.storedName,
      mimeType: finalDocument.mimeType,
      fileSize: finalDocument.fileSize,
      uploadPath: finalDocument.uploadPath,
      processingStatus: finalDocument.processingStatus,
      createdAt: finalDocument.createdAt.toISOString(),
    };
  } catch (error) {
    // Mark document as FAILED if error occurred after document creation
    if (documentId) {
      try {
        await prisma.document.update({
          where: { id: documentId },
          data: { processingStatus: ProcessingStatus.FAILED },
        });
      } catch (updateError) {
        console.error("Failed to update document status to FAILED:", updateError);
      }
    }

    throw new Error(
      `Failed to record document metadata in database: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
