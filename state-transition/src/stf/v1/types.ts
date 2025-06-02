import type { PoapType, InvalidInput } from "@game/utils";
import type { WalletAddress } from "@paima/sdk/utils";

export interface ScheduledDataInput {
  input: "scheduledData";
}

export interface IssuerCreateInput {
  input: "issuerCreate";
  payload: {
    issuerUuid: string;
    address: WalletAddress;
    email: string;
    name: string;
    organization: string;
  };
}

export interface EventCreateInput {
  input: "eventCreate";
  payload: {
    issuerId: number;
    eventId: number;
    eventMaxSupply: number;
    eventMintExpiration: number;
    eventOrganizer: string;
  };
}

export interface PoapMintInput {
  input: "poapMint";
  payload: {
    issuerId: number;
    eventId: number;
    instance: number;
    address: string;
  };
}

export interface PoapUpdateInput {
  input: "poapUpdate";
  payload: {
    issuerId: number;
    eventId: number;
    instance: number;
    address: string;
  };
}

// export function isPoapMint(input: ScheduledDataInput): input is PoapMintInput {
//   return (input as PoapMintInput).effect === 'poapMint';
// }

// export function isPoapUpdate(input: PoapUpdateInput): input is PoapUpdateInput {
//   return (input as PoapUpdateInput).effect === "poapUpdate";
// }

export type ParsedSubmittedInput =
  | IssuerCreateInput
  | EventCreateInput
  | PoapMintInput
  | PoapUpdateInput
  | InvalidInput;
