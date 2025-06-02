import type {
  GetEventsResponse,
  OwnerPoapsResponse,
  GetIssuerByAddressResponse,
  GetAllIssuersResponse,
  GetIssuerByUuidResponse,
  GetAllPoapsResponse,
  GetAllOwnersResponse,
  GetOwnerByAddressResponse,
  GetOwnerByUuidResponse,
  GetAllEventPoapRelationsResponse,
} from "@game/utils";
import {
  backendQueryOwnedPoaps,
  backendQueryLastEvent,
  backendQueryGetAllEvents,
  backendQueryGetIssuerByAddress,
  backendQueryGetAllIssuers,
  backendQueryGetIssuerByUuid,
  backendQueryGetAllPoaps,
  backendQueryGetAllOwners,
  backendQueryGetOwnerByAddress,
  backendQueryGetOwnerByUuid,
  backendQueryGetAllEventPoapRelations,
} from "../helpers/query-constructors";
import type { Result } from "../types";

///////// Event Poap Relation endpoints /////////

export async function getAllEventPoapRelations(): Promise<Result<GetAllEventPoapRelationsResponse>> {
  const query = backendQueryGetAllEventPoapRelations();
  const response = await fetch(query);

  const json = (await response.json()) as GetAllEventPoapRelationsResponse;
  // console.log("🚀 ~ getAllEvents ~ json:", json);
  return {
    success: true,
    result: json,
  };
}

///////// Event endpoints /////////

export async function getAllEvents(): Promise<Result<GetEventsResponse>> {
  const query = backendQueryGetAllEvents();
  const response = await fetch(query);

  const json = (await response.json()) as GetEventsResponse;
  // console.log("🚀 ~ getAllEvents ~ json:", json);
  return {
    success: true,
    result: json,
  };
}

export async function getLastEvent(): Promise<Result<OwnerPoapsResponse>> {
  const query = backendQueryLastEvent();
  const response = await fetch(query);

  const json = (await response.json()) as OwnerPoapsResponse;
  return {
    success: true,
    result: json,
  };
}

///////// Issuer endpoints /////////

export async function getAllIssuers(): Promise<Result<GetAllIssuersResponse>> {
  const query = backendQueryGetAllIssuers();
  const response = await fetch(query);

  const json = (await response.json()) as GetAllIssuersResponse;
  // console.log("🚀 ~ getAllIssuers ~ json:", json);
  return {
    success: true,
    result: json,
  };
}

export async function getIssuerByAddress(
  address: string
): Promise<Result<GetIssuerByAddressResponse>> {
  const query = backendQueryGetIssuerByAddress(address);
  const response = await fetch(query);

  const json = (await response.json()) as GetIssuerByAddressResponse;
  return {
    success: true,
    result: json,
  };
}

export async function getIssuerByUuid(
  issuerUuid: string
): Promise<Result<GetIssuerByUuidResponse>> {
  // console.log("🚀 ~ issuerUuid:", issuerUuid);
  const query = backendQueryGetIssuerByUuid(issuerUuid);
  const response = await fetch(query);
  // console.log("🚀 ~ response:", response);

  const json = (await response.json()) as GetIssuerByUuidResponse;
  return {
    success: true,
    result: json,
  };
}

///////// Owner endpoints /////////

export async function getAllOwners(): Promise<Result<GetAllOwnersResponse>> {
  const query = backendQueryGetAllOwners();
  const response = await fetch(query);

  const json = (await response.json()) as GetAllOwnersResponse;
  // console.log("🚀 ~ getAllOwners ~ json:", json);
  return {
    success: true,
    result: json,
  };
}

export async function getOwnerByAddress(
  address: string
): Promise<Result<GetOwnerByAddressResponse>> {
  const query = backendQueryGetOwnerByAddress(address);
  const response = await fetch(query);

  const json = (await response.json()) as GetOwnerByAddressResponse;
  return {
    success: true,
    result: json,
  };
}

export async function getOwnerByUuid(
  ownerUuid: string
): Promise<Result<GetOwnerByUuidResponse>> {
  // console.log("🚀 ~ ownerUuid:", ownerUuid);
  const query = backendQueryGetOwnerByUuid(ownerUuid);
  const response = await fetch(query);
  // console.log("🚀 ~ response:", response);

  const json = (await response.json()) as GetOwnerByUuidResponse;
  return {
    success: true,
    result: json,
  };
}

export async function getOwnerPoaps(
  wallet: string
): Promise<Result<OwnerPoapsResponse>> {
  const query = backendQueryOwnedPoaps(wallet);
  const response = await fetch(query);

  const json = (await response.json()) as OwnerPoapsResponse;
  // console.log("🚀 ~ json:", json);
  return {
    success: true,
    result: json,
  };
}

///////// Poap endpoints /////////


export async function getAllPoaps(): Promise<Result<GetAllPoapsResponse>> {
  const query = backendQueryGetAllPoaps();
  const response = await fetch(query);

  const json = (await response.json()) as GetAllPoapsResponse;
  return {
    success: true,
    result: json,
  };
}


export const queryEndpoints = {
  // createEventPoapRelation,
  getAllEventPoapRelations,
  getAllEvents,
  getLastEvent,
  getAllIssuers,
  getIssuerByAddress,
  getIssuerByUuid,
  getAllOwners,
  getOwnerByAddress,
  getOwnerByUuid,
  getOwnerPoaps,
  getAllPoaps,
};
