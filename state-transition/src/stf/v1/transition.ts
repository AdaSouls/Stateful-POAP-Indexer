import type { SQLUpdate } from "@paima/node-sdk/db";
import type { Pool } from "pg";
import type {
  IssuerCreateInput,
  EventCreateInput,
  PoapMintInput,
  PoapUpdateInput,
  ScheduledDataInput,
} from "./types";
import {
  persistIssuerCreate,
  persistEventCreate,
  persistPoapCreate,
  persistUpdateEvent,
  // persistUpdateEvent,
} from "./persist";
import { isNftOwner } from "@paima/node-sdk/utils-backend";
import type { WalletAddress } from "@paima/sdk/utils";
import {
  POAP_CODE,
  SOULBOUND_POAP_CODE,
  CONSENSUAL_SOULBOUND_POAP_CODE,
} from "@game/utils";

export const issuerCreate = async (
  input: IssuerCreateInput
): Promise<SQLUpdate[]> => {
  const issuerCreateQuery = persistIssuerCreate(
    input.payload.address,
    input.payload.email,
    input.payload.name,
    input.payload.organization
  );
  return [issuerCreateQuery];
};

// export const ownerCreate = async (
//   input: IssuerCreateInput
// ): Promise<SQLUpdate[]> => {
//   const issuerCreateQuery = persistIssuerCreate(
//     input.payload.issuerUuid,
//     input.payload.address,
//     input.payload.email,
//     input.payload.name,
//     input.payload.organization
//   );
//   return [issuerCreateQuery];
// };

// export const eventCreate = async (
//   input: EventCreateInput,
//   city: string, country: string, description: string, eventUrl: string | null | void,  expiryDate: Date,  poapsToBeMinted: number, title: string
// ): Promise<SQLUpdate[]> => {
//   const eventCreateQuery = persistEventCreate(
//         /**
//         city: string,
//         country: string,
//         description: string,
//         email: string,
//         eventUrl: string | null | void,
//         eventUuid: string,
//         expiryDate: Date,
//         issuerUuid: string,
//      */
//     input.payload.email,
//     input.payload.eventUuid,
//     input.payload.issuerUuid,
//     `${input.payload.requestedCodes}`,
//     city = "",
//     country = "",
//     description = "",
//     eventUrl = null,
//     expiryDate = new Date(),
//     poapsToBeMinted = 0,
//     title = ""
//   );
//   return [eventCreateQuery];
// };

export const eventUpdate = async (input: EventCreateInput): Promise<SQLUpdate[]> => {
  console.log("🚀 ~ eventUpdate ~ input:", input)
  
  const eventCreateQuery = persistUpdateEvent(
    input.payload.eventId,
  );
  return [eventCreateQuery];
};

export const poapMint = async (input: PoapMintInput): Promise<SQLUpdate[]> => {
  const poapCreateQuery = persistPoapCreate(
    input.payload.poapUuid,
    input.payload.ownerUuid,
    input.payload.instance
  );
  return [poapCreateQuery];
};

export const poapUpdate = async (
  input: PoapUpdateInput
): Promise<SQLUpdate[]> => {
  const poapUpdateQuery = persistPoapCreate(
    input.payload.poapUuid,
    input.payload.ownerUuid,
    input.payload.instance
  );
  return [poapUpdateQuery];
};

/* export const scheduledData = async (input: IssuerCreateInput | EventCreateInput | PoapMintInput | PoapUpdateInput): Promise<SQLUpdate[]> => {
/*   if (isEventCreate(input)) {
    return eventCreate(input);
  } */
/*   console.log("this is scheduled data: ", input);
  if (isPoapMint(input)) {
    return poapMint(input);
  } */
/*   if (isPoapUpdate(input)) {
    return poapUpdate(input);
  } */
/*   return [];
}; */
