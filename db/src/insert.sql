/* 
 @name createIssuer
 */
INSERT INTO "issuers" (
    "address",
    "name",
    "email",
    "organization"
  )
VALUES (
    :address !,
    :name !,
    :email !,
    :organization !
  )
RETURNING *;
/* 
 @name createEvent
 */
INSERT INTO "events" (
    "eventUuid",
    "eventIdInContract",
    "title",
    "description",
    "city",
    "country",
    "startDate",
    "endDate",
    "expiryDate",
    "year",
    "eventUrl",
    "virtualEvent",
    "image",
    "secretCode",
    "eventTemplateId",
    "email",
    "requestedCodes",
    "privateEvent",
    "purpose",
    "platform",
    "eventType",
    "amountOfAttendees",
    "account",
    "poapType",
    "poapsToBeMinted",
    "mintedPoaps",
    "approved",
    "createdAt",
    "updatedAt",
    "issuerUuid"
  )
VALUES (
    DEFAULT,
    DEFAULT,
    :title !,
    :description !,
    :city,
    :country,
    :startDate !,
    :endDate !,
    :expiryDate !,
    :year !,
    :eventUrl,
    :virtualEvent !,
    :image !,
    :secretCode,
    :eventTemplateId,
    :email !,
    :requestedCodes !,
    :privateEvent !,
    :purpose,
    :platform,
    :eventType !,
    :amountOfAttendees,
    :account,
    :poapType !,
    :poapsToBeMinted !,
    0,
    'Pending',
    DEFAULT,
    DEFAULT,
    :issuerUuid !
  )
RETURNING *;
/* 
 @name createPoap
 */
WITH owner_data AS (
  SELECT "ownerUuid"
  FROM owners
  WHERE LOWER("address") = LOWER(:address !)
),
event_data AS (
  SELECT "eventUuid"
  FROM events
  WHERE "eventIdInContract" = :eventIdInContract !
),
poap_insert AS (
  INSERT INTO poaps ("instance", "ownerUuid")
  SELECT :instance !,
    owner_data."ownerUuid"
  FROM owner_data
  RETURNING *
),
eventpoap_insert AS (
  INSERT INTO eventpoaps ("poapUuid", "eventUuid")
  SELECT poap_insert."poapUuid",
    event_data."eventUuid"
  FROM poap_insert,
    event_data
  RETURNING *
),
event_update AS (
  UPDATE events
  SET "mintedPoaps" = "mintedPoaps" + 1,
      "updatedAt" = NOW()
  WHERE "eventIdInContract" = :eventIdInContract!
  RETURNING *
)
SELECT *
FROM poap_insert;
/* 
 @name createOwner
 */
INSERT INTO owners("email", "address")
VALUES (:email, :address !)
RETURNING *;
/* 
  @name createEventPoap
*/
WITH owner_data AS (
  SELECT "ownerUuid"
  FROM owners
  WHERE LOWER("address") = LOWER(:address!)
),
event_data AS (
  SELECT "eventUuid"
  FROM events
  WHERE "eventIdInContract" = :eventIdInContract!
),
poap_data AS (
  SELECT p."poapUuid"
  FROM poaps p
  JOIN owner_data o ON p."ownerUuid" = o."ownerUuid"
  WHERE p."instance" = :instance!
),
eventpoap_insert AS (
  INSERT INTO eventpoaps ("poapUuid", "eventUuid")
  SELECT poap_data."poapUuid", event_data."eventUuid"
  FROM poap_data, event_data
  RETURNING *
),
event_update AS (
  UPDATE events
  SET "mintedPoaps" = "mintedPoaps" + 1,
      "updatedAt" = NOW()
  WHERE "eventIdInContract" = :eventIdInContract!
  RETURNING *
)
SELECT * FROM eventpoap_insert;