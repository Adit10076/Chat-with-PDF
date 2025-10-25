import 'dotenv/config'; // loads .env.local if using plain Node
import { generateRAGResponse } from './chat-service.ts';
async function testRAG() {
  const question = "What is the main topic covered in the PDFs?"; // change as needed
  const conversationHistory = [
    { role: 'user', content: 'Hello!' },
  ];

  try {
    const result = await generateRAGResponse(question, conversationHistory);
    console.log('Answer:', result.answer);
    console.log('Sources:', result.sources);
  } catch (err) {
    console.error('Error querying RAG:', err);
  }
}

testRAG();
