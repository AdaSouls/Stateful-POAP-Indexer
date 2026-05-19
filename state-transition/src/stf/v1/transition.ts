import type { SQLUpdate } from "@paima/node-sdk/db";
import type { Pool } from "pg";
import type {
  IssuerCreateInput,
  EventCreateInput,
  PoapMintInput,
  PoapUpdateInput,
} from "./types";
import {
  persistIssuerCreate,
  persistEventCreate,
  persistPoapCreate,
  persistPoapUpdateRelation,
  //persistUpdateEvent,
  // persistUpdateEvent,
} from "./persist";

export const issuerCreate = async (
  input: IssuerCreateInput
): Promise<SQLUpdate[]> => {
  const issuerCreateQuery = persistIssuerCreate(
    input.payload.issuerId,
    input.payload.issuerAddress
  );
  return [issuerCreateQuery];
};

export const eventCreate = async (
  input: EventCreateInput,
): Promise<SQLUpdate[]> => {
  const eventCreateQuery = persistEventCreate(
    input.payload.issuerId,
    input.payload.eventId,
    input.payload.eventMaxSupply,
    input.payload.eventMintExpiration,
    input.payload.eventOrganizer.toLowerCase()
  );
  return [eventCreateQuery];
};

/* export const eventUpdate = async (input: EventCreateInput): Promise<SQLUpdate[]> => {
  console.log("🚀 ~ eventUpdate ~ input:", input)

  const eventCreateQuery = persistUpdateEvent(
    input.payload.eventId,
  );
  return [eventCreateQuery];
}; */

export const poapMint = async (input: PoapMintInput): Promise<SQLUpdate[]> => {
  const poapCreateQueries = await persistPoapCreate(
    input.payload.issuerId,
    input.payload.eventId,
    input.payload.tokenId,
    input.payload.ownerAddress,
  );
  return poapCreateQueries;
};

export const poapUpdate = async (
  input: PoapUpdateInput
): Promise<SQLUpdate[]> => {
  const poapUpdateQueries = await persistPoapUpdateRelation(
    input.payload.issuerId,
    input.payload.eventId,
    input.payload.tokenId,
    input.payload.ownerAddress,
  );
  return poapUpdateQueries;
};
