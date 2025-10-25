@echo off
echo 🚀 Starting RAG Pipeline...

REM Check if .env file exists in backend
if not exist "backend\.env" (
    echo ⚠️  Warning: backend\.env file not found!
    echo Please create backend\.env with your API keys:
    echo GOOGLE_API_KEY=your_google_gemini_api_key_here
    echo CHROMA_API_KEY=your_chroma_api_key_here
    echo CHROMA_TENANT=your_tenant_id_here
    echo CHROMA_DATABASE=your_database_name_here
    echo BACKEND_PORT=8000
    echo.
)

REM Install backend dependencies if node_modules doesn't exist
if not exist "backend\node_modules" (
    echo 📦 Installing backend dependencies...
    cd backend
    npm install --legacy-peer-deps
    cd ..
)

REM Start backend in background
echo 🔧 Starting RAG backend server...
cd backend
start /B npm start
cd ..

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
echo 🎨 Starting Next.js frontend...
npm run dev

pause
