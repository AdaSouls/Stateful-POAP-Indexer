/*
  @name updateOwner
*/
UPDATE owners
SET
  "email" = :email,
  "updatedAt" = now()
WHERE
  "address" = :address!;

/*
  @name approveEvent
*/
UPDATE events
SET
  "approved" = :approved,
  "updatedAt" = now()
WHERE
  "eventUuid" = :eventUuid!;