import { ProcessingStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { generateEmbedding } from "./gemini";
import type { ChunkForEmbedding } from "./types";
import { saveChunkEmbedding } from "@/lib/ai/vector/repository";

/**
 * Generate an embedding for a single chunk and persist it via the vector repository.
 * The embedding service contains only domain logic and delegates all SQL persistence
 * to the vector repository.
 */
export async function embedChunk(
  chunk: ChunkForEmbedding
): Promise<void> {
  const result = await generateEmbedding(chunk.content);
  const tokenCount = chunk.content.split(/\s+/).filter(Boolean).length;

  await saveChunkEmbedding(chunk.id, result.embedding, tokenCount);
}

/**
 * Generate embeddings for all chunks belonging to a document.
 * 1. Loads all chunks
 * 2. Generates embeddings
 * 3. Persists embeddings through vector repository
 * 4. Sets document processingStatus to READY
 *
 * If embedding generation fails:
 * - Updates document status to FAILED
 * - Preserves already created chunks
 * - Rethrows the error to calling context
 */
export async function embedDocument(
  documentId: string
): Promise<void> {
  const chunks = await prisma.chunk.findMany({
    where: {
      documentId,
    },
    orderBy: {
      chunkIndex: "asc",
    },
    select: {
      id: true,
      content: true,
    },
  });

  if (chunks.length === 0) {
    throw new Error("No chunks found for this document.");
  }

  try {
    for (const chunk of chunks) {
      await embedChunk(chunk);
    }

    await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        processingStatus: ProcessingStatus.READY,
      },
    });
  } catch (error) {
    // Mark document as FAILED if embedding generation fails, preserving chunks
    await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        processingStatus: ProcessingStatus.FAILED,
      },
    });

    throw error;
  }
}
