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
  console.log("🚀 ~ index.ts inputData:", inputData);
  console.log(`Processing input string: ${inputData.inputData}`);
  const parsed = parse(inputData.inputData);
  console.log("This is parsed: ", parsed);

  if (isInvalid(parsed)) {
    console.log(`Invalid input string`);
    return [];
  }

  switch (parsed.input) {
    case 'issuerCreate':
      return issuerCreate(parsed as IssuerCreateInput);
    case "eventCreate":
      return eventCreate(parsed as EventCreateInput);
    case "poapMint":
      return poapMint(parsed as PoapMintInput);
    case "poapUpdate":
      return poapUpdate(parsed as PoapUpdateInput);
    default:
      return [];
  }
}
