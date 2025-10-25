import { NextRequest, NextResponse } from 'next/server';
import { generateRAGResponse } from '@/lib/rag/chat-service';

export async function POST(request: NextRequest) {
  try {
    const { question, conversationHistory } = await request.json();

    if (!question) {
      return NextResponse.json({ success: false, message: 'No question provided' }, { status: 400 });
    }

    const result = await generateRAGResponse(question, conversationHistory)

    return NextResponse.json({ success: true, answer: result.answer, sources: result.sources });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to generate response' },
      { status: 500 }
    );
  }
}
