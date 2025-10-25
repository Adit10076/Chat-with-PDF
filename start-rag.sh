#!/bin/bash

# RAG Pipeline Startup Script
echo "🚀 Starting RAG Pipeline..."

# Check if .env file exists in backend
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Warning: backend/.env file not found!"
    echo "Please create backend/.env with your API keys:"
    echo "GOOGLE_API_KEY=your_google_gemini_api_key_here"
    echo "CHROMA_API_KEY=your_chroma_api_key_here"
    echo "CHROMA_TENANT=your_tenant_id_here"
    echo "CHROMA_DATABASE=your_database_name_here"
    echo "BACKEND_PORT=8000"
    echo ""
fi

# Install backend dependencies if node_modules doesn't exist
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install --legacy-peer-deps
    cd ..
fi

# Start backend in background
echo "🔧 Starting RAG backend server..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting Next.js frontend..."
npm run dev

# Cleanup function
cleanup() {
    echo "🛑 Shutting down..."
    kill $BACKEND_PID 2>/dev/null
    exit
}

# Trap Ctrl+C
trap cleanup INT
