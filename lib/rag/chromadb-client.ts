import { CloudClient } from "chromadb";

let chromaClient: CloudClient | null = null;

export function getChromaClient(): CloudClient {
  if (!chromaClient) {
    const url = process.env.CHROMA_URL;          // e.g. "https://myinstance.trychroma.com"
    const apiKey = process.env.CHROMA_API_KEY;   // Your Chroma Cloud API Key
    const tenant = process.env.CHROMA_TENANT;    // Your tenant
    const database = process.env.CHROMA_DATABASE;// Your database

    if (!url || !tenant || !database) {
      throw new Error("ChromaDB credentials not configured properly");
    }

    chromaClient = new CloudClient({
      apiKey,
      tenant,
      database,
    });
  }

  return chromaClient;
}
