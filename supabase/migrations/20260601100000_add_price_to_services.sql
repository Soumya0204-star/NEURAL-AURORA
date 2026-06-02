-- Add pricing and delivery columns to services table
ALTER TABLE services ADD COLUMN IF NOT EXISTS price TEXT DEFAULT '';
ALTER TABLE services ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT '₹';
ALTER TABLE services ADD COLUMN IF NOT EXISTS period TEXT DEFAULT '/project';
ALTER TABLE services ADD COLUMN IF NOT EXISTS delivery TEXT DEFAULT '';
ALTER TABLE services ADD COLUMN IF NOT EXISTS pricing JSONB DEFAULT '[]'::jsonb;
