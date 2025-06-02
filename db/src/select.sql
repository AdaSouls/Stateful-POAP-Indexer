/*
 @name getAllEventPoaps
 */
SELECT "relationUuid",
  "poapUuid",
  "eventUuid",
  "createdAt",
  "updatedAt"
FROM eventpoaps;
/*
 @name getAllIssuers
 */
SELECT *
FROM issuers;
/*
 @name getAllEvents
 */
SELECT 
  events.*,
  issuers."issuerIdInContract"
FROM events
JOIN issuers ON events."issuerUuid" = issuers."issuerUuid";
/*
 @name getAllPoaps
 */
SELECT *
FROM poaps;
/*
  @name getLastEvent
*/
SELECT *
FROM events
WHERE "eventUuid" = (
  SELECT "eventUuid"
  FROM events
  ORDER BY "createdAt" DESC
  LIMIT 1
);
/*
 @name getAllOwners
 */
SELECT *
FROM owners;

/*
  @name getEventPoapByEventUuid
*/
SELECT "relationUuid",
  "poapUuid",
  "eventUuid",
  "createdAt",
  "updatedAt"
FROM "eventpoaps"
WHERE "eventUuid" = :eventUuid;

/*
  @name getAllOwnersAndPoaps
*/
SELECT 
  "Owner"."ownerUuid", 
  "Owner"."address", 
  "Owner"."email", 
  "Owner"."createdAt", 
  "Owner"."updatedAt", 
  "Poap"."poapUuid" AS "Poap.poapUuid", 
  "Poap"."instance" AS "Poap.instance", 
  "Poap"."createdAt" AS "Poap.createdAt", 
  "Poap"."updatedAt" AS "Poap.updatedAt"
FROM "owners" AS "Owner"
LEFT OUTER JOIN "poaps" AS "Poap" 
ON "Owner"."ownerUuid" = "Poap"."ownerUuid";


/*
  @name getOwnerPoaps
*/
SELECT poaps."poapUuid",
  poaps.instance,
  poaps."createdAt" AS poapCreatedAt,
  eventpoaps."relationUuid",
  eventpoaps."createdAt" AS relationCreatedAt,
  events.*
FROM owners
  JOIN poaps ON owners."ownerUuid" = poaps."ownerUuid"
  JOIN eventpoaps ON poaps."poapUuid" = eventpoaps."poapUuid"
  JOIN events ON eventpoaps."eventUuid" = events."eventUuid"
WHERE owners.address = :address !;

/*
  @name getIssuerByAddress
*/
SELECT * FROM issuers
WHERE "address" = :address!;

/*
  @name getIssuerByUuid
*/
SELECT * FROM issuers
WHERE "issuerUuid" = :issuerUuid!;

/*
  @name getOwnerByAddress
*/
SELECT * FROM owners
WHERE "address" = :address!;

/*
  @name getOwnerByUuid
*/
SELECT * FROM owners
WHERE "ownerUuid" = :ownerUuid!;