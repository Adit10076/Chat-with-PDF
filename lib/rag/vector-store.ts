import { Chroma } from '@langchain/community/vectorstores/chroma';
import { getEmbeddings } from './embeddings';

export async function getVectorStore(collectionName: string = 'myCollection') {
  const embeddings = getEmbeddings();

  const vectorStore = await Chroma.fromExistingCollection(embeddings, {
    collectionName, // use parameter, not hardcoded
    url: process.env.CHROMADB_URL || 'http://localhost:8000',
    collectionMetadata: { 'hnsw:space': 'cosine' },
    // chromaCloudAPIKey: process.env.CHROMADB_API_KEY,
    // clientParams: {
    //   tenant: process.env.CHROMADB_TENANT,
    //   database: process.env.CHROMADB_DATABASE,
    //   auth: process.env.CHROMADB_API_KEY
    //     ? { provider: 'token', credentials: process.env.CHROMADB_API_KEY }
    //     : undefined,
    // },
  });

  return vectorStore;
}

export async function createVectorStoreFromDocuments(
  documents: Array<{ pageContent: string; metadata: Record<string, any> }>,
  collectionName: string = 'myCollection'
) {
  const embeddings = getEmbeddings();

  const vectorStore = await Chroma.fromDocuments(documents, embeddings, {
    collectionName, // use parameter
    url: process.env.CHROMADB_URL || 'http://localhost:8000',
    collectionMetadata: { 'hnsw:space': 'cosine' },
    // chromaCloudAPIKey: process.env.CHROMADB_API_KEY,
    // clientParams: {
    //   tenant: process.env.CHROMADB_TENANT,
    //   database: process.env.CHROMADB_DATABASE,
    //   auth: process.env.CHROMADB_API_KEY
    //     ? { provider: 'token', credentials: process.env.CHROMADB_API_KEY }
    //     : undefined,
    // },
  });

  return vectorStore;
}
