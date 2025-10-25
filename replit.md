# Overview

This is a PDF Chat AI application built with Next.js that enables users to upload PDF documents and have intelligent conversations about their content using AI. The application combines a SaaS starter template with Retrieval-Augmented Generation (RAG) capabilities, allowing authenticated users to upload documents, process them into searchable vector embeddings, and query them through a conversational interface powered by Google's Gemini AI.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: Next.js 15 (App Router) with React 19
- Uses the modern App Router architecture with server and client components
- Implements React Server Components (RSC) for improved performance
- Client-side state management with SWR for data fetching and caching
- Partial Prerendering (PPR) enabled for optimized page loads

**UI Components**: shadcn/ui with Radix UI primitives
- Utilizes the "new-york" style variant
- Component library built on Radix UI for accessible, unstyled primitives
- Custom theming with CSS variables for light/dark mode support
- Tailwind CSS for styling with custom configuration

**Routing Strategy**:
- Route groups for organizing authentication pages `(login)` and dashboard pages `(dashboard)`
- Nested layouts for dashboard sections (general settings, security, chat)
- Suspense boundaries for loading states

## Backend Architecture

**Authentication System**: JWT-based session management
- JWTs stored in HTTP-only cookies for security
- Session tokens signed using JOSE (JavaScript Object Signing and Encryption)
- Password hashing with bcryptjs (10 salt rounds)
- Global middleware protects all `/dashboard/*` routes
- Session refresh on GET requests (24-hour expiration)

**Database Layer**: Prisma ORM with PostgreSQL
- Prisma Client for type-safe database access
- Schema includes Users, Documents, Conversations, and Messages
- Soft deletes supported (deletedAt field on User model)
- Connection pooling handled by Prisma

**API Routes**: Next.js Route Handlers
- `/api/user` - Fetches current authenticated user
- `/api/add` - Processes and stores PDF documents in vector database
- `/api/chat` - Handles conversational queries with RAG
- `/api/documents/upload` - Manages document uploads with metadata storage
- `/api/rag/query` - Direct RAG query endpoint

**Server Actions**: Form handling with Zod validation
- `validatedAction` wrapper for schema validation
- `validatedActionWithUser` wrapper requires authentication
- Actions for sign-in, sign-up, account updates, password changes, and account deletion

## RAG (Retrieval-Augmented Generation) System

**Document Processing Pipeline**:
1. PDF upload via multipart form data
2. PDF parsing using `pdf-parse` library
3. Text chunking with RecursiveCharacterTextSplitter (1000 chars, 200 overlap)
4. Embedding generation via Google Gemini embeddings (embedding-001 model)
5. Vector storage in ChromaDB cloud instance

**Vector Database**: ChromaDB (Cloud)
- Collections organized by user or document context
- Default collection name: "myCollection" for general use, "documents" for user documents
- Cosine similarity for semantic search
- Cloud-hosted ChromaDB with API key authentication

**Embeddings**: Google Generative AI Embeddings
- Model: embedding-001
- Provided by `@langchain/google-genai` package

**LLM Integration**: Google Gemini 2.5 Flash
- Temperature: 0.7 for balanced creativity
- Conversation history maintained (last 5 messages)
- Context window includes top 4 relevant document chunks
- Response includes source citations from documents

**RAG Query Flow**:
1. User submits question
2. Question embedded using Gemini embeddings
3. Vector similarity search retrieves top 4 relevant chunks
4. Context assembled from chunks + conversation history
5. Prompt constructed with context and question
6. Gemini generates response with source attribution

## Data Models

**User**:
- id, email, name (optional), passwordHash
- Timestamps: createdAt, updatedAt, deletedAt (soft delete)

**Document**:
- id, userId (foreign key), fileName, fileSize, mimeType, pageCount
- uploadedAt timestamp
- Relationship: belongs to User

**Conversation**:
- id, userId (foreign key), title, createdAt, updatedAt
- Relationship: belongs to User, has many Messages

**Message**:
- id, conversationId (foreign key), role (user/assistant), content
- createdAt timestamp
- Relationship: belongs to Conversation

## External Dependencies

**AI Services**:
- Google Gemini API (gemini-2.5-flash for chat, embedding-001 for embeddings)
- Requires GEMINI_API_KEY environment variable

**Vector Database**:
- ChromaDB Cloud
- Requires: CHROMADB_API_KEY, CHROMADB_TENANT, CHROMADB_DATABASE, CHROMADB_URL
- Manages document embeddings and similarity search

**Database**:
- PostgreSQL (via Prisma)
- Connection via DATABASE_URL environment variable

**Payment Processing**:
- Stripe integration referenced in README but not actively implemented in codebase
- Would handle subscriptions and customer portal

**LangChain Framework**:
- @langchain/core - Core abstractions
- @langchain/community - Community integrations (ChromaDB vector store)
- @langchain/google-genai - Google AI integration
- @langchain/textsplitters - Document chunking utilities

**Authentication Secret**:
- AUTH_SECRET environment variable for JWT signing

**Development Tools**:
- TypeScript for type safety
- Prisma Studio for database management
- Next.js dev server on port 5000