
export interface EmbeddingResult {
  /**
   * Floating point embedding values.
   */
  embedding: number[];

  /**
   * Number of dimensions in the embedding.
   */
  dimensions: number;

  /**
   * Model that generated the embedding.
   */
  model: string;
}

/**
 * Payload used to generate one embedding.
 */
export interface GenerateEmbeddingInput {
  text: string;
}

/**
 * Payload used to generate multiple embeddings.
 */
export interface GenerateBatchEmbeddingsInput {
  texts: string[];
}

/**
 * Represents a chunk ready for embedding.
 */
export interface ChunkForEmbedding {
  id: string;
  content: string;
}

/**
 * Chunk with its generated embedding.
 */
export interface EmbeddedChunk extends ChunkForEmbedding {
  embedding: number[];
}

/**
 * Result after processing an entire document.
 */
export interface DocumentEmbeddingResult {
  documentId: string;

  totalChunks: number;

  embeddedChunks: EmbeddedChunk[];
}