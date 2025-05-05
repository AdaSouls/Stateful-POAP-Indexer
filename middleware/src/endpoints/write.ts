import { builder } from "@paima/sdk/concise";
import type { Result } from "@paima/sdk/mw-core";
import { awaitBlock, postConciseData } from "@paima/sdk/mw-core";
import { MiddlewareErrorCode, buildEndpointErrorFxn } from "../errors";
import type { WalletAddress } from "@paima/sdk/utils";
import { getOwnerPoaps } from "./queries";
import { getUserWallet } from "../helpers/utility-functions";
import { CreateEventResponse, CreateIssuerResponse } from "@game/utils";
import {
  backendQueryCreateEvent,
  backendQueryCreateIssuer,
  backendQueryUpdateEvent,
} from "../helpers/query-constructors";
import { ICreateEventParams } from "@game/db";
// import { randomUUID } from "crypto";

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

export async function createEvent(
  eventInfo: ICreateEventParams
): Promise<Result<CreateEventResponse>> {
  console.log("🚀 ~ eventInfo:", eventInfo)
  const query = backendQueryCreateEvent(eventInfo);
  console.log("🚀 ~ query:", query);
  const cleanedEndpoint = query.split("?")[0];

  const response = await fetch(cleanedEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...eventInfo,
    }),
  });
  const json = (await response.json()) as CreateEventResponse;
  return {
    success: true,
    result: json,
  };
}

export async function createIssuer(
  address: string,
  name: string,
  email: string,
  organization: string
): Promise<Result<CreateIssuerResponse>> {
  const query = backendQueryCreateIssuer(address, name, email, organization);
  console.log("🚀 ~ query:", query);
  const cleanedEndpoint = query.split("?")[0];

  const response = await fetch(cleanedEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address,
      name,
      email,
      organization,
    }),
  });
  const json = (await response.json()) as CreateIssuerResponse;
  return {
    success: true,
    result: json,
  };
}

// export async function updateEvent(
//   eventIdInContract: number,
//   approved: string
// ): Promise<Result<IUpdateEventResult>> {
//   const query = backendQueryUpdateEvent(eventIdInContract, approved);
//   console.log("🚀 ~ query:", query);
//   const cleanedEndpoint = query.split("?")[0];

//   const response = await fetch(cleanedEndpoint, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       address,
//       name,
//       email,
//       organization,
//     }),
//   });
//   const json = (await response.json()) as CreateIssuerResponse;
//   return {
//     success: true,
//     result: json,
//   };
// }

export const writeEndpoints = {
  createEvent,
  //mintPoap,
  createIssuer,
};
