import { BrowserProvider, JsonRpcProvider } from 'ethers';
import type { JsonRpcSigner } from 'ethers';
import { Contract } from 'ethers';
import Poap__Abi from '../../../contracts/evm/abi/contracts/evm/solidity/Poap.sol/Poap.json' with { type: "json" };
import {
  CHAIN_URI,
  CHAIN_CURRENCY_DECIMALS,
  POAP,
} from './constants.js';
import type { PoapType } from '@game/utils';
import { poapToNumberMap } from './utils.js';
import type { WalletMode } from '@paima/providers';
import { WalletModeMap } from '@paima/providers';

export type SignerProvider = BrowserProvider | JsonRpcProvider;

// we have to use a type alias because Vite requires isolatedModules which disallows const enums
const evmInjectedMode: WalletMode.EvmInjected = 0;

const DECIMALS = 10n ** BigInt(CHAIN_CURRENCY_DECIMALS);

const getPublicClient = (): JsonRpcProvider => {
  return new JsonRpcProvider(CHAIN_URI);
};
const getWalletClient = (_account: string): BrowserProvider => {
  const provider = new BrowserProvider(
    WalletModeMap[evmInjectedMode].getOrThrowProvider().getConnection().api
  );
  return provider;
};
export const getProvider = (account?: string): SignerProvider => {
  if (account) {
    return getWalletClient(account);
  }
  return getPublicClient();
};
export const getSigner = async (account: string): Promise<JsonRpcSigner> => {
  return await getWalletClient(account).getSigner();
};

export const createEvent = async (
    issuerId: number, 
    eventId: number, 
    maxSupply: number,
    mintExpiration: number,
    eventOrganizer: string, 
    poap: PoapType,
) => {
    const poapContract = await getPoapContract(eventOrganizer);
    console.log(poapContract);
    const provider = getProvider();
    // https://github.com/ethers-io/ethers.js/discussions/4219#discussioncomment-6375652
    const gasPrice = (await provider.getFeeData()).gasPrice;
  
    const tx = await poapContract.createEventId(issuerId, eventId, maxSupply, mintExpiration, eventOrganizer, {
      gasPrice,
      gasLimit: 800000,
      //value: tokenPrice.toString(),
    });
    console.log(tx);
    return tx;
};

export const mintPoap = async (issuerId: number, eventId: number, account: string, initialData: string, poap: PoapType) => {
  const poapContract = await getPoapContract(account);

  const provider = getProvider();
  // https://github.com/ethers-io/ethers.js/discussions/4219#discussioncomment-6375652
  const gasPrice = (await provider.getFeeData()).gasPrice;

  const tx = await poapContract.mintToken(issuerId, eventId, account, initialData, {
    gasPrice,
    gasLimit: 800000,
    //value: tokenPrice.toString(),
  });

  return tx;
};

const getPoapContract = async (account: string) => {
  console.log("🚀 ~ getPoapContract ~ account:", account)
  if (!POAP) {
    throw new Error(
      'POAP not set. Please fill in your .env file based on your contract deployment.'
    );
  }
  console.log(Poap__Abi);
  const signer = await getSigner(account);
  console.log(signer);
  //const contract = Poap__factory.connect(POAP, signer);
  const contract = new Contract(POAP, Poap__Abi, signer);
  console.log(contract);
  return contract;
};