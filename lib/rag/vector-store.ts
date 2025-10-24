import { Chroma } from '@langchain/community/vectorstores/chroma';
import { getChromaClient } from './chromadb-client';
import { getEmbeddings } from './embeddings';

export async function getVectorStore(collectionName: string = 'documents') {
  const client = getChromaClient();
  const embeddings = getEmbeddings();

  const vectorStore = await Chroma.fromExistingCollection(embeddings, {
    collectionName,
    url: process.env.CHROMADB_URL || 'https://api.trychroma.com',
    collectionMetadata: {
      'hnsw:space': 'cosine',
    },
  });

  return vectorStore;
}

export async function createVectorStoreFromDocuments(
  documents: Array<{ pageContent: string; metadata: Record<string, any> }>,
  collectionName: string = 'documents'
) {
  const embeddings = getEmbeddings();

  const vectorStore = await Chroma.fromDocuments(documents, embeddings, {
    collectionName,
    url: process.env.CHROMADB_URL || 'https://api.trychroma.com',
    collectionMetadata: {
      'hnsw:space': 'cosine',
    },
  });

  return vectorStore;
}
