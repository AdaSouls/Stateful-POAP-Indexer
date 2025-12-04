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
