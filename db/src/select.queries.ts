/** Types generated for queries found in "src/select.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

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
  /** When the actual event starts (different from mint expiration) */
  eventStartDate: number;
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
  eventId?: number | null | void;
  expired?: boolean | null | void;
  order?: string | null | void;
  organiserAddress?: string | null | void;
  sortBy?: string | null | void;
  status?: string | null | void;
  titleSearch?: string | null | void;
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
  /** When the actual event starts (different from mint expiration) */
  eventStartDate: number;
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
  /** Transaction hash of the event creation */
  transaction_hash: string | null;
  updatedAt: Date | null;
}

/** 'GetEventsWithFilters' query type */
export interface IGetEventsWithFiltersQuery {
  params: IGetEventsWithFiltersParams;
  result: IGetEventsWithFiltersResult;
}

const getEventsWithFiltersIR: any = {"usedParamSet":{"organiserAddress":true,"eventId":true,"status":true,"expired":true,"titleSearch":true,"sortBy":true,"order":true},"params":[{"name":"organiserAddress","required":false,"transform":{"type":"scalar"},"locs":[{"a":31,"b":47},{"a":93,"b":109}]},{"name":"eventId","required":false,"transform":{"type":"scalar"},"locs":[{"a":120,"b":127},{"a":161,"b":168}]},{"name":"status","required":false,"transform":{"type":"scalar"},"locs":[{"a":178,"b":184},{"a":212,"b":218}]},{"name":"expired","required":false,"transform":{"type":"scalar"},"locs":[{"a":228,"b":235},{"a":279,"b":286},{"a":365,"b":372}]},{"name":"titleSearch","required":false,"transform":{"type":"scalar"},"locs":[{"a":492,"b":503},{"a":541,"b":552}]},{"name":"sortBy","required":false,"transform":{"type":"scalar"},"locs":[{"a":583,"b":589},{"a":673,"b":679},{"a":765,"b":771},{"a":865,"b":871},{"a":967,"b":973},{"a":1057,"b":1063},{"a":1149,"b":1155},{"a":1229,"b":1235}]},{"name":"order","required":false,"transform":{"type":"scalar"},"locs":[{"a":609,"b":614},{"a":699,"b":704},{"a":796,"b":801},{"a":896,"b":901},{"a":994,"b":999},{"a":1084,"b":1089},{"a":1171,"b":1176},{"a":1251,"b":1256}]}],"statement":"SELECT * FROM events\nWHERE \n  (:organiserAddress::text IS NULL OR \"organiserAddress\" = lower(:organiserAddress))\n  AND (:eventId::integer IS NULL OR \"eventId\" = :eventId)\n  AND (:status::text IS NULL OR status = :status)\n  AND (:expired::boolean IS NULL OR \n    CASE \n      WHEN :expired = true THEN expiration * 1000 <= EXTRACT(EPOCH FROM NOW()) * 1000\n      WHEN :expired = false THEN (expiration * 1000 > EXTRACT(EPOCH FROM NOW()) * 1000 OR expiration = 0)\n      ELSE true\n    END)\n  AND (:titleSearch::text IS NULL OR title ILIKE '%' || :titleSearch || '%')\nORDER BY\n  CASE WHEN :sortBy = 'createdAt' AND :order = 'asc' THEN \"createdAt\" END ASC NULLS LAST,\n  CASE WHEN :sortBy = 'createdAt' AND :order = 'desc' THEN \"createdAt\" END DESC NULLS LAST,\n  CASE WHEN :sortBy = 'eventStartDate' AND :order = 'asc' THEN \"eventStartDate\" END ASC NULLS LAST,\n  CASE WHEN :sortBy = 'eventStartDate' AND :order = 'desc' THEN \"eventStartDate\" END DESC NULLS LAST,\n  CASE WHEN :sortBy = 'expiration' AND :order = 'asc' THEN expiration END ASC NULLS LAST,\n  CASE WHEN :sortBy = 'expiration' AND :order = 'desc' THEN expiration END DESC NULLS LAST,\n  CASE WHEN :sortBy = 'title' AND :order = 'asc' THEN title END ASC NULLS LAST,\n  CASE WHEN :sortBy = 'title' AND :order = 'desc' THEN title END DESC NULLS LAST,\n  \"createdAt\" DESC NULLS LAST"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM events
 * WHERE 
 *   (:organiserAddress::text IS NULL OR "organiserAddress" = lower(:organiserAddress))
 *   AND (:eventId::integer IS NULL OR "eventId" = :eventId)
 *   AND (:status::text IS NULL OR status = :status)
 *   AND (:expired::boolean IS NULL OR 
 *     CASE 
 *       WHEN :expired = true THEN expiration * 1000 <= EXTRACT(EPOCH FROM NOW()) * 1000
 *       WHEN :expired = false THEN (expiration * 1000 > EXTRACT(EPOCH FROM NOW()) * 1000 OR expiration = 0)
 *       ELSE true
 *     END)
 *   AND (:titleSearch::text IS NULL OR title ILIKE '%' || :titleSearch || '%')
 * ORDER BY
 *   CASE WHEN :sortBy = 'createdAt' AND :order = 'asc' THEN "createdAt" END ASC NULLS LAST,
 *   CASE WHEN :sortBy = 'createdAt' AND :order = 'desc' THEN "createdAt" END DESC NULLS LAST,
 *   CASE WHEN :sortBy = 'eventStartDate' AND :order = 'asc' THEN "eventStartDate" END ASC NULLS LAST,
 *   CASE WHEN :sortBy = 'eventStartDate' AND :order = 'desc' THEN "eventStartDate" END DESC NULLS LAST,
 *   CASE WHEN :sortBy = 'expiration' AND :order = 'asc' THEN expiration END ASC NULLS LAST,
 *   CASE WHEN :sortBy = 'expiration' AND :order = 'desc' THEN expiration END DESC NULLS LAST,
 *   CASE WHEN :sortBy = 'title' AND :order = 'asc' THEN title END ASC NULLS LAST,
 *   CASE WHEN :sortBy = 'title' AND :order = 'desc' THEN title END DESC NULLS LAST,
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
  /** When the actual event starts (different from mint expiration) */
  eventStartDate: number;
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
  /** When the actual event starts (different from mint expiration) */
  eventStartDate: number;
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


