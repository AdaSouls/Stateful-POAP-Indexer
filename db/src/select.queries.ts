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
  createdAt: Date | null;
  eventId: number;
  eventUuid: string;
  expiration: number;
  issuerId: number;
  maxSupply: number;
  organiserAddress: string;
  status: string;
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
  createdAt: Date | null;
  eventId: number;
  issuerId: number;
  ownerAddress: string;
  poapUuid: string;
  tokenId: number;
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
  createdAt: Date | null;
  eventId: number;
  issuerId: number;
  maxSupply: number;
  organiserAddress: string;
  ownerAddress: string;
  poapUuid: string;
  status: string;
  tokenId: number;
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
  createdAt: Date | null;
  eventId: number;
  eventUuid: string;
  expiration: number;
  issuerId: number;
  maxSupply: number;
  organiserAddress: string;
  status: string;
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
  createdAt: Date | null;
  eventId: number;
  issuerId: number;
  ownerAddress: string;
  poapUuid: string;
  tokenId: number;
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


