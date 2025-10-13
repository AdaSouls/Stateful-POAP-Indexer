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

const getIssuerByWalletAddressIR: any = {"usedParamSet":{"walletAddress":true},"params":[{"name":"walletAddress","required":true,"transform":{"type":"scalar"},"locs":[{"a":46,"b":60}]}],"statement":"SELECT * FROM issuers\nWHERE \"issuerAddress\" = :walletAddress!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM issuers
 * WHERE "issuerAddress" = :walletAddress!
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

const getOwnerByWalletAddressIR: any = {"usedParamSet":{"walletAddress":true},"params":[{"name":"walletAddress","required":true,"transform":{"type":"scalar"},"locs":[{"a":44,"b":58}]}],"statement":"SELECT * FROM owners\nWHERE \"ownerAddress\" = :walletAddress!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM owners
 * WHERE "ownerAddress" = :walletAddress!
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


