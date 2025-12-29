-- Drop all indexes first (in reverse order of creation)
DROP INDEX IF EXISTS idx_block_tracking_hash;
DROP INDEX IF EXISTS idx_poaps_issuer_event;
DROP INDEX IF EXISTS idx_poaps_event_owner;
DROP INDEX IF EXISTS idx_poaps_transaction_hash;
DROP INDEX IF EXISTS idx_poaps_block_number;
DROP INDEX IF EXISTS idx_poaps_issuer_id;
DROP INDEX IF EXISTS idx_poaps_owner_address;
DROP INDEX IF EXISTS idx_poaps_event_id;
DROP INDEX IF EXISTS idx_poaps_token_id;
DROP INDEX IF EXISTS idx_events_issuer_status;
DROP INDEX IF EXISTS idx_events_transaction_hash;
DROP INDEX IF EXISTS idx_events_block_number;
DROP INDEX IF EXISTS idx_events_issuer_id;
DROP INDEX IF EXISTS idx_events_event_id;

-- Drop block tracking table
DROP TABLE IF EXISTS block_tracking CASCADE;

-- Drop sequence
DROP SEQUENCE IF EXISTS events_eventId_seq CASCADE;

-- Drop columns added in migrations (reverse order)
-- Note: Dropping columns from events and poaps tables
ALTER TABLE poaps
DROP COLUMN IF EXISTS transaction_hash,
DROP COLUMN IF EXISTS block_number;

ALTER TABLE events
DROP COLUMN IF EXISTS transaction_hash,
DROP COLUMN IF EXISTS block_number,
DROP COLUMN IF EXISTS "eventEndDate",
DROP COLUMN IF EXISTS "eventStartDate",
DROP COLUMN IF EXISTS "imageUrl",
DROP COLUMN IF EXISTS description,
DROP COLUMN IF EXISTS title;

-- Drop base tables (in reverse order of dependencies)
DROP TABLE IF EXISTS eventpoaps CASCADE;
DROP TABLE IF EXISTS poaps CASCADE;
DROP TABLE IF EXISTS owners CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS issuers CASCADE;

-- Drop extension
DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;
