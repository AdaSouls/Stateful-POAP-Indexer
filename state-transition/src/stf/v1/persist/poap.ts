import type {
  ICreateIssuerParams,
  ICreateEventParams,
  ICreatePoapParams,
  // IApproveEventParams,
} from "@game/db";
import { createIssuer, createEvent, createPoap } from "@game/db";
import type { PoapType } from "@game/utils";
import type { SQLUpdate } from "@paima/node-sdk/db";
import type { WalletAddress } from "@paima/sdk/utils";
import { title } from "process";

// this file deals with receiving blockchain data input and outputting SQL updates (imported from pgTyped output of our SQL files)
// PGTyped SQL updates are a tuple of the function calling the database and the params sent to it.

export function persistIssuerCreate(
  issuerUuid: string,
  address: WalletAddress,
  email: string,
  name: string,
  organization: string
): SQLUpdate {
  const params: ICreateIssuerParams = {
    issuerUuid,
    address,
    email,
    name,
    organization,
  };
  return [createIssuer, params];
}

export function persistEventCreate(
  city: string,
  country: string,
  description: string,
  email: string,
  eventUrl: string | null | void,
  eventUuid: string,
  expiryDate: Date,
  issuerUuid: string,
  poapsToBeMinted: number,
  requestedCodes: number,
  title: string
): SQLUpdate {
  const params: ICreateEventParams = {
    city,
    country,
    description,
    email,
    eventUrl,
    eventUuid,
    expiryDate,
    issuerUuid,
    poapsToBeMinted,
    requestedCodes,
    title,
  };
  return [createEvent, params];
}

export function persistPoapCreate(
  poapUuid: string,
  ownerUuid: string,
  instance: number
): SQLUpdate {
  const params: ICreatePoapParams = {
    poapUuid,
    ownerUuid,
    instance,
  };
  return [createPoap, params];
}
