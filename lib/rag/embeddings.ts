import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

export function getEmbeddings() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  return new GoogleGenerativeAIEmbeddings({
    apiKey,
    modelName: 'embedding-001',
  });
}
