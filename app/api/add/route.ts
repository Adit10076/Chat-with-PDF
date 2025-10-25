// app/api/add/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getChromaClient } from "@/lib/rag/chromadb-client";
import { getEmbeddings } from "@/lib/rag/embeddings";
import { processPDF, ProcessedDocument } from "@/lib/rag/pdf-processor"

interface AddDataRequest {
  fileName: string;
  fileBuffer: string; // base64 encoded PDF
}

const client = getChromaClient();

let myCollection: any = null;

const getMyCollection = async () => {
  if (!myCollection) {
    const embeddings = getEmbeddings();

    myCollection = await client.getOrCreateCollection({
      name: "myCollection",
      embeddingFunction: {
        generate: async (input: string | string[]) => {
          const texts = typeof input === "string" ? [input] : input;
          return embeddings.embedDocuments(texts);
        },
      },
    });
  }
  return myCollection;
};

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

    const collection = await getMyCollection();
    const embeddings = getEmbeddings();

    // Generate embeddings for chunks
    const vectors = await embeddings.embedDocuments(processedDocs.map(doc => doc.pageContent));

    // Add to Chroma
    await collection.add({
      ids: processedDocs.map((_, idx) => `${data.fileName}-${idx + 1}`),
      documents: processedDocs.map(doc => doc.pageContent),
      metadatas: processedDocs.map(doc => doc.metadata),
      embeddings: vectors,
    });

    return NextResponse.json({
      success: true,
      message: "PDF added successfully",
      fileName: data.fileName,
      chunksAdded: processedDocs.length,
    });
  } catch (error) {
    console.error("Chroma add error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add PDF to Chroma" },
      { status: 500 }
    );
  }
}
