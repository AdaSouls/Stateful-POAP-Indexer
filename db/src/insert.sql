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
SELECT
  uuid_generate_v4(),
  :issuerId!,
  lower(:issuerAddress!),
  :username,
  :email,
  :organization,
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM issuers 
  WHERE "issuerId" = :issuerId! 
     OR lower("issuerAddress") = lower(:issuerAddress!)
)
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
ON CONFLICT ("tokenId") DO NOTHING
RETURNING *;

/* 
 @name createEventPoap
 */
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
ON CONFLICT ("tokenId", "eventId") DO NOTHING
RETURNING *;
