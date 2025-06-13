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

const createEventIR: any = {"usedParamSet":{"title":true,"description":true,"city":true,"country":true,"startDate":true,"endDate":true,"expiryDate":true,"year":true,"eventUrl":true,"virtualEvent":true,"image":true,"secretCode":true,"eventTemplateId":true,"email":true,"requestedCodes":true,"privateEvent":true,"purpose":true,"platform":true,"eventType":true,"amountOfAttendees":true,"account":true,"poapType":true,"poapsToBeMinted":true,"issuerUuid":true},"params":[{"name":"title","required":true,"transform":{"type":"scalar"},"locs":[{"a":587,"b":594}]},{"name":"description","required":true,"transform":{"type":"scalar"},"locs":[{"a":601,"b":614}]},{"name":"city","required":false,"transform":{"type":"scalar"},"locs":[{"a":621,"b":625}]},{"name":"country","required":false,"transform":{"type":"scalar"},"locs":[{"a":632,"b":639}]},{"name":"startDate","required":true,"transform":{"type":"scalar"},"locs":[{"a":646,"b":657}]},{"name":"endDate","required":true,"transform":{"type":"scalar"},"locs":[{"a":664,"b":673}]},{"name":"expiryDate","required":true,"transform":{"type":"scalar"},"locs":[{"a":680,"b":692}]},{"name":"year","required":true,"transform":{"type":"scalar"},"locs":[{"a":699,"b":705}]},{"name":"eventUrl","required":false,"transform":{"type":"scalar"},"locs":[{"a":712,"b":720}]},{"name":"virtualEvent","required":true,"transform":{"type":"scalar"},"locs":[{"a":727,"b":741}]},{"name":"image","required":true,"transform":{"type":"scalar"},"locs":[{"a":748,"b":755}]},{"name":"secretCode","required":false,"transform":{"type":"scalar"},"locs":[{"a":762,"b":772}]},{"name":"eventTemplateId","required":false,"transform":{"type":"scalar"},"locs":[{"a":779,"b":794}]},{"name":"email","required":true,"transform":{"type":"scalar"},"locs":[{"a":801,"b":808}]},{"name":"requestedCodes","required":true,"transform":{"type":"scalar"},"locs":[{"a":815,"b":831}]},{"name":"privateEvent","required":true,"transform":{"type":"scalar"},"locs":[{"a":838,"b":852}]},{"name":"purpose","required":false,"transform":{"type":"scalar"},"locs":[{"a":859,"b":866}]},{"name":"platform","required":false,"transform":{"type":"scalar"},"locs":[{"a":873,"b":881}]},{"name":"eventType","required":true,"transform":{"type":"scalar"},"locs":[{"a":888,"b":899}]},{"name":"amountOfAttendees","required":false,"transform":{"type":"scalar"},"locs":[{"a":906,"b":923}]},{"name":"account","required":false,"transform":{"type":"scalar"},"locs":[{"a":930,"b":937}]},{"name":"poapType","required":true,"transform":{"type":"scalar"},"locs":[{"a":944,"b":954}]},{"name":"poapsToBeMinted","required":true,"transform":{"type":"scalar"},"locs":[{"a":961,"b":978}]},{"name":"issuerUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":1033,"b":1045}]}],"statement":"INSERT INTO \"events\" (\n    \"eventUuid\",\n    \"eventIdInContract\",\n    \"title\",\n    \"description\",\n    \"city\",\n    \"country\",\n    \"startDate\",\n    \"endDate\",\n    \"expiryDate\",\n    \"year\",\n    \"eventUrl\",\n    \"virtualEvent\",\n    \"image\",\n    \"secretCode\",\n    \"eventTemplateId\",\n    \"email\",\n    \"requestedCodes\",\n    \"privateEvent\",\n    \"purpose\",\n    \"platform\",\n    \"eventType\",\n    \"amountOfAttendees\",\n    \"account\",\n    \"poapType\",\n    \"poapsToBeMinted\",\n    \"mintedPoaps\",\n    \"approved\",\n    \"createdAt\",\n    \"updatedAt\",\n    \"issuerUuid\"\n  )\nVALUES (\n    DEFAULT,\n    DEFAULT,\n    :title !,\n    :description !,\n    :city,\n    :country,\n    :startDate !,\n    :endDate !,\n    :expiryDate !,\n    :year !,\n    :eventUrl,\n    :virtualEvent !,\n    :image !,\n    :secretCode,\n    :eventTemplateId,\n    :email !,\n    :requestedCodes !,\n    :privateEvent !,\n    :purpose,\n    :platform,\n    :eventType !,\n    :amountOfAttendees,\n    :account,\n    :poapType !,\n    :poapsToBeMinted !,\n    0,\n    'Pending',\n    DEFAULT,\n    DEFAULT,\n    :issuerUuid !\n  )\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "events" (
 *     "eventUuid",
 *     "eventIdInContract",
 *     "title",
 *     "description",
 *     "city",
 *     "country",
 *     "startDate",
 *     "endDate",
 *     "expiryDate",
 *     "year",
 *     "eventUrl",
 *     "virtualEvent",
 *     "image",
 *     "secretCode",
 *     "eventTemplateId",
 *     "email",
 *     "requestedCodes",
 *     "privateEvent",
 *     "purpose",
 *     "platform",
 *     "eventType",
 *     "amountOfAttendees",
 *     "account",
 *     "poapType",
 *     "poapsToBeMinted",
 *     "mintedPoaps",
 *     "approved",
 *     "createdAt",
 *     "updatedAt",
 *     "issuerUuid"
 *   )
 * VALUES (
 *     DEFAULT,
 *     DEFAULT,
 *     :title !,
 *     :description !,
 *     :city,
 *     :country,
 *     :startDate !,
 *     :endDate !,
 *     :expiryDate !,
 *     :year !,
 *     :eventUrl,
 *     :virtualEvent !,
 *     :image !,
 *     :secretCode,
 *     :eventTemplateId,
 *     :email !,
 *     :requestedCodes !,
 *     :privateEvent !,
 *     :purpose,
 *     :platform,
 *     :eventType !,
 *     :amountOfAttendees,
 *     :account,
 *     :poapType !,
 *     :poapsToBeMinted !,
 *     0,
 *     'Pending',
 *     DEFAULT,
 *     DEFAULT,
 *     :issuerUuid !
 *   )
 * RETURNING *
 * ```
 */
export const createEvent = new PreparedQuery<ICreateEventParams,ICreateEventResult>(createEventIR);


/** 'CreatePoap' parameters type */
export interface ICreatePoapParams {
  address: string;
  eventIdInContract: number;
  instance: number;
}

/** 'CreatePoap' return type */
export interface ICreatePoapResult {
  createdAt: Date | null;
  instance: number;
  ownerUuid: string;
  poapUuid: string;
  updatedAt: Date | null;
}

/** 'CreatePoap' query type */
export interface ICreatePoapQuery {
  params: ICreatePoapParams;
  result: ICreatePoapResult;
}

const createPoapIR: any = {"usedParamSet":{"address":true,"eventIdInContract":true,"instance":true},"params":[{"name":"address","required":true,"transform":{"type":"scalar"},"locs":[{"a":89,"b":98}]},{"name":"eventIdInContract","required":true,"transform":{"type":"scalar"},"locs":[{"a":185,"b":204},{"a":672,"b":690}]},{"name":"instance","required":true,"transform":{"type":"scalar"},"locs":[{"a":281,"b":291}]}],"statement":"WITH owner_data AS (\n  SELECT \"ownerUuid\"\n  FROM owners\n  WHERE LOWER(\"address\") = LOWER(:address !)\n),\nevent_data AS (\n  SELECT \"eventUuid\"\n  FROM events\n  WHERE \"eventIdInContract\" = :eventIdInContract !\n),\npoap_insert AS (\n  INSERT INTO poaps (\"instance\", \"ownerUuid\")\n  SELECT :instance !,\n    owner_data.\"ownerUuid\"\n  FROM owner_data\n  RETURNING *\n),\neventpoap_insert AS (\n  INSERT INTO eventpoaps (\"poapUuid\", \"eventUuid\")\n  SELECT poap_insert.\"poapUuid\",\n    event_data.\"eventUuid\"\n  FROM poap_insert,\n    event_data\n  RETURNING *\n),\nevent_update AS (\n  UPDATE events\n  SET \"mintedPoaps\" = \"mintedPoaps\" + 1,\n      \"updatedAt\" = NOW()\n  WHERE \"eventIdInContract\" = :eventIdInContract!\n  RETURNING *\n)\nSELECT *\nFROM poap_insert"};

/**
 * Query generated from SQL:
 * ```
 * WITH owner_data AS (
 *   SELECT "ownerUuid"
 *   FROM owners
 *   WHERE LOWER("address") = LOWER(:address !)
 * ),
 * event_data AS (
 *   SELECT "eventUuid"
 *   FROM events
 *   WHERE "eventIdInContract" = :eventIdInContract !
 * ),
 * poap_insert AS (
 *   INSERT INTO poaps ("instance", "ownerUuid")
 *   SELECT :instance !,
 *     owner_data."ownerUuid"
 *   FROM owner_data
 *   RETURNING *
 * ),
 * eventpoap_insert AS (
 *   INSERT INTO eventpoaps ("poapUuid", "eventUuid")
 *   SELECT poap_insert."poapUuid",
 *     event_data."eventUuid"
 *   FROM poap_insert,
 *     event_data
 *   RETURNING *
 * ),
 * event_update AS (
 *   UPDATE events
 *   SET "mintedPoaps" = "mintedPoaps" + 1,
 *       "updatedAt" = NOW()
 *   WHERE "eventIdInContract" = :eventIdInContract!
 *   RETURNING *
 * )
 * SELECT *
 * FROM poap_insert
 * ```
 */
export const createPoap = new PreparedQuery<ICreatePoapParams,ICreatePoapResult>(createPoapIR);


/** 'CreateOwner' parameters type */
export interface ICreateOwnerParams {
  address: string;
  email?: string | null | void;
}

/** 'CreateOwner' return type */
export interface ICreateOwnerResult {
  address: string | null;
  createdAt: Date | null;
  email: string | null;
  ownerUuid: string;
  updatedAt: Date | null;
}

/** 'CreateOwner' query type */
export interface ICreateOwnerQuery {
  params: ICreateOwnerParams;
  result: ICreateOwnerResult;
}

const createOwnerIR: any = {"usedParamSet":{"email":true,"address":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":47,"b":52}]},{"name":"address","required":true,"transform":{"type":"scalar"},"locs":[{"a":55,"b":64}]}],"statement":"INSERT INTO owners(\"email\", \"address\")\nVALUES (:email, :address !)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO owners("email", "address")
 * VALUES (:email, :address !)
 * RETURNING *
 * ```
 */
export const createOwner = new PreparedQuery<ICreateOwnerParams,ICreateOwnerResult>(createOwnerIR);


/** 'CreateEventPoap' parameters type */
export interface ICreateEventPoapParams {
  address: string;
  eventIdInContract: number;
  instance: number;
}

/** 'CreateEventPoap' return type */
export interface ICreateEventPoapResult {
  createdAt: Date | null;
  eventUuid: string;
  poapUuid: string;
  relationUuid: string;
  updatedAt: Date | null;
}

/** 'CreateEventPoap' query type */
export interface ICreateEventPoapQuery {
  params: ICreateEventPoapParams;
  result: ICreateEventPoapResult;
}

const createEventPoapIR: any = {"usedParamSet":{"address":true,"eventIdInContract":true,"instance":true},"params":[{"name":"address","required":true,"transform":{"type":"scalar"},"locs":[{"a":89,"b":97}]},{"name":"eventIdInContract","required":true,"transform":{"type":"scalar"},"locs":[{"a":184,"b":202},{"a":653,"b":671}]},{"name":"instance","required":true,"transform":{"type":"scalar"},"locs":[{"a":335,"b":344}]}],"statement":"WITH owner_data AS (\n  SELECT \"ownerUuid\"\n  FROM owners\n  WHERE LOWER(\"address\") = LOWER(:address!)\n),\nevent_data AS (\n  SELECT \"eventUuid\"\n  FROM events\n  WHERE \"eventIdInContract\" = :eventIdInContract!\n),\npoap_data AS (\n  SELECT p.\"poapUuid\"\n  FROM poaps p\n  JOIN owner_data o ON p.\"ownerUuid\" = o.\"ownerUuid\"\n  WHERE p.\"instance\" = :instance!\n),\neventpoap_insert AS (\n  INSERT INTO eventpoaps (\"poapUuid\", \"eventUuid\")\n  SELECT poap_data.\"poapUuid\", event_data.\"eventUuid\"\n  FROM poap_data, event_data\n  RETURNING *\n),\nevent_update AS (\n  UPDATE events\n  SET \"mintedPoaps\" = \"mintedPoaps\" + 1,\n      \"updatedAt\" = NOW()\n  WHERE \"eventIdInContract\" = :eventIdInContract!\n  RETURNING *\n)\nSELECT * FROM eventpoap_insert"};

/**
 * Query generated from SQL:
 * ```
 * WITH owner_data AS (
 *   SELECT "ownerUuid"
 *   FROM owners
 *   WHERE LOWER("address") = LOWER(:address!)
 * ),
 * event_data AS (
 *   SELECT "eventUuid"
 *   FROM events
 *   WHERE "eventIdInContract" = :eventIdInContract!
 * ),
 * poap_data AS (
 *   SELECT p."poapUuid"
 *   FROM poaps p
 *   JOIN owner_data o ON p."ownerUuid" = o."ownerUuid"
 *   WHERE p."instance" = :instance!
 * ),
 * eventpoap_insert AS (
 *   INSERT INTO eventpoaps ("poapUuid", "eventUuid")
 *   SELECT poap_data."poapUuid", event_data."eventUuid"
 *   FROM poap_data, event_data
 *   RETURNING *
 * ),
 * event_update AS (
 *   UPDATE events
 *   SET "mintedPoaps" = "mintedPoaps" + 1,
 *       "updatedAt" = NOW()
 *   WHERE "eventIdInContract" = :eventIdInContract!
 *   RETURNING *
 * )
 * SELECT * FROM eventpoap_insert
 * ```
 */
export const createEventPoap = new PreparedQuery<ICreateEventPoapParams,ICreateEventPoapResult>(createEventPoapIR);


