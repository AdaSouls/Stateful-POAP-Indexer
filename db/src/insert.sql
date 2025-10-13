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
  :issuerAddress!,
  NULL,
  NULL,
  NULL,
  DEFAULT,
  DEFAULT
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
  "createdAt",
  "updatedAt"
)
VALUES (
  DEFAULT,
  :issuerId!,
  :eventId!,
  :eventMaxSupply!,
  :eventMintExpiration!,
  :eventOrganizer,
  DEFAULT,
  DEFAULT,
  DEFAULT
)
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
  :email,
  :ownerAddress!,
  DEFAULT,
  DEFAULT
)
RETURNING *;

/* 
 @name createPoap
 */
INSERT INTO poaps (
  "poapUuid",
  "issuerId",
  "eventId",
  "tokenId",
  "createdAt",
  "updatedAt"
)
VALUES (
  DEFAULT,
  :issuerId!,
  :eventId!,
  :tokenId!,
  DEFAULT,
  DEFAULT
)
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
RETURNING *;
