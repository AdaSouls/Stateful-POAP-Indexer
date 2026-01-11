/*
 @name getAllIssuers
 */
SELECT * FROM issuers;

/*
  @name getIssuerByWalletAddress
*/
SELECT * FROM issuers
WHERE "issuerAddress" = lower(:walletAddress!);

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
SELECT p.*, e."maxSupply", e."organiserAddress", e.status
FROM poaps p
  LEFT JOIN events e ON p."eventId" = e."eventId"
  WHERE p."ownerAddress" = lower(:ownerAddress!);

/*
  @name getEventByEventId
*/
SELECT * FROM events WHERE "eventId" = :eventId!;

/*
  @name getPoapByTokenId
*/
SELECT * FROM poaps WHERE "tokenId" = :tokenId!;