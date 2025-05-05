/** Types generated for queries found in "src/insert.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

/** 'CreateIssuer' parameters type */
export interface ICreateIssuerParams {
  address: string;
  email: string;
  name: string;
  organization: string;
}

/** 'CreateIssuer' return type */
export interface ICreateIssuerResult {
  address: string;
  createdAt: Date | null;
  email: string;
  issuerIdInContract: number;
  issuerUuid: string;
  name: string;
  organization: string;
  updatedAt: Date | null;
}

/** 'CreateIssuer' query type */
export interface ICreateIssuerQuery {
  params: ICreateIssuerParams;
  result: ICreateIssuerResult;
}

const createIssuerIR: any = {"usedParamSet":{"address":true,"name":true,"email":true,"organization":true},"params":[{"name":"address","required":true,"transform":{"type":"scalar"},"locs":[{"a":100,"b":109}]},{"name":"name","required":true,"transform":{"type":"scalar"},"locs":[{"a":116,"b":122}]},{"name":"email","required":true,"transform":{"type":"scalar"},"locs":[{"a":129,"b":136}]},{"name":"organization","required":true,"transform":{"type":"scalar"},"locs":[{"a":143,"b":157}]}],"statement":"INSERT INTO \"issuers\" (\n    \"address\",\n    \"name\",\n    \"email\",\n    \"organization\"\n  )\nVALUES (\n    :address !,\n    :name !,\n    :email !,\n    :organization !\n  )\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "issuers" (
 *     "address",
 *     "name",
 *     "email",
 *     "organization"
 *   )
 * VALUES (
 *     :address !,
 *     :name !,
 *     :email !,
 *     :organization !
 *   )
 * RETURNING *
 * ```
 */
export const createIssuer = new PreparedQuery<ICreateIssuerParams,ICreateIssuerResult>(createIssuerIR);


/** 'CreateEvent' parameters type */
export interface ICreateEventParams {
  account?: string | null | void;
  amountOfAttendees?: number | null | void;
  city?: string | null | void;
  country?: string | null | void;
  description: string;
  email: string;
  endDate: DateOrString;
  eventTemplateId?: string | null | void;
  eventType: string;
  eventUrl?: string | null | void;
  expiryDate: DateOrString;
  image: string;
  issuerUuid: string;
  platform?: string | null | void;
  poapsToBeMinted: number;
  poapType: string;
  privateEvent: boolean;
  purpose?: string | null | void;
  requestedCodes: number;
  secretCode?: string | null | void;
  startDate: DateOrString;
  title: string;
  virtualEvent: boolean;
  year: number;
}

/** 'CreateEvent' return type */
export interface ICreateEventResult {
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

/** 'CreateEvent' query type */
export interface ICreateEventQuery {
  params: ICreateEventParams;
  result: ICreateEventResult;
}

const createEventIR: any = {"usedParamSet":{"title":true,"description":true,"city":true,"country":true,"startDate":true,"endDate":true,"expiryDate":true,"year":true,"eventUrl":true,"virtualEvent":true,"image":true,"secretCode":true,"eventTemplateId":true,"email":true,"requestedCodes":true,"privateEvent":true,"purpose":true,"platform":true,"eventType":true,"amountOfAttendees":true,"account":true,"poapType":true,"poapsToBeMinted":true,"issuerUuid":true},"params":[{"name":"title","required":true,"transform":{"type":"scalar"},"locs":[{"a":585,"b":592}]},{"name":"description","required":true,"transform":{"type":"scalar"},"locs":[{"a":597,"b":610}]},{"name":"city","required":false,"transform":{"type":"scalar"},"locs":[{"a":615,"b":619}]},{"name":"country","required":false,"transform":{"type":"scalar"},"locs":[{"a":624,"b":631}]},{"name":"startDate","required":true,"transform":{"type":"scalar"},"locs":[{"a":636,"b":647}]},{"name":"endDate","required":true,"transform":{"type":"scalar"},"locs":[{"a":652,"b":661}]},{"name":"expiryDate","required":true,"transform":{"type":"scalar"},"locs":[{"a":666,"b":678}]},{"name":"year","required":true,"transform":{"type":"scalar"},"locs":[{"a":683,"b":689}]},{"name":"eventUrl","required":false,"transform":{"type":"scalar"},"locs":[{"a":694,"b":702}]},{"name":"virtualEvent","required":true,"transform":{"type":"scalar"},"locs":[{"a":707,"b":721}]},{"name":"image","required":true,"transform":{"type":"scalar"},"locs":[{"a":726,"b":733}]},{"name":"secretCode","required":false,"transform":{"type":"scalar"},"locs":[{"a":738,"b":748}]},{"name":"eventTemplateId","required":false,"transform":{"type":"scalar"},"locs":[{"a":753,"b":768}]},{"name":"email","required":true,"transform":{"type":"scalar"},"locs":[{"a":773,"b":780}]},{"name":"requestedCodes","required":true,"transform":{"type":"scalar"},"locs":[{"a":785,"b":801}]},{"name":"privateEvent","required":true,"transform":{"type":"scalar"},"locs":[{"a":806,"b":820}]},{"name":"purpose","required":false,"transform":{"type":"scalar"},"locs":[{"a":825,"b":832}]},{"name":"platform","required":false,"transform":{"type":"scalar"},"locs":[{"a":837,"b":845}]},{"name":"eventType","required":true,"transform":{"type":"scalar"},"locs":[{"a":850,"b":861}]},{"name":"amountOfAttendees","required":false,"transform":{"type":"scalar"},"locs":[{"a":866,"b":883}]},{"name":"account","required":false,"transform":{"type":"scalar"},"locs":[{"a":888,"b":895}]},{"name":"poapType","required":true,"transform":{"type":"scalar"},"locs":[{"a":900,"b":910}]},{"name":"poapsToBeMinted","required":true,"transform":{"type":"scalar"},"locs":[{"a":915,"b":932}]},{"name":"issuerUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":1044,"b":1056}]}],"statement":"INSERT INTO \"events\" (\n  \"eventUuid\",\n  \"eventIdInContract\",\n  \"title\",\n  \"description\",\n  \"city\",\n  \"country\",\n  \"startDate\",\n  \"endDate\",\n  \"expiryDate\",\n  \"year\",\n  \"eventUrl\",\n  \"virtualEvent\",\n  \"image\",\n  \"secretCode\",\n  \"eventTemplateId\",\n  \"email\",\n  \"requestedCodes\",\n  \"privateEvent\",\n  \"purpose\",\n  \"platform\",\n  \"eventType\",\n  \"amountOfAttendees\",\n  \"account\",\n  \"poapType\",\n  \"poapsToBeMinted\",\n  \"mintedPoaps\",\n  \"approved\",\n  \"createdAt\",\n  \"updatedAt\",\n  \"issuerUuid\"\n)\nVALUES (\n  DEFAULT,  -- eventUuid (uses uuid_generate_v4())\n  DEFAULT,  -- idInContract (SERIAL)\n  :title !,\n  :description !,\n  :city,\n  :country,\n  :startDate !,\n  :endDate !,\n  :expiryDate !,\n  :year !,\n  :eventUrl,\n  :virtualEvent !,\n  :image !,\n  :secretCode,\n  :eventTemplateId,\n  :email !,\n  :requestedCodes !,\n  :privateEvent !,\n  :purpose,\n  :platform,\n  :eventType !,\n  :amountOfAttendees,\n  :account,\n  :poapType !,\n  :poapsToBeMinted !,\n  0,\n  'Pending',  -- approved (default)\n  DEFAULT,  -- createdAt (now())\n  DEFAULT,  -- updatedAt (now())\n  :issuerUuid !-- existing issuerUuid\n)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "events" (
 *   "eventUuid",
 *   "eventIdInContract",
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
 *   "mintedPoaps",
 *   "approved",
 *   "createdAt",
 *   "updatedAt",
 *   "issuerUuid"
 * )
 * VALUES (
 *   DEFAULT,  -- eventUuid (uses uuid_generate_v4())
 *   DEFAULT,  -- idInContract (SERIAL)
 *   :title !,
 *   :description !,
 *   :city,
 *   :country,
 *   :startDate !,
 *   :endDate !,
 *   :expiryDate !,
 *   :year !,
 *   :eventUrl,
 *   :virtualEvent !,
 *   :image !,
 *   :secretCode,
 *   :eventTemplateId,
 *   :email !,
 *   :requestedCodes !,
 *   :privateEvent !,
 *   :purpose,
 *   :platform,
 *   :eventType !,
 *   :amountOfAttendees,
 *   :account,
 *   :poapType !,
 *   :poapsToBeMinted !,
 *   0,
 *   'Pending',  -- approved (default)
 *   DEFAULT,  -- createdAt (now())
 *   DEFAULT,  -- updatedAt (now())
 *   :issuerUuid !-- existing issuerUuid
 * )
 * RETURNING *
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

const createPoapIR: any = {"usedParamSet":{"poapUuid":true,"instance":true,"ownerUuid":true},"params":[{"name":"poapUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":118,"b":128}]},{"name":"instance","required":true,"transform":{"type":"scalar"},"locs":[{"a":135,"b":145}]},{"name":"ownerUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":152,"b":163}]}],"statement":"INSERT INTO poaps(\n    \"poapUuid\",\n    \"instance\",\n    \"ownerUuid\",\n    \"createdAt\",\n    \"updatedAt\"\n  )\nVALUES (\n    :poapUuid !,\n    :instance !,\n    :ownerUuid !,\n    now(),\n    now()\n  )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO poaps(
 *     "poapUuid",
 *     "instance",
 *     "ownerUuid",
 *     "createdAt",
 *     "updatedAt"
 *   )
 * VALUES (
 *     :poapUuid !,
 *     :instance !,
 *     :ownerUuid !,
 *     now(),
 *     now()
 *   )
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

const createOwnerIR: any = {"usedParamSet":{"ownerUuid":true,"email":true,"address":true},"params":[{"name":"ownerUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":115,"b":126}]},{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":133,"b":138}]},{"name":"address","required":true,"transform":{"type":"scalar"},"locs":[{"a":145,"b":154}]}],"statement":"INSERT INTO owners(\n    \"ownerUuid\",\n    \"email\",\n    \"address\",\n    \"createdAt\",\n    \"updatedAt\"\n  )\nVALUES (\n    :ownerUuid !,\n    :email,\n    :address !,\n    now(),\n    now()\n  )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO owners(
 *     "ownerUuid",
 *     "email",
 *     "address",
 *     "createdAt",
 *     "updatedAt"
 *   )
 * VALUES (
 *     :ownerUuid !,
 *     :email,
 *     :address !,
 *     now(),
 *     now()
 *   )
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

const createEventPoapIR: any = {"usedParamSet":{"relationUuid":true,"poapUuid":true,"eventUuid":true},"params":[{"name":"relationUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":127,"b":141}]},{"name":"poapUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":148,"b":158}]},{"name":"eventUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":165,"b":176}]}],"statement":"INSERT INTO eventPoaps(\n    \"relationUuid\",\n    \"poapUuid\",\n    \"eventUuid\",\n    \"createdAt\",\n    \"updatedAt\"\n  )\nVALUES (\n    :relationUuid !,\n    :poapUuid !,\n    :eventUuid !,\n    now(),\n    now()\n  )"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO eventPoaps(
 *     "relationUuid",
 *     "poapUuid",
 *     "eventUuid",
 *     "createdAt",
 *     "updatedAt"
 *   )
 * VALUES (
 *     :relationUuid !,
 *     :poapUuid !,
 *     :eventUuid !,
 *     now(),
 *     now()
 *   )
 * ```
 */
export const createEventPoap = new PreparedQuery<ICreateEventPoapParams,ICreateEventPoapResult>(createEventPoapIR);


