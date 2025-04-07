import { buildBackendQuery } from "@paima/sdk/mw-core";

export function backendQueryOwnedPoaps(wallet: string): string {
  const endpoint = "owner_poaps";
  const options = { wallet };
  return buildBackendQuery(endpoint, options);
}

export function backendQueryLastEvent(): string {
  const endpoint = "last_event";
  const options = {};
  return buildBackendQuery(endpoint, options);
}

export function backendQueryPoapMint(
  poapUuid: string,
  ownerUuid: string,
  instance: number
): string {
  const endpoint = "poap_mint";
  const options = { poapUuid, ownerUuid, instance };
  return buildBackendQuery(endpoint, options);
}

export function backendQueryUpdateEvent(
  eventUuid: string,
  approved: string
): string {
  const endpoint = "update_event";
  const options = { eventUuid, approved };
  return buildBackendQuery(endpoint, options);
}

export function backendQueryCreateEvent(
  eventUuid: string,
  issuerUuid: string,
  title: string,
  description: string,
  city: string,
  country: string,
  email: string,
  requestedCodes: number,
  expiryDate: Date,
  poapsToBeMinted: number
): string {
  const endpoint = "create_event";
  const options = {
    eventUuid,
    issuerUuid,
    title,
    description,
    city,
    country,
    email,
    requestedCodes,
    expiryDate: expiryDate.toISOString(),
    poapsToBeMinted,
  };
  return buildBackendQuery(endpoint, options);
}

export function backendQueryCreateOwner(
  ownerUuid: string,
  address: string,
  email?: string
): string {
  const endpoint = "create_owner";
  const options: { ownerUuid: string; address: string; email?: string } = {
    ownerUuid,
    address,
  };
  if (email !== undefined) {
    options.email = email;
  }
  return buildBackendQuery(endpoint, options);
}

export function backendQueryCreateIssuer(
  issuerUuid: string,
  address: string,
  name: string,
  email: string,
  organization: string
): string {
  const endpoint = "create_issuer";
  const options = {
    issuerUuid,
    address,
    name,
    email,
    organization,
  };
  return buildBackendQuery(endpoint, options);
}

export function backendQueryCreateEventPoapRelation(
  relationUuid: string,
  poapUuid: string,
  eventUuid: string,
): string {
  const endpoint = "create_event_poap_relation";
  const options = {
    relationUuid,
    poapUuid,
    eventUuid,
  };
  return buildBackendQuery(endpoint, options);
}
