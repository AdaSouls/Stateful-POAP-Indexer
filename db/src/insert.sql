/* 
  @name createIssuer
*/
INSERT INTO issuers(
  "issuerUuid",
  "issuerIdInContract",
  "address",
  "name",
  "email",
  "organization"
) 
VALUES (
  :issuerUuid!,
  DEFAULT, -- Automatically assigned SERIAL value
  :address!,
  :name!,
  :email!,
  :organization!
);

/* 
  @name createEvent
*/
INSERT INTO events(
  "eventUuid",
  "issuerUuid",
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
  "mintedPoaps"
) 
VALUES (
  :eventUuid!,
  :issuerUuid!,
  :title!,
  :description!,
  :city!,
  :country!,
  now(),
  now() + INTERVAL '30 days',
  :expiryDate!,
  EXTRACT(YEAR FROM now()),
  :eventUrl,
  FALSE,
  'default-image-url.jpg',
  NULL,
  NULL,
  :email!,
  :requestedCodes!,
  FALSE,
  NULL,
  NULL,
  'Unknown',
  NULL,
  NULL,
  'poap',
  :poapsToBeMinted!,
  0
);

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
  :poapUuid!,
  :instance!,
  :ownerUuid!,
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
  :ownerUuid!,
  :email,
  :address!,
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
  :relationUuid!,
  :poapUuid!,
  :eventUuid!,
  now(),
  now()
);

