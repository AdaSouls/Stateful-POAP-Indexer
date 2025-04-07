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


/** 'ApproveEvent' parameters type */
export interface IApproveEventParams {
  approved?: string | null | void;
  eventUuid: string;
}

/** 'ApproveEvent' return type */
export type IApproveEventResult = void;

/** 'ApproveEvent' query type */
export interface IApproveEventQuery {
  params: IApproveEventParams;
  result: IApproveEventResult;
}

const approveEventIR: any = {"usedParamSet":{"approved":true,"eventUuid":true},"params":[{"name":"approved","required":false,"transform":{"type":"scalar"},"locs":[{"a":33,"b":41}]},{"name":"eventUuid","required":true,"transform":{"type":"scalar"},"locs":[{"a":88,"b":98}]}],"statement":"UPDATE events\nSET\n  \"approved\" = :approved,\n  \"updatedAt\" = now()\nWHERE\n  \"eventUuid\" = :eventUuid!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE events
 * SET
 *   "approved" = :approved,
 *   "updatedAt" = now()
 * WHERE
 *   "eventUuid" = :eventUuid!
 * ```
 */
export const approveEvent = new PreparedQuery<IApproveEventParams,IApproveEventResult>(approveEventIR);


