import { Chroma } from '@langchain/community/vectorstores/chroma';
import { getChromaClient } from './chromadb-client';
import { getEmbeddings } from './embeddings';

export async function getVectorStore(collectionName: string = 'documents') {
  const embeddings = getEmbeddings();
  const chromaUrl = process.env.CHROMADB_URL || 'https://api.trychroma.com';
  const chromaApiKey = process.env.CHROMADB_API_KEY;
  const chromaTenant = process.env.CHROMADB_TENANT;
  const chromaDatabase = process.env.CHROMADB_DATABASE;

  const vectorStore = await Chroma.fromExistingCollection(embeddings, {
    collectionName,
    url: chromaUrl,
    collectionMetadata: {
      'hnsw:space': 'cosine',
    },
    chromaCloudAPIKey: chromaApiKey,
    clientParams: {
      tenant: chromaTenant,
      database: chromaDatabase,
      auth: chromaApiKey ? { provider: 'token', credentials: chromaApiKey } : undefined,
    },
  });

  return vectorStore;
}

export async function createVectorStoreFromDocuments(
  documents: Array<{ pageContent: string; metadata: Record<string, any> }>,
  collectionName: string = 'documents'
) {
  const embeddings = getEmbeddings();
  const chromaUrl = process.env.CHROMADB_URL || 'https://api.trychroma.com';
  const chromaApiKey = process.env.CHROMADB_API_KEY;
  const chromaTenant = process.env.CHROMADB_TENANT;
  const chromaDatabase = process.env.CHROMADB_DATABASE;

  const vectorStore = await Chroma.fromDocuments(documents, embeddings, {
    collectionName,
    url: chromaUrl,
    collectionMetadata: {
      'hnsw:space': 'cosine',
    },
    chromaCloudAPIKey: chromaApiKey,
    clientParams: {
      tenant: chromaTenant,
      database: chromaDatabase,
      auth: chromaApiKey ? { provider: 'token', credentials: chromaApiKey } : undefined,
    },
  });

  return vectorStore;
}
