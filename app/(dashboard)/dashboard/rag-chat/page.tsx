import { DocumentUpload } from '@/components/chat/document-upload';
import { ChatInterface } from '@/components/chat/chat-interface';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function RagChatPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">RAG Chat with Documents</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <DocumentUpload />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle>Chat</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ChatInterface />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
