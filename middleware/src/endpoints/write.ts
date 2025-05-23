import type { Result } from "@paima/sdk/mw-core";
import { CreateEventPoapRelationResponse, CreateEventResponse, CreateIssuerResponse, CreateOwnerResponse } from "@game/utils";
import {
  backendQueryCreateEvent,
  backendQueryCreateEventPoapRelation,
  backendQueryCreateIssuer,
  backendQueryCreateOwner,
  backendQueryUpdateOwner,
} from "../helpers/query-constructors";
import { ICreateEventParams, ICreateEventPoapParams } from "@game/db";


export async function createEventPoapRelation(
  relationInfo: ICreateEventPoapParams
): Promise<Result<CreateEventPoapRelationResponse>> {
  console.log("🚀 ~ relationInfo:", relationInfo)
  const query = backendQueryCreateEventPoapRelation(relationInfo.eventUuid, relationInfo.poapUuid);
  console.log("🚀 ~ query:", query);
  const cleanedEndpoint = query.split("?")[0];

  const response = await fetch(cleanedEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...relationInfo,
    }),
  });
  const json = (await response.json()) as CreateEventPoapRelationResponse;
  return {
    success: true,
    result: json,
  };
}

export async function createEvent(
  eventInfo: ICreateEventParams
): Promise<Result<CreateEventResponse>> {
  console.log("🚀 ~ eventInfo:", eventInfo)
  const query = backendQueryCreateEvent(eventInfo);
  console.log("🚀 ~ query:", query);
  const cleanedEndpoint = query.split("?")[0];

  const response = await fetch(cleanedEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...eventInfo,
    }),
  });
  const json = (await response.json()) as CreateEventResponse;
  return {
    success: true,
    result: json,
  };
}

export async function createIssuer(
  address: string,
  name: string,
  email: string,
  organization: string
): Promise<Result<CreateIssuerResponse>> {
  const query = backendQueryCreateIssuer(address, name, email, organization);
  console.log("🚀 ~ query:", query);
  const cleanedEndpoint = query.split("?")[0];

  const response = await fetch(cleanedEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address,
      name,
      email,
      organization,
    }),
  });
  const json = (await response.json()) as CreateIssuerResponse;
  return {
    success: true,
    result: json,
  };
}

export async function createOwner(address: string, email: string | undefined): Promise<Result<CreateOwnerResponse>> {
  const query = backendQueryCreateOwner(address, email);
    const cleanedEndpoint = query.split("?")[0];

  const response = await fetch(cleanedEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address,
      email
    }),
  });
  const json = (await response.json()) as CreateOwnerResponse;
  return {
    success: true,
    result: json,
  };
}

export async function updateOwner(address: string, email: string): Promise<Result<string>> {
  const query = backendQueryUpdateOwner(address, email);
    const cleanedEndpoint = query.split("?")[0];

  const response = await fetch(cleanedEndpoint, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address,
      email
    }),
  });
  const json = (await response.json())
  console.log("🚀 ~ updateOwner ~ json:", json)
  return {
    success: true,
    result: json,
  };
}

export async function updatePoap(poapUuid: string, ownerUuid: string): Promise<Result<string>> {
  const query = backendQueryUpdateOwner(poapUuid, ownerUuid);
    const cleanedEndpoint = query.split("?")[0];

  const response = await fetch(cleanedEndpoint, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      poapUuid,
      ownerUuid
    }),
  });
  const json = (await response.json())
  console.log("🚀 ~ updateOwner ~ json:", json)
  return {
    success: true,
    result: json,
  };
}

export const writeEndpoints = {
  createEventPoapRelation,
  createEvent,
  createIssuer,
  createOwner,
  updateOwner,
  updatePoap
};
