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
  eventTemplateId: string | null;
  eventType: string;
  eventUrl: string | null;
  eventUuid: string;
  expiryDate: Date | null;
  idInContract: number;
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

/** 'GetAllEvents' query type */
export interface IGetAllEventsQuery {
  params: IGetAllEventsParams;
  result: IGetAllEventsResult;
}

const getAllEventsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT *\nFROM events"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM events
 * ```
 */
export const getAllEvents = new PreparedQuery<IGetAllEventsParams,IGetAllEventsResult>(getAllEventsIR);


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
  eventTemplateId: string | null;
  eventType: string;
  eventUrl: string | null;
  eventUuid: string;
  expiryDate: Date | null;
  idInContract: number;
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

/** 'GetOwnerPoaps' query type */
export interface IGetOwnerPoapsQuery {
  params: IGetOwnerPoapsParams;
  result: IGetOwnerPoapsResult;
}

const getOwnerPoapsIR: any = {"usedParamSet":{"address":true},"params":[{"name":"address","required":true,"transform":{"type":"scalar"},"locs":[{"a":418,"b":426}]}],"statement":"SELECT \n  \"Owner\".\"ownerUuid\", \n  \"Owner\".\"address\", \n  \"Owner\".\"email\", \n  \"Owner\".\"createdAt\", \n  \"Owner\".\"updatedAt\", \n  \"Poap\".\"poapUuid\" AS \"Poap.poapUuid\", \n  \"Poap\".\"instance\" AS \"Poap.instance\", \n  \"Poap\".\"createdAt\" AS \"Poap.createdAt\", \n  \"Poap\".\"updatedAt\" AS \"Poap.updatedAt\"\nFROM \"owners\" AS \"Owner\"\nLEFT OUTER JOIN \"poaps\" AS \"Poap\" \nON \"Owner\".\"ownerUuid\" = \"Poap\".\"ownerUuid\"\nWHERE \"Owner\".\"address\" = :address!"};

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
 * WHERE "Owner"."address" = :address!
 * ```
 */
export const getOwnerPoaps = new PreparedQuery<IGetOwnerPoapsParams,IGetOwnerPoapsResult>(getOwnerPoapsIR);


