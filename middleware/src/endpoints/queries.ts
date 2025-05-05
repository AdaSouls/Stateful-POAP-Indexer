import type {
  GetEventsResponse,
  CreateEventPoapRelationResponse,
  CreateEventResponse,
  CreateIssuerResponse,
  CreateOwnerResponse,
  OwnerPoapsResponse,
  GetIssuerByAddressResponse,
  GetAllIssuersResponse,
  GetIssuerByUuidResponse,
} from "@game/utils";
import {
  backendQueryOwnedPoaps,
  backendQueryLastEvent,
  backendQueryCreateEvent,
  backendQueryCreateOwner,
  backendQueryCreateIssuer,
  backendQueryCreateEventPoapRelation,
  backendQueryGetAllEvents,
  backendQueryGetIssuerByAddress,
  backendQueryGetAllIssuers,
  backendQueryGetIssuerByUuid,
} from "../helpers/query-constructors";
import type { Result } from "../types";

export async function getOwnerPoaps(
  wallet: string
): Promise<Result<OwnerPoapsResponse>> {
  const query = backendQueryOwnedPoaps(wallet);
  const response = await fetch(query);

  const json = (await response.json()) as OwnerPoapsResponse;
  console.log("🚀 ~ json:", json);
  return {
    success: true,
    result: json,
  };
}

export async function getAllEvents(): Promise<Result<GetEventsResponse>> {
  const query = backendQueryGetAllEvents();
  const response = await fetch(query);

  const json = (await response.json()) as GetEventsResponse;
  console.log("🚀 ~ getAllEvents ~ json:", json);
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

export async function createOwner(
  ownerUuid: string,
  address: string,
  email?: string
): Promise<Result<CreateOwnerResponse>> {
  const query = backendQueryCreateOwner(ownerUuid, address, email);

  const response = await fetch(query);
  const json = (await response.json()) as CreateOwnerResponse;
  return {
    success: true,
    result: json,
  };
}

// export async function createIssuer(
//   address: string,
//   name: string,
//   email: string,
//   organization: string
// ): Promise<Result<CreateIssuerResponse>> {
//   const query = backendQueryCreateIssuer(
//     address,
//     name,
//     email,
//     organization
//   );

//   const response = await fetch(query);
//   const json = (await response.json()) as CreateIssuerResponse;
//   return {
//     success: true,
//     result: json,
//   };
// }

export async function createEventPoapRelation(
  relationUuid: string,
  poapUuid: string,
  eventUuid: string
): Promise<Result<CreateEventPoapRelationResponse>> {
  const query = backendQueryCreateEventPoapRelation(
    relationUuid,
    poapUuid,
    eventUuid
  );

  const response = await fetch(query);
  const json = (await response.json()) as CreateEventPoapRelationResponse;
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
  console.log("🚀 ~ issuerUuid:", issuerUuid)
  const query = backendQueryGetIssuerByUuid(issuerUuid);
  const response = await fetch(query);
  console.log("🚀 ~ response:", response)

  const json = (await response.json()) as GetIssuerByUuidResponse;
  return {
    success: true,
    result: json,
  };
}

export async function getAllIssuers(): Promise<Result<GetAllIssuersResponse>> {
  const query = backendQueryGetAllIssuers();
  const response = await fetch(query);

  const json = (await response.json()) as GetAllIssuersResponse;
  console.log("🚀 ~ getAllIssuers ~ json:", json);
  return {
    success: true,
    result: json,
  };
}

export const queryEndpoints = {
  getOwnerPoaps,
  getAllEvents,
  getAllIssuers,
  getLastEvent,
  getIssuerByAddress,
  getIssuerByUuid,
  // createEvent,
  createOwner,
  // createIssuer,
  createEventPoapRelation,
};
