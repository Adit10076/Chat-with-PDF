import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, MessageSquare, Sparkles, Upload, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-8 animate-fade-in-down">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by AI
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-6 animate-fade-in-up">
              Chat with Your
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                PDF Documents
              </span>
            </h1>
            
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
              Upload any PDF and have an intelligent conversation about its contents. 
              Get instant answers, summaries, and insights powered by advanced AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up animation-delay-400">
              <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105">
                <Link href="/sign-in">
                  Sign In
                </Link>
              </Button>
            </div>
            
            <div className="relative max-w-5xl mx-auto animate-fade-in-up animation-delay-600">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-20 h-20 mx-auto text-purple-600 mb-4 animate-bounce" />
                    <p className="text-gray-600 text-lg font-medium">Your AI-Powered PDF Assistant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to start chatting with your PDFs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Upload className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Upload PDF</h3>
                <p className="text-gray-600">
                  Simply drag and drop or click to upload your PDF document. We support files of any size.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">2. AI Processing</h3>
                <p className="text-gray-600">
                  Our AI instantly analyzes your document, understanding context and extracting key information.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-pink-300 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <MessageSquare className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Start Chatting</h3>
                <p className="text-gray-600">
                  Ask questions naturally and get instant, accurate answers based on your document.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your PDF Experience?</h2>
          <p className="text-xl mb-10 text-purple-100">
            Join thousands of users who are already chatting with their documents
          </p>
          <Button asChild size="lg" className="rounded-full bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Link href="/sign-up">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
