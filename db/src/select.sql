/*
 @name getAllIssuers
 */
SELECT * FROM issuers;

/*
  @name getIssuerByWalletAddress
 */
-- IMPORTANT: This uses issuerAddress which should be the eventOrganizer address from EventCreated events.
-- DO NOT use ownerAddress from poaps table - that is the address of token recipients, not issuers.
SELECT * FROM issuers
WHERE "issuerAddress" = lower(:walletAddress!);

/*
  @name getIssuerByIssuerId
 */
-- Get issuer by issuerId. This is the correct way to get issuers from poaps table.
-- IMPORTANT: poaps.ownerAddress does NOT correspond to issuers.issuerAddress.
-- Use poaps.issuerId to join with issuers.issuerId.
SELECT * FROM issuers
WHERE "issuerId" = :issuerId!;

/*
  @name getIssuerByUuid
*/
SELECT * FROM issuers
WHERE "issuerUuid" = :issuerUuid!;

/*
  @name getOwnerByWalletAddress
*/
SELECT * FROM owners
WHERE "ownerAddress" = lower(:walletAddress!);

/*
 @name getAllEvents
 */
SELECT * FROM events;

/*
 @name getEventsWithFilters
 */
SELECT * FROM events
WHERE 
  (:organiserAddress::text IS NULL OR "organiserAddress" = lower(:organiserAddress))
  AND (:eventIdSearch::text IS NULL OR CAST("eventId" AS TEXT) ILIKE '%' || :eventIdSearch || '%')
  AND (:titleSearch::text IS NULL OR title ILIKE '%' || :titleSearch || '%')
  -- Event Start Date filters
  AND (:eventStartDateMin::bigint IS NULL OR "eventStartDate" IS NULL OR "eventStartDate" >= :eventStartDateMin)
  AND (:eventStartDateMax::bigint IS NULL OR "eventStartDate" IS NULL OR "eventStartDate" <= :eventStartDateMax)
  -- Expiration filters (expiration = 0 means indefinite/never expires)
  AND (:expirationMin::bigint IS NULL OR expiration = 0 OR expiration >= :expirationMin)
  AND (:expirationMax::bigint IS NULL OR expiration = 0 OR expiration <= :expirationMax)
  -- Max Supply filters
  AND (:maxSupplyMin::integer IS NULL OR "maxSupply" >= :maxSupplyMin)
  AND (:maxSupplyMax::integer IS NULL OR "maxSupply" <= :maxSupplyMax)
  -- Total Supply filters
  AND (:totalSupplyMin::integer IS NULL OR "totalSupply" IS NULL OR "totalSupply" >= :totalSupplyMin)
  AND (:totalSupplyMax::integer IS NULL OR "totalSupply" IS NULL OR "totalSupply" <= :totalSupplyMax)
  -- Calculated Status filter (pending, active, expired, completed)
  AND (
    :calculatedStatus::text IS NULL OR
    CASE :calculatedStatus
      -- Pending: eventStartDate exists and is in the future
      WHEN 'pending' THEN 
        "eventStartDate" IS NOT NULL 
        AND "eventStartDate" > EXTRACT(EPOCH FROM NOW())
      -- Active: started and not expired
      WHEN 'active' THEN 
        ("eventStartDate" IS NULL OR "eventStartDate" <= EXTRACT(EPOCH FROM NOW()))
        AND (expiration = 0 OR expiration > EXTRACT(EPOCH FROM NOW()))
      -- Expired: expiration > 0 and expiration <= now
      WHEN 'expired' THEN 
        expiration > 0 
        AND expiration <= EXTRACT(EPOCH FROM NOW())
      -- Completed: totalSupply >= maxSupply
      WHEN 'completed' THEN 
        "totalSupply" IS NOT NULL 
        AND "maxSupply" IS NOT NULL 
        AND "totalSupply" >= "maxSupply"
      ELSE true
    END
  )
ORDER BY
  CASE WHEN :sortBy = 'createdAt' AND :order = 'asc' THEN "createdAt" END ASC NULLS LAST,
  CASE WHEN :sortBy = 'createdAt' AND :order = 'desc' THEN "createdAt" END DESC NULLS LAST,
  CASE WHEN :sortBy = 'eventStartDate' AND :order = 'asc' THEN "eventStartDate" END ASC NULLS LAST,
  CASE WHEN :sortBy = 'eventStartDate' AND :order = 'desc' THEN "eventStartDate" END DESC NULLS LAST,
  CASE WHEN :sortBy = 'expiration' AND :order = 'asc' THEN expiration END ASC NULLS LAST,
  CASE WHEN :sortBy = 'expiration' AND :order = 'desc' THEN expiration END DESC NULLS LAST,
  CASE WHEN :sortBy = 'title' AND :order = 'asc' THEN title END ASC NULLS LAST,
  CASE WHEN :sortBy = 'title' AND :order = 'desc' THEN title END DESC NULLS LAST,
  CASE WHEN :sortBy = 'maxSupply' AND :order = 'asc' THEN "maxSupply" END ASC NULLS LAST,
  CASE WHEN :sortBy = 'maxSupply' AND :order = 'desc' THEN "maxSupply" END DESC NULLS LAST,
  CASE WHEN :sortBy = 'totalSupply' AND :order = 'asc' THEN "totalSupply" END ASC NULLS LAST,
  CASE WHEN :sortBy = 'totalSupply' AND :order = 'desc' THEN "totalSupply" END DESC NULLS LAST,
  "createdAt" DESC NULLS LAST;

/*
 @name getEventsByOrganizer
 */
SELECT * FROM events
WHERE "organiserAddress" = lower(:organiserAddress!)
ORDER BY "createdAt" DESC;

/*
 @name getAllOwners
 */
SELECT * FROM owners;

/*
 @name getAllPoaps
 */
SELECT * FROM poaps;

/*
 @name getAllEventPoaps
 */
SELECT * FROM eventpoaps;

/*
  @name getAllEventsByTokenId
*/
SELECT *
FROM "eventpoaps"
WHERE "tokenId" = :tokenId;

/*
  @name getPoapsByOwnerAddress
*/
-- Get all POAPs for an owner with full event details
SELECT 
  p.*,
  e."eventUuid",
  e."issuerId" as event_issuerId,
  e.title,
  e.description,
  e."imageUrl",
  e."maxSupply",
  e."organiserAddress",
  e.status,
  e."totalSupply",
  e."eventStartDate",
  e."eventEndDate",
  e.expiration,
  e."createdAt" as event_createdAt,
  e."updatedAt" as event_updatedAt,
  e.block_number as event_block_number,
  e.transaction_hash as event_transaction_hash
FROM poaps p
LEFT JOIN events e ON p."eventId" = e."eventId"
WHERE p."ownerAddress" = lower(:ownerAddress!)
ORDER BY p."createdAt" DESC;

/*
  @name getEventByEventId
*/
SELECT * FROM events WHERE "eventId" = :eventId!;

/*
  @name getPoapByTokenId
 */
-- NOTE: tokenId is NOT unique, so this query may return multiple POAPs.
-- Use transaction_hash or poapUuid to get a specific POAP.
SELECT * FROM poaps WHERE "tokenId" = :tokenId!;

/*
  @name getOwnersByEventId
 */
-- Get all distinct owners (people) who minted tokens for a specific event
-- NOTE: owners table is not populated, so only ownerAddress is returned
SELECT DISTINCT 
  p."ownerAddress",
  COUNT(*) as mint_count
FROM poaps p
WHERE p."eventId" = :eventId!
GROUP BY p."ownerAddress"
ORDER BY mint_count DESC, p."ownerAddress";

/*
  @name getPoapsByEventId
 */
-- Get all POAPs for a specific event with event details
-- IMPORTANT: To join with issuers, use p."issuerId" = issuers."issuerId", NOT p."ownerAddress" = issuers."issuerAddress"
-- NOTE: owners table is not populated, so owner information is not included
SELECT 
  p.*,
  e.title,
  e.description,
  e."imageUrl",
  e."maxSupply",
  e."organiserAddress",
  e.status,
  e."totalSupply"
FROM poaps p
LEFT JOIN events e ON p."eventId" = e."eventId"
WHERE p."eventId" = :eventId!
ORDER BY p."createdAt" DESC;

/*
  @name getEventsByTokenId
 */
-- Get all events (with full event information) that were minted with a specific tokenId
SELECT DISTINCT
  e."eventUuid",
  e."issuerId" as event_issuerId,
  e."eventId",
  e."maxSupply",
  e.expiration,
  e."organiserAddress",
  e.status,
  e.title,
  e.description,
  e."imageUrl",
  e."eventStartDate",
  e."eventEndDate",
  e."totalSupply",
  e."createdAt" as event_createdAt,
  e."updatedAt" as event_updatedAt,
  e.block_number as event_block_number,
  e.transaction_hash as event_transaction_hash,
  p."ownerAddress",
  p."createdAt" as minted_at,
  p."transaction_hash" as poap_transaction_hash,
  p."block_number" as poap_block_number
FROM poaps p
INNER JOIN events e ON p."eventId" = e."eventId"
WHERE p."tokenId" = :tokenId!
ORDER BY p."createdAt" DESC;

/*
  @name getPoapsByTokenIdWithEvents
 */
-- Get all POAPs for a token with full event information
-- NOTE: owners table is not populated, so owner information is not included
SELECT 
  p."poapUuid",
  p."issuerId" as poap_issuerId,
  p."eventId" as poap_eventId,
  p."tokenId",
  p."ownerAddress",
  p."createdAt" as poap_createdAt,
  p."updatedAt" as poap_updatedAt,
  p.block_number as poap_block_number,
  p.transaction_hash as poap_transaction_hash,
  e."eventUuid",
  e."issuerId" as event_issuerId,
  e."eventId",
  e."maxSupply",
  e.expiration,
  e."organiserAddress",
  e.status,
  e.title,
  e.description,
  e."imageUrl",
  e."eventStartDate",
  e."eventEndDate",
  e."totalSupply",
  e."createdAt" as event_createdAt,
  e."updatedAt" as event_updatedAt,
  e.block_number as event_block_number,
  e.transaction_hash as event_transaction_hash
FROM poaps p
LEFT JOIN events e ON p."eventId" = e."eventId"
WHERE p."tokenId" = :tokenId!
ORDER BY p."createdAt" DESC;

/*
  @name getPoapsByTokenIdWithIssuer
 */
-- Get all POAPs for a token with issuer information
-- IMPORTANT: This correctly joins poaps with issuers using issuerId.
-- DO NOT join using p."ownerAddress" = issuers."issuerAddress" - they do not correspond.
SELECT 
  p.*,
  i."issuerUuid",
  i."issuerAddress",
  i.username as issuer_username,
  i.email as issuer_email,
  i.organization as issuer_organization
FROM poaps p
LEFT JOIN issuers i ON p."issuerId" = i."issuerId"
WHERE p."tokenId" = :tokenId!
ORDER BY p."createdAt" DESC;