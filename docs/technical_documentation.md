# Project Overview

## Name

Next.js RAG Chatbot App

## Version

1.0.0

## Purpose

The purpose of this project is to create a chatbot that leverages RAG (Retrieval-Augmented Generation) technology to help users understand and navigate company policies effectively.

# Installation Instructions

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Use `npm run dev` to start the development server.

# Scripts

- `dev`: Runs the development server using Next.js.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Lints the codebase.
- `seed:pdf`: Runs the PDF seeding script.

# API Documentation

## POST /api/chat

### Request

- **Body**:
  - `message`: A string containing the user's message.

### Response

- **Success**: Returns a JSON object with the generated response and context information.
- **Error**: Returns an error message if the input is invalid or processing fails.

# PDF Processing

## Seed PDF Script

The [seed-pdf.ts](cci:7://file:///c:/Users/sltr9/OneDrive/Desktop/next-chatbot/scripts/seed-pdf.ts:0:0-0:0) script processes the `company-policy.pdf` file located in the `public/pdf` directory.

### Execution

Run the script using `npm run seed:pdf`.

# Error Handling

The project includes comprehensive error handling to manage various failure scenarios effectively.
