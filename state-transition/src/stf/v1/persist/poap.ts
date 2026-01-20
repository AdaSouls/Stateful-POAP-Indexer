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
  // NOTE: POAP creation is handled by the blockchain sync service (BlockchainSyncService).
  // The blockchain sync service processes TokenMinted events and creates POAPs with
  // transaction_hash and block_number. Creating POAPs here would cause duplicates.
  // The state-transition should not create POAPs - only the blockchain sync service does.
  
  // The blockchain sync service also handles:
  // - POAP creation with transaction_hash
  // - eventpoaps relation creation
  // - totalSupply increment
  
  // Return empty array - no operations needed here
  return [];
}

export function persistPoapUpdateRelation(
  issuerId: number,
  eventId: number,
  tokenId: number,
  ownerAddress: WalletAddress,
): SQLUpdate[] {
  // NOTE: POAP creation is handled by the blockchain sync service (BlockchainSyncService).
  // The blockchain sync service processes TokenUpdated events and creates POAPs with
  // transaction_hash and block_number. Creating POAPs here would cause duplicates.
  // The state-transition should not create POAPs - only the blockchain sync service does.
  
  // The blockchain sync service handles everything:
  // - POAP creation with transaction_hash (via processTokenUpdatedEvent)
  // - ownerAddress is set correctly when creating the POAP
  // - eventpoaps relation creation (via createEventPoap)
  // - totalSupply increment
  
  // Return empty array - no operations needed here
  // All POAP-related operations are handled by the blockchain sync service
  return [];
}
