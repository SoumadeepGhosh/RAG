import { prisma } from "@/lib/prisma";

/**
 * Convert a JavaScript number[] into PostgreSQL vector format literal.
 * Example: [0.12, -0.45, 0.91] -> "[0.12,-0.45,0.91]"
 */
export function toPgVector(vector: number[]): string {
  return `[${vector.join(",")}]`;
}

/**
 * Parse a PostgreSQL vector literal back into a JavaScript number array.
 * Example: "[0.12,-0.45,0.91]" -> [0.12, -0.45, 0.91]
 */
export function fromPgVector(vectorStr: string): number[] {
  const cleaned = vectorStr.replace(/^\[|\]$/g, "").trim();
  if (!cleaned) return [];
  return cleaned.split(",").map((v) => Number.parseFloat(v.trim()));
}

/**
 * Save an embedding vector for a single chunk.
 * Parameterized query ensures complete protection against SQL injection.
 */
export async function saveChunkEmbedding(
  chunkId: string,
  embedding: number[],
  tokenCount?: number
): Promise<void> {
  const vector = toPgVector(embedding);

  if (tokenCount !== undefined) {
    await prisma.$executeRaw`
      UPDATE "Chunk"
      SET
        embedding = ${vector}::vector,
        "tokenCount" = ${tokenCount}
      WHERE id = ${chunkId}::uuid
    `;
  } else {
    await prisma.$executeRaw`
      UPDATE "Chunk"
      SET embedding = ${vector}::vector
      WHERE id = ${chunkId}::uuid
    `;
  }
}

/**
 * Save embedding vectors for multiple chunks within a single database transaction.
 */
export async function saveBatchChunkEmbeddings(
  items: { chunkId: string; embedding: number[]; tokenCount?: number }[]
): Promise<void> {
  if (items.length === 0) return;

  await prisma.$transaction(
    items.map((item) => {
      const vector = toPgVector(item.embedding);
      if (item.tokenCount !== undefined) {
        return prisma.$executeRaw`
          UPDATE "Chunk"
          SET
            embedding = ${vector}::vector,
            "tokenCount" = ${item.tokenCount}
          WHERE id = ${item.chunkId}::uuid
        `;
      }
      return prisma.$executeRaw`
        UPDATE "Chunk"
        SET embedding = ${vector}::vector
        WHERE id = ${item.chunkId}::uuid
      `;
    })
  );
}

/**
 * Retrieve a chunk's stored vector embedding as a number array.
 */
export async function getChunkVector(chunkId: string): Promise<number[] | null> {
  const result = await prisma.$queryRaw<{ embedding: string | null }[]>`
    SELECT embedding::text as embedding
    FROM "Chunk"
    WHERE id = ${chunkId}::uuid
  `;

  if (!result.length || !result[0].embedding) {
    return null;
  }

  return fromPgVector(result[0].embedding);
}

/**
 * Returns true if the chunk already has an embedding saved.
 */
export async function chunkHasEmbedding(chunkId: string): Promise<boolean> {
  const result = await prisma.$queryRaw<{ exists: boolean }[]>`
    SELECT (embedding IS NOT NULL) AS exists
    FROM "Chunk"
    WHERE id = ${chunkId}::uuid
  `;

  return result.length > 0 && result[0].exists;
}