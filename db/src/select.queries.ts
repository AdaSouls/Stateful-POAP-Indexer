/** Types generated for queries found in "src/select.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type NumberOrString = number | string;

/** 'GetAllIssuers' parameters type */
export type IGetAllIssuersParams = void;

/** 'GetAllIssuers' return type */
export interface IGetAllIssuersResult {
  createdAt: Date | null;
  email: string | null;
  issuerAddress: string;
  issuerId: number;
  issuerUuid: string;
  organization: string | null;
  updatedAt: Date | null;
  username: string | null;
}

/** 'GetAllIssuers' query type */
export interface IGetAllIssuersQuery {
  params: IGetAllIssuersParams;
  result: IGetAllIssuersResult;
}

const getAllIssuersIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM issuers"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM issuers
 * ```
 */
export const getAllIssuers = new PreparedQuery<IGetAllIssuersParams,IGetAllIssuersResult>(getAllIssuersIR);


/** 'GetIssuerByWalletAddress' parameters type */
export interface IGetIssuerByWalletAddressParams {
  walletAddress: string;
}

/** 'GetIssuerByWalletAddress' return type */
export interface IGetIssuerByWalletAddressResult {
  createdAt: Date | null;
  email: string | null;
  issuerAddress: string;
  issuerId: number;
  issuerUuid: string;
  organization: string | null;
  updatedAt: Date | null;
  username: string | null;
}

/** 'GetIssuerByWalletAddress' query type */
export interface IGetIssuerByWalletAddressQuery {
  params: IGetIssuerByWalletAddressParams;
  result: IGetIssuerByWalletAddressResult;
}

const getIssuerByWalletAddressIR: any = {"usedParamSet":{"walletAddress":true},"params":[{"name":"walletAddress","required":true,"transform":{"type":"scalar"},"locs":[{"a":52,"b":66}]}],"statement":"SELECT * FROM issuers\nWHERE \"issuerAddress\" = lower(:walletAddress!)"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM issuers
 * WHERE "issuerAddress" = lower(:walletAddress!)
 * ```
 */
export const getIssuerByWalletAddress = new PreparedQuery<IGetIssuerByWalletAddressParams,IGetIssuerByWalletAddressResult>(getIssuerByWalletAddressIR);


/** 'GetIssuerByUuid' parameters type */
export interface IGetIssuerByUuidParams {
  issuerUuid: string;
}

/** 'GetIssuerByUuid' return type */
export interface IGetIssuerByUuidResult {
  createdAt: Date | null;
  email: string | null;
  issuerAddress: string;
  issuerId: number;
  issuerUuid: string;
  organization: string | null;
  updatedAt: Date | null;
  username: string | null;
}

/** 'GetIssuerByUuid' query type */
export interface IGetIssuerByUuidQuery {
  params: IGetIssuerByUuidParams;
  result: IGetIssuerByUuidResult;
}

const getIssuerByUuidIR: any = {"usedParamSet":{"issuerUuid":true},"params":[{"name":"issuerUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":43,"b":54}]}],"statement":"SELECT * FROM issuers\nWHERE \"issuerUuid\" = :issuerUuid!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM issuers
 * WHERE "issuerUuid" = :issuerUuid!
 * ```
 */
export const getIssuerByUuid = new PreparedQuery<IGetIssuerByUuidParams,IGetIssuerByUuidResult>(getIssuerByUuidIR);


/** 'GetOwnerByWalletAddress' parameters type */
export interface IGetOwnerByWalletAddressParams {
  walletAddress: string;
}

/** 'GetOwnerByWalletAddress' return type */
export interface IGetOwnerByWalletAddressResult {
  createdAt: Date | null;
  email: string | null;
  ownerAddress: string | null;
  ownerId: number;
  updatedAt: Date | null;
  username: string | null;
}

/** 'GetOwnerByWalletAddress' query type */
export interface IGetOwnerByWalletAddressQuery {
  params: IGetOwnerByWalletAddressParams;
  result: IGetOwnerByWalletAddressResult;
}

const getOwnerByWalletAddressIR: any = {"usedParamSet":{"walletAddress":true},"params":[{"name":"walletAddress","required":true,"transform":{"type":"scalar"},"locs":[{"a":50,"b":64}]}],"statement":"SELECT * FROM owners\nWHERE \"ownerAddress\" = lower(:walletAddress!)"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM owners
 * WHERE "ownerAddress" = lower(:walletAddress!)
 * ```
 */
export const getOwnerByWalletAddress = new PreparedQuery<IGetOwnerByWalletAddressParams,IGetOwnerByWalletAddressResult>(getOwnerByWalletAddressIR);


/** 'GetAllEvents' parameters type */
export type IGetAllEventsParams = void;

/** 'GetAllEvents' return type */
export interface IGetAllEventsResult {
  /** Block number where the event was created */
  block_number: number | null;
  createdAt: Date | null;
  /** Detailed description of the event */
  description: string | null;
  /** When the actual event ends (different from mint expiration) */
  eventEndDate: Date | null;
  eventId: number;
  /** When the actual event starts (Unix timestamp in seconds, same type as expiration) */
  eventStartDate: number | null;
  eventUuid: string;
  expiration: number;
  /** URL to the event image/banner */
  imageUrl: string | null;
  issuerId: number;
  maxSupply: number;
  organiserAddress: string;
  status: string;
  /** Event title/name for display purposes */
  title: string | null;
  /** Current number of POAPs minted for this event (incremented on mint, decremented on reorg rollback) */
  totalSupply: number | null;
  /** Transaction hash of the event creation */
  transaction_hash: string | null;
  updatedAt: Date | null;
}

/** 'GetAllEvents' query type */
export interface IGetAllEventsQuery {
  params: IGetAllEventsParams;
  result: IGetAllEventsResult;
}

const getAllEventsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM events"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM events
 * ```
 */
export const getAllEvents = new PreparedQuery<IGetAllEventsParams,IGetAllEventsResult>(getAllEventsIR);


/** 'GetEventsWithFilters' parameters type */
export interface IGetEventsWithFiltersParams {
  calculatedStatus?: string | null | void;
  eventIdSearch?: string | null | void;
  eventStartDateMax?: NumberOrString | null | void;
  eventStartDateMin?: NumberOrString | null | void;
  expirationMax?: NumberOrString | null | void;
  expirationMin?: NumberOrString | null | void;
  maxSupplyMax?: number | null | void;
  maxSupplyMin?: number | null | void;
  order?: string | null | void;
  organiserAddress?: string | null | void;
  sortBy?: string | null | void;
  titleSearch?: string | null | void;
  totalSupplyMax?: number | null | void;
  totalSupplyMin?: number | null | void;
}

/** 'GetEventsWithFilters' return type */
export interface IGetEventsWithFiltersResult {
  /** Block number where the event was created */
  block_number: number | null;
  createdAt: Date | null;
  /** Detailed description of the event */
  description: string | null;
  /** When the actual event ends (different from mint expiration) */
  eventEndDate: Date | null;
  eventId: number;
  /** When the actual event starts (Unix timestamp in seconds, same type as expiration) */
  eventStartDate: number | null;
  eventUuid: string;
  expiration: number;
  /** URL to the event image/banner */
  imageUrl: string | null;
  issuerId: number;
  maxSupply: number;
  organiserAddress: string;
  status: string;
  /** Event title/name for display purposes */
  title: string | null;
  /** Current number of POAPs minted for this event (incremented on mint, decremented on reorg rollback) */
  totalSupply: number | null;
  /** Transaction hash of the event creation */
  transaction_hash: string | null;
  updatedAt: Date | null;
}

/** 'GetEventsWithFilters' query type */
export interface IGetEventsWithFiltersQuery {
  params: IGetEventsWithFiltersParams;
  result: IGetEventsWithFiltersResult;
}

const getEventsWithFiltersIR: any = {"usedParamSet":{"organiserAddress":true,"eventIdSearch":true,"titleSearch":true,"eventStartDateMin":true,"eventStartDateMax":true,"expirationMin":true,"expirationMax":true,"maxSupplyMin":true,"maxSupplyMax":true,"totalSupplyMin":true,"totalSupplyMax":true,"calculatedStatus":true,"sortBy":true,"order":true},"params":[{"name":"organiserAddress","required":false,"transform":{"type":"scalar"},"locs":[{"a":31,"b":47},{"a":93,"b":109}]},{"name":"eventIdSearch","required":false,"transform":{"type":"scalar"},"locs":[{"a":120,"b":133},{"a":189,"b":202}]},{"name":"titleSearch","required":false,"transform":{"type":"scalar"},"locs":[{"a":219,"b":230},{"a":268,"b":279}]},{"name":"eventStartDateMin","required":false,"transform":{"type":"scalar"},"locs":[{"a":326,"b":343},{"a":412,"b":429}]},{"name":"eventStartDateMax","required":false,"transform":{"type":"scalar"},"locs":[{"a":439,"b":456},{"a":525,"b":542}]},{"name":"expirationMin","required":false,"transform":{"type":"scalar"},"locs":[{"a":624,"b":637},{"a":690,"b":703}]},{"name":"expirationMax","required":false,"transform":{"type":"scalar"},"locs":[{"a":713,"b":726},{"a":779,"b":792}]},{"name":"maxSupplyMin","required":false,"transform":{"type":"scalar"},"locs":[{"a":826,"b":838},{"a":875,"b":887}]},{"name":"maxSupplyMax","required":false,"transform":{"type":"scalar"},"locs":[{"a":897,"b":909},{"a":946,"b":958}]},{"name":"totalSupplyMin","required":false,"transform":{"type":"scalar"},"locs":[{"a":994,"b":1008},{"a":1072,"b":1086}]},{"name":"totalSupplyMax","required":false,"transform":{"type":"scalar"},"locs":[{"a":1096,"b":1110},{"a":1174,"b":1188}]},{"name":"calculatedStatus","required":false,"transform":{"type":"scalar"},"locs":[{"a":1271,"b":1287},{"a":1315,"b":1331}]},{"name":"sortBy","required":false,"transform":{"type":"scalar"},"locs":[{"a":2132,"b":2138},{"a":2222,"b":2228},{"a":2314,"b":2320},{"a":2414,"b":2420},{"a":2516,"b":2522},{"a":2606,"b":2612},{"a":2698,"b":2704},{"a":2778,"b":2784},{"a":2860,"b":2866},{"a":2950,"b":2956},{"a":3042,"b":3048},{"a":3136,"b":3142}]},{"name":"order","required":false,"transform":{"type":"scalar"},"locs":[{"a":2158,"b":2163},{"a":2248,"b":2253},{"a":2345,"b":2350},{"a":2445,"b":2450},{"a":2543,"b":2548},{"a":2633,"b":2638},{"a":2720,"b":2725},{"a":2800,"b":2805},{"a":2886,"b":2891},{"a":2976,"b":2981},{"a":3070,"b":3075},{"a":3164,"b":3169}]}],"statement":"SELECT * FROM events\nWHERE \n  (:organiserAddress::text IS NULL OR \"organiserAddress\" = lower(:organiserAddress))\n  AND (:eventIdSearch::text IS NULL OR CAST(\"eventId\" AS TEXT) ILIKE '%' || :eventIdSearch || '%')\n  AND (:titleSearch::text IS NULL OR title ILIKE '%' || :titleSearch || '%')\n  -- Event Start Date filters\n  AND (:eventStartDateMin::bigint IS NULL OR \"eventStartDate\" IS NULL OR \"eventStartDate\" >= :eventStartDateMin)\n  AND (:eventStartDateMax::bigint IS NULL OR \"eventStartDate\" IS NULL OR \"eventStartDate\" <= :eventStartDateMax)\n  -- Expiration filters (expiration = 0 means indefinite/never expires)\n  AND (:expirationMin::bigint IS NULL OR expiration = 0 OR expiration >= :expirationMin)\n  AND (:expirationMax::bigint IS NULL OR expiration = 0 OR expiration <= :expirationMax)\n  -- Max Supply filters\n  AND (:maxSupplyMin::integer IS NULL OR \"maxSupply\" >= :maxSupplyMin)\n  AND (:maxSupplyMax::integer IS NULL OR \"maxSupply\" <= :maxSupplyMax)\n  -- Total Supply filters\n  AND (:totalSupplyMin::integer IS NULL OR \"totalSupply\" IS NULL OR \"totalSupply\" >= :totalSupplyMin)\n  AND (:totalSupplyMax::integer IS NULL OR \"totalSupply\" IS NULL OR \"totalSupply\" <= :totalSupplyMax)\n  -- Calculated Status filter (pending, active, expired, completed)\n  AND (\n    :calculatedStatus::text IS NULL OR\n    CASE :calculatedStatus\n      -- Pending: eventStartDate exists and is in the future\n      WHEN 'pending' THEN \n        \"eventStartDate\" IS NOT NULL \n        AND \"eventStartDate\" > EXTRACT(EPOCH FROM NOW())\n      -- Active: started and not expired\n      WHEN 'active' THEN \n        (\"eventStartDate\" IS NULL OR \"eventStartDate\" <= EXTRACT(EPOCH FROM NOW()))\n        AND (expiration = 0 OR expiration > EXTRACT(EPOCH FROM NOW()))\n      -- Expired: expiration > 0 and expiration <= now\n      WHEN 'expired' THEN \n        expiration > 0 \n        AND expiration <= EXTRACT(EPOCH FROM NOW())\n      -- Completed: totalSupply >= maxSupply\n      WHEN 'completed' THEN \n        \"totalSupply\" IS NOT NULL \n        AND \"maxSupply\" IS NOT NULL \n        AND \"totalSupply\" >= \"maxSupply\"\n      ELSE true\n    END\n  )\nORDER BY\n  CASE WHEN :sortBy = 'createdAt' AND :order = 'asc' THEN \"createdAt\" END ASC NULLS LAST,\n  CASE WHEN :sortBy = 'createdAt' AND :order = 'desc' THEN \"createdAt\" END DESC NULLS LAST,\n  CASE WHEN :sortBy = 'eventStartDate' AND :order = 'asc' THEN \"eventStartDate\" END ASC NULLS LAST,\n  CASE WHEN :sortBy = 'eventStartDate' AND :order = 'desc' THEN \"eventStartDate\" END DESC NULLS LAST,\n  CASE WHEN :sortBy = 'expiration' AND :order = 'asc' THEN expiration END ASC NULLS LAST,\n  CASE WHEN :sortBy = 'expiration' AND :order = 'desc' THEN expiration END DESC NULLS LAST,\n  CASE WHEN :sortBy = 'title' AND :order = 'asc' THEN title END ASC NULLS LAST,\n  CASE WHEN :sortBy = 'title' AND :order = 'desc' THEN title END DESC NULLS LAST,\n  CASE WHEN :sortBy = 'maxSupply' AND :order = 'asc' THEN \"maxSupply\" END ASC NULLS LAST,\n  CASE WHEN :sortBy = 'maxSupply' AND :order = 'desc' THEN \"maxSupply\" END DESC NULLS LAST,\n  CASE WHEN :sortBy = 'totalSupply' AND :order = 'asc' THEN \"totalSupply\" END ASC NULLS LAST,\n  CASE WHEN :sortBy = 'totalSupply' AND :order = 'desc' THEN \"totalSupply\" END DESC NULLS LAST,\n  \"createdAt\" DESC NULLS LAST"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM events
 * WHERE 
 *   (:organiserAddress::text IS NULL OR "organiserAddress" = lower(:organiserAddress))
 *   AND (:eventIdSearch::text IS NULL OR CAST("eventId" AS TEXT) ILIKE '%' || :eventIdSearch || '%')
 *   AND (:titleSearch::text IS NULL OR title ILIKE '%' || :titleSearch || '%')
 *   -- Event Start Date filters
 *   AND (:eventStartDateMin::bigint IS NULL OR "eventStartDate" IS NULL OR "eventStartDate" >= :eventStartDateMin)
 *   AND (:eventStartDateMax::bigint IS NULL OR "eventStartDate" IS NULL OR "eventStartDate" <= :eventStartDateMax)
 *   -- Expiration filters (expiration = 0 means indefinite/never expires)
 *   AND (:expirationMin::bigint IS NULL OR expiration = 0 OR expiration >= :expirationMin)
 *   AND (:expirationMax::bigint IS NULL OR expiration = 0 OR expiration <= :expirationMax)
 *   -- Max Supply filters
 *   AND (:maxSupplyMin::integer IS NULL OR "maxSupply" >= :maxSupplyMin)
 *   AND (:maxSupplyMax::integer IS NULL OR "maxSupply" <= :maxSupplyMax)
 *   -- Total Supply filters
 *   AND (:totalSupplyMin::integer IS NULL OR "totalSupply" IS NULL OR "totalSupply" >= :totalSupplyMin)
 *   AND (:totalSupplyMax::integer IS NULL OR "totalSupply" IS NULL OR "totalSupply" <= :totalSupplyMax)
 *   -- Calculated Status filter (pending, active, expired, completed)
 *   AND (
 *     :calculatedStatus::text IS NULL OR
 *     CASE :calculatedStatus
 *       -- Pending: eventStartDate exists and is in the future
 *       WHEN 'pending' THEN 
 *         "eventStartDate" IS NOT NULL 
 *         AND "eventStartDate" > EXTRACT(EPOCH FROM NOW())
 *       -- Active: started and not expired
 *       WHEN 'active' THEN 
 *         ("eventStartDate" IS NULL OR "eventStartDate" <= EXTRACT(EPOCH FROM NOW()))
 *         AND (expiration = 0 OR expiration > EXTRACT(EPOCH FROM NOW()))
 *       -- Expired: expiration > 0 and expiration <= now
 *       WHEN 'expired' THEN 
 *         expiration > 0 
 *         AND expiration <= EXTRACT(EPOCH FROM NOW())
 *       -- Completed: totalSupply >= maxSupply
 *       WHEN 'completed' THEN 
 *         "totalSupply" IS NOT NULL 
 *         AND "maxSupply" IS NOT NULL 
 *         AND "totalSupply" >= "maxSupply"
 *       ELSE true
 *     END
 *   )
 * ORDER BY
 *   CASE WHEN :sortBy = 'createdAt' AND :order = 'asc' THEN "createdAt" END ASC NULLS LAST,
 *   CASE WHEN :sortBy = 'createdAt' AND :order = 'desc' THEN "createdAt" END DESC NULLS LAST,
 *   CASE WHEN :sortBy = 'eventStartDate' AND :order = 'asc' THEN "eventStartDate" END ASC NULLS LAST,
 *   CASE WHEN :sortBy = 'eventStartDate' AND :order = 'desc' THEN "eventStartDate" END DESC NULLS LAST,
 *   CASE WHEN :sortBy = 'expiration' AND :order = 'asc' THEN expiration END ASC NULLS LAST,
 *   CASE WHEN :sortBy = 'expiration' AND :order = 'desc' THEN expiration END DESC NULLS LAST,
 *   CASE WHEN :sortBy = 'title' AND :order = 'asc' THEN title END ASC NULLS LAST,
 *   CASE WHEN :sortBy = 'title' AND :order = 'desc' THEN title END DESC NULLS LAST,
 *   CASE WHEN :sortBy = 'maxSupply' AND :order = 'asc' THEN "maxSupply" END ASC NULLS LAST,
 *   CASE WHEN :sortBy = 'maxSupply' AND :order = 'desc' THEN "maxSupply" END DESC NULLS LAST,
 *   CASE WHEN :sortBy = 'totalSupply' AND :order = 'asc' THEN "totalSupply" END ASC NULLS LAST,
 *   CASE WHEN :sortBy = 'totalSupply' AND :order = 'desc' THEN "totalSupply" END DESC NULLS LAST,
 *   "createdAt" DESC NULLS LAST
 * ```
 */
export const getEventsWithFilters = new PreparedQuery<IGetEventsWithFiltersParams,IGetEventsWithFiltersResult>(getEventsWithFiltersIR);


/** 'GetEventsByOrganizer' parameters type */
export interface IGetEventsByOrganizerParams {
  organiserAddress: string;
}

/** 'GetEventsByOrganizer' return type */
export interface IGetEventsByOrganizerResult {
  /** Block number where the event was created */
  block_number: number | null;
  createdAt: Date | null;
  /** Detailed description of the event */
  description: string | null;
  /** When the actual event ends (different from mint expiration) */
  eventEndDate: Date | null;
  eventId: number;
  /** When the actual event starts (Unix timestamp in seconds, same type as expiration) */
  eventStartDate: number | null;
  eventUuid: string;
  expiration: number;
  /** URL to the event image/banner */
  imageUrl: string | null;
  issuerId: number;
  maxSupply: number;
  organiserAddress: string;
  status: string;
  /** Event title/name for display purposes */
  title: string | null;
  /** Current number of POAPs minted for this event (incremented on mint, decremented on reorg rollback) */
  totalSupply: number | null;
  /** Transaction hash of the event creation */
  transaction_hash: string | null;
  updatedAt: Date | null;
}

/** 'GetEventsByOrganizer' query type */
export interface IGetEventsByOrganizerQuery {
  params: IGetEventsByOrganizerParams;
  result: IGetEventsByOrganizerResult;
}

const getEventsByOrganizerIR: any = {"usedParamSet":{"organiserAddress":true},"params":[{"name":"organiserAddress","required":true,"transform":{"type":"scalar"},"locs":[{"a":54,"b":71}]}],"statement":"SELECT * FROM events\nWHERE \"organiserAddress\" = lower(:organiserAddress!)\nORDER BY \"createdAt\" DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM events
 * WHERE "organiserAddress" = lower(:organiserAddress!)
 * ORDER BY "createdAt" DESC
 * ```
 */
export const getEventsByOrganizer = new PreparedQuery<IGetEventsByOrganizerParams,IGetEventsByOrganizerResult>(getEventsByOrganizerIR);


/** 'GetAllOwners' parameters type */
export type IGetAllOwnersParams = void;

/** 'GetAllOwners' return type */
export interface IGetAllOwnersResult {
  createdAt: Date | null;
  email: string | null;
  ownerAddress: string | null;
  ownerId: number;
  updatedAt: Date | null;
  username: string | null;
}

/** 'GetAllOwners' query type */
export interface IGetAllOwnersQuery {
  params: IGetAllOwnersParams;
  result: IGetAllOwnersResult;
}

const getAllOwnersIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM owners"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM owners
 * ```
 */
export const getAllOwners = new PreparedQuery<IGetAllOwnersParams,IGetAllOwnersResult>(getAllOwnersIR);


/** 'GetAllPoaps' parameters type */
export type IGetAllPoapsParams = void;

/** 'GetAllPoaps' return type */
export interface IGetAllPoapsResult {
  /** Block number where the POAP was minted */
  block_number: number | null;
  createdAt: Date | null;
  eventId: number;
  issuerId: number;
  ownerAddress: string;
  poapUuid: string;
  tokenId: number;
  /** Transaction hash of the POAP mint */
  transaction_hash: string | null;
  updatedAt: Date | null;
}

/** 'GetAllPoaps' query type */
export interface IGetAllPoapsQuery {
  params: IGetAllPoapsParams;
  result: IGetAllPoapsResult;
}

const getAllPoapsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM poaps"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM poaps
 * ```
 */
export const getAllPoaps = new PreparedQuery<IGetAllPoapsParams,IGetAllPoapsResult>(getAllPoapsIR);


/** 'GetAllEventPoaps' parameters type */
export type IGetAllEventPoapsParams = void;

/** 'GetAllEventPoaps' return type */
export interface IGetAllEventPoapsResult {
  createdAt: Date | null;
  eventId: number;
  relationUuid: string;
  tokenId: number;
  updatedAt: Date | null;
}

/** 'GetAllEventPoaps' query type */
export interface IGetAllEventPoapsQuery {
  params: IGetAllEventPoapsParams;
  result: IGetAllEventPoapsResult;
}

const getAllEventPoapsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM eventpoaps"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM eventpoaps
 * ```
 */
export const getAllEventPoaps = new PreparedQuery<IGetAllEventPoapsParams,IGetAllEventPoapsResult>(getAllEventPoapsIR);


/** 'GetAllEventsByTokenId' parameters type */
export interface IGetAllEventsByTokenIdParams {
  tokenId?: number | null | void;
}

/** 'GetAllEventsByTokenId' return type */
export interface IGetAllEventsByTokenIdResult {
  createdAt: Date | null;
  eventId: number;
  relationUuid: string;
  tokenId: number;
  updatedAt: Date | null;
}

/** 'GetAllEventsByTokenId' query type */
export interface IGetAllEventsByTokenIdQuery {
  params: IGetAllEventsByTokenIdParams;
  result: IGetAllEventsByTokenIdResult;
}

const getAllEventsByTokenIdIR: any = {"usedParamSet":{"tokenId":true},"params":[{"name":"tokenId","required":false,"transform":{"type":"scalar"},"locs":[{"a":45,"b":52}]}],"statement":"SELECT *\nFROM \"eventpoaps\"\nWHERE \"tokenId\" = :tokenId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "eventpoaps"
 * WHERE "tokenId" = :tokenId
 * ```
 */
export const getAllEventsByTokenId = new PreparedQuery<IGetAllEventsByTokenIdParams,IGetAllEventsByTokenIdResult>(getAllEventsByTokenIdIR);


/** 'GetPoapsByOwnerAddress' parameters type */
export interface IGetPoapsByOwnerAddressParams {
  ownerAddress: string;
}

/** 'GetPoapsByOwnerAddress' return type */
export interface IGetPoapsByOwnerAddressResult {
  /** Block number where the POAP was minted */
  block_number: number | null;
  createdAt: Date | null;
  eventId: number;
  issuerId: number;
  maxSupply: number;
  organiserAddress: string;
  ownerAddress: string;
  poapUuid: string;
  status: string;
  tokenId: number;
  /** Transaction hash of the POAP mint */
  transaction_hash: string | null;
  updatedAt: Date | null;
}

/** 'GetPoapsByOwnerAddress' query type */
export interface IGetPoapsByOwnerAddressQuery {
  params: IGetPoapsByOwnerAddressParams;
  result: IGetPoapsByOwnerAddressResult;
}

const getPoapsByOwnerAddressIR: any = {"usedParamSet":{"ownerAddress":true},"params":[{"name":"ownerAddress","required":true,"transform":{"type":"scalar"},"locs":[{"a":154,"b":167}]}],"statement":"SELECT p.*, e.\"maxSupply\", e.\"organiserAddress\", e.status\nFROM poaps p\n  LEFT JOIN events e ON p.\"eventId\" = e.\"eventId\"\n  WHERE p.\"ownerAddress\" = lower(:ownerAddress!)"};

/**
 * Query generated from SQL:
 * ```
 * SELECT p.*, e."maxSupply", e."organiserAddress", e.status
 * FROM poaps p
 *   LEFT JOIN events e ON p."eventId" = e."eventId"
 *   WHERE p."ownerAddress" = lower(:ownerAddress!)
 * ```
 */
export const getPoapsByOwnerAddress = new PreparedQuery<IGetPoapsByOwnerAddressParams,IGetPoapsByOwnerAddressResult>(getPoapsByOwnerAddressIR);


/** 'GetEventByEventId' parameters type */
export interface IGetEventByEventIdParams {
  eventId: number;
}

/** 'GetEventByEventId' return type */
export interface IGetEventByEventIdResult {
  /** Block number where the event was created */
  block_number: number | null;
  createdAt: Date | null;
  /** Detailed description of the event */
  description: string | null;
  /** When the actual event ends (different from mint expiration) */
  eventEndDate: Date | null;
  eventId: number;
  /** When the actual event starts (Unix timestamp in seconds, same type as expiration) */
  eventStartDate: number | null;
  eventUuid: string;
  expiration: number;
  /** URL to the event image/banner */
  imageUrl: string | null;
  issuerId: number;
  maxSupply: number;
  organiserAddress: string;
  status: string;
  /** Event title/name for display purposes */
  title: string | null;
  /** Current number of POAPs minted for this event (incremented on mint, decremented on reorg rollback) */
  totalSupply: number | null;
  /** Transaction hash of the event creation */
  transaction_hash: string | null;
  updatedAt: Date | null;
}

/** 'GetEventByEventId' query type */
export interface IGetEventByEventIdQuery {
  params: IGetEventByEventIdParams;
  result: IGetEventByEventIdResult;
}

const getEventByEventIdIR: any = {"usedParamSet":{"eventId":true},"params":[{"name":"eventId","required":true,"transform":{"type":"scalar"},"locs":[{"a":39,"b":47}]}],"statement":"SELECT * FROM events WHERE \"eventId\" = :eventId!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM events WHERE "eventId" = :eventId!
 * ```
 */
export const getEventByEventId = new PreparedQuery<IGetEventByEventIdParams,IGetEventByEventIdResult>(getEventByEventIdIR);


/** 'GetPoapByTokenId' parameters type */
export interface IGetPoapByTokenIdParams {
  tokenId: number;
}

/** 'GetPoapByTokenId' return type */
export interface IGetPoapByTokenIdResult {
  /** Block number where the POAP was minted */
  block_number: number | null;
  createdAt: Date | null;
  eventId: number;
  issuerId: number;
  ownerAddress: string;
  poapUuid: string;
  tokenId: number;
  /** Transaction hash of the POAP mint */
  transaction_hash: string | null;
  updatedAt: Date | null;
}

/** 'GetPoapByTokenId' query type */
export interface IGetPoapByTokenIdQuery {
  params: IGetPoapByTokenIdParams;
  result: IGetPoapByTokenIdResult;
}

const getPoapByTokenIdIR: any = {"usedParamSet":{"tokenId":true},"params":[{"name":"tokenId","required":true,"transform":{"type":"scalar"},"locs":[{"a":38,"b":46}]}],"statement":"SELECT * FROM poaps WHERE \"tokenId\" = :tokenId!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM poaps WHERE "tokenId" = :tokenId!
 * ```
 */
export const getPoapByTokenId = new PreparedQuery<IGetPoapByTokenIdParams,IGetPoapByTokenIdResult>(getPoapByTokenIdIR);


