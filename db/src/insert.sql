/*
 @name createIssuer
 */
INSERT INTO issuers (
  "issuerUuid",
  "issuerId",
  "issuerAddress",
  username,
  email,
  organization,
  "createdAt",
  "updatedAt"
)
VALUES (
  DEFAULT,
  :issuerId!,
  lower(:issuerAddress!),
  :username,
  :email,
  :organization,
  DEFAULT,
  DEFAULT
)
ON CONFLICT ("issuerId") DO NOTHING
RETURNING *;

/* 
 @name createEvent
 */
INSERT INTO events (
  "eventUuid",
  "issuerId",
  "eventId",
  "maxSupply",
  expiration,
  "organiserAddress",
  status,
  title,
  description,
  "imageUrl",
  "eventStartDate",
  "eventEndDate",
  "createdAt",
  "updatedAt"
)
VALUES (
  DEFAULT,
  :issuerId!,
  :eventId!,
  :eventMaxSupply!,
  :eventMintExpiration!,
  lower(:eventOrganizer!),
  DEFAULT,
  :title,
  :description,
  :imageUrl,
  :eventStartDate,
  :eventEndDate,
  DEFAULT,
  DEFAULT
)
ON CONFLICT ("eventId") DO NOTHING
RETURNING *;

/* 
 @name createOwner
 */
INSERT INTO "owners" (
  "ownerId",
  username,
  email,
  "ownerAddress",
  "createdAt",
  "updatedAt"
)
VALUES (
  DEFAULT,
  :username,
  lower(:email),
  lower(:ownerAddress!),
  DEFAULT,
  DEFAULT
)
ON CONFLICT ("ownerAddress") DO NOTHING
RETURNING *;

/* 
 @name createPoap
 */
-- NOTE: tokenId is NOT unique - multiple POAPs can have the same tokenId.
-- For conflict detection, use transaction_hash (which is unique) instead of tokenId.
-- This query does not include transaction_hash - use the raw SQL in blockchainSync.service.ts
-- for inserts with transaction_hash conflict detection.
INSERT INTO poaps (
  "poapUuid",
  "issuerId",
  "eventId",
  "tokenId",
  "ownerAddress",
  "createdAt",
  "updatedAt"
)
VALUES (
  DEFAULT,
  :issuerId!,
  :eventId!,
  :tokenId!,
  :ownerAddress!,
  DEFAULT,
  DEFAULT
)
RETURNING *;

/* 
 @name createEventPoap
 */
-- NOTE: There is NO unique constraint on (tokenId, eventId) since tokenId can be duplicated.
-- Multiple eventpoaps entries can exist with the same tokenId and eventId combination.
INSERT INTO eventpoaps (
  "relationUuid",
  "tokenId",
  "eventId",
  "createdAt",
  "updatedAt"
)
VALUES (
  DEFAULT,
  :tokenId!,
  :eventId!,
  DEFAULT,
  DEFAULT
)
RETURNING *;
