import { NextRequest, NextResponse } from "next/server";

import { retrieveContext } from "@/lib/rag/retrieve";
import { buildPrompt } from "@/lib/rag/prompt";
import { generateAnswer } from "@/lib/rag/generate-answer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("Incoming body:", body);
    console.log("Question:", body.question);

    const question =
      typeof body.question === "string"
        ? body.question.trim()
        : "";

    if (!question) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed.",
          error: "Question is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Retrieve relevant chunks
    const chunks = await retrieveContext(question);

    if (chunks.length === 0) {
      return NextResponse.json(
        {
          success: true,
          answer:
            "I couldn't find any relevant information in the uploaded documents.",
          sources: [],
        },
        {
          status: 200,
        }
      );
    }

    // Build prompt
    const prompt = buildPrompt(question, chunks);

    // Generate final answer
    const answer = await generateAnswer(prompt);

    return NextResponse.json(
      {
        success: true,
        answer,
        sources: chunks.map((chunk) => ({
          documentId: chunk.documentId,
          chunkId: chunk.chunkId,
          chunkIndex: chunk.chunkIndex,
          pageNumber: chunk.pageNumber,
          similarity: chunk.similarity,
        })),
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate answer.",
        error:
          error instanceof Error
            ? error.message
            : "Unknown error occurred.",
      },
      {
        status: 500,
      }
    );
  }
}