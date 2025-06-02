/** Types generated for queries found in "src/select.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetAllEventPoaps' parameters type */
export type IGetAllEventPoapsParams = void;

/** 'GetAllEventPoaps' return type */
export interface IGetAllEventPoapsResult {
  createdAt: Date | null;
  eventUuid: string;
  poapUuid: string;
  relationUuid: string;
  updatedAt: Date | null;
}

/** 'GetAllEventPoaps' query type */
export interface IGetAllEventPoapsQuery {
  params: IGetAllEventPoapsParams;
  result: IGetAllEventPoapsResult;
}

const getAllEventPoapsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT \"relationUuid\",\n  \"poapUuid\",\n  \"eventUuid\",\n  \"createdAt\",\n  \"updatedAt\"\nFROM eventpoaps"};

/**
 * Query generated from SQL:
 * ```
 * SELECT "relationUuid",
 *   "poapUuid",
 *   "eventUuid",
 *   "createdAt",
 *   "updatedAt"
 * FROM eventpoaps
 * ```
 */
export const getAllEventPoaps = new PreparedQuery<IGetAllEventPoapsParams,IGetAllEventPoapsResult>(getAllEventPoapsIR);


/** 'GetAllIssuers' parameters type */
export type IGetAllIssuersParams = void;

/** 'GetAllIssuers' return type */
export interface IGetAllIssuersResult {
  address: string;
  createdAt: Date | null;
  email: string;
  issuerIdInContract: number;
  issuerUuid: string;
  name: string;
  organization: string;
  updatedAt: Date | null;
}

/** 'GetAllIssuers' query type */
export interface IGetAllIssuersQuery {
  params: IGetAllIssuersParams;
  result: IGetAllIssuersResult;
}

const getAllIssuersIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT *\nFROM issuers"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM issuers
 * ```
 */
export const getAllIssuers = new PreparedQuery<IGetAllIssuersParams,IGetAllIssuersResult>(getAllIssuersIR);


/** 'GetAllEvents' parameters type */
export type IGetAllEventsParams = void;

/** 'GetAllEvents' return type */
export interface IGetAllEventsResult {
  account: string | null;
  amountOfAttendees: number | null;
  approved: string;
  city: string | null;
  country: string | null;
  createdAt: Date | null;
  description: string;
  email: string;
  endDate: Date | null;
  eventIdInContract: number;
  eventTemplateId: string | null;
  eventType: string;
  eventUrl: string | null;
  eventUuid: string;
  expiryDate: Date | null;
  image: string;
  issuerIdInContract: number;
  issuerUuid: string;
  mintedPoaps: number;
  platform: string | null;
  poapsToBeMinted: number;
  poapType: string;
  privateEvent: boolean;
  purpose: string | null;
  requestedCodes: number;
  secretCode: string | null;
  startDate: Date;
  title: string;
  updatedAt: Date | null;
  virtualEvent: boolean;
  year: number | null;
}

/** 'GetAllEvents' query type */
export interface IGetAllEventsQuery {
  params: IGetAllEventsParams;
  result: IGetAllEventsResult;
}

const getAllEventsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT \n  events.*,\n  issuers.\"issuerIdInContract\"\nFROM events\nJOIN issuers ON events.\"issuerUuid\" = issuers.\"issuerUuid\""};

/**
 * Query generated from SQL:
 * ```
 * SELECT 
 *   events.*,
 *   issuers."issuerIdInContract"
 * FROM events
 * JOIN issuers ON events."issuerUuid" = issuers."issuerUuid"
 * ```
 */
export const getAllEvents = new PreparedQuery<IGetAllEventsParams,IGetAllEventsResult>(getAllEventsIR);


/** 'GetAllPoaps' parameters type */
export type IGetAllPoapsParams = void;

/** 'GetAllPoaps' return type */
export interface IGetAllPoapsResult {
  createdAt: Date | null;
  instance: number;
  ownerUuid: string;
  poapUuid: string;
  updatedAt: Date | null;
}

/** 'GetAllPoaps' query type */
export interface IGetAllPoapsQuery {
  params: IGetAllPoapsParams;
  result: IGetAllPoapsResult;
}

const getAllPoapsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT *\nFROM poaps"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM poaps
 * ```
 */
export const getAllPoaps = new PreparedQuery<IGetAllPoapsParams,IGetAllPoapsResult>(getAllPoapsIR);


/** 'GetLastEvent' parameters type */
export type IGetLastEventParams = void;

/** 'GetLastEvent' return type */
export interface IGetLastEventResult {
  account: string | null;
  amountOfAttendees: number | null;
  approved: string;
  city: string | null;
  country: string | null;
  createdAt: Date | null;
  description: string;
  email: string;
  endDate: Date | null;
  eventIdInContract: number;
  eventTemplateId: string | null;
  eventType: string;
  eventUrl: string | null;
  eventUuid: string;
  expiryDate: Date | null;
  image: string;
  issuerUuid: string;
  mintedPoaps: number;
  platform: string | null;
  poapsToBeMinted: number;
  poapType: string;
  privateEvent: boolean;
  purpose: string | null;
  requestedCodes: number;
  secretCode: string | null;
  startDate: Date;
  title: string;
  updatedAt: Date | null;
  virtualEvent: boolean;
  year: number | null;
}

/** 'GetLastEvent' query type */
export interface IGetLastEventQuery {
  params: IGetLastEventParams;
  result: IGetLastEventResult;
}

const getLastEventIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT *\nFROM events\nWHERE \"eventUuid\" = (\n  SELECT \"eventUuid\"\n  FROM events\n  ORDER BY \"createdAt\" DESC\n  LIMIT 1\n)"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM events
 * WHERE "eventUuid" = (
 *   SELECT "eventUuid"
 *   FROM events
 *   ORDER BY "createdAt" DESC
 *   LIMIT 1
 * )
 * ```
 */
export const getLastEvent = new PreparedQuery<IGetLastEventParams,IGetLastEventResult>(getLastEventIR);


/** 'GetAllOwners' parameters type */
export type IGetAllOwnersParams = void;

/** 'GetAllOwners' return type */
export interface IGetAllOwnersResult {
  address: string | null;
  createdAt: Date | null;
  email: string | null;
  ownerUuid: string;
  updatedAt: Date | null;
}

/** 'GetAllOwners' query type */
export interface IGetAllOwnersQuery {
  params: IGetAllOwnersParams;
  result: IGetAllOwnersResult;
}

const getAllOwnersIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT *\nFROM owners"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM owners
 * ```
 */
export const getAllOwners = new PreparedQuery<IGetAllOwnersParams,IGetAllOwnersResult>(getAllOwnersIR);


/** 'GetEventPoapByEventUuid' parameters type */
export interface IGetEventPoapByEventUuidParams {
  eventUuid?: string | null | void;
}

/** 'GetEventPoapByEventUuid' return type */
export interface IGetEventPoapByEventUuidResult {
  createdAt: Date | null;
  eventUuid: string;
  poapUuid: string;
  relationUuid: string;
  updatedAt: Date | null;
}

/** 'GetEventPoapByEventUuid' query type */
export interface IGetEventPoapByEventUuidQuery {
  params: IGetEventPoapByEventUuidParams;
  result: IGetEventPoapByEventUuidResult;
}

const getEventPoapByEventUuidIR: any = {"usedParamSet":{"eventUuid":true},"params":[{"name":"eventUuid","required":false,"transform":{"type":"scalar"},"locs":[{"a":119,"b":128}]}],"statement":"SELECT \"relationUuid\",\n  \"poapUuid\",\n  \"eventUuid\",\n  \"createdAt\",\n  \"updatedAt\"\nFROM \"eventpoaps\"\nWHERE \"eventUuid\" = :eventUuid"};

/**
 * Query generated from SQL:
 * ```
 * SELECT "relationUuid",
 *   "poapUuid",
 *   "eventUuid",
 *   "createdAt",
 *   "updatedAt"
 * FROM "eventpoaps"
 * WHERE "eventUuid" = :eventUuid
 * ```
 */
export const getEventPoapByEventUuid = new PreparedQuery<IGetEventPoapByEventUuidParams,IGetEventPoapByEventUuidResult>(getEventPoapByEventUuidIR);


/** 'GetAllOwnersAndPoaps' parameters type */
export type IGetAllOwnersAndPoapsParams = void;

/** 'GetAllOwnersAndPoaps' return type */
export interface IGetAllOwnersAndPoapsResult {
  address: string | null;
  createdAt: Date | null;
  email: string | null;
  ownerUuid: string;
  "Poap.createdAt": Date | null;
  "Poap.instance": number;
  "Poap.poapUuid": string;
  "Poap.updatedAt": Date | null;
  updatedAt: Date | null;
}

/** 'GetAllOwnersAndPoaps' query type */
export interface IGetAllOwnersAndPoapsQuery {
  params: IGetAllOwnersAndPoapsParams;
  result: IGetAllOwnersAndPoapsResult;
}

const getAllOwnersAndPoapsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT \n  \"Owner\".\"ownerUuid\", \n  \"Owner\".\"address\", \n  \"Owner\".\"email\", \n  \"Owner\".\"createdAt\", \n  \"Owner\".\"updatedAt\", \n  \"Poap\".\"poapUuid\" AS \"Poap.poapUuid\", \n  \"Poap\".\"instance\" AS \"Poap.instance\", \n  \"Poap\".\"createdAt\" AS \"Poap.createdAt\", \n  \"Poap\".\"updatedAt\" AS \"Poap.updatedAt\"\nFROM \"owners\" AS \"Owner\"\nLEFT OUTER JOIN \"poaps\" AS \"Poap\" \nON \"Owner\".\"ownerUuid\" = \"Poap\".\"ownerUuid\""};

/**
 * Query generated from SQL:
 * ```
 * SELECT 
 *   "Owner"."ownerUuid", 
 *   "Owner"."address", 
 *   "Owner"."email", 
 *   "Owner"."createdAt", 
 *   "Owner"."updatedAt", 
 *   "Poap"."poapUuid" AS "Poap.poapUuid", 
 *   "Poap"."instance" AS "Poap.instance", 
 *   "Poap"."createdAt" AS "Poap.createdAt", 
 *   "Poap"."updatedAt" AS "Poap.updatedAt"
 * FROM "owners" AS "Owner"
 * LEFT OUTER JOIN "poaps" AS "Poap" 
 * ON "Owner"."ownerUuid" = "Poap"."ownerUuid"
 * ```
 */
export const getAllOwnersAndPoaps = new PreparedQuery<IGetAllOwnersAndPoapsParams,IGetAllOwnersAndPoapsResult>(getAllOwnersAndPoapsIR);


/** 'GetOwnerPoaps' parameters type */
export interface IGetOwnerPoapsParams {
  address: string;
}

/** 'GetOwnerPoaps' return type */
export interface IGetOwnerPoapsResult {
  account: string | null;
  amountOfAttendees: number | null;
  approved: string;
  city: string | null;
  country: string | null;
  createdAt: Date | null;
  description: string;
  email: string;
  endDate: Date | null;
  eventIdInContract: number;
  eventTemplateId: string | null;
  eventType: string;
  eventUrl: string | null;
  eventUuid: string;
  expiryDate: Date | null;
  image: string;
  instance: number;
  issuerUuid: string;
  mintedPoaps: number;
  platform: string | null;
  poapcreatedat: Date | null;
  poapsToBeMinted: number;
  poapType: string;
  poapUuid: string;
  privateEvent: boolean;
  purpose: string | null;
  relationcreatedat: Date | null;
  relationUuid: string;
  requestedCodes: number;
  secretCode: string | null;
  startDate: Date;
  title: string;
  updatedAt: Date | null;
  virtualEvent: boolean;
  year: number | null;
}

/** 'GetOwnerPoaps' query type */
export interface IGetOwnerPoapsQuery {
  params: IGetOwnerPoapsParams;
  result: IGetOwnerPoapsResult;
}

const getOwnerPoapsIR: any = {"usedParamSet":{"address":true},"params":[{"name":"address","required":true,"transform":{"type":"scalar"},"locs":[{"a":381,"b":390}]}],"statement":"SELECT poaps.\"poapUuid\",\n  poaps.instance,\n  poaps.\"createdAt\" AS poapCreatedAt,\n  eventpoaps.\"relationUuid\",\n  eventpoaps.\"createdAt\" AS relationCreatedAt,\n  events.*\nFROM owners\n  JOIN poaps ON owners.\"ownerUuid\" = poaps.\"ownerUuid\"\n  JOIN eventpoaps ON poaps.\"poapUuid\" = eventpoaps.\"poapUuid\"\n  JOIN events ON eventpoaps.\"eventUuid\" = events.\"eventUuid\"\nWHERE owners.address = :address !"};

/**
 * Query generated from SQL:
 * ```
 * SELECT poaps."poapUuid",
 *   poaps.instance,
 *   poaps."createdAt" AS poapCreatedAt,
 *   eventpoaps."relationUuid",
 *   eventpoaps."createdAt" AS relationCreatedAt,
 *   events.*
 * FROM owners
 *   JOIN poaps ON owners."ownerUuid" = poaps."ownerUuid"
 *   JOIN eventpoaps ON poaps."poapUuid" = eventpoaps."poapUuid"
 *   JOIN events ON eventpoaps."eventUuid" = events."eventUuid"
 * WHERE owners.address = :address !
 * ```
 */
export const getOwnerPoaps = new PreparedQuery<IGetOwnerPoapsParams,IGetOwnerPoapsResult>(getOwnerPoapsIR);


/** 'GetIssuerByAddress' parameters type */
export interface IGetIssuerByAddressParams {
  address: string;
}

/** 'GetIssuerByAddress' return type */
export interface IGetIssuerByAddressResult {
  address: string;
  createdAt: Date | null;
  email: string;
  issuerIdInContract: number;
  issuerUuid: string;
  name: string;
  organization: string;
  updatedAt: Date | null;
}

/** 'GetIssuerByAddress' query type */
export interface IGetIssuerByAddressQuery {
  params: IGetIssuerByAddressParams;
  result: IGetIssuerByAddressResult;
}

const getIssuerByAddressIR: any = {"usedParamSet":{"address":true},"params":[{"name":"address","required":true,"transform":{"type":"scalar"},"locs":[{"a":40,"b":48}]}],"statement":"SELECT * FROM issuers\nWHERE \"address\" = :address!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM issuers
 * WHERE "address" = :address!
 * ```
 */
export const getIssuerByAddress = new PreparedQuery<IGetIssuerByAddressParams,IGetIssuerByAddressResult>(getIssuerByAddressIR);


/** 'GetIssuerByUuid' parameters type */
export interface IGetIssuerByUuidParams {
  issuerUuid: string;
}

/** 'GetIssuerByUuid' return type */
export interface IGetIssuerByUuidResult {
  address: string;
  createdAt: Date | null;
  email: string;
  issuerIdInContract: number;
  issuerUuid: string;
  name: string;
  organization: string;
  updatedAt: Date | null;
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


/** 'GetOwnerByAddress' parameters type */
export interface IGetOwnerByAddressParams {
  address: string;
}

/** 'GetOwnerByAddress' return type */
export interface IGetOwnerByAddressResult {
  address: string | null;
  createdAt: Date | null;
  email: string | null;
  ownerUuid: string;
  updatedAt: Date | null;
}

/** 'GetOwnerByAddress' query type */
export interface IGetOwnerByAddressQuery {
  params: IGetOwnerByAddressParams;
  result: IGetOwnerByAddressResult;
}

const getOwnerByAddressIR: any = {"usedParamSet":{"address":true},"params":[{"name":"address","required":true,"transform":{"type":"scalar"},"locs":[{"a":39,"b":47}]}],"statement":"SELECT * FROM owners\nWHERE \"address\" = :address!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM owners
 * WHERE "address" = :address!
 * ```
 */
export const getOwnerByAddress = new PreparedQuery<IGetOwnerByAddressParams,IGetOwnerByAddressResult>(getOwnerByAddressIR);


/** 'GetOwnerByUuid' parameters type */
export interface IGetOwnerByUuidParams {
  ownerUuid: string;
}

/** 'GetOwnerByUuid' return type */
export interface IGetOwnerByUuidResult {
  address: string | null;
  createdAt: Date | null;
  email: string | null;
  ownerUuid: string;
  updatedAt: Date | null;
}

/** 'GetOwnerByUuid' query type */
export interface IGetOwnerByUuidQuery {
  params: IGetOwnerByUuidParams;
  result: IGetOwnerByUuidResult;
}

const getOwnerByUuidIR: any = {"usedParamSet":{"ownerUuid":true},"params":[{"name":"ownerUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":41,"b":51}]}],"statement":"SELECT * FROM owners\nWHERE \"ownerUuid\" = :ownerUuid!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM owners
 * WHERE "ownerUuid" = :ownerUuid!
 * ```
 */
export const getOwnerByUuid = new PreparedQuery<IGetOwnerByUuidParams,IGetOwnerByUuidResult>(getOwnerByUuidIR);


