// import type { CreateEventResponse } from '../types';
// import { builder } from '@paima/sdk/concise';
// import type { Result } from '@paima/sdk/mw-core';
// import { awaitBlock, postConciseData } from '@paima/sdk/mw-core';
// import { MiddlewareErrorCode, buildEndpointErrorFxn } from '../errors';
// import type { WalletAddress } from '@paima/sdk/utils';
// import { getOwnerPoaps } from './queries';
// import { getUserWallet } from '../helpers/utility-functions';

// async function createEvent(
//   issuerId: number,
//   eventId: number,
//   maxSupply: number,
//   mintExpiration: number,
//   eventOrganizer: WalletAddress,
//   type: string,
// ): Promise<Result<CreateEventResponse>> {
//   const errorFxn = buildEndpointErrorFxn('createEvent');

//   const query = getUserWallet(errorFxn);
//   if (!query.success) return query;
//   const userWalletAddress = query.result;

//   const conciseBuilder = builder.initialize(undefined);
//   conciseBuilder.setPrefix('l');
//   conciseBuilder.addValue({ value: contractAddress });
//   conciseBuilder.addValue({ value: nftId, isStateIdentifier: true });

//   const response = await postConciseData(conciseBuilder.build(), errorFxn);
//   if (!response.success) return response;

//   const currentBlock = response.blockHeight;
//   try {
//     await awaitBlock(currentBlock + 1);
//     const ownedCharacters = await getOwnedPoaps(userWalletAddress);
//     const updatedCharacter =
//       ownedCharacters.success &&
//       ownedCharacters.result.poaps.find(character => character.nft_id === nftId);
//     if (!updatedCharacter) {
//       return errorFxn(MiddlewareErrorCode.FAILURE_VERIFYING_NFT_OWNERSHIP);
//     }
//     return {
//       success: true,
//       result: { character: updatedCharacter },
//     };
//   } catch (err) {
//     return errorFxn(MiddlewareErrorCode.FAILURE_VERIFYING_NFT_OWNERSHIP);
//   }
// }

// async function updatePoap(
//   issuerId: number,
//   eventId: number,
//   maxSupply: number,
//   mintExpiration: number,
//   eventOrganizer: WalletAddress,
//   type: string,
// ): Promise<Result<CreateEventResponse>> {
//   const errorFxn = buildEndpointErrorFxn('updatePoap');

//   const query = getUserWallet(errorFxn);
//   if (!query.success) return query;
//   const userWalletAddress = query.result;

//   const conciseBuilder = builder.initialize(undefined);
//   conciseBuilder.setPrefix('l');
//   conciseBuilder.addValue({ value: contractAddress });
//   conciseBuilder.addValue({ value: nftId, isStateIdentifier: true });

//   const response = await postConciseData(conciseBuilder.build(), errorFxn);
//   if (!response.success) return response;

//   const currentBlock = response.blockHeight;
//   try {
//     await awaitBlock(currentBlock + 1);
//     const ownedCharacters = await getOwnedPoaps(userWalletAddress);
//     const updatedCharacter =
//       ownedCharacters.success &&
//       ownedCharacters.result.poaps.find(character => character.nft_id === nftId);
//     if (!updatedCharacter) {
//       return errorFxn(MiddlewareErrorCode.FAILURE_VERIFYING_NFT_OWNERSHIP);
//     }
//     return {
//       success: true,
//       result: { character: updatedCharacter },
//     };
//   } catch (err) {
//     return errorFxn(MiddlewareErrorCode.FAILURE_VERIFYING_NFT_OWNERSHIP);
//   }
// }

export const writeEndpoints = {
  //createEvent,
  //mintPoap,
};
