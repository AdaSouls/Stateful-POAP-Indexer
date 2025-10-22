import type { InvalidInput } from "@game/utils";
import type { WalletAddress } from "@paima/sdk/utils";

export interface ScheduledDataInput {
  input: "scheduledData";
}

export interface IssuerCreateInput {
  input: "issuerCreate";
  payload: {
    issuerId: number;
    issuerAddress: WalletAddress;
  };
}

export interface EventCreateInput {
  input: "eventCreate";
  payload: {
    issuerId: number;
    eventId: number;
    eventMaxSupply: number;
    eventMintExpiration: number;
    eventOrganizer: WalletAddress;
  };
}

export interface PoapMintInput {
  input: "poapMint";
  payload: {
    issuerId: number;
    eventId: number;
    tokenId: number;
    ownerAddress: WalletAddress;
  };
}

export interface PoapUpdateInput {
  input: "poapUpdate";
  payload: {
    issuerId: number;
    eventId: number;
    tokenId: number;
    ownerAddress: WalletAddress;
  };
}

export type ParsedSubmittedInput =
  | IssuerCreateInput
  | EventCreateInput
  | PoapMintInput
  | PoapUpdateInput
  | InvalidInput;
