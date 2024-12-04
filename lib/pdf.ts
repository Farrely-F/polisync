import fs from "fs";
import path from "path";
import * as pdfjsLib from "pdfjs-dist";
import { getEmbedding } from "./gemini";
import { supabase } from "./supabase";

export async function processPDF(filePath: string) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const uint8Array = new Uint8Array(dataBuffer);

    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdfDocument = await loadingTask.promise;

    const numPages = pdfDocument.numPages;
    let fullText = "";

    // Extract text from each page
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(" ");
      fullText += pageText + "\n\n";
    }

    // Split the text into chunks (approximately 1000 characters each)
    const chunks = splitIntoChunks(fullText, 1000);

    // Process each chunk
    for (const chunk of chunks) {
      const embedding = await getEmbedding(chunk);

      // Insert into Supabase
      const { error } = await supabase.from("documents").insert({
        content: chunk,
        embedding,
        metadata: {
          source: path.basename(filePath),
          page_count: numPages,
        },
      });

      if (error) {
        console.error("Error inserting chunk:", error);
        throw error;
      }
    }

    return {
      pageCount: numPages,
      chunkCount: chunks.length,
    };
  } catch (error) {
    console.error("Error processing PDF:", error);
    throw error;
  }
}

function splitIntoChunks(text: string, chunkSize: number): string[] {
  const chunks: string[] = [];
  let currentChunk = "";

  // Split by paragraphs first
  const paragraphs = text.split(/\n\s*\n/);

  for (const paragraph of paragraphs) {
    // If adding this paragraph would exceed chunk size, save current chunk and start new one
    if (
      currentChunk.length + paragraph.length > chunkSize &&
      currentChunk.length > 0
    ) {
      chunks.push(currentChunk.trim());
      currentChunk = "";
    }

    currentChunk += (currentChunk ? "\n\n" : "") + paragraph;
  }

  // Add the last chunk if it's not empty
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}
