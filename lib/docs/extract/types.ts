/**
 * Supported document types.
 */
export type DocumentType = "pdf" | "docx" | "txt";

/**
 * Metadata about the extracted document.
 */
export interface ExtractionMetadata {
  fileType: DocumentType;
  fileName: string;
}

/**
 * Common result returned by every extractor.
 */
export interface ExtractionResult {
  /**
   * Complete extracted text.
   */
  text: string;

  /**
   * Number of pages.
   * TXT and DOCX normally return null.
   */
  pageCount: number | null;

  /**
   * Metadata about the document.
   */
  metadata: ExtractionMetadata;
}