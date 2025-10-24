'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, Send, FileText, Loader2, MessageSquare, Sparkles } from 'lucide-react';

export default function ChatPage() {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file.name);
      setMessages([{
        role: 'system',
        content: `PDF "${file.name}" uploaded successfully! You can now ask questions about the document.`
      }]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !uploadedFile) return;

    const newMessage = { role: 'user', content: inputMessage };
    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'This is a demo response. Connect to your backend at /api/chat to enable real AI-powered PDF chat functionality.'
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="flex-1 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            PDF Chat Assistant
          </h1>
          <p className="text-gray-600">Upload a PDF and start asking questions about its content</p>
        </div>

        {!uploadedFile ? (
          <Card className="border-2 border-dashed border-purple-300 bg-purple-50/50 hover:border-purple-400 transition-colors">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <div className="bg-purple-100 p-6 rounded-full">
                    <Upload className="w-12 h-12 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload your PDF</h3>
                <p className="text-gray-600 mb-6">Drag and drop or click to browse</p>
                <label htmlFor="pdf-upload">
                  <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white cursor-pointer">
                    <span>
                      <FileText className="mr-2 h-5 w-5" />
                      Choose PDF File
                    </span>
                  </Button>
                  <input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-600 p-2 rounded-lg">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{uploadedFile}</p>
                      <p className="text-sm text-gray-600">Ready to chat</p>
                    </div>
                  </div>
                  <label htmlFor="pdf-upload-new">
                    <Button variant="outline" size="sm" asChild className="cursor-pointer">
                      <span>
                        <Upload className="mr-2 h-4 w-4" />
                        Change PDF
                      </span>
                    </Button>
                    <input
                      id="pdf-upload-new"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card className="h-[500px] flex flex-col">
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-center">
                    <div>
                      <MessageSquare className="w-16 h-16 mx-auto text-purple-300 mb-4" />
                      <p className="text-gray-500">Start a conversation about your PDF</p>
                      <p className="text-sm text-gray-400 mt-2">Ask anything about the document's content</p>
                    </div>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                            : msg.role === 'system'
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {msg.role === 'assistant' && (
                          <div className="flex items-center mb-1">
                            <Sparkles className="w-4 h-4 mr-1 text-purple-600" />
                            <span className="text-xs font-semibold text-purple-600">AI Assistant</span>
                          </div>
                        )}
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                    </div>
                  </div>
                )}
              </CardContent>
              
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask a question about your PDF..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 border-purple-200 focus:border-purple-600"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Tip: Connect to the Python backend at port 8000 to enable real AI responses
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
