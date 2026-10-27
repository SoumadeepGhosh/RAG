/**
 * Embedding model used throughout the application.
 *
 * IMPORTANT:
 * Every document and every user query MUST use the same embedding model.
 */
export const EMBEDDING_MODEL = "gemini-embedding-001";

/**
 * Expected embedding dimensions.
 *
 * We don't hardcode vector length anywhere else.
 * This is useful later when validating responses.
 */
export const EMBEDDING_DIMENSIONS = 3072;

/**
 * Maximum number of chunks to embed in a single batch.
 *
 * Adjust later depending on rate limits.
 */
export const EMBEDDING_BATCH_SIZE = 20;

/**
 * Number of nearest chunks retrieved during semantic search.
 */
export const DEFAULT_TOP_K = 5;