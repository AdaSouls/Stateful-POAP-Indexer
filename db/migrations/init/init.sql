-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Issuers table
CREATE TABLE IF NOT EXISTS issuers (
  "issuerUuid" UUID NOT NULL UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4(),
  "issuerId" INTEGER UNIQUE NOT NULL,
  "issuerAddress" VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  organization VARCHAR(255),
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  "eventUuid" UUID NOT NULL UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4(),
  "issuerId" INTEGER NOT NULL REFERENCES issuers ("issuerId") ON DELETE CASCADE ON UPDATE CASCADE,
  "eventId" INTEGER UNIQUE NOT NULL,
  "maxSupply" INTEGER NOT NULL,
  expiration BIGINT NOT NULL,
  "organiserAddress" VARCHAR(255) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'Pending',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Owners table
CREATE TABLE IF NOT EXISTS owners (
  "ownerId" SERIAL UNIQUE NOT NULL,
  username VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  "ownerAddress" VARCHAR(255) UNIQUE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Poaps table
-- Note: tokenId is INTEGER (from blockchain event) but NOT UNIQUE to allow duplicate tokenIds
-- transaction_hash will have a UNIQUE constraint added after the column is created
CREATE TABLE IF NOT EXISTS poaps (
  "poapUuid" UUID NOT NULL UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4(),
  "issuerId" INTEGER NOT NULL,
  "eventId" INTEGER NOT NULL,
  "tokenId" INTEGER NOT NULL,
  "ownerAddress" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- EventPoaps join table
-- Note: tokenId and eventId are INTEGER (from blockchain events), not SERIAL
-- No UNIQUE constraint on (tokenId, eventId) since tokenId is not unique
-- Note: tokenId cannot have a foreign key to poaps.tokenId because tokenId is not unique in poaps
CREATE TABLE IF NOT EXISTS eventpoaps (
  "relationUuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "tokenId" INTEGER NOT NULL,
  "eventId" INTEGER NOT NULL REFERENCES events ("eventId") ON DELETE CASCADE ON UPDATE CASCADE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- Migration: Add off-chain data fields to events table
-- ============================================
-- These fields store metadata that doesn't need to be on-chain

ALTER TABLE events
ADD COLUMN IF NOT EXISTS title VARCHAR(255),
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS "imageUrl" VARCHAR(500),
ADD COLUMN IF NOT EXISTS "eventStartDate" BIGINT,
ADD COLUMN IF NOT EXISTS "eventEndDate" TIMESTAMP WITH TIME ZONE;

-- Add comments for documentation
COMMENT ON COLUMN events.title IS 'Event title/name for display purposes';
COMMENT ON COLUMN events.description IS 'Detailed description of the event';
COMMENT ON COLUMN events."imageUrl" IS 'URL to the event image/banner';
COMMENT ON COLUMN events."eventStartDate" IS 'When the actual event starts (Unix timestamp in seconds, same type as expiration)';
COMMENT ON COLUMN events."eventEndDate" IS 'When the actual event ends (different from mint expiration)';

-- ============================================
-- Migration: Add auto-increment sequence for eventId
-- ============================================
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

-- ============================================
-- Migration: Production-Ready Indexing Enhancements
-- ============================================
-- This adds support for block reorg detection, performance optimization, and metadata tracking

-- 1. Add block tracking table for reorg detection
CREATE TABLE IF NOT EXISTS block_tracking (
  block_number INTEGER PRIMARY KEY,
  block_hash VARCHAR(66) NOT NULL,
  processed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT unique_block_hash UNIQUE (block_hash)
);

-- 2. Add blockchain metadata columns to events table
ALTER TABLE events
ADD COLUMN IF NOT EXISTS block_number INTEGER,
ADD COLUMN IF NOT EXISTS transaction_hash VARCHAR(66);

-- 3. Add blockchain metadata columns to poaps table
ALTER TABLE poaps
ADD COLUMN IF NOT EXISTS block_number INTEGER,
ADD COLUMN IF NOT EXISTS transaction_hash VARCHAR(66);

-- 3a. Convert tokenId from SERIAL to INTEGER if needed (for existing databases)
-- This ensures tokenId uses the value from blockchain events, not auto-increment
DO $$
DECLARE
    constraint_name TEXT;
BEGIN
    -- Convert poaps.tokenId from SERIAL to INTEGER if it's using a sequence
    IF EXISTS (
        SELECT 1 FROM pg_sequences 
        WHERE schemaname = 'public' 
        AND sequencename = 'poaps_tokenId_seq'
    ) THEN
        -- Drop the default and sequence
        ALTER TABLE poaps ALTER COLUMN "tokenId" DROP DEFAULT;
        DROP SEQUENCE IF EXISTS poaps_tokenId_seq CASCADE;
        RAISE NOTICE 'Converted poaps.tokenId from SERIAL to INTEGER';
    END IF;
    
    -- Convert eventpoaps.tokenId from SERIAL to INTEGER if it's using a sequence
    IF EXISTS (
        SELECT 1 FROM pg_sequences 
        WHERE schemaname = 'public' 
        AND sequencename = 'eventpoaps_tokenId_seq'
    ) THEN
        ALTER TABLE eventpoaps ALTER COLUMN "tokenId" DROP DEFAULT;
        DROP SEQUENCE IF EXISTS eventpoaps_tokenId_seq CASCADE;
        RAISE NOTICE 'Converted eventpoaps.tokenId from SERIAL to INTEGER';
    END IF;
    
    -- Convert eventpoaps.eventId from SERIAL to INTEGER if it's using a sequence
    IF EXISTS (
        SELECT 1 FROM pg_sequences 
        WHERE schemaname = 'public' 
        AND sequencename = 'eventpoaps_eventId_seq'
    ) THEN
        ALTER TABLE eventpoaps ALTER COLUMN "eventId" DROP DEFAULT;
        DROP SEQUENCE IF EXISTS eventpoaps_eventId_seq CASCADE;
        RAISE NOTICE 'Converted eventpoaps.eventId from SERIAL to INTEGER';
    END IF;
    
    -- Drop any existing unique constraint on tokenId in poaps if it exists
    SELECT conname INTO constraint_name
    FROM pg_constraint 
    WHERE conrelid = 'poaps'::regclass
    AND contype = 'u'
    AND (
        conname = 'poaps_tokenId_key' 
        OR conname LIKE '%tokenId%'
    )
    LIMIT 1;
    
    IF constraint_name IS NOT NULL THEN
        EXECUTE format('ALTER TABLE poaps DROP CONSTRAINT %I', constraint_name);
        RAISE NOTICE 'Dropped unique constraint % on poaps.tokenId', constraint_name;
    END IF;
    
    -- Remove unique constraint on (tokenId, eventId) from eventpoaps if it exists
    IF EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'unique_event_poap' 
        AND conrelid = 'eventpoaps'::regclass
    ) THEN
        ALTER TABLE eventpoaps DROP CONSTRAINT unique_event_poap;
        RAISE NOTICE 'Removed unique constraint on eventpoaps (tokenId, eventId)';
    END IF;
END $$;

-- 3b. Add UNIQUE constraint on transaction_hash (ensures transaction_hash uniqueness)
-- This allows duplicate tokenIds but ensures each transaction_hash is unique
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'poaps' 
        AND column_name = 'transaction_hash'
    ) THEN
        -- Add unique constraint on transaction_hash if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 FROM pg_constraint 
            WHERE conname = 'poaps_transaction_hash_key' 
            AND conrelid = 'poaps'::regclass
        ) THEN
            ALTER TABLE poaps 
            ADD CONSTRAINT poaps_transaction_hash_key UNIQUE (transaction_hash);
            RAISE NOTICE 'Added unique constraint on poaps.transaction_hash';
        END IF;
    END IF;
END $$;

-- 4. Create indexes for performance optimization

-- Indexes for events table
CREATE INDEX IF NOT EXISTS idx_events_event_id ON events("eventId");
CREATE INDEX IF NOT EXISTS idx_events_issuer_id ON events("issuerId");
CREATE INDEX IF NOT EXISTS idx_events_block_number ON events(block_number);
CREATE INDEX IF NOT EXISTS idx_events_transaction_hash ON events(transaction_hash);
CREATE INDEX IF NOT EXISTS idx_events_issuer_status ON events("issuerId", "status");

-- Indexes for poaps table
CREATE INDEX IF NOT EXISTS idx_poaps_token_id ON poaps("tokenId");
CREATE INDEX IF NOT EXISTS idx_poaps_event_id ON poaps("eventId");
CREATE INDEX IF NOT EXISTS idx_poaps_owner_address ON poaps("ownerAddress");
CREATE INDEX IF NOT EXISTS idx_poaps_issuer_id ON poaps("issuerId");
CREATE INDEX IF NOT EXISTS idx_poaps_block_number ON poaps(block_number);
CREATE INDEX IF NOT EXISTS idx_poaps_transaction_hash ON poaps(transaction_hash);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_poaps_event_owner ON poaps("eventId", "ownerAddress");
CREATE INDEX IF NOT EXISTS idx_poaps_issuer_event ON poaps("issuerId", "eventId");

-- Index for block tracking
CREATE INDEX IF NOT EXISTS idx_block_tracking_hash ON block_tracking(block_hash);

-- ============================================
-- Migration: Add totalSupply field to events table
-- ============================================
-- This field tracks the current number of POAPs minted for each event

ALTER TABLE events
ADD COLUMN IF NOT EXISTS "totalSupply" INTEGER DEFAULT 0;

-- Add comment for documentation
COMMENT ON COLUMN events."totalSupply" IS 'Current number of POAPs minted for this event (incremented on mint, decremented on reorg rollback)';

-- ============================================
-- Migration: Widen Unix-timestamp columns from INTEGER to BIGINT
-- ============================================
-- INTEGER (signed 32-bit) maxes out at 2,147,483,647 which is Unix timestamp
-- 2038-01-19. eventMintExpiration / eventStartDate are Unix timestamps and can
-- legitimately be much larger (e.g. far-future expirations), which causes
-- "value out of range for type integer" and aborts the SM transaction,
-- making the funnel loop forever on the same block range.
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'events' AND column_name = 'expiration' AND data_type = 'integer'
    ) THEN
        ALTER TABLE events ALTER COLUMN expiration TYPE BIGINT;
        RAISE NOTICE 'Promoted events.expiration to BIGINT';
    END IF;

    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'events' AND column_name = 'eventStartDate' AND data_type = 'integer'
    ) THEN
        ALTER TABLE events ALTER COLUMN "eventStartDate" TYPE BIGINT;
        RAISE NOTICE 'Promoted events."eventStartDate" to BIGINT';
    END IF;
END $$;

-- ============================================
-- Optional Initialization: Initialize totalSupply for existing events
-- ============================================
-- NOTE: This script is only needed if you have existing events that were created
-- BEFORE the totalSupply column was added. For new databases or fresh starts,
-- this is NOT necessary since totalSupply will be automatically tracked going forward.
--
-- If you have existing events with POAPs already minted, run this ONCE to
-- initialize totalSupply by counting existing POAPs for each event:
--
-- UPDATE events 
-- SET "totalSupply" = (
--   SELECT COUNT(*) 
--   FROM poaps 
--   WHERE poaps."eventId" = events."eventId"
-- )
-- WHERE "totalSupply" = 0 OR "totalSupply" IS NULL;
--
-- This ensures that events created before the totalSupply field was added
-- will have the correct count based on existing POAP records.

-- Add comments for documentation
COMMENT ON TABLE block_tracking IS 'Tracks processed blocks and their hashes for reorg detection';
COMMENT ON COLUMN events.block_number IS 'Block number where the event was created';
COMMENT ON COLUMN events.transaction_hash IS 'Transaction hash of the event creation';
COMMENT ON COLUMN poaps.block_number IS 'Block number where the POAP was minted';
COMMENT ON COLUMN poaps.transaction_hash IS 'Transaction hash of the POAP mint (UNIQUE constraint ensures no duplicate transactions)';
COMMENT ON COLUMN poaps."tokenId" IS 'Token ID from blockchain event (INTEGER, NOT UNIQUE - allows duplicate tokenIds from different transactions)';
