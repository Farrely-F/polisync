# Supabase SQL Query Documentation

## Enable the Vector Extension

To enable the vector extension & create tables in your Supabase database, use the following SQL command:

### 1. Create and Enable Vector Extension

```sql
-- Enable the vector extension
CREATE extension IF NOT EXISTS vector;
```
### 2. Create The Table for Embedding Content

```sql
-- Create the documents table
CREATE TABLE example_app (
  id uuid primary key default uuid_generate_v4(),
  content text not null,
  embedding vector(768),
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);
```

### 3. Create Vector Search Function

```sql
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(768),
  match_threshold float DEFAULT 0.78,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  content text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ea.id,
    ea.content,
    1 - (ea.embedding <=> query_embedding) AS similarity
  FROM example_app AS ea
  WHERE 1 - (ea.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;
```
