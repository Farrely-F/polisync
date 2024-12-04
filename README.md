# PoliSync - AI-Powered Company Policy Assistant

PoliSync is an intelligent chatbot that leverages RAG (Retrieval-Augmented Generation) technology to help users understand and navigate company policies effectively. Built with Next.js 13+, TypeScript, and modern web technologies, PoliSync provides an intuitive interface for policy queries and information retrieval.

## Features

- 🤖 AI-powered chat interface for policy questions
- 📑 PDF document ingestion and processing
- 🔍 Intelligent search and retrieval of policy information
- 💾 Supabase integration for data persistence
- 🎨 Modern UI with Radix UI components
- 🌐 Responsive design for all devices

## Tech Stack

- **Framework**: Next.js 13+
- **Language**: TypeScript
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **AI Integration**: Google Generative AI
- **PDF Processing**: PDF Parse

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   bun install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:

   ```
   GOOGLE_API_KEY=your_google_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:

   ```bash
   bun run dev
   # or
   bun run dev
   ```

5. To ingest PDF documents:
   ```bash
   bun run ingest
   # or
   bun run seed:pdf
   ```

## Usage

1. Upload company policy documents in the `/public/pdf` directory
2. Ask questions about policies in natural language
3. Receive accurate, context-aware responses based on your documents
4. Browse through conversation history and save important responses

## Development

- `bun run dev`: Start development server
- `bun run build`: Build for production
- `bun run start`: Start production server
- `bun run lint`: Run ESLint
- `bun run seed:pdf`: Ingest PDF documents

## Project Structure

- `/app`: Main application pages and API routes
- `/components`: Reusable UI components
- `/lib`: Utility functions and configurations
- `/hooks`: Custom React hooks
- `/public`: Static assets
- `/scripts`: Data ingestion and seeding scripts

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
