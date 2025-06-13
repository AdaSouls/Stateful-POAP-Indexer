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
SELECT 
  p."poapUuid",
  p."ownerUuid",
  p."instance",
  p."createdAt",
  p."updatedAt",
  COALESCE(
    json_agg(
      jsonb_build_object(
        'eventUuid', e."eventUuid",
        'eventIdInContract', e."eventIdInContract",
        'title', e."title",
        'description', e."description",
        'city', e."city",
        'country', e."country",
        'startDate', e."startDate",
        'endDate', e."endDate",
        'expiryDate', e."expiryDate",
        'year', e."year",
        'eventUrl', e."eventUrl",
        'virtualEvent', e."virtualEvent",
        'image', e."image",
        'secretCode', e."secretCode",
        'eventTemplateId', e."eventTemplateId",
        'email', e."email",
        'requestedCodes', e."requestedCodes",
        'privateEvent', e."privateEvent",
        'purpose', e."purpose",
        'platform', e."platform",
        'eventType', e."eventType",
        'amountOfAttendees', e."amountOfAttendees",
        'account', e."account",
        'poapType', e."poapType",
        'poapsToBeMinted', e."poapsToBeMinted",
        'mintedPoaps', e."mintedPoaps",
        'approved', e."approved",
        'createdAt', e."createdAt",
        'updatedAt', e."updatedAt",
        'issuerUuid', i."issuerUuid",
        'issuerIdInContract', i."issuerIdInContract"
      )
    ) FILTER (WHERE e."eventUuid" IS NOT NULL),
    '[]'
  ) AS events
FROM poaps p
LEFT JOIN eventpoaps ep ON ep."poapUuid" = p."poapUuid"
LEFT JOIN events e ON e."eventUuid" = ep."eventUuid"
LEFT JOIN issuers i ON i."issuerUuid" = e."issuerUuid"
GROUP BY p."poapUuid", p."ownerUuid", p."instance", p."createdAt", p."updatedAt";

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
  p."poapUuid",
  p."ownerUuid",
  p."instance",
  p."createdAt",
  p."updatedAt",
  COALESCE(
    json_agg(
      jsonb_build_object(
        'eventUuid', e."eventUuid",
        'eventIdInContract', e."eventIdInContract",
        'title', e."title",
        'description', e."description",
        'city', e."city",
        'country', e."country",
        'startDate', e."startDate",
        'endDate', e."endDate",
        'expiryDate', e."expiryDate",
        'year', e."year",
        'eventUrl', e."eventUrl",
        'virtualEvent', e."virtualEvent",
        'image', e."image",
        'secretCode', e."secretCode",
        'eventTemplateId', e."eventTemplateId",
        'email', e."email",
        'requestedCodes', e."requestedCodes",
        'privateEvent', e."privateEvent",
        'purpose', e."purpose",
        'platform', e."platform",
        'eventType', e."eventType",
        'amountOfAttendees', e."amountOfAttendees",
        'account', e."account",
        'poapType', e."poapType",
        'poapsToBeMinted', e."poapsToBeMinted",
        'mintedPoaps', e."mintedPoaps",
        'approved', e."approved",
        'createdAt', e."createdAt",
        'updatedAt', e."updatedAt",
        'issuerUuid', i."issuerUuid",
        'issuerIdInContract', i."issuerIdInContract"
      )
    ) FILTER (WHERE e."eventUuid" IS NOT NULL), '[]'
  ) AS events
FROM poaps p
JOIN owners o ON o."ownerUuid" = p."ownerUuid"
LEFT JOIN eventpoaps ep ON ep."poapUuid" = p."poapUuid"
LEFT JOIN events e ON e."eventUuid" = ep."eventUuid"
LEFT JOIN issuers i ON i."issuerUuid" = e."issuerUuid"
WHERE o."address" = :ownerAddress
GROUP BY p."poapUuid", p."ownerUuid", p."instance", p."createdAt", p."updatedAt";

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