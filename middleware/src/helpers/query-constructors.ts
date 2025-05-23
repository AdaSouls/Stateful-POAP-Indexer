import { ICreateEventParams } from "@game/db";
import { buildBackendQuery } from "@paima/sdk/mw-core";


///////// Event Poap Relation endpoints /////////


export function backendQueryCreateEventPoapRelation(
  poapUuid: string,
  eventUuid: string
): string {
  const endpoint = "create_event_poap_relation";
  const options = {
    poapUuid,
    eventUuid,
  };
  return buildBackendQuery(endpoint, options);
}


///////// Event endpoints /////////


export function backendQueryCreateEvent(eventInfo: any): string {
  console.log("🚀 ~ backendQueryCreateEvent ~ eventInfo:", eventInfo);
  const endpoint = "create_event";
  const options = {};
  return buildBackendQuery(endpoint, options);
}

export function backendQueryGetAllEvents(): string {
  const endpoint = "get_all_events";
  const options = {};
  return buildBackendQuery(endpoint, options);
}

export function backendQueryLastEvent(): string {
  const endpoint = "last_event";
  const options = {};
  const response = buildBackendQuery(endpoint, options);
  console.log("🚀 ~ backendQueryLastEvent ~ response:", response);
  return response;
}

export function backendQueryUpdateEvent(
  eventIdInContract: number,
  approved: string
): string {
  const endpoint = "update_event";
  const options = { eventIdInContract, approved };
  return buildBackendQuery(endpoint, options);
}


///////// Issuer endpoints /////////


export function backendQueryCreateIssuer(
  address: string,
  name: string,
  email: string,
  organization: string
): string {
  const endpoint = "create_issuer";
  const options = {
    address,
    name,
    email,
    organization,
  };
  console.log("🚀 ~ buildBackendQuery:", buildBackendQuery(endpoint, options));
  return buildBackendQuery(endpoint, options);
}

export function backendQueryGetAllIssuers(): string {
  const endpoint = "get_all_issuers";
  const options = {};
  const response = buildBackendQuery(endpoint, options);
  console.log("🚀 ~ backendQueryGetAllIssuers ~ response:", response);
  return response;
}

export function backendQueryGetIssuerByAddress(address: string): string {
  const endpoint = "get_issuer_by_address";
  const options = { address };
  const response = buildBackendQuery(endpoint, options);
  console.log("🚀 ~ backendQueryGetIssuerByAddress ~ response:", response);
  return response;
}

export function backendQueryGetIssuerByUuid(issuerUuid: string): string {
  const endpoint = "get_issuer_by_uuid";
  const options = { issuerUuid };
  const response = buildBackendQuery(endpoint, options);
  console.log("🚀 ~ backendQueryGetIssuerByUuid ~ options:", options);
  console.log("🚀 ~ backendQueryGetIssuerByAddress ~ response:", response);
  return response;
}


///////// Owner endpoints /////////


export function backendQueryCreateOwner(
  address: string,
  email?: string
): string {
  const endpoint = "create_owner";
  const options: { address: string; email?: string } = {
    address,
  };
  if (email !== undefined) {
    options.email = email;
  }
  return buildBackendQuery(endpoint, options);
}

export function backendQueryGetAllOwners(): string {
  const endpoint = "get_all_owners";
  const options = {};
  const response = buildBackendQuery(endpoint, options);
  console.log("🚀 ~ backendQueryGetAllOwners ~ response:", response);
  return response;
}

export function backendQueryGetOwnerByAddress(address: string): string {
  const endpoint = "get_owner_by_address";
  const options = { address };
  const response = buildBackendQuery(endpoint, options);
  console.log("🚀 ~ backendQueryGetOwnerByAddress ~ response:", response);
  return response;
}

export function backendQueryGetOwnerByUuid(ownerUuid: string): string {
  const endpoint = "get_owner_by_uuid";
  const options = { ownerUuid };
  const response = buildBackendQuery(endpoint, options);
  console.log("🚀 ~ backendQueryGetOwnerByUuid ~ options:", options);
  console.log("🚀 ~ backendQueryGetOwnerByAddress ~ response:", response);
  return response;
}

export function backendQueryOwnedPoaps(wallet: string): string {
  const endpoint = "owner_poaps";
  const options = { wallet };
  const response = buildBackendQuery(endpoint, options);
  console.log("🚀 ~ backendQueryOwnedPoaps ~ response:", response);
  return response;
}

export function backendQueryUpdateOwner(
  address: string,
  email: string
): string {
  const endpoint = "update_owner";
  const options = { address, email };
  return buildBackendQuery(endpoint, options);
}


///////// Poap endpoints /////////


export function backendQueryPoapMint(
  ownerUuid: string,
  instance: number
): string {
  const endpoint = "poap_mint";
  const options = { ownerUuid, instance };
  return buildBackendQuery(endpoint, options);
}

export function backendQueryGetAllPoaps(): string {
  const endpoint = "get_all_poaps";
  const options = {};
  const response = buildBackendQuery(endpoint, options);
  return response;
}

export function backendQueryUpdatePoap(
  poapUuid: string,
  ownerUuid: string,
): string {
  const endpoint = "update_poap";
  const options = { poapUuid, ownerUuid };
  return buildBackendQuery(endpoint, options);
}