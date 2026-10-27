import { prisma } from "@/lib/prisma";
import { TextChunk } from "@/lib/text/chunk";

export async function saveChunks(
  documentId: string,
  chunks: TextChunk[]
): Promise<void> {
  if (chunks.length === 0) {
    return;
  }

  await prisma.chunk.createMany({
    data: chunks.map((chunk) => ({
      documentId,

      chunkIndex: chunk.index,

      pageNumber: null,

      content: chunk.content,

      characterCount: chunk.characterCount,

      tokenCount: null,
    })),
  });
}