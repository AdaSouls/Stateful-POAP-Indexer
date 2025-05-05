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
// issuerCreate|{"0":"0","1":"0xfe02781cc0fe76Bfd2D211430bfa97D2889fd853","issuerId":"0","issuerAddress":"0xfe02781cc0fe76Bfd2D211430bfa97D2889fd853"}

// Stays the same
// eventCreate|{"0":"1","1":"14","2":"100","3":"1748943196","4":"0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199","issuerId":"1","eventId":"14","eventMaxSupply":"100","eventMintExpiration":"1748943196","eventOrganizer":"0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"}
// poapMint|{}
// poapUpdate|{}

// const myGrammar = `
// issuerCreate        = issuerCreate|payload
// eventCreate         = eventCreate|payload
// poapMint            = poapMint|payload
// poapUpdate          = poapUpdate|payload
// `;
const myGrammar = `
eventCreate         = eventCreate|payload
poapMint            = poapMint|payload
poapUpdate          = poapUpdate|payload
`;

// const issuerCreate = {
//   payload: (
//     _: string,
//     input: string
//   ): { issuerId: number; issuerAddress: string } => {
//     if (!input) throw new Error("Input expected for swap_commands");
//     const data: Record<string, string> = JSON.parse(input);
//     const issuerId = parseInt(data.issuerId, 10);
//     const issuerAddress = data.issuerAddress;

//     return { issuerId, issuerAddress };
//   },
// };



// const eventCreate = {
//   payload: (
//     _: string,
//     input: string
//   ): { issuerId: number; eventId: number, eventMaxSupply: number, eventMintExpiration: number, eventOrganizer: string, eventMetadata: string } => {
//     if (!input) throw new Error('Input expected for swap_commands');
//     const data: Record<string, string> = JSON.parse(input);
//     const issuerId = parseInt(data.issuerId, 10);
//     const eventId = parseInt(data.eventId, 10);
//     const eventMaxSupply = parseInt(data.eventMaxSupply, 10);
//     const eventMintExpiration = parseInt(data.eventMintExpiration, 10);
//     const eventOrganizer = data.eventOrganizer;
//     const eventMetadata = data.eventOrganizer;

//     return { issuerId, eventId, eventMaxSupply, eventMintExpiration, eventOrganizer, eventMetadata };
//   }
// }

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
    console.log("🚀 ~ data:", data)
    const issuerId = parseInt(data.issuerId, 10);
    const eventId = parseInt(data.eventId, 10);
    const eventMaxSupply = parseInt(data.eventMaxSupply, 10);
    console.log("🚀 ~ data.eventMaxSupply:", data.eventMaxSupply)
    const eventMintExpiration = parseInt(data.eventMintExpiration, 10);
    console.log("🚀 ~ data.eventMintExpiration:", data.eventMintExpiration)
    const eventOrganizer = data.eventOrganizer;

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

// issuerCreate,
const parserCommands: Record<string, ParserRecord<ParsedSubmittedInput>> = {
  eventCreate,
  poapMint,
  poapUpdate,
};

const myParser = new PaimaParser(myGrammar, parserCommands);
export function isInvalid(input: ParsedSubmittedInput): input is InvalidInput {
  // console.log("IsInvalid received: ", input);
  console.log(`🚀 ~ isInvalid ~ (input as InvalidInput).input == "invalidString":`, (input as InvalidInput).input == "invalidString")
  return (input as InvalidInput).input == "invalidString";
}

function parse(s: string): ParsedSubmittedInput {
  console.log("🚀 ~ parse ~ s:", s);
  try {
    // const event = s.split("|")[0];
    // console.log("🚀 ~ parse ~ event:", event);
    // const infoToParse = s.split("|")[1];
    // console.log("🚀 ~ parse ~ infoToParse:", infoToParse);
    const parsed = myParser.start(s);
    console.log("🚀 ~ parse ~ parsed:", parsed);
    return { input: parsed.command, ...parsed.args } as any;
  } catch (e) {
    console.log(e, "Parsing error");
    return { input: "invalidString" };
  }
}

export default parse;
