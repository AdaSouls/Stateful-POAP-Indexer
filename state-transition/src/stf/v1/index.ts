import parse, { isInvalid } from "./parser.js";
import type Prando from "@paima/sdk/prando";
import type { SubmittedChainData } from "@paima/sdk/utils";
import type { SQLUpdate } from "@paima/node-sdk/db";
import type { Pool } from "pg";
// import { issuerCreate, eventCreate, poapMint, poapUpdate } from './transition.js';
import {
  // issuerCreate,
  poapMint,
  poapUpdate,
  eventUpdate,
} from "./transition.js";
import {
  EventCreateInput,
  PoapMintInput,
  PoapUpdateInput,
} from "./types.js";

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
  // console.log(`Input string parsed as: ${parsed.input}`);

  switch (parsed.input) {
    // case 'scheduledData':
    //   if (!inputData.scheduled) return [];
    //return scheduledData(parsed);
    // case 'issuerCreate':
    //   return issuerCreate(parsed as IssuerCreateInput);
    case "eventCreate":
      return eventUpdate(parsed as EventCreateInput);
    case "poapMint":
      return poapMint(parsed as PoapMintInput);
    case "poapUpdate":
      return poapUpdate(parsed as PoapUpdateInput);
    default:
      return [];
  }
}
