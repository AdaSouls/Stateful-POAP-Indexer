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
  @name updateEvent
*/
UPDATE events
SET
  "approved" = :approved,
  "updatedAt" = now()
WHERE
  "eventIdInContract" = :eventIdInContract!;