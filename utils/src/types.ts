import type {
  ICreateEventPoapResult,
  ICreateEventResult,
  ICreateIssuerResult,
  ICreateOwnerResult,
  IGetAllEventPoapsResult,
  IGetLastEventResult,
  IGetOwnerPoapsResult,
  IGetIssuerByAddressResult,
  IGetAllIssuersResult,
  IGetIssuerByUuidResult,
  ICreatePoapResult,
  IGetAllOwnersResult,
  // IGetOwnerByAddressResult,
  // IGetOwnerByUuidResult,
} from "@game/db";

interface OwnerResult {
  address: string | null;
  createdAt: Date | null;
  email: string | null;
  ownerUuid: string;
  updatedAt: Date | null;
}

export interface InvalidInput {
  input: "invalidString";
}

// we have to re-specify this here because ABIs don't contain enums
// https://forum.soliditylang.org/t/reading-enum-values-directly-from-a-contract-with-js-ts-scripts/1155
export const poaps = ["poap", "soulbound", "consensual"] as const;
export type PoapType = (typeof poaps)[number];

export interface OwnerPoapsResponse {
  poaps: IGetOwnerPoapsResult[];
}
export interface CreateEventResponse {
  event: ICreateEventResult;
}
// export interface UpdateEventResponse {
//   event: IUpdateEventResult;
// }

export interface GetEventsResponse {
  event: IGetAllEventPoapsResult[];
}

export interface LastEventResponse {
  event: IGetLastEventResult;
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

export interface GetIssuerByAddressResponse {
  issuer: IGetIssuerByAddressResult;
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

export interface GetOwnerByAddressResponse {
  owner: OwnerResult;
}
export interface GetOwnerByUuidResponse {
  owner: OwnerResult;
}
export interface GetAllOwnersResponse {
  owners: IGetAllOwnersResult[];
}