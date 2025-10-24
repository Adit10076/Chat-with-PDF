import { NextRequest, NextResponse } from 'next/server';
import { processPDF } from '@/lib/rag/pdf-processor';
import { createVectorStoreFromDocuments } from '@/lib/rag/vector-store';
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

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const chunks = await processPDF(buffer, file.name);

    const document = await prisma.document.create({
      data: {
        userId: session.user.id,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        pageCount: chunks.length > 0 ? chunks[0].metadata.totalPages : 0,
      },
    });

    const documentsWithMetadata = chunks.map(chunk => ({
      pageContent: chunk.pageContent,
      metadata: {
        ...chunk.metadata,
        documentId: document.id,
        userId: session.user.id,
      },
    }));

    const collectionName = `user_${session.user.id}_docs`;
    await createVectorStoreFromDocuments(documentsWithMetadata, collectionName);

    await prisma.document.update({
      where: { id: document.id },
      data: { processedAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      document: {
        id: document.id,
        fileName: document.fileName,
        pageCount: document.pageCount,
      },
    });
  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process document' },
      { status: 500 }
    );
  }
}
