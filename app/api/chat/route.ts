import { NextRequest, NextResponse } from 'next/server';
import { generateRAGResponse } from '@/lib/rag/chat-service';
import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { message, conversationId } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    let conversation;
    let conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [];

    if (conversationId) {
      conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          userId: session.user.id,
        },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
            take: 10,
          },
        },
      });

      if (!conversation) {
        return NextResponse.json(
          { error: 'Conversation not found' },
          { status: 404 }
        );
      }

      conversationHistory = conversation.messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));
    }

    const collectionName = `user_${session.user.id}_docs`;
    const { answer, sources } = await generateRAGResponse(
      message,
      conversationHistory,
      collectionName
    );

    if (conversation) {
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          userId: session.user.id,
          role: 'user',
          content: message,
        },
      });

      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          userId: session.user.id,
          role: 'assistant',
          content: answer,
        },
      });
    }

    return NextResponse.json({
      success: true,
      answer,
      sources,
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
