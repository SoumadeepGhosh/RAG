/**
 * Request sent to the RAG pipeline.
 */
export interface RagRequest {
  question: string;

  limit?: number;
}

/**
 * One retrieved chunk from vector search.
 */
export interface RetrievedChunk {
  chunkId: string;

  documentId: string;

  content: string;

  chunkIndex: number;

  pageNumber: number | null;

  similarity: number;
}

/**
 * Final response from the RAG pipeline.
 */
export interface RagResponse {
  answer: string;

  sources: RetrievedChunk[];
}