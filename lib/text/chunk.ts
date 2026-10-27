export interface TextChunk {
  index: number;
  content: string;
  characterCount: number;
}

export function chunkText(
  text: string,
  chunkSize = 1000,
  overlap = 200
): TextChunk[] {
  if (!text.trim()) {
    return [];
  }

  if (overlap >= chunkSize) {
    throw new Error("Overlap must be smaller than chunk size.");
  }

  const chunks: TextChunk[] = [];

  let start = 0;
  let index = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);

    const content = text.slice(start, end).trim();

    chunks.push({
      index,
      content,
      characterCount: content.length,
    });

    if (end >= text.length) {
      break;
    }

    start += chunkSize - overlap;
    index++;
  }

  return chunks;
}