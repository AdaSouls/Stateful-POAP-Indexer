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
  WHERE address = :address
)
INSERT INTO poaps (instance, "ownerUuid")
SELECT :instance, owner_data."ownerUuid"
FROM owner_data
RETURNING *;
/* 
 @name createOwner
 */
INSERT INTO owners("email", "address")
VALUES (:email, :address !)
RETURNING *;
/* 
 @name createEventPoap
 */
INSERT INTO eventPoaps("poapUuid", "eventUuid")
VALUES (:poapUuid !, :eventUuid !)
RETURNING *;