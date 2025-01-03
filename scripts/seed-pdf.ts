import path from "path";
import { processPDF } from "../lib/pdf";

const tableName = process.env.SUPABASE_TABLE_NAME as string;

async function seedPDF(tableName: string) {
  try {
    const pdfPath = path.join(
      process.cwd(),
      "public",
      "pdf",
      "company-policy.pdf"
    );
    console.log("Starting to process PDF...");

    const result = await processPDF(pdfPath, tableName);

    console.log("PDF processing completed successfully!");
    console.log(`Processed ${result.pageCount} pages`);
    console.log(`Created ${result.chunkCount} chunks`);
  } catch (error) {
    console.error("Failed to seed PDF:", error);
    process.exit(1);
  }
}

// Run the seeder
seedPDF(tableName);
