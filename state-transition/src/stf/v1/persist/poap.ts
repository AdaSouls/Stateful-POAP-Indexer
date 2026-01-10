import type {
  ICreateIssuerParams,
  ICreateEventParams,
  ICreatePoapParams,
  IUpdatePoapOwnerAddressParams,
} from "@game/db";
import { createIssuer, createEvent, createPoap, createEventPoap, updatePoapOwnerAddress } from "@game/db";
//import { updateEvent } from "@game/db/src/update.queries";
import type { SQLUpdate } from "@paima/node-sdk/db";
import type { WalletAddress } from "@paima/sdk/utils";

// this file deals with receiving blockchain data input and outputting SQL updates (imported from pgTyped output of our SQL files)
// PGTyped SQL updates are a tuple of the function calling the database and the params sent to it.

export function persistIssuerCreate(
  issuerId: number,
  issuerAddress: WalletAddress
): SQLUpdate {
  const params: ICreateIssuerParams = {
    issuerId,
    issuerAddress,
  };
  return [createIssuer, params];
}

export function persistEventCreate(
  issuerId: number,
  eventId: number,
  eventMaxSupply: number,
  eventMintExpiration: number,
  eventOrganizer: WalletAddress
): SQLUpdate {
  const params: ICreateEventParams = {
    issuerId,
    eventId,
    eventMaxSupply,
    eventMintExpiration,
    eventOrganizer,
  };
  return [createEvent, params];
}

/* export function persistUpdateEvent(eventIdInContract: number): SQLUpdate {
  const params = {
    eventIdInContract,
    approved: "Approved",
  };
  return [updateEvent, params];
} */

export function persistPoapCreate(
  issuerId: number,
  eventId: number,
  tokenId: number,
  ownerAddress: WalletAddress,
): SQLUpdate {
  const params: ICreatePoapParams = {
    issuerId,
    eventId,
    tokenId,
    ownerAddress,
  };
  return [createPoap, params];
}

export function persistPoapUpdateRelation(
  issuerId: number,
  eventId: number,
  tokenId: number,
  ownerAddress: WalletAddress,
): SQLUpdate[] {
  // Update the POAP's ownerAddress
  const updateParams: IUpdatePoapOwnerAddressParams = {
    tokenId,
    ownerAddress,
  };
  const updateQuery: SQLUpdate = [updatePoapOwnerAddress, updateParams];
  
  // Also create/update the event relation
  const relationParams: ICreatePoapParams = {
    issuerId,
    eventId,
    tokenId,
    ownerAddress,
  };
  const relationQuery: SQLUpdate = [createEventPoap, relationParams];
  
  // Return both queries
  return [updateQuery, relationQuery];
}
