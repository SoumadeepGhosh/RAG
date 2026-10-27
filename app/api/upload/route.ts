import { NextRequest, NextResponse } from "next/server";
import { processDocumentUpload } from "@/lib/upload/upload-service";
import { UploadApiResponse } from "@/lib/upload/types";

export async function POST(request: NextRequest): Promise<NextResponse<UploadApiResponse>> {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed.",
          error: "Please provide a valid file under the 'file' field.",
        },
        { status: 400 }
      );
    }

    const document = await processDocumentUpload(file);

    return NextResponse.json(
      {
        success: true,
        message: "File uploaded successfully.",
        document,
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred during upload.";

    // If it's a known validation error message, return 400, otherwise 500
    const isValidationError =
      errorMessage.includes("limit") ||
      errorMessage.includes("extension") ||
      errorMessage.includes("type") ||
      errorMessage.includes("empty") ||
      errorMessage.includes("valid");

    return NextResponse.json(
      {
        success: false,
        message: "Upload processing failed.",
        error: errorMessage,
      },
      { status: isValidationError ? 400 : 500 }
    );
  }
}

