import type { InvalidInput } from '@game/utils';
import { poaps } from '@game/utils';
import type { ParserRecord } from '@paima/sdk/concise';
import { PaimaParser } from '@paima/sdk/concise';
import type { LvlUpInput, PoapMintInput, ParsedSubmittedInput } from './types';

const myGrammar = `
lvlUp               = l|address|*tokenId
poapMint             = poapmint|address|tokenId|type
`;

const lvlUp: ParserRecord<LvlUpInput> = {
  address: PaimaParser.WalletAddress(),
  tokenId: PaimaParser.RegexParser(/^[0-9]+$/),
};
const poapMint: ParserRecord<PoapMintInput> = {
  renameCommand: 'scheduledData',
  effect: 'poapMint',
  address: PaimaParser.WalletAddress(),
  tokenId: PaimaParser.NumberParser(),
  type: PaimaParser.EnumParser(poaps),
};

const parserCommands: Record<string, ParserRecord<ParsedSubmittedInput>> = {
  lvlUp,
  poapMint,
};

const myParser = new PaimaParser(myGrammar, parserCommands);
export function isInvalid(input: ParsedSubmittedInput): input is InvalidInput {
  return (input as InvalidInput).input == 'invalidString';
}

function parse(s: string): ParsedSubmittedInput {
  try {
    const parsed = myParser.start(s);
    return { input: parsed.command, ...parsed.args } as any;
  } catch (e) {
    console.log(e, 'Parsing error');
    return { input: 'invalidString' };
  }
}

export default parse;
