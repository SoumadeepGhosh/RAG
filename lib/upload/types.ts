import { ProcessingStatus } from "@prisma/client";

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export interface UploadedDocumentData {
  id: string;
  originalName: string;
  storedName: string;
  mimeType: string;
  fileSize: number;
  uploadPath: string;
  processingStatus: ProcessingStatus;
  createdAt: string;
}

export interface UploadApiResponse {
  success: boolean;
  message: string;
  document?: UploadedDocumentData;
  error?: string;
}

export interface ChatApiRequest {
  question: string;
}

export interface ChatSourceItem {
  documentId: string;
  chunkId: string;
  chunkIndex: number;
  pageNumber: number | null;
  similarity: number;
}

export interface ChatApiResponse {
  success: boolean;
  answer?: string;
  message?: string;
  error?: string;
  sources?: ChatSourceItem[];
}

