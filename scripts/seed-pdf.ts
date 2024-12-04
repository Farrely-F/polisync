import path from "path";
import { processPDF } from "../lib/pdf";

async function seedPDF() {
  try {
    const pdfPath = path.join(
      process.cwd(),
      "public",
      "pdf",
      "company-policy.pdf"
    );
    console.log("Starting to process PDF...");

    const result = await processPDF(pdfPath);

    console.log("PDF processing completed successfully!");
    console.log(`Processed ${result.pageCount} pages`);
    console.log(`Created ${result.chunkCount} chunks`);
  } catch (error) {
    console.error("Failed to seed PDF:", error);
    process.exit(1);
  }
}

// Run the seeder
seedPDF();
