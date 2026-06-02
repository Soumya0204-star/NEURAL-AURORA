ALTER TABLE service_page ADD COLUMN IF NOT EXISTS future_releases JSONB DEFAULT '[]'::jsonb;
