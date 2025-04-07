import type {
  CreateEventPoapRelationResponse,
  CreateEventResponse,
  CreateIssuerResponse,
  CreateOwnerResponse,
  OwnerPoapsResponse,
} from "@game/utils";
import {
  backendQueryOwnedPoaps,
  backendQueryLastEvent,
  backendQueryCreateEvent,
  backendQueryCreateOwner,
  backendQueryCreateIssuer,
  backendQueryCreateEventPoapRelation,
} from "../helpers/query-constructors";
import type { Result } from "../types";

export async function getOwnerPoaps(
  wallet: string
): Promise<Result<OwnerPoapsResponse>> {
  const query = backendQueryOwnedPoaps(wallet);
  const response = await fetch(query);

  const json = (await response.json()) as OwnerPoapsResponse;
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

export async function createEvent(
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
): Promise<Result<CreateEventResponse>> {
  const query = backendQueryCreateEvent(
    eventUuid,
    issuerUuid,
    title,
    description,
    city,
    country,
    email,
    requestedCodes,
    expiryDate,
    poapsToBeMinted
  );

  const response = await fetch(query);
  const json = (await response.json()) as CreateEventResponse;
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

export async function createIssuer(
  issuerUuid: string,
  address: string,
  name: string,
  email: string,
  organization: string
): Promise<Result<CreateIssuerResponse>> {
  const query = backendQueryCreateIssuer(
    issuerUuid,
    address,
    name,
    email,
    organization
  );

  const response = await fetch(query);
  const json = (await response.json()) as CreateIssuerResponse;
  return {
    success: true,
    result: json,
  };
}

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

export const queryEndpoints = {
  getOwnerPoaps,
  getLastEvent,
  createEvent,
  createOwner,
  createIssuer,
  createEventPoapRelation,
};
