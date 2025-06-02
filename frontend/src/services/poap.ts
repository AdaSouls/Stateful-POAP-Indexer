import { BrowserProvider, ethers, JsonRpcProvider } from "ethers";
import type { ContractRunner, JsonRpcSigner } from "ethers";
import { Contract } from "ethers";
// import Poap__Abi from "../../../contracts/evm/abi/contracts/evm/solidity/Poap.sol/Poap.json" with { type: "json" };
import Poap__Abi from "../../../contracts/evm/abi/contracts/evm/solidity/Poap.sol/Poap.json" with { type: "json" };
import { CHAIN_URI, CHAIN_CURRENCY_DECIMALS, POAP } from "./constants.js";
import type { PoapType } from "@game/utils";
import { poapToNumberMap } from "./utils.js";
import type { WalletMode } from "@paima/providers";
import { WalletModeMap } from "@paima/providers";

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

// Hardhat Localhost Provider
const providerRPC = {
  name: "localhost",
  rpc: "http://localhost:8545",
  chainId: 31337,
};

const provider = new ethers.JsonRpcProvider(providerRPC.rpc, {
  chainId: providerRPC.chainId,
  name: providerRPC.name,
});

const wallet = new ethers.Wallet(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  provider
);

export const createEvent = async (
  issuerId: number,
  eventId: number,
  maxSupply: number,
  mintExpiration: number,
  eventOrganizer: string,
  poap: PoapType
) => {
  const poapContract = await getPoapContract(eventOrganizer);

  console.log(poapContract);
  const provider = getProvider();
  // https://github.com/ethers-io/ethers.js/discussions/4219#discussioncomment-6375652
  const gasPrice = (await provider.getFeeData()).gasPrice;

  const tx = await poapContract.createEventId(
    issuerId,
    eventId,
    maxSupply,
    mintExpiration,
    eventOrganizer,
    {
      gasPrice,
      gasLimit: 800000,
      //value: tokenPrice.toString(),
    }
  );
  console.log(tx);
  return tx;
};

export const createEventId = async (
  issuerId: number,
  eventId: number,
  maxSupply: number,
  mintExpiration: number,
  eventOrganizer: string,
  signer: string
) => {
  console.log("🚀 ~ issuerId:", issuerId);
  console.log("🚀 ~ eventId:", eventId);
  console.log("🚀 ~ maxSupply:", maxSupply);
  console.log("🚀 ~ mintExpiration:", mintExpiration);
  console.log("🚀 ~ eventOrganizer:", eventOrganizer);
  console.log("🚀 ~ signer:", signer);

  try {
    // const provider = getProvider(signer);
    const signerObj = await getSigner(signer);
    // const poapContract = new Contract(POAP, Poap__Abi, signerObj); // ✅

    // const poapContract = await new ethers.Contract(POAP, Poap__Abi, provider);
    // const poapContract = new Contract(POAP, Poap__Abi, provider) as PoapContract;
    const poapContract = new Contract(
      POAP,
      Poap__Abi,
      signerObj
    ) as unknown as {
      createEventId: (
        issuerId: number,
        eventId: number,
        maxSupply: number,
        mintExpiration: number,
        eventOrganizer: string,
        overrides?: any
      ) => Promise<any>;
    };

    console.log("🚀 ~ poapContract:", poapContract);
    // console.log(Object.keys(poapContract.interface.));

    // const gasPrice = (await provider.getFeeData()).gasPrice;
    // const gasPrice = await provider.getGasPrice();

    // const createReceipt = await contractConnection.createEventId(
    const createReceipt = await poapContract.createEventId(
      issuerId,
      eventId,
      maxSupply,
      mintExpiration,
      eventOrganizer,
      {
        // gasPrice,
        gasLimit: 1000000,
      }
    );
    console.log("🚀 ~ createReceipt:", createReceipt);

    const receipt = await createReceipt.wait();
    console.log("🚀 ~ receipt:", receipt);

    return receipt;
  } catch (error) {
    // Handle other errors
    console.error("Failed to create event ID:", error);

    // alert("An error occurred while creating the event. Please try again.");
  }
};

export const mintToken = async (
  issuerId: number,
  eventId: number,
  to: string
  // initialData: string
) => {
  try {
    const signerObj = await getSigner(to);

    const poapContract = new Contract(
      POAP,
      Poap__Abi,
      signerObj
    ) as unknown as {
      mintToken: (
        issuerId: number,
        eventId: number,
        to: string,
        overrides?: any
      ) => Promise<any>;
    };

    console.log("🚀 ~ poapContract:", poapContract);
    // const txResponse = await poap.mintToken(issuerId, eventId, to, initialData);
    const txResponse = await poapContract.mintToken(issuerId, eventId, to);
    console.log("mintToken Transaction response:", txResponse);
    return txResponse;
  } catch (error) {
    console.error("Failed to mint Token:", error);
    throw error;
  }
};

export const mintPoap = async (
  issuerId: number,
  eventId: number,
  account: string,
  initialData: string,
  poap: PoapType
) => {
  const poapContract = await getPoapContract(account);

  const provider = getProvider();
  // https://github.com/ethers-io/ethers.js/discussions/4219#discussioncomment-6375652
  const gasPrice = (await provider.getFeeData()).gasPrice;

  const tx = await poapContract.mintToken(
    issuerId,
    eventId,
    account,
    initialData,
    {
      gasPrice,
      gasLimit: 800000,
      //value: tokenPrice.toString(),
    }
  );

  return tx;
};

const getPoapContract = async (account: string) => {
  console.log("🚀 ~ getPoapContract ~ account:", account);
  if (!POAP) {
    throw new Error(
      "POAP not set. Please fill in your .env file based on your contract deployment."
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

export const getPoaps = async (signer: string) => {
  // const poapContract = new ethers.Contract(
  //   poapContractAddress,
  //   poapContractAbi,
  //   signer
  // );
  console.log("In getPoaps");

  try {
    const signerObj = await getSigner(signer);

    const poapContract = new Contract(POAP, Poap__Abi, signerObj);
    console.log("🚀 ~ poapContract:", poapContract);

    // Create a filter for the EventCreated event
    const poapFilter = poapContract.filters;
    console.log("🚀 ~ getPoaps ~ poapFilter:", poapFilter);
    const poapMinted = poapContract.filters.TokenMinted();
    console.log("🚀 ~ getPoaps ~ eventFilter:", poapMinted);

    // Get all past EventCreated events
    const poaps = await poapContract.queryFilter("TokenMinted", 1, "latest");
    console.log("🚀 ~ getPoaps ~ poaps:", poaps);

    const poapData = [];

    for (const poap of poaps) {
      // Check if poap is an EventLog before accessing args
      if (!("args" in poap)) {
        console.log("Log doesn't have args property:", poap);
        continue;
      }

      const { issuerId, eventId, tokenId } = poap.args;
      console.log("🚀 ~ getPoaps ~ poap.args:", poap.args);

      const issuerIdNumber = Number(issuerId);
      const eventIdNumber = Number(eventId);
      const tokenIdNumber = Number(tokenId);

      poapData.push({
        issuerId: issuerIdNumber,
        eventId: eventIdNumber,
        tokenId: tokenIdNumber,
      });
    }
    console.log("Events with non-zero max supply:", poapData);
    return poapData;
  } catch (error) {
    console.error("Failed to get Events:", error);
    return [];
  }
};
