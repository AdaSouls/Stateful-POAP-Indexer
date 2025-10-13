/*
 @name getAllIssuers
 */
SELECT * FROM issuers;

/*
  @name getIssuerByWalletAddress
*/
SELECT * FROM issuers
WHERE "issuerAddress" = :walletAddress!;

/*
  @name getIssuerByUuid
*/
SELECT * FROM issuers
WHERE "issuerUuid" = :issuerUuid!;

/*
  @name getOwnerByWalletAddress
*/
SELECT * FROM owners
WHERE "ownerAddress" = :walletAddress!;

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