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
  AND (:issuerId::integer IS NULL OR "issuerId" = :issuerId)
  AND (:status::text IS NULL OR status = :status)
  AND (:expired::boolean IS NULL OR 
    CASE 
      WHEN :expired = true THEN expiration * 1000 <= EXTRACT(EPOCH FROM NOW()) * 1000
      WHEN :expired = false THEN (expiration * 1000 > EXTRACT(EPOCH FROM NOW()) * 1000 OR expiration = 0)
      ELSE true
    END)
  AND (:titleSearch::text IS NULL OR title ILIKE '%' || :titleSearch || '%')
ORDER BY
  CASE WHEN :sortBy = 'createdAt' AND :order = 'asc' THEN "createdAt" END ASC NULLS LAST,
  CASE WHEN :sortBy = 'createdAt' AND :order = 'desc' THEN "createdAt" END DESC NULLS LAST,
  CASE WHEN :sortBy = 'eventStartDate' AND :order = 'asc' THEN "eventStartDate" END ASC NULLS LAST,
  CASE WHEN :sortBy = 'eventStartDate' AND :order = 'desc' THEN "eventStartDate" END DESC NULLS LAST,
  CASE WHEN :sortBy = 'expiration' AND :order = 'asc' THEN expiration END ASC NULLS LAST,
  CASE WHEN :sortBy = 'expiration' AND :order = 'desc' THEN expiration END DESC NULLS LAST,
  CASE WHEN :sortBy = 'title' AND :order = 'asc' THEN title END ASC NULLS LAST,
  CASE WHEN :sortBy = 'title' AND :order = 'desc' THEN title END DESC NULLS LAST,
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