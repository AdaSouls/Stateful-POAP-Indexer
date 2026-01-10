/** Types generated for queries found in "src/update.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

type DateOrString = Date | string;

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


/** 'UpdateEventMetadata' parameters type */
export interface IUpdateEventMetadataParams {
  description?: string | null | void;
  eventEndDate?: DateOrString | null | void;
  eventId: number;
  eventStartDate?: number | null | void;
  imageUrl?: string | null | void;
  title?: string | null | void;
}

/** 'UpdateEventMetadata' return type */
export type IUpdateEventMetadataResult = void;

/** 'UpdateEventMetadata' query type */
export interface IUpdateEventMetadataQuery {
  params: IUpdateEventMetadataParams;
  result: IUpdateEventMetadataResult;
}

const updateEventMetadataIR: any = {"usedParamSet":{"title":true,"description":true,"imageUrl":true,"eventStartDate":true,"eventEndDate":true,"eventId":true},"params":[{"name":"title","required":false,"transform":{"type":"scalar"},"locs":[{"a":28,"b":33}]},{"name":"description","required":false,"transform":{"type":"scalar"},"locs":[{"a":52,"b":63}]},{"name":"imageUrl","required":false,"transform":{"type":"scalar"},"locs":[{"a":81,"b":89}]},{"name":"eventStartDate","required":false,"transform":{"type":"scalar"},"locs":[{"a":113,"b":127}]},{"name":"eventEndDate","required":false,"transform":{"type":"scalar"},"locs":[{"a":149,"b":161}]},{"name":"eventId","required":true,"transform":{"type":"scalar"},"locs":[{"a":206,"b":214}]}],"statement":"UPDATE events\nSET\n  title = :title,\n  description = :description,\n  \"imageUrl\" = :imageUrl,\n  \"eventStartDate\" = :eventStartDate,\n  \"eventEndDate\" = :eventEndDate,\n  \"updatedAt\" = now()\nWHERE\n  \"eventId\" = :eventId!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE events
 * SET
 *   title = :title,
 *   description = :description,
 *   "imageUrl" = :imageUrl,
 *   "eventStartDate" = :eventStartDate,
 *   "eventEndDate" = :eventEndDate,
 *   "updatedAt" = now()
 * WHERE
 *   "eventId" = :eventId!
 * ```
 */
export const updateEventMetadata = new PreparedQuery<IUpdateEventMetadataParams,IUpdateEventMetadataResult>(updateEventMetadataIR);


/** 'UpdatePoapOwnerAddress' parameters type */
export interface IUpdatePoapOwnerAddressParams {
  ownerAddress: string;
  tokenId: number;
}

/** 'UpdatePoapOwnerAddress' return type */
export type IUpdatePoapOwnerAddressResult = void;

/** 'UpdatePoapOwnerAddress' query type */
export interface IUpdatePoapOwnerAddressQuery {
  params: IUpdatePoapOwnerAddressParams;
  result: IUpdatePoapOwnerAddressResult;
}

const updatePoapOwnerAddressIR: any = {"usedParamSet":{"ownerAddress":true,"tokenId":true},"params":[{"name":"ownerAddress","required":true,"transform":{"type":"scalar"},"locs":[{"a":42,"b":55}]},{"name":"tokenId","required":true,"transform":{"type":"scalar"},"locs":[{"a":101,"b":109}]}],"statement":"UPDATE poaps\nSET\n  \"ownerAddress\" = lower(:ownerAddress!),\n  \"updatedAt\" = now()\nWHERE\n  \"tokenId\" = :tokenId!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE poaps
 * SET
 *   "ownerAddress" = lower(:ownerAddress!),
 *   "updatedAt" = now()
 * WHERE
 *   "tokenId" = :tokenId!
 * ```
 */
export const updatePoapOwnerAddress = new PreparedQuery<IUpdatePoapOwnerAddressParams,IUpdatePoapOwnerAddressResult>(updatePoapOwnerAddressIR);


