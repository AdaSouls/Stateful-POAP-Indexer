import type { InvalidInput } from "@game/utils";
import { poaps } from "@game/utils";
import type { ParserRecord } from "@paima/sdk/concise";
import { PaimaParser } from "@paima/sdk/concise";
import type {
  IssuerCreateInput,
  EventCreateInput,
  PoapMintInput,
  PoapUpdateInput,
  ParsedSubmittedInput,
} from "./types";

// Stays the same
// issuerCreate|{"0":"0","1":"0xfe02781cc0fe76Bfd2D211430bfa97D2889fd853","issuerId":"0","issuerAddress":"0xfe02781cc0fe76Bfd2D211430bfa97D2889fd853"}

// eventCreate|{"0": "0", "1": "0", "2": "0x2aced68f5c82922da1645b752558fe7882bb07c63e4a756afb4e11ad98345005", issuerId: "0", eventId: "0", maxSupply:  "5", mintExpiration: "1630000000", eventOrganizer: "0xfe02781cc0fe76Bfd2D211430bfa97D2889fd853"}
// poapMint|{}
// poapUpdate|{}

const myGrammar = `
issuerCreate        = issuerCreate|payload
eventCreate         = eventCreate|payload
poapMint            = poapMint|payload
poapUpdate          = poapUpdate|payload
`;

const issuerCreate = {
  payload: (
    _: string,
    input: string
  ): { issuerId: number; issuerAddress: string } => {
    if (!input) throw new Error("Input expected for swap_commands");
    const data: Record<string, string> = JSON.parse(input);
    const issuerId = parseInt(data.issuerId, 10);
    const issuerAddress = data.issuerAddress;

    return { issuerId, issuerAddress };
  },
};

// No metadata from this transaction
const eventCreate = {
  payload: (
    _: string,
    input: string
  ): {
    issuerId: number;
    eventId: number;
    maxSupply: number;
    mintExpiration: number;
    eventOrganizer: string;
    // eventMetadata: string;
  } => {
    if (!input) throw new Error("Input expected for swap_commands");
    const data: Record<string, string> = JSON.parse(input);
    const issuerId = parseInt(data.issuerId, 10);
    const eventId = parseInt(data.eventId, 10);
    const maxSupply = parseInt(data.maxSupply, 10);
    const mintExpiration = parseInt(data.mintExpiration, 10);
    const eventOrganizer = data.eventOrganizer;
    // const eventMetadata = data.eventOrganizer;

    return {
      issuerId,
      eventId,
      maxSupply,
      mintExpiration,
      eventOrganizer,
      // eventMetadata,
    };
  },
};

const poapMint = {
  payload: (
    _: string,
    input: string
  ): {
    issuerId: number;
    eventId: number;
    tokenId: number;
    initialData: string;
  } => {
    if (!input) throw new Error("Input expected for swap_commands");
    const data: Record<string, string> = JSON.parse(input);
    const issuerId = parseInt(data.issuerId, 10);
    const eventId = parseInt(data.eventId, 10);
    const tokenId = parseInt(data.tokenId, 10);
    const initialData = data.initialData;

    return { issuerId, eventId, tokenId, initialData };
  },
};

const poapUpdate = {
  payload: (
    _: string,
    input: string
  ): {
    issuerId: number;
    eventId: number;
    tokenId: number;
    initialData: string;
  } => {
    if (!input) throw new Error("Input expected for swap_commands");
    const data: Record<string, string> = JSON.parse(input);
    const issuerId = parseInt(data.issuerId, 10);
    const eventId = parseInt(data.eventId, 10);
    const tokenId = parseInt(data.tokenId, 10);
    const initialData = data.initialData;

    return { issuerId, eventId, tokenId, initialData };
  },
};

const parserCommands: Record<string, ParserRecord<ParsedSubmittedInput>> = {
  issuerCreate,
  eventCreate,
  poapMint,
  poapUpdate,
};

const myParser = new PaimaParser(myGrammar, parserCommands);
export function isInvalid(input: ParsedSubmittedInput): input is InvalidInput {
  console.log("IsInvalid received: ", input);
  return (input as InvalidInput).input == "invalidString";
}

function parse(s: string): ParsedSubmittedInput {
  try {
    const parsed = myParser.start(s);
    return { input: parsed.command, ...parsed.args } as any;
  } catch (e) {
    console.log(e, "Parsing error");
    return { input: "invalidString" };
  }
}

export default parse;
