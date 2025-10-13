/*
  @name updateOwnerEmail
*/
UPDATE owners
SET
  email = :email!,
  "updatedAt" = now()
WHERE
  "ownerAddress" = :ownerAddress!;

/*
  @name updateEventStatus
*/
UPDATE events
SET
  "status" = :status!,
  "updatedAt" = now()
WHERE
  "eventId" = :eventId!;