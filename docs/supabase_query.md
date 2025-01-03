# Supabase SQL Query Documentation

## Enable the Vector Extension

To enable the vector extension & create tables in your Supabase database, use the following SQL command:

```sql
-- Enable the vector extension
CREATE extension IF NOT EXISTS vector;

-- Create the documents table
CREATE TABLE example_app (
  id uuid primary key default uuid_generate_v4(),
  content text not null,
  embedding vector(768),
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);

-- Create a function to search for similar documents
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
language plpgsql
as $$
begin
  return query
  select
    id,
    content,
    1 - (example_app.embedding <=> query_embedding) as similarity
  from example_app
  where 1 - (example_app.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
end;
$$;

```

<!-- ## Update the `match_documents` Function

To update the `match_documents` function, first drop the existing function (if it exists) and then create the new version with default parameters.

### Drop the Existing Function

Use the following SQL to drop the existing `match_documents` function:

```sql
DROP FUNCTION IF EXISTS match_documents(vector(768), float, int);

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
    documents.id,
    documents.content,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;
``` -->
