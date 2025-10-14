/** Types generated for queries found in "src/update.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'UpdateOwnerEmail' parameters type */
export interface IUpdateOwnerEmailParams {
  email: string;
  ownerAddress: string;
}

/** 'UpdateOwnerEmail' return type */
export type IUpdateOwnerEmailResult = void;

/** 'UpdateOwnerEmail' query type */
export interface IUpdateOwnerEmailQuery {
  params: IUpdateOwnerEmailParams;
  result: IUpdateOwnerEmailResult;
}

const updateOwnerEmailIR: any = {"usedParamSet":{"email":true,"ownerAddress":true},"params":[{"name":"email","required":true,"transform":{"type":"scalar"},"locs":[{"a":28,"b":34}]},{"name":"ownerAddress","required":true,"transform":{"type":"scalar"},"locs":[{"a":90,"b":103}]}],"statement":"UPDATE owners\nSET\n  email = :email!,\n  \"updatedAt\" = now()\nWHERE\n  \"ownerAddress\" = lower(:ownerAddress!)"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE owners
 * SET
 *   email = :email!,
 *   "updatedAt" = now()
 * WHERE
 *   "ownerAddress" = lower(:ownerAddress!)
 * ```
 */
export const updateOwnerEmail = new PreparedQuery<IUpdateOwnerEmailParams,IUpdateOwnerEmailResult>(updateOwnerEmailIR);


/** 'UpdateEventStatus' parameters type */
export interface IUpdateEventStatusParams {
  eventId: number;
  status: string;
}

/** 'UpdateEventStatus' return type */
export type IUpdateEventStatusResult = void;

/** 'UpdateEventStatus' query type */
export interface IUpdateEventStatusQuery {
  params: IUpdateEventStatusParams;
  result: IUpdateEventStatusResult;
}

const updateEventStatusIR: any = {"usedParamSet":{"status":true,"eventId":true},"params":[{"name":"status","required":true,"transform":{"type":"scalar"},"locs":[{"a":31,"b":38}]},{"name":"eventId","required":true,"transform":{"type":"scalar"},"locs":[{"a":83,"b":91}]}],"statement":"UPDATE events\nSET\n  \"status\" = :status!,\n  \"updatedAt\" = now()\nWHERE\n  \"eventId\" = :eventId!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE events
 * SET
 *   "status" = :status!,
 *   "updatedAt" = now()
 * WHERE
 *   "eventId" = :eventId!
 * ```
 */
export const updateEventStatus = new PreparedQuery<IUpdateEventStatusParams,IUpdateEventStatusResult>(updateEventStatusIR);


