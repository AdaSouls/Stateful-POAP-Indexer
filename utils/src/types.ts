import type {
  ICreateEventPoapResult,
  ICreateEventResult,
  ICreateIssuerResult,
  ICreateOwnerResult,
  IGetAllEventPoapsResult,
  IGetIssuerByWalletAddressResult,
  IGetAllIssuersResult,
  IGetIssuerByUuidResult,
  ICreatePoapResult,
  IGetAllOwnersResult,
  IGetOwnerByWalletAddressResult,
} from "@game/db";

export interface InvalidInput {
  input: "invalidString";
}

export interface IErrorResponse {
  error: string;
  details?: any;
}

// we have to re-specify this here because ABIs don't contain enums
// https://forum.soliditylang.org/t/reading-enum-values-directly-from-a-contract-with-js-ts-scripts/1155
export const poaps = ["poap", "soulbound", "consensual"] as const;
export type PoapType = (typeof poaps)[number];

/* export interface OwnerPoapsResponse {
  poaps: IGetOwnerPoapsResult[];
} */

export interface CreateEventResponse {
  event: ICreateEventResult;
}
// export interface UpdateEventResponse {
//   event: IUpdateEventResult;
// }

export interface GetEventsResponse {
  event: IGetAllEventPoapsResult[];
}

export interface CreateOwnerResponse {
  event: ICreateOwnerResult;
}

export interface CreateIssuerResponse {
  issuer: ICreateIssuerResult;
}

export interface CreateEventPoapRelationResponse {
  event: ICreateEventPoapResult;
}

export interface GetAllEventPoapRelationsResponse {
  relations: IGetAllEventPoapsResult[];
}

export interface GetIssuerByWalletAddressResponse {
  issuer: IGetIssuerByWalletAddressResult;
}

export interface GetAllIssuersResponse {
  issuers: IGetAllIssuersResult[];
}

export interface GetIssuerByUuidResponse {
  issuer: IGetIssuerByUuidResult;
}

export interface GetAllPoapsResponse {
  poaps: IGetAllEventPoapsResult[]
}
export interface MintPoapResponse {
  poap: ICreatePoapResult
}

export interface GetOwnerByWalletAddressResponse {
  owner: IGetOwnerByWalletAddressResult;
}

export interface GetOwnerByUuidResponse {
  owner: IGetOwnerByWalletAddressResult;
}

export interface GetAllOwnersResponse {
  owners: IGetAllOwnersResult[];
}