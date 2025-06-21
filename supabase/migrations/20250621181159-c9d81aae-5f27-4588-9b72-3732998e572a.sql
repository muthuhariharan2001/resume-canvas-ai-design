
-- Add missing columns to the resumes table (using non-reserved keywords)
ALTER TABLE public.resumes 
ADD COLUMN projects jsonb,
ADD COLUMN activities jsonb,
ADD COLUMN resume_references jsonb;
