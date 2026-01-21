import type { InvalidInput } from "@game/utils";
import type { ParserRecord } from "@paima/sdk/concise";
import { PaimaParser } from "@paima/sdk/concise";
import type {
  ParsedSubmittedInput,
} from "./types";

// Stays the same
// eventCreate|{"0":"1","1":"14","2":"100","3":"1748943196","4":"0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199","issuerId":"1","eventId":"14","eventMaxSupply":"100","eventMintExpiration":"1748943196","eventOrganizer":"0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"}
// poapMint|{"0":"1","1":"14","2":"100","3":"0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", issuerId: "1", eventId: "14", tokenId: "100", to: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"}
// poapUpdate|{"0":"1","1":"33","2":"100","3":"0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", issuerId: "1", eventId: "33", tokenId: "100", to: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"}

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
  ): {
    issuerId: number;
    issuerAddress: string;
  } => {
    console.log("🚀 ~ _:", _);
    console.log("🚀 ~ input:", input);
    if (!input) throw new Error("Input expected for swap_commands");
    const data: Record<string, string> = JSON.parse(input);
    const issuerId = parseInt(data.issuerId, 10);
    const issuerAddress = data.issuerAddress.toLocaleLowerCase();

    return {
      issuerId,
      issuerAddress,
    };
  },
};

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
    const data: Record<string, string> = JSON.parse(input);
    const issuerId = parseInt(data.issuerId, 10);
    const eventId = parseInt(data.eventId, 10);
    const eventMaxSupply = parseInt(data.eventMaxSupply, 10);
    const eventMintExpiration = parseInt(data.eventMintExpiration, 10);
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
    tokenId: number;
    ownerAddress: string;
  } => {
    if (!input) throw new Error("Input expected for swap_commands");
    const data: Record<string, string> = JSON.parse(input);
    const issuerId = parseInt(data.issuerId, 10);
    const eventId = parseInt(data.eventId, 10);
    const tokenId = parseInt(data.tokenId, 10);
    const ownerAddress = data.ownerAddress?.toLowerCase() || data.userAddress?.toLowerCase() || data.to?.toLowerCase() || "";

    return { issuerId, eventId, tokenId, ownerAddress };
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
    ownerAddress: string;
  } => {
    if (!input) throw new Error("Input expected for swap_commands");
    const data: Record<string, string> = JSON.parse(input);
    const issuerId = parseInt(data.issuerId, 10);
    const eventId = parseInt(data.eventId, 10);
    const tokenId = parseInt(data.tokenId, 10);
    const ownerAddress = data.ownerAddress?.toLowerCase() || data.userAddress?.toLowerCase() || data.to?.toLowerCase() || "";

    return { issuerId, eventId, tokenId, ownerAddress };
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
    const parsed: any = myParser.start(s);
    console.log("🚀 ~ parse ~ parsed:", parsed);

    const command = parsed.command;
    const args = parsed.args ?? {};
    const payload = args.payload ?? {};

    // Normalize payload to match our domain types even when PaimaParser is mocked
    switch (command) {
      case "issuerCreate":
        return {
          input: "issuerCreate",
          payload: {
            issuerId: parseInt(String(payload.issuerId), 10),
            issuerAddress: String(
              payload.issuerAddress
            ).toLowerCase(),
          },
        } as any;
      case "eventCreate":
        return {
          input: "eventCreate",
          payload: {
            issuerId: parseInt(String(payload.issuerId), 10),
            eventId: parseInt(String(payload.eventId), 10),
            eventMaxSupply: parseInt(
              String(payload.eventMaxSupply),
              10
            ),
            eventMintExpiration: parseInt(
              String(payload.eventMintExpiration),
              10
            ),
            eventOrganizer: String(
              payload.eventOrganizer
            ).toLowerCase(),
          },
        } as any;
      case "poapMint":
        return {
          input: "poapMint",
          payload: {
            issuerId: parseInt(String(payload.issuerId), 10),
            eventId: parseInt(String(payload.eventId), 10),
            tokenId: parseInt(String(payload.tokenId), 10),
            ownerAddress: String(
              payload.ownerAddress ??
                payload.userAddress ??
                payload.to ??
                ""
            ).toLowerCase(),
          },
        } as any;
      case "poapUpdate":
        return {
          input: "poapUpdate",
          payload: {
            issuerId: parseInt(String(payload.issuerId), 10),
            eventId: parseInt(String(payload.eventId), 10),
            tokenId: parseInt(String(payload.tokenId), 10),
            ownerAddress: String(
              payload.ownerAddress ??
                payload.userAddress ??
                payload.to ??
                ""
            ).toLowerCase(),
          },
        } as any;
      default:
        return { input: command, ...args } as any;
    }
  } catch (e) {
    console.log(e, "Parsing error");
    return { input: "invalidString" };
  }
}

export default parse;
