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
    email: string;
    eventUuid: string;
    issuerUuid: string;
    requestedCodes: number;
  };
}

export interface PoapMintInput {
  input: "poapMint";
  payload: {
    poapUuid: string;
    ownerUuid: string;
    instance: number;
  };
}

export interface PoapUpdateInput {
  input: "poapUpdate";
  payload: {
    poapUuid: string;
    ownerUuid: string;
    instance: number;
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
