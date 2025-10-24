import { ChromaClient } from 'chromadb';

let chromaClient: ChromaClient | null = null;

export function getChromaClient(): ChromaClient {
  if (!chromaClient) {
    const tenant = process.env.CHROMADB_TENANT;
    const database = process.env.CHROMADB_DATABASE;
    const apiKey = process.env.CHROMADB_API_KEY;
    const url = process.env.CHROMADB_URL;

    if (!tenant || !database) {
      throw new Error('ChromaDB credentials not configured');
    }

    chromaClient = new ChromaClient({
      path: url || 'https://api.trychroma.com',
      auth: apiKey ? { provider: 'token', credentials: apiKey } : undefined,
      tenant,
      database,
    });
  }

  return chromaClient;
}
