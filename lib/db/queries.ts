import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';

export async function getUser() {
  const sessionCookie = (await cookies()).get('session');
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== 'number'
  ) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: sessionData.user.id,
      deletedAt: null,
    },
  });

  return user;
}

export async function getUserById(userId: number) {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
}

export async function getUserDocuments(userId: number) {
  return await prisma.document.findMany({
    where: { userId },
    orderBy: { uploadedAt: 'desc' },
  });
}

export async function getDocument(documentId: number, userId: number) {
  return await prisma.document.findFirst({
    where: {
      id: documentId,
      userId,
    },
  });
}

export async function createDocument(data: {
  userId: number;
  fileName: string;
  fileSize: number;
  fileUrl?: string;
  mimeType: string;
  pageCount?: number;
}) {
  return await prisma.document.create({
    data,
  });
}

export async function deleteDocument(documentId: number, userId: number) {
  return await prisma.document.deleteMany({
    where: {
      id: documentId,
      userId,
    },
  });
}

export async function getConversation(conversationId: number, userId: number) {
  return await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      userId,
    },
    include: {
      document: true,
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });
}

export async function getUserConversations(userId: number) {
  return await prisma.conversation.findMany({
    where: { userId },
    include: {
      document: true,
      messages: {
        take: 1,
        orderBy: { createdAt: 'desc' },
      },
    },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function createConversation(data: {
  userId: number;
  documentId: number;
  title?: string;
}) {
  return await prisma.conversation.create({
    data,
  });
}

export async function deleteConversation(conversationId: number, userId: number) {
  return await prisma.conversation.deleteMany({
    where: {
      id: conversationId,
      userId,
    },
  });
}

export async function createMessage(data: {
  conversationId: number;
  userId: number;
  role: string;
  content: string;
}) {
  return await prisma.message.create({
    data,
  });
}

export async function getConversationMessages(conversationId: number, userId: number) {
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      userId,
    },
  });

  if (!conversation) {
    return [];
  }

  return await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' },
  });
}
