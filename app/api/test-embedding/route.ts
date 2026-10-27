import { generateEmbedding } from "@/lib/ai/embedding/gemini";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const text = body.text?.trim();

    if (!text) {
      return NextResponse.json(
        {
          success: false,
          message: "Text is required.",
        },
        { status: 400 }
      );
    }

    const result = await generateEmbedding(text);

    return NextResponse.json({
      success: true,
      model: result.model,
      dimensions: result.dimensions,
      preview: result.embedding.slice(0, 10),
      totalValues: result.embedding.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}