/** Types generated for queries found in "src/update.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'UpdateOwner' parameters type */
export interface IUpdateOwnerParams {
  address: string;
  email?: string | null | void;
}

/** 'UpdateOwner' return type */
export type IUpdateOwnerResult = void;

/** 'UpdateOwner' query type */
export interface IUpdateOwnerQuery {
  params: IUpdateOwnerParams;
  result: IUpdateOwnerResult;
}

const updateOwnerIR: any = {"usedParamSet":{"email":true,"address":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":30,"b":35}]},{"name":"address","required":true,"transform":{"type":"scalar"},"locs":[{"a":80,"b":88}]}],"statement":"UPDATE owners\nSET\n  \"email\" = :email,\n  \"updatedAt\" = now()\nWHERE\n  \"address\" = :address!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE owners
 * SET
 *   "email" = :email,
 *   "updatedAt" = now()
 * WHERE
 *   "address" = :address!
 * ```
 */
export const updateOwner = new PreparedQuery<IUpdateOwnerParams,IUpdateOwnerResult>(updateOwnerIR);


/** 'UpdateEvent' parameters type */
export interface IUpdateEventParams {
  approved?: string | null | void;
  eventIdInContract: number;
}

/** 'UpdateEvent' return type */
export type IUpdateEventResult = void;

/** 'UpdateEvent' query type */
export interface IUpdateEventQuery {
  params: IUpdateEventParams;
  result: IUpdateEventResult;
}

const updateEventIR: any = {"usedParamSet":{"approved":true,"eventIdInContract":true},"params":[{"name":"approved","required":false,"transform":{"type":"scalar"},"locs":[{"a":33,"b":41}]},{"name":"eventIdInContract","required":true,"transform":{"type":"scalar"},"locs":[{"a":96,"b":114}]}],"statement":"UPDATE events\nSET\n  \"approved\" = :approved,\n  \"updatedAt\" = now()\nWHERE\n  \"eventIdInContract\" = :eventIdInContract!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE events
 * SET
 *   "approved" = :approved,
 *   "updatedAt" = now()
 * WHERE
 *   "eventIdInContract" = :eventIdInContract!
 * ```
 */
export const updateEvent = new PreparedQuery<IUpdateEventParams,IUpdateEventResult>(updateEventIR);


/** 'UpdatePoap' parameters type */
export interface IUpdatePoapParams {
  ownerUuid: string;
  poapUuid: string;
}

/** 'UpdatePoap' return type */
export type IUpdatePoapResult = void;

/** 'UpdatePoap' query type */
export interface IUpdatePoapQuery {
  params: IUpdatePoapParams;
  result: IUpdatePoapResult;
}

const updatePoapIR: any = {"usedParamSet":{"ownerUuid":true,"poapUuid":true},"params":[{"name":"ownerUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":33,"b":43}]},{"name":"poapUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":89,"b":98}]}],"statement":"UPDATE poaps\nSET\n  \"ownerUuid\" = :ownerUuid!,\n  \"updatedAt\" = now()\nWHERE\n  \"poapUuid\" = :poapUuid!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE poaps
 * SET
 *   "ownerUuid" = :ownerUuid!,
 *   "updatedAt" = now()
 * WHERE
 *   "poapUuid" = :poapUuid!
 * ```
 */
export const updatePoap = new PreparedQuery<IUpdatePoapParams,IUpdatePoapResult>(updatePoapIR);


