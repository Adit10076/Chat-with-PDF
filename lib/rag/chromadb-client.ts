import { CloudClient } from "chromadb";

let chromaClient: CloudClient | null = null;

export function getChromaClient(): CloudClient {
  if (!chromaClient) {
  const apiKey = 'ck-A2VhR3A5X4EX7vPy8G9oB16Uv4LXttQFsiwP4syaxkU9';
  const tenant = '6331c0eb-ea86-427f-a9bd-a2a1cb90529d';
  const database = 'Chat with Us';

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
