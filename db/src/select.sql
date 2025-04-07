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
SELECT *
FROM events;
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
ON "Owner"."ownerUuid" = "Poap"."ownerUuid"
WHERE "Owner"."address" = :address!;
