/**
 * Clean extracted document text before chunking.
 */
export function cleanText(text: string | string[]): string {
  const input = Array.isArray(text) ? text.join("\n\n") : (text ?? "");

  return (
    String(input)
      // Normalize Unicode
      .normalize("NFKC")

      // Normalize Windows line endings
      .replace(/\r\n/g, "\n")

      // Remove null characters
      .replace(/\0/g, "")

      // Remove trailing spaces
      .replace(/[ \t]+$/gm, "")

      // Collapse multiple spaces
      .replace(/[ \t]{2,}/g, " ")

      // Collapse excessive blank lines
      .replace(/\n{3,}/g, "\n\n")

      // Trim beginning/end
      .trim()
  );
}
