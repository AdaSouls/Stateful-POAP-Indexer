/*
  @name updateOwnerEmail
*/
UPDATE owners
SET
  email = :email!,
  "updatedAt" = now()
WHERE
  "ownerAddress" = lower(:ownerAddress!);

/*
  @name updateEventStatus
*/
UPDATE events
SET
  "status" = :status!,
  "updatedAt" = now()
WHERE
  "eventId" = :eventId!;

/*
  @name updateEventMetadata
*/
UPDATE events
SET
  title = :title,
  description = :description,
  "imageUrl" = :imageUrl,
  "eventStartDate" = :eventStartDate,
  "eventEndDate" = :eventEndDate,
  "updatedAt" = now()
WHERE
  "eventId" = :eventId!;

/*
  @name updatePoapOwnerAddress
*/
UPDATE poaps
SET
  "ownerAddress" = lower(:ownerAddress!),
  "updatedAt" = now()
WHERE
  "tokenId" = :tokenId!;