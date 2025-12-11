-- Production-Ready Indexing Enhancements
-- This migration adds support for block reorg detection, performance optimization, and metadata tracking

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


