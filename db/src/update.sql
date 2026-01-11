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

/*
  @name incrementEventTotalSupply
*/
UPDATE events
SET
  "totalSupply" = COALESCE("totalSupply", 0) + 1,
  "updatedAt" = now()
WHERE
  "eventId" = :eventId!;