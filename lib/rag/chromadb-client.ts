import { CloudClient } from "chromadb";

let chromaClient: CloudClient | null = null;

export function getChromaClient(): CloudClient {
  if (!chromaClient) {
    const apiKey = process.env.CHROMADB_API_KEY;
    const tenant = process.env.CHROMADB_TENANT;
    const database = process.env.CHROMADB_DATABASE;

    if (!tenant || !database) {
      throw new Error("ChromaDB credentials not configured properly. Please set CHROMADB_TENANT and CHROMADB_DATABASE environment variables.");
    }

    chromaClient = new CloudClient({
      apiKey,
      tenant,
      database,
    });
  }

  return chromaClient;
}
