-- Migration to add auto-increment sequence for eventId
-- This allows eventId to be automatically generated if not provided

-- Create sequence for eventId
CREATE SEQUENCE IF NOT EXISTS events_eventId_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Set default value for eventId to use the sequence
-- Note: This only applies when eventId is not explicitly provided in INSERT
ALTER TABLE events 
    ALTER COLUMN "eventId" SET DEFAULT nextval('events_eventId_seq');

-- If there are existing events, set the sequence to start after the max eventId
-- This ensures new auto-generated IDs don't conflict with existing ones
DO $$
DECLARE
    max_event_id INTEGER;
BEGIN
    SELECT COALESCE(MAX("eventId"), 0) INTO max_event_id FROM events;
    PERFORM setval('events_eventId_seq', max_event_id + 1, false);
END $$;

-- Add comment for documentation
COMMENT ON SEQUENCE events_eventId_seq IS 'Auto-increment sequence for eventId. Used when eventId is not explicitly provided during event creation.';

