import { prisma } from "@/lib/prisma";
import { toPgVector } from "./repository";
import type { VectorSearchResult } from "./types";

/**
 * Find the most similar chunks using pgvector cosine distance.
 * Reuses toPgVector from repository and uses parameterized $queryRaw to prevent SQL injection.
 */
export async function searchSimilarChunks(
  embedding: number[],
  limit = 5
): Promise<VectorSearchResult[]> {
  const vector = toPgVector(embedding);

  const results = await prisma.$queryRaw<VectorSearchResult[]>`
    SELECT
      id AS "chunkId",
      "documentId",
      content,
      "chunkIndex",
      "pageNumber",
      1 - (embedding <=> ${vector}::vector) AS similarity
    FROM "Chunk"
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> ${vector}::vector
    LIMIT ${limit}
  `;

  return results;
}
