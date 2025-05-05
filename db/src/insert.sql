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
  DEFAULT,  -- eventUuid (uses uuid_generate_v4())
  DEFAULT,  -- idInContract (SERIAL)
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
  'Pending',  -- approved (default)
  DEFAULT,  -- createdAt (now())
  DEFAULT,  -- updatedAt (now())
  :issuerUuid !-- existing issuerUuid
)
RETURNING *;

/* 
 @name createPoap
 */
INSERT INTO poaps(
    "poapUuid",
    "instance",
    "ownerUuid",
    "createdAt",
    "updatedAt"
  )
VALUES (
    :poapUuid !,
    :instance !,
    :ownerUuid !,
    now(),
    now()
  );
/* 
 @name createOwner
 */
INSERT INTO owners(
    "ownerUuid",
    "email",
    "address",
    "createdAt",
    "updatedAt"
  )
VALUES (
    :ownerUuid !,
    :email,
    :address !,
    now(),
    now()
  );
/* 
 @name createEventPoap
 */
INSERT INTO eventPoaps(
    "relationUuid",
    "poapUuid",
    "eventUuid",
    "createdAt",
    "updatedAt"
  )
VALUES (
    :relationUuid !,
    :poapUuid !,
    :eventUuid !,
    now(),
    now()
  );