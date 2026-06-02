ALTER TABLE admin_settings
ADD COLUMN IF NOT EXISTS payment_settings JSONB DEFAULT '{}';
