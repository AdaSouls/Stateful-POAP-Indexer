/** Types generated for queries found in "src/insert.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateIssuer' parameters type */
export interface ICreateIssuerParams {
  email?: string | null | void;
  issuerAddress: string;
  issuerId: number;
  organization?: string | null | void;
  username?: string | null | void;
}

/** 'CreateIssuer' return type */
export interface ICreateIssuerResult {
  createdAt: Date | null;
  email: string | null;
  issuerAddress: string;
  issuerId: number;
  issuerUuid: string;
  organization: string | null;
  updatedAt: Date | null;
  username: string | null;
}

/** 'CreateIssuer' query type */
export interface ICreateIssuerQuery {
  params: ICreateIssuerParams;
  result: ICreateIssuerResult;
}

const createIssuerIR: any = {"usedParamSet":{"issuerId":true,"issuerAddress":true,"username":true,"email":true,"organization":true},"params":[{"name":"issuerId","required":true,"transform":{"type":"scalar"},"locs":[{"a":161,"b":170}]},{"name":"issuerAddress","required":true,"transform":{"type":"scalar"},"locs":[{"a":181,"b":195}]},{"name":"username","required":false,"transform":{"type":"scalar"},"locs":[{"a":201,"b":209}]},{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":214,"b":219}]},{"name":"organization","required":false,"transform":{"type":"scalar"},"locs":[{"a":224,"b":236}]}],"statement":"INSERT INTO issuers (\n  \"issuerUuid\",\n  \"issuerId\",\n  \"issuerAddress\",\n  username,\n  email,\n  organization,\n  \"createdAt\",\n  \"updatedAt\"\n)\nVALUES (\n  DEFAULT,\n  :issuerId!,\n  lower(:issuerAddress!),\n  :username,\n  :email,\n  :organization,\n  DEFAULT,\n  DEFAULT\n)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO issuers (
 *   "issuerUuid",
 *   "issuerId",
 *   "issuerAddress",
 *   username,
 *   email,
 *   organization,
 *   "createdAt",
 *   "updatedAt"
 * )
 * VALUES (
 *   DEFAULT,
 *   :issuerId!,
 *   lower(:issuerAddress!),
 *   :username,
 *   :email,
 *   :organization,
 *   DEFAULT,
 *   DEFAULT
 * )
 * RETURNING *
 * ```
 */
export const createIssuer = new PreparedQuery<ICreateIssuerParams,ICreateIssuerResult>(createIssuerIR);


/** 'CreateEvent' parameters type */
export interface ICreateEventParams {
  eventId: number;
  eventMaxSupply: number;
  eventMintExpiration: number;
  eventOrganizer: string;
  issuerId: number;
}

/** 'CreateEvent' return type */
export interface ICreateEventResult {
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

/** 'CreateEvent' query type */
export interface ICreateEventQuery {
  params: ICreateEventParams;
  result: ICreateEventResult;
}

const createEventIR: any = {"usedParamSet":{"issuerId":true,"eventId":true,"eventMaxSupply":true,"eventMintExpiration":true,"eventOrganizer":true},"params":[{"name":"issuerId","required":true,"transform":{"type":"scalar"},"locs":[{"a":177,"b":186}]},{"name":"eventId","required":true,"transform":{"type":"scalar"},"locs":[{"a":191,"b":199}]},{"name":"eventMaxSupply","required":true,"transform":{"type":"scalar"},"locs":[{"a":204,"b":219}]},{"name":"eventMintExpiration","required":true,"transform":{"type":"scalar"},"locs":[{"a":224,"b":244}]},{"name":"eventOrganizer","required":true,"transform":{"type":"scalar"},"locs":[{"a":255,"b":270}]}],"statement":"INSERT INTO events (\n  \"eventUuid\",\n  \"issuerId\",\n  \"eventId\",\n  \"maxSupply\",\n  expiration,\n  \"organiserAddress\",\n  status,\n  \"createdAt\",\n  \"updatedAt\"\n)\nVALUES (\n  DEFAULT,\n  :issuerId!,\n  :eventId!,\n  :eventMaxSupply!,\n  :eventMintExpiration!,\n  lower(:eventOrganizer!),\n  DEFAULT,\n  DEFAULT,\n  DEFAULT\n)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO events (
 *   "eventUuid",
 *   "issuerId",
 *   "eventId",
 *   "maxSupply",
 *   expiration,
 *   "organiserAddress",
 *   status,
 *   "createdAt",
 *   "updatedAt"
 * )
 * VALUES (
 *   DEFAULT,
 *   :issuerId!,
 *   :eventId!,
 *   :eventMaxSupply!,
 *   :eventMintExpiration!,
 *   lower(:eventOrganizer!),
 *   DEFAULT,
 *   DEFAULT,
 *   DEFAULT
 * )
 * RETURNING *
 * ```
 */
export const createEvent = new PreparedQuery<ICreateEventParams,ICreateEventResult>(createEventIR);


/** 'CreateOwner' parameters type */
export interface ICreateOwnerParams {
  email?: string | null | void;
  ownerAddress: string;
  username?: string | null | void;
}

/** 'CreateOwner' return type */
export interface ICreateOwnerResult {
  createdAt: Date | null;
  email: string | null;
  ownerAddress: string | null;
  ownerId: number;
  updatedAt: Date | null;
  username: string | null;
}

/** 'CreateOwner' query type */
export interface ICreateOwnerQuery {
  params: ICreateOwnerParams;
  result: ICreateOwnerResult;
}

const createOwnerIR: any = {"usedParamSet":{"username":true,"email":true,"ownerAddress":true},"params":[{"name":"username","required":false,"transform":{"type":"scalar"},"locs":[{"a":128,"b":136}]},{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":147,"b":152}]},{"name":"ownerAddress","required":true,"transform":{"type":"scalar"},"locs":[{"a":164,"b":177}]}],"statement":"INSERT INTO \"owners\" (\n  \"ownerId\",\n  username,\n  email,\n  \"ownerAddress\",\n  \"createdAt\",\n  \"updatedAt\"\n)\nVALUES (\n  DEFAULT,\n  :username,\n  lower(:email),\n  lower(:ownerAddress!),\n  DEFAULT,\n  DEFAULT\n)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "owners" (
 *   "ownerId",
 *   username,
 *   email,
 *   "ownerAddress",
 *   "createdAt",
 *   "updatedAt"
 * )
 * VALUES (
 *   DEFAULT,
 *   :username,
 *   lower(:email),
 *   lower(:ownerAddress!),
 *   DEFAULT,
 *   DEFAULT
 * )
 * RETURNING *
 * ```
 */
export const createOwner = new PreparedQuery<ICreateOwnerParams,ICreateOwnerResult>(createOwnerIR);


/** 'CreatePoap' parameters type */
export interface ICreatePoapParams {
  eventId: number;
  issuerId: number;
  ownerAddress: string;
  tokenId: number;
}

/** 'CreatePoap' return type */
export interface ICreatePoapResult {
  createdAt: Date | null;
  eventId: number;
  issuerId: number;
  ownerAddress: string;
  poapUuid: string;
  tokenId: number;
  updatedAt: Date | null;
}

/** 'CreatePoap' query type */
export interface ICreatePoapQuery {
  params: ICreatePoapParams;
  result: ICreatePoapResult;
}

const createPoapIR: any = {"usedParamSet":{"issuerId":true,"eventId":true,"tokenId":true,"ownerAddress":true},"params":[{"name":"issuerId","required":true,"transform":{"type":"scalar"},"locs":[{"a":145,"b":154}]},{"name":"eventId","required":true,"transform":{"type":"scalar"},"locs":[{"a":159,"b":167}]},{"name":"tokenId","required":true,"transform":{"type":"scalar"},"locs":[{"a":172,"b":180}]},{"name":"ownerAddress","required":true,"transform":{"type":"scalar"},"locs":[{"a":185,"b":198}]}],"statement":"INSERT INTO poaps (\n  \"poapUuid\",\n  \"issuerId\",\n  \"eventId\",\n  \"tokenId\",\n  \"ownerAddress\",\n  \"createdAt\",\n  \"updatedAt\"\n)\nVALUES (\n  DEFAULT,\n  :issuerId!,\n  :eventId!,\n  :tokenId!,\n  :ownerAddress!,\n  DEFAULT,\n  DEFAULT\n)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO poaps (
 *   "poapUuid",
 *   "issuerId",
 *   "eventId",
 *   "tokenId",
 *   "ownerAddress",
 *   "createdAt",
 *   "updatedAt"
 * )
 * VALUES (
 *   DEFAULT,
 *   :issuerId!,
 *   :eventId!,
 *   :tokenId!,
 *   :ownerAddress!,
 *   DEFAULT,
 *   DEFAULT
 * )
 * RETURNING *
 * ```
 */
export const createPoap = new PreparedQuery<ICreatePoapParams,ICreatePoapResult>(createPoapIR);


/** 'CreateEventPoap' parameters type */
export interface ICreateEventPoapParams {
  eventId: number;
  tokenId: number;
}

/** 'CreateEventPoap' return type */
export interface ICreateEventPoapResult {
  createdAt: Date | null;
  eventId: number;
  relationUuid: string;
  tokenId: number;
  updatedAt: Date | null;
}

/** 'CreateEventPoap' query type */
export interface ICreateEventPoapQuery {
  params: ICreateEventPoapParams;
  result: ICreateEventPoapResult;
}

const createEventPoapIR: any = {"usedParamSet":{"tokenId":true,"eventId":true},"params":[{"name":"tokenId","required":true,"transform":{"type":"scalar"},"locs":[{"a":122,"b":130}]},{"name":"eventId","required":true,"transform":{"type":"scalar"},"locs":[{"a":135,"b":143}]}],"statement":"INSERT INTO eventpoaps (\n  \"relationUuid\",\n  \"tokenId\",\n  \"eventId\",\n  \"createdAt\",\n  \"updatedAt\"\n)\nVALUES (\n  DEFAULT,\n  :tokenId!,\n  :eventId!,\n  DEFAULT,\n  DEFAULT\n)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO eventpoaps (
 *   "relationUuid",
 *   "tokenId",
 *   "eventId",
 *   "createdAt",
 *   "updatedAt"
 * )
 * VALUES (
 *   DEFAULT,
 *   :tokenId!,
 *   :eventId!,
 *   DEFAULT,
 *   DEFAULT
 * )
 * RETURNING *
 * ```
 */
export const createEventPoap = new PreparedQuery<ICreateEventPoapParams,ICreateEventPoapResult>(createEventPoapIR);


