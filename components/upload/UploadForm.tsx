"use client";

import React, { useState } from "react";
import { FileDropzone } from "./FileDropzone";
import { FilePreview } from "./FilePreview";
import { UploadButton } from "./UploadButton";
import { UploadStatus } from "./UploadStatus";
import { UploadApiResponse, UploadedDocumentData } from "@/lib/upload/types";
import { validateFile } from "@/lib/upload/validators";

export function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successDocument, setSuccessDocument] = useState<UploadedDocumentData | null>(null);

  const handleFileSelect = (file: File) => {
    setError(null);
    setSuccessDocument(null);

    // Client-side quick validation
    const validation = validateFile(file);
    if (!validation.isValid) {
      setError(validation.error || "Selected file is invalid.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  const handleClearError = () => {
    setError(null);
  };

  const handleUploadAnother = () => {
    setSelectedFile(null);
    setError(null);
    setSuccessDocument(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccessDocument(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data: UploadApiResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.message || "Failed to upload document.");
      }

      if (data.document) {
        setSuccessDocument(data.document);
        setSelectedFile(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Status (Errors or Success) */}
      <UploadStatus
        error={error}
        successDocument={successDocument}
        onClearError={handleClearError}
        onUploadAnother={handleUploadAnother}
      />

      {/* Main Upload Area - Shown when no success document is being displayed */}
      {!successDocument && (
        <>
          {!selectedFile ? (
            <FileDropzone onFileSelect={handleFileSelect} disabled={isUploading} />
          ) : (
            <div className="space-y-4">
              <FilePreview
                file={selectedFile}
                onRemove={handleRemoveFile}
                disabled={isUploading}
              />
              <UploadButton
                onClick={handleUpload}
                disabled={!selectedFile}
                isUploading={isUploading}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

