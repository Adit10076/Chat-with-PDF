# PDF Chat Backend

This is the backend service for the PDF Chat application built with FastAPI.

## Getting Started

### Prerequisites
- Python 3.11+
- pip or uv

### Installation

```bash
# Install dependencies
pip install -r requirements.txt

# Or using uv (faster)
uv pip install -r requirements.txt
```

### Running the Server

```bash
# Development mode
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production mode
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Endpoints

### POST /api/upload-pdf
Upload a PDF file for processing

### POST /api/chat
Send a chat message and receive a response with PDF context

### GET /api/health
Health check endpoint

## TODO

Add your PDF processing and chat logic:
1. PDF text extraction
2. Vector embeddings for semantic search
3. LLM integration for intelligent responses
4. Session management
5. Chat history storage
