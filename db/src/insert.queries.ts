/** Types generated for queries found in "src/insert.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

/** 'CreateIssuer' parameters type */
export interface ICreateIssuerParams {
  address: string;
  email: string;
  issuerUuid: string;
  name: string;
  organization: string;
}

/** 'CreateIssuer' return type */
export type ICreateIssuerResult = void;

/** 'CreateIssuer' query type */
export interface ICreateIssuerQuery {
  params: ICreateIssuerParams;
  result: ICreateIssuerResult;
}

const createIssuerIR: any = {"usedParamSet":{"issuerUuid":true,"address":true,"name":true,"email":true,"organization":true},"params":[{"name":"issuerUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":126,"b":137}]},{"name":"address","required":true,"transform":{"type":"scalar"},"locs":[{"a":192,"b":200}]},{"name":"name","required":true,"transform":{"type":"scalar"},"locs":[{"a":205,"b":210}]},{"name":"email","required":true,"transform":{"type":"scalar"},"locs":[{"a":215,"b":221}]},{"name":"organization","required":true,"transform":{"type":"scalar"},"locs":[{"a":226,"b":239}]}],"statement":"INSERT INTO issuers(\n  \"issuerUuid\",\n  \"issuerIdInContract\",\n  \"address\",\n  \"name\",\n  \"email\",\n  \"organization\"\n) \nVALUES (\n  :issuerUuid!,\n  DEFAULT, -- Automatically assigned SERIAL value\n  :address!,\n  :name!,\n  :email!,\n  :organization!\n)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO issuers(
 *   "issuerUuid",
 *   "issuerIdInContract",
 *   "address",
 *   "name",
 *   "email",
 *   "organization"
 * ) 
 * VALUES (
 *   :issuerUuid!,
 *   DEFAULT, -- Automatically assigned SERIAL value
 *   :address!,
 *   :name!,
 *   :email!,
 *   :organization!
 * )
 * ```
 */
export const createIssuer = new PreparedQuery<ICreateIssuerParams,ICreateIssuerResult>(createIssuerIR);


/** 'CreateEvent' parameters type */
export interface ICreateEventParams {
  city: string;
  country: string;
  description: string;
  email: string;
  eventUrl?: string | null | void;
  eventUuid: string;
  expiryDate: DateOrString;
  issuerUuid: string;
  poapsToBeMinted: number;
  requestedCodes: number;
  title: string;
}

/** 'CreateEvent' return type */
export type ICreateEventResult = void;

/** 'CreateEvent' query type */
export interface ICreateEventQuery {
  params: ICreateEventParams;
  result: ICreateEventResult;
}

const createEventIR: any = {"usedParamSet":{"eventUuid":true,"issuerUuid":true,"title":true,"description":true,"city":true,"country":true,"expiryDate":true,"eventUrl":true,"email":true,"requestedCodes":true,"poapsToBeMinted":true},"params":[{"name":"eventUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":428,"b":438}]},{"name":"issuerUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":443,"b":454}]},{"name":"title","required":true,"transform":{"type":"scalar"},"locs":[{"a":459,"b":465}]},{"name":"description","required":true,"transform":{"type":"scalar"},"locs":[{"a":470,"b":482}]},{"name":"city","required":true,"transform":{"type":"scalar"},"locs":[{"a":487,"b":492}]},{"name":"country","required":true,"transform":{"type":"scalar"},"locs":[{"a":497,"b":505}]},{"name":"expiryDate","required":true,"transform":{"type":"scalar"},"locs":[{"a":549,"b":560}]},{"name":"eventUrl","required":false,"transform":{"type":"scalar"},"locs":[{"a":593,"b":601}]},{"name":"email","required":true,"transform":{"type":"scalar"},"locs":[{"a":658,"b":664}]},{"name":"requestedCodes","required":true,"transform":{"type":"scalar"},"locs":[{"a":669,"b":684}]},{"name":"poapsToBeMinted","required":true,"transform":{"type":"scalar"},"locs":[{"a":753,"b":769}]}],"statement":"INSERT INTO events(\n  \"eventUuid\",\n  \"issuerUuid\",\n  \"title\",\n  \"description\",\n  \"city\",\n  \"country\",\n  \"startDate\",\n  \"endDate\",\n  \"expiryDate\",\n  \"year\",\n  \"eventUrl\",\n  \"virtualEvent\",\n  \"image\",\n  \"secretCode\",\n  \"eventTemplateId\",\n  \"email\",\n  \"requestedCodes\",\n  \"privateEvent\",\n  \"purpose\",\n  \"platform\",\n  \"eventType\",\n  \"amountOfAttendees\",\n  \"account\",\n  \"poapType\",\n  \"poapsToBeMinted\",\n  \"mintedPoaps\"\n) \nVALUES (\n  :eventUuid!,\n  :issuerUuid!,\n  :title!,\n  :description!,\n  :city!,\n  :country!,\n  now(),\n  now() + INTERVAL '30 days',\n  :expiryDate!,\n  EXTRACT(YEAR FROM now()),\n  :eventUrl,\n  FALSE,\n  'default-image-url.jpg',\n  NULL,\n  NULL,\n  :email!,\n  :requestedCodes!,\n  FALSE,\n  NULL,\n  NULL,\n  'Unknown',\n  NULL,\n  NULL,\n  'poap',\n  :poapsToBeMinted!,\n  0\n)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO events(
 *   "eventUuid",
 *   "issuerUuid",
 *   "title",
 *   "description",
 *   "city",
 *   "country",
 *   "startDate",
 *   "endDate",
 *   "expiryDate",
 *   "year",
 *   "eventUrl",
 *   "virtualEvent",
 *   "image",
 *   "secretCode",
 *   "eventTemplateId",
 *   "email",
 *   "requestedCodes",
 *   "privateEvent",
 *   "purpose",
 *   "platform",
 *   "eventType",
 *   "amountOfAttendees",
 *   "account",
 *   "poapType",
 *   "poapsToBeMinted",
 *   "mintedPoaps"
 * ) 
 * VALUES (
 *   :eventUuid!,
 *   :issuerUuid!,
 *   :title!,
 *   :description!,
 *   :city!,
 *   :country!,
 *   now(),
 *   now() + INTERVAL '30 days',
 *   :expiryDate!,
 *   EXTRACT(YEAR FROM now()),
 *   :eventUrl,
 *   FALSE,
 *   'default-image-url.jpg',
 *   NULL,
 *   NULL,
 *   :email!,
 *   :requestedCodes!,
 *   FALSE,
 *   NULL,
 *   NULL,
 *   'Unknown',
 *   NULL,
 *   NULL,
 *   'poap',
 *   :poapsToBeMinted!,
 *   0
 * )
 * ```
 */
export const createEvent = new PreparedQuery<ICreateEventParams,ICreateEventResult>(createEventIR);


/** 'CreatePoap' parameters type */
export interface ICreatePoapParams {
  instance: number;
  ownerUuid: string;
  poapUuid: string;
}

/** 'CreatePoap' return type */
export type ICreatePoapResult = void;

/** 'CreatePoap' query type */
export interface ICreatePoapQuery {
  params: ICreatePoapParams;
  result: ICreatePoapResult;
}

const createPoapIR: any = {"usedParamSet":{"poapUuid":true,"instance":true,"ownerUuid":true},"params":[{"name":"poapUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":105,"b":114}]},{"name":"instance","required":true,"transform":{"type":"scalar"},"locs":[{"a":119,"b":128}]},{"name":"ownerUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":133,"b":143}]}],"statement":"INSERT INTO poaps(\n  \"poapUuid\",\n  \"instance\",\n  \"ownerUuid\",\n  \"createdAt\",\n  \"updatedAt\"\n) \nVALUES (\n  :poapUuid!,\n  :instance!,\n  :ownerUuid!,\n  now(),\n  now()\n)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO poaps(
 *   "poapUuid",
 *   "instance",
 *   "ownerUuid",
 *   "createdAt",
 *   "updatedAt"
 * ) 
 * VALUES (
 *   :poapUuid!,
 *   :instance!,
 *   :ownerUuid!,
 *   now(),
 *   now()
 * )
 * ```
 */
export const createPoap = new PreparedQuery<ICreatePoapParams,ICreatePoapResult>(createPoapIR);


/** 'CreateOwner' parameters type */
export interface ICreateOwnerParams {
  address: string;
  email?: string | null | void;
  ownerUuid: string;
}

/** 'CreateOwner' return type */
export type ICreateOwnerResult = void;

/** 'CreateOwner' query type */
export interface ICreateOwnerQuery {
  params: ICreateOwnerParams;
  result: ICreateOwnerResult;
}

const createOwnerIR: any = {"usedParamSet":{"ownerUuid":true,"email":true,"address":true},"params":[{"name":"ownerUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":102,"b":112}]},{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":117,"b":122}]},{"name":"address","required":true,"transform":{"type":"scalar"},"locs":[{"a":127,"b":135}]}],"statement":"INSERT INTO owners(\n  \"ownerUuid\",\n  \"email\",\n  \"address\",\n  \"createdAt\",\n  \"updatedAt\"\n) \nVALUES (\n  :ownerUuid!,\n  :email,\n  :address!,\n  now(),\n  now()\n)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO owners(
 *   "ownerUuid",
 *   "email",
 *   "address",
 *   "createdAt",
 *   "updatedAt"
 * ) 
 * VALUES (
 *   :ownerUuid!,
 *   :email,
 *   :address!,
 *   now(),
 *   now()
 * )
 * ```
 */
export const createOwner = new PreparedQuery<ICreateOwnerParams,ICreateOwnerResult>(createOwnerIR);


/** 'CreateEventPoap' parameters type */
export interface ICreateEventPoapParams {
  eventUuid: string;
  poapUuid: string;
  relationUuid: string;
}

/** 'CreateEventPoap' return type */
export type ICreateEventPoapResult = void;

/** 'CreateEventPoap' query type */
export interface ICreateEventPoapQuery {
  params: ICreateEventPoapParams;
  result: ICreateEventPoapResult;
}

const createEventPoapIR: any = {"usedParamSet":{"relationUuid":true,"poapUuid":true,"eventUuid":true},"params":[{"name":"relationUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":114,"b":127}]},{"name":"poapUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":132,"b":141}]},{"name":"eventUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":146,"b":156}]}],"statement":"INSERT INTO eventPoaps(\n  \"relationUuid\",\n  \"poapUuid\",\n  \"eventUuid\",\n  \"createdAt\",\n  \"updatedAt\"\n) \nVALUES (\n  :relationUuid!,\n  :poapUuid!,\n  :eventUuid!,\n  now(),\n  now()\n)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO eventPoaps(
 *   "relationUuid",
 *   "poapUuid",
 *   "eventUuid",
 *   "createdAt",
 *   "updatedAt"
 * ) 
 * VALUES (
 *   :relationUuid!,
 *   :poapUuid!,
 *   :eventUuid!,
 *   now(),
 *   now()
 * )
 * ```
 */
export const createEventPoap = new PreparedQuery<ICreateEventPoapParams,ICreateEventPoapResult>(createEventPoapIR);


