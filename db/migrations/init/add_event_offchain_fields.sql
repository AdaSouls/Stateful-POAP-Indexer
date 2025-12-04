-- Migration to add off-chain data fields to events table
-- These fields store metadata that doesn't need to be on-chain

ALTER TABLE events
ADD COLUMN IF NOT EXISTS title VARCHAR(255),
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS "imageUrl" VARCHAR(500),
ADD COLUMN IF NOT EXISTS "eventStartDate" TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS "eventEndDate" TIMESTAMP WITH TIME ZONE;

-- Add comments for documentation
COMMENT ON COLUMN events.title IS 'Event title/name for display purposes';
COMMENT ON COLUMN events.description IS 'Detailed description of the event';
COMMENT ON COLUMN events."imageUrl" IS 'URL to the event image/banner';
COMMENT ON COLUMN events."eventStartDate" IS 'When the actual event starts (different from mint expiration)';
COMMENT ON COLUMN events."eventEndDate" IS 'When the actual event ends (different from mint expiration)';

