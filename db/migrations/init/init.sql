-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Owners table
CREATE TABLE IF NOT EXISTS "owners" (
  "ownerUuid" UUID NOT NULL UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4(),
  "address" VARCHAR(255) UNIQUE,
  "email" VARCHAR(255) UNIQUE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Issuers table
CREATE TABLE IF NOT EXISTS "issuers" (
  "issuerUuid" UUID NOT NULL UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4(),
  "issuerIdInContract" SERIAL UNIQUE,
  "address" VARCHAR(255) NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "organization" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS "events" (
  "eventUuid" UUID NOT NULL UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4(),
  "eventIdInContract" SERIAL NOT NULL,
  "title" VARCHAR(255) NOT NULL,
  "description" VARCHAR(255) NOT NULL,
  "city" VARCHAR(255),
  "country" VARCHAR(255),
  "startDate" TIMESTAMP WITH TIME ZONE NOT NULL,
  "endDate" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "expiryDate" TIMESTAMP WITH TIME ZONE,
  "year" INTEGER,
  "eventUrl" VARCHAR(255),
  "virtualEvent" BOOLEAN NOT NULL,
  "image" VARCHAR(255) NOT NULL,
  "secretCode" VARCHAR(255),
  "eventTemplateId" VARCHAR(255),
  "email" VARCHAR(255) NOT NULL,
  "requestedCodes" INTEGER NOT NULL,
  "privateEvent" BOOLEAN NOT NULL,
  "purpose" VARCHAR(255),
  "platform" VARCHAR(255),
  "eventType" VARCHAR(255) NOT NULL DEFAULT 'Unknown',
  "amountOfAttendees" INTEGER,
  "account" VARCHAR(255),
  "poapType" VARCHAR(255) NOT NULL,
  "poapsToBeMinted" INTEGER NOT NULL,
  "mintedPoaps" INTEGER NOT NULL,
  "approved" VARCHAR(255) NOT NULL DEFAULT 'Pending',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "issuerUuid" UUID NOT NULL REFERENCES "issuers" ("issuerUuid") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Poaps table
CREATE TABLE IF NOT EXISTS "poaps" (
  "poapUuid" UUID NOT NULL UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4(),
  "instance" INTEGER NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "ownerUuid" UUID NOT NULL REFERENCES "owners" ("ownerUuid") ON DELETE CASCADE ON UPDATE CASCADE
);

-- EventPoaps table
CREATE TABLE IF NOT EXISTS "eventpoaps" (
  "relationUuid" UUID NOT NULL UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4(),
  "poapUuid" UUID NOT NULL REFERENCES "poaps" ("poapUuid") ON DELETE CASCADE ON UPDATE CASCADE,
  "eventUuid" UUID NOT NULL REFERENCES "events" ("eventUuid") ON DELETE CASCADE ON UPDATE CASCADE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);