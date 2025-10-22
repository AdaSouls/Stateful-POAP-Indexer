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