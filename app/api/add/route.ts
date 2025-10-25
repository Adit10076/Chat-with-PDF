// app/api/add/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getVectorStore, createVectorStoreFromDocuments } from "@/lib/rag/vector-store";
import { processPDF, ProcessedDocument } from "@/lib/rag/pdf-processor";

interface AddDataRequest {
  fileName: string;
  fileBuffer: string; // base64 encoded PDF
}

export async function POST(request: NextRequest) {
  try {
    const data: AddDataRequest = await request.json();

    if (!data.fileName || !data.fileBuffer) {
      return NextResponse.json(
        { success: false, message: "fileName and fileBuffer are required" },
        { status: 400 }
      );
    }

    // Convert base64 PDF to buffer
    const buffer = Buffer.from(data.fileBuffer, "base64");

    // Process PDF into chunks
    const processedDocs: ProcessedDocument[] = await processPDF(buffer, data.fileName);

    if (!processedDocs.length) {
      return NextResponse.json(
        { success: false, message: "No text extracted from PDF" },
        { status: 400 }
      );
    }

    // Create or get local Chroma collection
    const vectorStore = await createVectorStoreFromDocuments(processedDocs, "myCollection");

    return NextResponse.json({
      success: true,
      message: "PDF added successfully to local Chroma!",
      fileName: data.fileName,
      chunksAdded: processedDocs.length,
    });
  } catch (error) {
    console.error("Chroma add error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add PDF to local Chroma" },
      { status: 500 }
    );
  }
}
