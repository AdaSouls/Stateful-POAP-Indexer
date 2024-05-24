import type { PoapType, InvalidInput } from '@game/utils';
import type { WalletAddress } from '@paima/sdk/utils';

export interface LvlUpInput {
  input: 'lvlUp';
  address: WalletAddress;
  tokenId: string;
}

export interface ScheduledDataInput {
  input: 'scheduledData';
}

export interface PoapMintInput extends ScheduledDataInput {
  effect: 'poapMint';
  tokenId: string;
  // contract address
  address: WalletAddress;
  type: PoapType;
  initialEventData: string;
}

export function isPoapMint(input: ScheduledDataInput): input is PoapMintInput {
  return (input as PoapMintInput).effect === 'poapMint';
}

export type ParsedSubmittedInput = LvlUpInput | PoapMintInput | InvalidInput;
