
-- Add views and downloads columns to the resumes table
ALTER TABLE public.resumes 
ADD COLUMN views INTEGER DEFAULT 0,
ADD COLUMN downloads INTEGER DEFAULT 0;
