import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { getVectorStore } from './vector-store';
import { HumanMessage, AIMessage, BaseMessage } from '@langchain/core/messages';

export async function generateRAGResponse(
  question: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [],
  collectionName: string = 'documents'
): Promise<{ answer: string; sources: string[] }> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const model = new ChatGoogleGenerativeAI({
    apiKey,
    model: 'gemini-2.5-flash',
    temperature: 0.7,
  });

  const vectorStore = await getVectorStore(collectionName);
  
  const relevantDocs = await vectorStore.similaritySearch(question, 4);

  const context = relevantDocs
    .map((doc) => doc.pageContent)
    .join('\n\n');

  const sources = relevantDocs
    .map((doc) => (doc.metadata?.source as string) || 'Unknown');
  const uniqueSources = [...new Set(sources)] as string[];

  const messages: BaseMessage[] = [];

  for (const msg of conversationHistory.slice(-5)) {
    if (msg.role === 'user') {
      messages.push(new HumanMessage(msg.content));
    } else {
      messages.push(new AIMessage(msg.content));
    }
  }

  messages.push(
    new HumanMessage(
      `You are a helpful AI assistant that answers questions based on the provided context from PDF documents.

Use the following pieces of context to answer the question. If you don't know the answer based on the context, say that you don't have enough information to answer accurately.

Context:
${context}

Question: ${question}`
    )
  );

  const response = await model.invoke(messages);

  return {
    answer: response.content as string,
    sources: uniqueSources,
  };
}
