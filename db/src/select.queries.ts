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

const getIssuerByWalletAddressIR: any = {"usedParamSet":{"walletAddress":true},"params":[{"name":"walletAddress","required":true,"transform":{"type":"scalar"},"locs":[{"a":259,"b":273}]}],"statement":"-- IMPORTANT: This uses issuerAddress which should be the eventOrganizer address from EventCreated events.\n-- DO NOT use ownerAddress from poaps table - that is the address of token recipients, not issuers.\nSELECT * FROM issuers\nWHERE \"issuerAddress\" = lower(:walletAddress!)"};

/**
 * Query generated from SQL:
 * ```
 * -- IMPORTANT: This uses issuerAddress which should be the eventOrganizer address from EventCreated events.
 * -- DO NOT use ownerAddress from poaps table - that is the address of token recipients, not issuers.
 * SELECT * FROM issuers
 * WHERE "issuerAddress" = lower(:walletAddress!)
 * ```
 */
export const getIssuerByWalletAddress = new PreparedQuery<IGetIssuerByWalletAddressParams,IGetIssuerByWalletAddressResult>(getIssuerByWalletAddressIR);


/** 'GetIssuerByIssuerId' parameters type */
export interface IGetIssuerByIssuerIdParams {
  issuerId: number;
}

/** 'GetIssuerByIssuerId' return type */
export interface IGetIssuerByIssuerIdResult {
  createdAt: Date | null;
  email: string | null;
  issuerAddress: string;
  issuerId: number;
  issuerUuid: string;
  organization: string | null;
  updatedAt: Date | null;
  username: string | null;
}

/** 'GetIssuerByIssuerId' query type */
export interface IGetIssuerByIssuerIdQuery {
  params: IGetIssuerByIssuerIdParams;
  result: IGetIssuerByIssuerIdResult;
}

const getIssuerByIssuerIdIR: any = {"usedParamSet":{"issuerId":true},"params":[{"name":"issuerId","required":true,"transform":{"type":"scalar"},"locs":[{"a":257,"b":266}]}],"statement":"-- Get issuer by issuerId. This is the correct way to get issuers from poaps table.\n-- IMPORTANT: poaps.ownerAddress does NOT correspond to issuers.issuerAddress.\n-- Use poaps.issuerId to join with issuers.issuerId.\nSELECT * FROM issuers\nWHERE \"issuerId\" = :issuerId!"};

/**
 * Query generated from SQL:
 * ```
 * -- Get issuer by issuerId. This is the correct way to get issuers from poaps table.
 * -- IMPORTANT: poaps.ownerAddress does NOT correspond to issuers.issuerAddress.
 * -- Use poaps.issuerId to join with issuers.issuerId.
 * SELECT * FROM issuers
 * WHERE "issuerId" = :issuerId!
 * ```
 */
export const getIssuerByIssuerId = new PreparedQuery<IGetIssuerByIssuerIdParams,IGetIssuerByIssuerIdResult>(getIssuerByIssuerIdIR);


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
  /** Token ID from blockchain event (INTEGER, NOT UNIQUE - allows duplicate tokenIds from different transactions) */
  tokenId: number;
  /** Transaction hash of the POAP mint (UNIQUE constraint ensures no duplicate transactions) */
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
  /** Detailed description of the event */
  description: string | null;
  /** Block number where the event was created */
  event_block_number: number | null;
  event_createdat: Date | null;
  event_issuerid: number;
  /** Transaction hash of the event creation */
  event_transaction_hash: string | null;
  event_updatedat: Date | null;
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
  ownerAddress: string;
  poapUuid: string;
  status: string;
  /** Event title/name for display purposes */
  title: string | null;
  /** Token ID from blockchain event (INTEGER, NOT UNIQUE - allows duplicate tokenIds from different transactions) */
  tokenId: number;
  /** Current number of POAPs minted for this event (incremented on mint, decremented on reorg rollback) */
  totalSupply: number | null;
  /** Transaction hash of the POAP mint (UNIQUE constraint ensures no duplicate transactions) */
  transaction_hash: string | null;
  updatedAt: Date | null;
}

/** 'GetPoapsByOwnerAddress' query type */
export interface IGetPoapsByOwnerAddressQuery {
  params: IGetPoapsByOwnerAddressParams;
  result: IGetPoapsByOwnerAddressResult;
}

const getPoapsByOwnerAddressIR: any = {"usedParamSet":{"ownerAddress":true},"params":[{"name":"ownerAddress","required":true,"transform":{"type":"scalar"},"locs":[{"a":545,"b":558}]}],"statement":"-- Get all POAPs for an owner with full event details\nSELECT \n  p.*,\n  e.\"eventUuid\",\n  e.\"issuerId\" as event_issuerId,\n  e.title,\n  e.description,\n  e.\"imageUrl\",\n  e.\"maxSupply\",\n  e.\"organiserAddress\",\n  e.status,\n  e.\"totalSupply\",\n  e.\"eventStartDate\",\n  e.\"eventEndDate\",\n  e.expiration,\n  e.\"createdAt\" as event_createdAt,\n  e.\"updatedAt\" as event_updatedAt,\n  e.block_number as event_block_number,\n  e.transaction_hash as event_transaction_hash\nFROM poaps p\nLEFT JOIN events e ON p.\"eventId\" = e.\"eventId\"\nWHERE p.\"ownerAddress\" = lower(:ownerAddress!)\nORDER BY p.\"createdAt\" DESC"};

/**
 * Query generated from SQL:
 * ```
 * -- Get all POAPs for an owner with full event details
 * SELECT 
 *   p.*,
 *   e."eventUuid",
 *   e."issuerId" as event_issuerId,
 *   e.title,
 *   e.description,
 *   e."imageUrl",
 *   e."maxSupply",
 *   e."organiserAddress",
 *   e.status,
 *   e."totalSupply",
 *   e."eventStartDate",
 *   e."eventEndDate",
 *   e.expiration,
 *   e."createdAt" as event_createdAt,
 *   e."updatedAt" as event_updatedAt,
 *   e.block_number as event_block_number,
 *   e.transaction_hash as event_transaction_hash
 * FROM poaps p
 * LEFT JOIN events e ON p."eventId" = e."eventId"
 * WHERE p."ownerAddress" = lower(:ownerAddress!)
 * ORDER BY p."createdAt" DESC
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
  /** Token ID from blockchain event (INTEGER, NOT UNIQUE - allows duplicate tokenIds from different transactions) */
  tokenId: number;
  /** Transaction hash of the POAP mint (UNIQUE constraint ensures no duplicate transactions) */
  transaction_hash: string | null;
  updatedAt: Date | null;
}

/** 'GetPoapByTokenId' query type */
export interface IGetPoapByTokenIdQuery {
  params: IGetPoapByTokenIdParams;
  result: IGetPoapByTokenIdResult;
}

const getPoapByTokenIdIR: any = {"usedParamSet":{"tokenId":true},"params":[{"name":"tokenId","required":true,"transform":{"type":"scalar"},"locs":[{"a":171,"b":179}]}],"statement":"-- NOTE: tokenId is NOT unique, so this query may return multiple POAPs.\n-- Use transaction_hash or poapUuid to get a specific POAP.\nSELECT * FROM poaps WHERE \"tokenId\" = :tokenId!"};

/**
 * Query generated from SQL:
 * ```
 * -- NOTE: tokenId is NOT unique, so this query may return multiple POAPs.
 * -- Use transaction_hash or poapUuid to get a specific POAP.
 * SELECT * FROM poaps WHERE "tokenId" = :tokenId!
 * ```
 */
export const getPoapByTokenId = new PreparedQuery<IGetPoapByTokenIdParams,IGetPoapByTokenIdResult>(getPoapByTokenIdIR);


/** 'GetOwnersByEventId' parameters type */
export interface IGetOwnersByEventIdParams {
  eventId: number;
}

/** 'GetOwnersByEventId' return type */
export interface IGetOwnersByEventIdResult {
  mint_count: string | null;
  ownerAddress: string;
}

/** 'GetOwnersByEventId' query type */
export interface IGetOwnersByEventIdQuery {
  params: IGetOwnersByEventIdParams;
  result: IGetOwnersByEventIdResult;
}

const getOwnersByEventIdIR: any = {"usedParamSet":{"eventId":true},"params":[{"name":"eventId","required":true,"transform":{"type":"scalar"},"locs":[{"a":243,"b":251}]}],"statement":"-- Get all distinct owners (people) who minted tokens for a specific event\n-- NOTE: owners table is not populated, so only ownerAddress is returned\nSELECT DISTINCT \n  p.\"ownerAddress\",\n  COUNT(*) as mint_count\nFROM poaps p\nWHERE p.\"eventId\" = :eventId!\nGROUP BY p.\"ownerAddress\"\nORDER BY mint_count DESC, p.\"ownerAddress\""};

/**
 * Query generated from SQL:
 * ```
 * -- Get all distinct owners (people) who minted tokens for a specific event
 * -- NOTE: owners table is not populated, so only ownerAddress is returned
 * SELECT DISTINCT 
 *   p."ownerAddress",
 *   COUNT(*) as mint_count
 * FROM poaps p
 * WHERE p."eventId" = :eventId!
 * GROUP BY p."ownerAddress"
 * ORDER BY mint_count DESC, p."ownerAddress"
 * ```
 */
export const getOwnersByEventId = new PreparedQuery<IGetOwnersByEventIdParams,IGetOwnersByEventIdResult>(getOwnersByEventIdIR);


/** 'GetPoapsByEventId' parameters type */
export interface IGetPoapsByEventIdParams {
  eventId: number;
}

/** 'GetPoapsByEventId' return type */
export interface IGetPoapsByEventIdResult {
  /** Block number where the POAP was minted */
  block_number: number | null;
  createdAt: Date | null;
  /** Detailed description of the event */
  description: string | null;
  eventId: number;
  /** URL to the event image/banner */
  imageUrl: string | null;
  issuerId: number;
  maxSupply: number;
  organiserAddress: string;
  ownerAddress: string;
  poapUuid: string;
  status: string;
  /** Event title/name for display purposes */
  title: string | null;
  /** Token ID from blockchain event (INTEGER, NOT UNIQUE - allows duplicate tokenIds from different transactions) */
  tokenId: number;
  /** Current number of POAPs minted for this event (incremented on mint, decremented on reorg rollback) */
  totalSupply: number | null;
  /** Transaction hash of the POAP mint (UNIQUE constraint ensures no duplicate transactions) */
  transaction_hash: string | null;
  updatedAt: Date | null;
}

/** 'GetPoapsByEventId' query type */
export interface IGetPoapsByEventIdQuery {
  params: IGetPoapsByEventIdParams;
  result: IGetPoapsByEventIdResult;
}

const getPoapsByEventIdIR: any = {"usedParamSet":{"eventId":true},"params":[{"name":"eventId","required":true,"transform":{"type":"scalar"},"locs":[{"a":467,"b":475}]}],"statement":"-- Get all POAPs for a specific event with event details\n-- IMPORTANT: To join with issuers, use p.\"issuerId\" = issuers.\"issuerId\", NOT p.\"ownerAddress\" = issuers.\"issuerAddress\"\n-- NOTE: owners table is not populated, so owner information is not included\nSELECT \n  p.*,\n  e.title,\n  e.description,\n  e.\"imageUrl\",\n  e.\"maxSupply\",\n  e.\"organiserAddress\",\n  e.status,\n  e.\"totalSupply\"\nFROM poaps p\nLEFT JOIN events e ON p.\"eventId\" = e.\"eventId\"\nWHERE p.\"eventId\" = :eventId!\nORDER BY p.\"createdAt\" DESC"};

/**
 * Query generated from SQL:
 * ```
 * -- Get all POAPs for a specific event with event details
 * -- IMPORTANT: To join with issuers, use p."issuerId" = issuers."issuerId", NOT p."ownerAddress" = issuers."issuerAddress"
 * -- NOTE: owners table is not populated, so owner information is not included
 * SELECT 
 *   p.*,
 *   e.title,
 *   e.description,
 *   e."imageUrl",
 *   e."maxSupply",
 *   e."organiserAddress",
 *   e.status,
 *   e."totalSupply"
 * FROM poaps p
 * LEFT JOIN events e ON p."eventId" = e."eventId"
 * WHERE p."eventId" = :eventId!
 * ORDER BY p."createdAt" DESC
 * ```
 */
export const getPoapsByEventId = new PreparedQuery<IGetPoapsByEventIdParams,IGetPoapsByEventIdResult>(getPoapsByEventIdIR);


/** 'GetEventsByTokenId' parameters type */
export interface IGetEventsByTokenIdParams {
  tokenId: number;
}

/** 'GetEventsByTokenId' return type */
export interface IGetEventsByTokenIdResult {
  /** Detailed description of the event */
  description: string | null;
  /** Block number where the event was created */
  event_block_number: number | null;
  event_createdat: Date | null;
  event_issuerid: number;
  /** Transaction hash of the event creation */
  event_transaction_hash: string | null;
  event_updatedat: Date | null;
  /** When the actual event ends (different from mint expiration) */
  eventEndDate: Date | null;
  eventId: number;
  /** When the actual event starts (Unix timestamp in seconds, same type as expiration) */
  eventStartDate: number | null;
  eventUuid: string;
  expiration: number;
  /** URL to the event image/banner */
  imageUrl: string | null;
  maxSupply: number;
  minted_at: Date | null;
  organiserAddress: string;
  ownerAddress: string;
  /** Block number where the POAP was minted */
  poap_block_number: number | null;
  /** Transaction hash of the POAP mint (UNIQUE constraint ensures no duplicate transactions) */
  poap_transaction_hash: string | null;
  status: string;
  /** Event title/name for display purposes */
  title: string | null;
  /** Current number of POAPs minted for this event (incremented on mint, decremented on reorg rollback) */
  totalSupply: number | null;
}

/** 'GetEventsByTokenId' query type */
export interface IGetEventsByTokenIdQuery {
  params: IGetEventsByTokenIdParams;
  result: IGetEventsByTokenIdResult;
}

const getEventsByTokenIdIR: any = {"usedParamSet":{"tokenId":true},"params":[{"name":"tokenId","required":true,"transform":{"type":"scalar"},"locs":[{"a":726,"b":734}]}],"statement":"-- Get all events (with full event information) that were minted with a specific tokenId\nSELECT DISTINCT\n  e.\"eventUuid\",\n  e.\"issuerId\" as event_issuerId,\n  e.\"eventId\",\n  e.\"maxSupply\",\n  e.expiration,\n  e.\"organiserAddress\",\n  e.status,\n  e.title,\n  e.description,\n  e.\"imageUrl\",\n  e.\"eventStartDate\",\n  e.\"eventEndDate\",\n  e.\"totalSupply\",\n  e.\"createdAt\" as event_createdAt,\n  e.\"updatedAt\" as event_updatedAt,\n  e.block_number as event_block_number,\n  e.transaction_hash as event_transaction_hash,\n  p.\"ownerAddress\",\n  p.\"createdAt\" as minted_at,\n  p.\"transaction_hash\" as poap_transaction_hash,\n  p.\"block_number\" as poap_block_number\nFROM poaps p\nINNER JOIN events e ON p.\"eventId\" = e.\"eventId\"\nWHERE p.\"tokenId\" = :tokenId!\nORDER BY p.\"createdAt\" DESC"};

/**
 * Query generated from SQL:
 * ```
 * -- Get all events (with full event information) that were minted with a specific tokenId
 * SELECT DISTINCT
 *   e."eventUuid",
 *   e."issuerId" as event_issuerId,
 *   e."eventId",
 *   e."maxSupply",
 *   e.expiration,
 *   e."organiserAddress",
 *   e.status,
 *   e.title,
 *   e.description,
 *   e."imageUrl",
 *   e."eventStartDate",
 *   e."eventEndDate",
 *   e."totalSupply",
 *   e."createdAt" as event_createdAt,
 *   e."updatedAt" as event_updatedAt,
 *   e.block_number as event_block_number,
 *   e.transaction_hash as event_transaction_hash,
 *   p."ownerAddress",
 *   p."createdAt" as minted_at,
 *   p."transaction_hash" as poap_transaction_hash,
 *   p."block_number" as poap_block_number
 * FROM poaps p
 * INNER JOIN events e ON p."eventId" = e."eventId"
 * WHERE p."tokenId" = :tokenId!
 * ORDER BY p."createdAt" DESC
 * ```
 */
export const getEventsByTokenId = new PreparedQuery<IGetEventsByTokenIdParams,IGetEventsByTokenIdResult>(getEventsByTokenIdIR);


/** 'GetPoapsByTokenIdWithEvents' parameters type */
export interface IGetPoapsByTokenIdWithEventsParams {
  tokenId: number;
}

/** 'GetPoapsByTokenIdWithEvents' return type */
export interface IGetPoapsByTokenIdWithEventsResult {
  /** Detailed description of the event */
  description: string | null;
  /** Block number where the event was created */
  event_block_number: number | null;
  event_createdat: Date | null;
  event_issuerid: number;
  /** Transaction hash of the event creation */
  event_transaction_hash: string | null;
  event_updatedat: Date | null;
  /** When the actual event ends (different from mint expiration) */
  eventEndDate: Date | null;
  eventId: number;
  /** When the actual event starts (Unix timestamp in seconds, same type as expiration) */
  eventStartDate: number | null;
  eventUuid: string;
  expiration: number;
  /** URL to the event image/banner */
  imageUrl: string | null;
  maxSupply: number;
  organiserAddress: string;
  ownerAddress: string;
  /** Block number where the POAP was minted */
  poap_block_number: number | null;
  poap_createdat: Date | null;
  poap_eventid: number;
  poap_issuerid: number;
  /** Transaction hash of the POAP mint (UNIQUE constraint ensures no duplicate transactions) */
  poap_transaction_hash: string | null;
  poap_updatedat: Date | null;
  poapUuid: string;
  status: string;
  /** Event title/name for display purposes */
  title: string | null;
  /** Token ID from blockchain event (INTEGER, NOT UNIQUE - allows duplicate tokenIds from different transactions) */
  tokenId: number;
  /** Current number of POAPs minted for this event (incremented on mint, decremented on reorg rollback) */
  totalSupply: number | null;
}

/** 'GetPoapsByTokenIdWithEvents' query type */
export interface IGetPoapsByTokenIdWithEventsQuery {
  params: IGetPoapsByTokenIdWithEventsParams;
  result: IGetPoapsByTokenIdWithEventsResult;
}

const getPoapsByTokenIdWithEventsIR: any = {"usedParamSet":{"tokenId":true},"params":[{"name":"tokenId","required":true,"transform":{"type":"scalar"},"locs":[{"a":893,"b":901}]}],"statement":"-- Get all POAPs for a token with full event information\n-- NOTE: owners table is not populated, so owner information is not included\nSELECT \n  p.\"poapUuid\",\n  p.\"issuerId\" as poap_issuerId,\n  p.\"eventId\" as poap_eventId,\n  p.\"tokenId\",\n  p.\"ownerAddress\",\n  p.\"createdAt\" as poap_createdAt,\n  p.\"updatedAt\" as poap_updatedAt,\n  p.block_number as poap_block_number,\n  p.transaction_hash as poap_transaction_hash,\n  e.\"eventUuid\",\n  e.\"issuerId\" as event_issuerId,\n  e.\"eventId\",\n  e.\"maxSupply\",\n  e.expiration,\n  e.\"organiserAddress\",\n  e.status,\n  e.title,\n  e.description,\n  e.\"imageUrl\",\n  e.\"eventStartDate\",\n  e.\"eventEndDate\",\n  e.\"totalSupply\",\n  e.\"createdAt\" as event_createdAt,\n  e.\"updatedAt\" as event_updatedAt,\n  e.block_number as event_block_number,\n  e.transaction_hash as event_transaction_hash\nFROM poaps p\nLEFT JOIN events e ON p.\"eventId\" = e.\"eventId\"\nWHERE p.\"tokenId\" = :tokenId!\nORDER BY p.\"createdAt\" DESC"};

/**
 * Query generated from SQL:
 * ```
 * -- Get all POAPs for a token with full event information
 * -- NOTE: owners table is not populated, so owner information is not included
 * SELECT 
 *   p."poapUuid",
 *   p."issuerId" as poap_issuerId,
 *   p."eventId" as poap_eventId,
 *   p."tokenId",
 *   p."ownerAddress",
 *   p."createdAt" as poap_createdAt,
 *   p."updatedAt" as poap_updatedAt,
 *   p.block_number as poap_block_number,
 *   p.transaction_hash as poap_transaction_hash,
 *   e."eventUuid",
 *   e."issuerId" as event_issuerId,
 *   e."eventId",
 *   e."maxSupply",
 *   e.expiration,
 *   e."organiserAddress",
 *   e.status,
 *   e.title,
 *   e.description,
 *   e."imageUrl",
 *   e."eventStartDate",
 *   e."eventEndDate",
 *   e."totalSupply",
 *   e."createdAt" as event_createdAt,
 *   e."updatedAt" as event_updatedAt,
 *   e.block_number as event_block_number,
 *   e.transaction_hash as event_transaction_hash
 * FROM poaps p
 * LEFT JOIN events e ON p."eventId" = e."eventId"
 * WHERE p."tokenId" = :tokenId!
 * ORDER BY p."createdAt" DESC
 * ```
 */
export const getPoapsByTokenIdWithEvents = new PreparedQuery<IGetPoapsByTokenIdWithEventsParams,IGetPoapsByTokenIdWithEventsResult>(getPoapsByTokenIdWithEventsIR);


/** 'GetPoapsByTokenIdWithIssuer' parameters type */
export interface IGetPoapsByTokenIdWithIssuerParams {
  tokenId: number;
}

/** 'GetPoapsByTokenIdWithIssuer' return type */
export interface IGetPoapsByTokenIdWithIssuerResult {
  /** Block number where the POAP was minted */
  block_number: number | null;
  createdAt: Date | null;
  eventId: number;
  issuer_email: string | null;
  issuer_organization: string | null;
  issuer_username: string | null;
  issuerAddress: string;
  issuerId: number;
  issuerUuid: string;
  ownerAddress: string;
  poapUuid: string;
  /** Token ID from blockchain event (INTEGER, NOT UNIQUE - allows duplicate tokenIds from different transactions) */
  tokenId: number;
  /** Transaction hash of the POAP mint (UNIQUE constraint ensures no duplicate transactions) */
  transaction_hash: string | null;
  updatedAt: Date | null;
}

/** 'GetPoapsByTokenIdWithIssuer' query type */
export interface IGetPoapsByTokenIdWithIssuerQuery {
  params: IGetPoapsByTokenIdWithIssuerParams;
  result: IGetPoapsByTokenIdWithIssuerResult;
}

const getPoapsByTokenIdWithIssuerIR: any = {"usedParamSet":{"tokenId":true},"params":[{"name":"tokenId","required":true,"transform":{"type":"scalar"},"locs":[{"a":451,"b":459}]}],"statement":"-- Get all POAPs for a token with issuer information\n-- IMPORTANT: This correctly joins poaps with issuers using issuerId.\n-- DO NOT join using p.\"ownerAddress\" = issuers.\"issuerAddress\" - they do not correspond.\nSELECT \n  p.*,\n  i.\"issuerUuid\",\n  i.\"issuerAddress\",\n  i.username as issuer_username,\n  i.email as issuer_email,\n  i.organization as issuer_organization\nFROM poaps p\nLEFT JOIN issuers i ON p.\"issuerId\" = i.\"issuerId\"\nWHERE p.\"tokenId\" = :tokenId!\nORDER BY p.\"createdAt\" DESC"};

/**
 * Query generated from SQL:
 * ```
 * -- Get all POAPs for a token with issuer information
 * -- IMPORTANT: This correctly joins poaps with issuers using issuerId.
 * -- DO NOT join using p."ownerAddress" = issuers."issuerAddress" - they do not correspond.
 * SELECT 
 *   p.*,
 *   i."issuerUuid",
 *   i."issuerAddress",
 *   i.username as issuer_username,
 *   i.email as issuer_email,
 *   i.organization as issuer_organization
 * FROM poaps p
 * LEFT JOIN issuers i ON p."issuerId" = i."issuerId"
 * WHERE p."tokenId" = :tokenId!
 * ORDER BY p."createdAt" DESC
 * ```
 */
export const getPoapsByTokenIdWithIssuer = new PreparedQuery<IGetPoapsByTokenIdWithIssuerParams,IGetPoapsByTokenIdWithIssuerResult>(getPoapsByTokenIdWithIssuerIR);


