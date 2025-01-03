export const dynamic = "force-dynamic";

import { geminiModel, getEmbedding } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// Enhanced error handling type
interface SearchResult {
  id: number;
  content: string;
  similarity: number;
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    try {
      // Generate embedding with error handling
      const embedding = await getEmbedding(message);

      if (!embedding || embedding.length === 0) {
        throw new Error("Failed to generate embedding");
      }

      // Perform similarity search with more robust error handling
      const { data: documents, error: searchError } = await supabase.rpc(
        "match_documents",
        {
          query_embedding: embedding,
          match_threshold: 0.3, // More lenient threshold
          match_count: 10, // Increased to capture more potential matches
        }
      );

      // Diagnostic logging
      // console.log("Raw search results:", {
      //   documentCount: documents?.length,
      //   searchError,
      // });

      // Prepare context with fallback and more robust handling
      const context =
        documents && documents.length > 0
          ? documents
              .map((doc: SearchResult) => doc.content)
              .filter(Boolean) // Remove any empty entries
              .join("\n\n")
          : "No relevant context could be found for this query.";

      // Fallback prompt strategy
      const prompt = `
your'e Polisync an AI-powered chatbot that leverages RAG (Retrieval-Augmented Generation) technology to help users understand and navigate company policies effectively.
as a personal assistant, your role is to provide accurate and contextually relevant information based on the user's query and context below.

Context: ${context}

Instructions: 
- If no relevant context is found, acknowledge this directly
- Answer the user's question based on available context
- If context is insufficient, explain that politely
- please answer in a clear and concise manner with formal language

Question: ${message}

Response:`;

      // Generate response with explicit error handling
      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;

      const text =
        response.text() ||
        "I couldn't find relevant information for your query.";

      return NextResponse.json({
        response: text,
        contextLength: context.length,
        contextFound: documents?.length > 0,
      });
    } catch (searchError) {
      console.error("Detailed search error:", searchError);
      return NextResponse.json(
        {
          error: "Failed to retrieve or process documents",
          details: searchError,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Comprehensive error in chat route:", error);
    return NextResponse.json(
      { error: "Critical processing failure", details: String(error) },
      { status: 500 }
    );
  }
}
