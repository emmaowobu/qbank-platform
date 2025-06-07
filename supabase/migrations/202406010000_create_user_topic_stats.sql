-- Migration to create user_topic_stats table with RLS

-- Drop existing table if it exists to apply new schema
DROP TABLE IF EXISTS public.user_topic_stats CASCADE;

CREATE TABLE IF NOT EXISTS public.user_topic_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  topic text NOT NULL,
  attempted integer NOT NULL DEFAULT 0,
  correct integer NOT NULL DEFAULT 0,
  accuracy numeric,
  updated_at timestamp DEFAULT now()
);

ALTER TABLE public.user_topic_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read and write for authenticated users"
ON public.user_topic_stats
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
