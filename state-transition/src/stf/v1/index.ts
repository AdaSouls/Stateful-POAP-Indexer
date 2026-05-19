import parse, { isInvalid } from "./parser";
import type Prando from "@paima/sdk/prando";
import type { SubmittedChainData } from "@paima/sdk/utils";
import type { SQLUpdate } from "@paima/node-sdk/db";
import type { Pool } from "pg";
import {
  issuerCreate,
  eventCreate,
  poapMint,
  poapUpdate,
  //eventUpdate,
} from "./transition";
import {
  IssuerCreateInput,
  EventCreateInput,
  PoapMintInput,
  PoapUpdateInput,
} from "./types";

// entrypoint for your state machine
export default async function (
  inputData: SubmittedChainData,
  _blockHeight: number,
  _randomnessGenerator: Prando,
  dbConn: Pool
): Promise<SQLUpdate[]> {
  const parsed = parse(inputData.inputData);

  if (isInvalid(parsed)) {
    console.warn(`[sm] invalid input @block ${_blockHeight}: ${inputData.inputData}`);
    return [];
  }

  const p: any = (parsed as any).payload ?? {};
  switch (parsed.input) {
    case 'issuerCreate':
      console.log(`[sm] issuerCreate id=${p.issuerId} addr=${p.issuerAddress}`);
      return issuerCreate(parsed as IssuerCreateInput);
    case "eventCreate":
      console.log(`[sm] eventCreate eventId=${p.eventId} issuerId=${p.issuerId} maxSupply=${p.eventMaxSupply}`);
      return eventCreate(parsed as EventCreateInput);
    case "poapMint":
      console.log(`[sm] poapMint tokenId=${p.tokenId} eventId=${p.eventId} owner=${p.ownerAddress}`);
      return poapMint(parsed as PoapMintInput);
    case "poapUpdate":
      console.log(`[sm] poapUpdate tokenId=${p.tokenId} eventId=${p.eventId} owner=${p.ownerAddress}`);
      return poapUpdate(parsed as PoapUpdateInput);
    default:
      console.warn(`[sm] unknown input @block ${_blockHeight}: ${(parsed as any).input}`);
      return [];
  }
}
