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