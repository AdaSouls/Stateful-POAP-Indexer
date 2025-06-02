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
// eventCreate|{"0":"1","1":"14","2":"100","3":"1748943196","4":"0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199","issuerId":"1","eventId":"14","eventMaxSupply":"100","eventMintExpiration":"1748943196","eventOrganizer":"0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"}
// poapMint|{"0":"1","1":"14","2":"100","3":"0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", issuerId: "1", eventId: "14", tokenId: "100", to: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"}
// poapUpdate|{"0":"1","1":"33","2":"100","3":"0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", issuerId: "1", eventId: "33", tokenId: "100", to: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"}

const myGrammar = `
eventCreate         = eventCreate|payload
poapMint            = poapMint|payload
poapUpdate          = poapUpdate|payload
`;

const eventCreate = {
  payload: (
    _: string,
    input: string
  ): {
    issuerId: number;
    eventId: number;
    eventMaxSupply: number;
    eventMintExpiration: number;
    eventOrganizer: string;
  } => {
    console.log("🚀 ~ _:", _);
    console.log("🚀 ~ input:", input);
    if (!input) throw new Error("Input expected for swap_commands");
    // "eventId":"6","eventMaxSupply":"100","eventMintExpiration":"1749000901"
    const data: Record<string, string> = JSON.parse(input);
    // console.log("🚀 ~ data:", data);
    const issuerId = parseInt(data.issuerId, 10);
    const eventId = parseInt(data.eventId, 10);
    const eventMaxSupply = parseInt(data.eventMaxSupply, 10);
    // console.log("🚀 ~ data.eventMaxSupply:", data.eventMaxSupply);
    const eventMintExpiration = parseInt(data.eventMintExpiration, 10);
    // console.log("🚀 ~ data.eventMintExpiration:", data.eventMintExpiration);
    const eventOrganizer = data.eventOrganizer.toLocaleLowerCase();

    return {
      issuerId,
      eventId,
      eventMaxSupply,
      eventMintExpiration,
      eventOrganizer,
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
    instance: number;
    address: string;
  } => {
    if (!input) throw new Error("Input expected for swap_commands");
    const data: Record<string, string> = JSON.parse(input);
    const issuerId = parseInt(data.issuerId, 10);
    const eventId = parseInt(data.eventId, 10);
    const tokenId = parseInt(data.tokenId, 10);
    const to = data.to.toLocaleLowerCase();

    return { issuerId, eventId, instance: tokenId, address: to };
  },
};

const poapUpdate = {
  payload: (
    _: string,
    input: string
  ): {
    issuerId: number;
    eventId: number;
    instance: number;
    address: string;
  } => {
    if (!input) throw new Error("Input expected for swap_commands");
    const data: Record<string, string> = JSON.parse(input);
    const issuerId = parseInt(data.issuerId, 10);
    const eventId = parseInt(data.eventId, 10);
    const tokenId = parseInt(data.tokenId, 10);
    const to = data.to.toLocaleLowerCase();

    return { issuerId, eventId, instance: tokenId, address: to };
  },
};

// issuerCreate,
const parserCommands: Record<string, ParserRecord<ParsedSubmittedInput>> = {
  eventCreate,
  poapMint,
  poapUpdate,
};

const myParser = new PaimaParser(myGrammar, parserCommands);
export function isInvalid(input: ParsedSubmittedInput): input is InvalidInput {
  // console.log("IsInvalid received: ", input);
  console.log(
    `🚀 ~ isInvalid ~ (input as InvalidInput).input == "invalidString":`,
    (input as InvalidInput).input == "invalidString"
  );
  return (input as InvalidInput).input == "invalidString";
}

function parse(s: string): ParsedSubmittedInput {
  console.log("🚀 ~ parse ~ s:", s);
  try {
    const parsed = myParser.start(s);
    console.log("🚀 ~ parse ~ parsed:", parsed);
    return { input: parsed.command, ...parsed.args } as any;
  } catch (e) {
    console.log(e, "Parsing error");
    return { input: "invalidString" };
  }
}

export default parse;
