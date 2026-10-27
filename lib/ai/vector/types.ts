/**
 * Represents a vector stored in PostgreSQL.
 */
export interface VectorRecord {
  chunkId: string;

  embedding: number[];
}

/**
 * Input for semantic search.
 */
export interface VectorSearchInput {
  embedding: number[];

  limit?: number;
}

/**
 * Result returned from pgvector similarity search.
 */
export interface VectorSearchResult {
  chunkId: string;

  documentId: string;

  content: string;

  similarity: number;

  chunkIndex: number;

  pageNumber: number | null;
}