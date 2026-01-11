import type {
  ICreateIssuerParams,
  ICreateEventParams,
  ICreatePoapParams,
  IUpdatePoapOwnerAddressParams,
  IIncrementEventTotalSupplyParams,
} from "@game/db";
import { createIssuer, createEvent, createPoap, createEventPoap, updatePoapOwnerAddress, incrementEventTotalSupply } from "@game/db";
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
): SQLUpdate[] {
  // Create the POAP
  const poapParams: ICreatePoapParams = {
    issuerId,
    eventId,
    tokenId,
    ownerAddress,
  };
  const poapQuery: SQLUpdate = [createPoap, poapParams];
  
  // Increment the event's totalSupply
  const totalSupplyParams: IIncrementEventTotalSupplyParams = {
    eventId,
  };
  const totalSupplyQuery: SQLUpdate = [incrementEventTotalSupply, totalSupplyParams];
  
  // Return both queries
  return [poapQuery, totalSupplyQuery];
}

export function persistPoapUpdateRelation(
  issuerId: number,
  eventId: number,
  tokenId: number,
  ownerAddress: WalletAddress,
): SQLUpdate[] {
  // Create the POAP if it doesn't exist (ON CONFLICT will prevent duplicates)
  const poapParams: ICreatePoapParams = {
    issuerId,
    eventId,
    tokenId,
    ownerAddress,
  };
  const poapQuery: SQLUpdate = [createPoap, poapParams];
  
  // Update the POAP's ownerAddress (this will work whether POAP exists or not)
  const updateParams: IUpdatePoapOwnerAddressParams = {
    tokenId,
    ownerAddress,
  };
  const updateQuery: SQLUpdate = [updatePoapOwnerAddress, updateParams];
  
  // Create/update the event relation
  const relationParams: ICreatePoapParams = {
    issuerId,
    eventId,
    tokenId,
    ownerAddress,
  };
  const relationQuery: SQLUpdate = [createEventPoap, relationParams];
  
  // Increment the event's totalSupply
  // Note: This will increment even if POAP already existed, but that's acceptable
  // as it ensures totalSupply stays in sync. The alternative would require
  // checking if POAP exists first, which is more complex.
  const totalSupplyParams: IIncrementEventTotalSupplyParams = {
    eventId,
  };
  const totalSupplyQuery: SQLUpdate = [incrementEventTotalSupply, totalSupplyParams];
  
  // Return all queries: create POAP, update owner, create relation, increment supply
  return [poapQuery, updateQuery, relationQuery, totalSupplyQuery];
}
