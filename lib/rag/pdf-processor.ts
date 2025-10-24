const pdf = require('pdf-parse');
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { Document } from '@langchain/core/documents';

export interface ProcessedDocument {
  pageContent: string;
  metadata: {
    page: number;
    totalPages: number;
    source: string;
  };
}

export async function processPDF(
  buffer: Buffer,
  fileName: string
): Promise<ProcessedDocument[]> {
  const data = await pdf(buffer);
  
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const chunks = await textSplitter.createDocuments(
    [data.text],
    [{ source: fileName, totalPages: data.numpages }]
  );

  return chunks.map((chunk: Document, index: number) => ({
    pageContent: chunk.pageContent,
    metadata: {
      page: Math.floor(index / (data.numpages || 1)) + 1,
      totalPages: data.numpages,
      source: fileName,
    },
  }));
}
