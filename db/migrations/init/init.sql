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
  "issuerId" SERIAL NOT NULL REFERENCES issuers ("issuerId") ON DELETE CASCADE ON UPDATE CASCADE,
  "eventId" INTEGER UNIQUE NOT NULL,
  "maxSupply" INTEGER NOT NULL,
  expiration INTEGER NOT NULL,
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
CREATE TABLE IF NOT EXISTS poaps (
  "poapUuid" UUID NOT NULL UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4(),
  "issuerId" INTEGER NOT NULL,
  "eventId" INTEGER NOT NULL,
  "tokenId" SERIAL UNIQUE NOT NULL,
  "ownerAddress" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- EventPoaps join table
CREATE TABLE IF NOT EXISTS eventpoaps (
  "relationUuid" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "tokenId" SERIAL NOT NULL REFERENCES poaps ("tokenId") ON DELETE CASCADE ON UPDATE CASCADE,
  "eventId" SERIAL NOT NULL REFERENCES events ("eventId") ON DELETE CASCADE ON UPDATE CASCADE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT "unique_event_poap" UNIQUE ("tokenId", "eventId")
);

-- ============================================
-- Migration: Add off-chain data fields to events table
-- ============================================
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

-- 4. Create indexes for performance optimization

-- Indexes for events table
CREATE INDEX IF NOT EXISTS idx_events_event_id ON events("eventId");
CREATE INDEX IF NOT EXISTS idx_events_issuer_id ON events("issuerId");
CREATE INDEX IF NOT EXISTS idx_events_block_number ON events(block_number);
CREATE INDEX IF NOT EXISTS idx_events_transaction_hash ON events("transaction_hash");
CREATE INDEX IF NOT EXISTS idx_events_issuer_status ON events("issuerId", "status");

-- Indexes for poaps table
CREATE INDEX IF NOT EXISTS idx_poaps_token_id ON poaps("tokenId");
CREATE INDEX IF NOT EXISTS idx_poaps_event_id ON poaps("eventId");
CREATE INDEX IF NOT EXISTS idx_poaps_owner_address ON poaps("ownerAddress");
CREATE INDEX IF NOT EXISTS idx_poaps_issuer_id ON poaps("issuerId");
CREATE INDEX IF NOT EXISTS idx_poaps_block_number ON poaps(block_number);
CREATE INDEX IF NOT EXISTS idx_poaps_transaction_hash ON poaps("transaction_hash");

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_poaps_event_owner ON poaps("eventId", "ownerAddress");
CREATE INDEX IF NOT EXISTS idx_poaps_issuer_event ON poaps("issuerId", "eventId");

-- Index for block tracking
CREATE INDEX IF NOT EXISTS idx_block_tracking_hash ON block_tracking(block_hash);

-- Add comments for documentation
COMMENT ON TABLE block_tracking IS 'Tracks processed blocks and their hashes for reorg detection';
COMMENT ON COLUMN events.block_number IS 'Block number where the event was created';
COMMENT ON COLUMN events.transaction_hash IS 'Transaction hash of the event creation';
COMMENT ON COLUMN poaps.block_number IS 'Block number where the POAP was minted';
COMMENT ON COLUMN poaps.transaction_hash IS 'Transaction hash of the POAP mint';
