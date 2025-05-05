import { useEffect, useState } from "react";
import "./App.css";
import mw from "mw";
import type {
  IGetOwnerPoapsResult,
  ICreateEventParams,
  ICreateIssuerResult,
} from "@game/db";
import { WalletMode } from "@paima/sdk/providers.js";
import { createEvent, createEventId, mintPoap } from "./services/poap.js";
import { POAP } from "./services/constants.js";

function App() {
  const [poaps, setPoaps] = useState<IGetOwnerPoapsResult[]>([]);
  const [wallet, setWallet] = useState("");
  const [issuer, setIssuer] = useState<ICreateIssuerResult | null>(null);
  const [eventId, setEventId] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [mintExpiration, setMintExpiration] = useState(0);

  const eventInfo: ICreateEventParams = {
    description: "Test Description",
    email: "test@mail.com",
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    eventType: "Test Event Type",
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    image: "https://example.com/image.png",
    issuerUuid: "",
    poapsToBeMinted: 100,
    poapType: "Poap",
    privateEvent: false,
    requestedCodes: 100,
    startDate: new Date(Date.now()),
    title: "Test Event",
    virtualEvent: false,
    year: new Date().getFullYear(),
    account: "0x1234567890abcdef1234567890abcdef12345678",
    amountOfAttendees: 100,
    city: "Sydney",
    country: "Australia",
    eventTemplateId: "template-123",
    eventUrl: "https://test.com",
    platform: "Test Platform",
    purpose: "Test Purpose",
    secretCode: "test-secret-code",
  };

  const issuerInfo = {
    name: "Test Issuer",
    email: "test_issuer@mail.com",
    organization: "Test Organization",
  };

  const createEventOnDB = async (eventInfo: ICreateEventParams) => {
    // this will return an object {success: boolean, result: any}.
    // I want to return result but naming it "event" to be more clear
    const response = await mw.createEvent(eventInfo);
    console.log(
      "🚀 ~ createEvent ~ response dentro de createEventOnDB:",
      response
    );
    return response.result;
  };

  const createIssuerOnDB = async (
    address: string,
    name: string,
    email: string,
    organization: string
  ) => {
    const response = await mw.createIssuer(address, name, email, organization);
    console.log("🚀 ~ createIssuer ~ response:", response);
    return response.result;
  };

  // const handleIssuerChange = (event: any) => {
  //   setIssuerId(event.target.value);
  // };

  const handleEventChange = (event: any) => {
    setEventId(event.target.value);
  };

  const handleMaxSupplyChange = (event: any) => {
    setMaxSupply(event.target.value);
  };

  const handleMintExpirationChange = (event: any) => {
    setMintExpiration(event.target.value);
  };

  const fetchPoaps = async (userWallet: string) => {
    console.log("🚀 ~ fetchPoaps ~ userWallet:", userWallet);
    const response = await mw.getOwnerPoaps(userWallet);
    console.log(response);
    if (!response.success) {
      console.log("Failed to fetch your POAPs");
    } else {
      setPoaps(response.result.poaps);
    }
  };

  const getLastEvent = async () => {
    const response = await mw.getLastEvent();
    console.log("🚀 ~ getLastEvent ~ response:", response);
  };
  const getAllEvents = async () => {
    const response = await mw.getAllEvents();
    console.log("🚀 ~ getAllEvents ~ response:", response);
  };
  const getAllIssuers = async () => {
    const response = await mw.getAllIssuers();
    console.log("🚀 ~ getAllIssuers ~ response:", response);
  };
  const getIssuerByAddress = async (address: string) => {
    const issuer = await mw.getIssuerByAddress(address);
    console.log("🚀 ~ getIssuerByAddress ~ issuer:", issuer);
    if (!issuer.result.issuer) {
      const newIssuer = await createIssuerOnDB(
        address,
        issuerInfo.name,
        issuerInfo.email,
        issuerInfo.organization
      );
      console.log("🚀 ~ getIssuerByAddress ~ newIssuer:", newIssuer);
      return newIssuer;
    } else {
      setIssuer(issuer.result.issuer);
      console.log("🚀 ~ getIssuerByAddress ~ issuer:", issuer.result.issuer);
      return issuer.result.issuer;
    }
  };

  const handleEventCreation = async () => {
    console.log("🚀 ~ handleEventCreation");
    if (!issuer) {
      console.log("Issuer not found");
      return;
    }
    const event = await createEventOnDB({
      ...eventInfo,
      issuerUuid: issuer.issuerUuid,
    });
    console.log("🚀 ~ handleEventCreation ~ event : ", event);
    if (!event.eventIdInContract) {
      console.log("Failed to create event");
      return;
    } else {
      console.log("Event created successfully:", event);
      // const eventInContractTransaction = await createEvent(
      //   issuer.issuerIdInContract,
      //   event.eventIdInContract,
      //   event.maxSupply,
      //   event.mintExpiration,
      //   event.eventOrganizer,
      //   "poap"
      // );
      let miliseconds;
      let timestamp;
      if (!event.expiryDate) {
        // Timestamp for 19/10/2124 => "no expiration"
        timestamp = 4884970320;
      } else {
        miliseconds = new Date(event.expiryDate);
        timestamp = Math.floor(miliseconds.getTime() / 1000);
      }
      const eventInContractTransaction = await createEventId(
        issuer.issuerIdInContract,
        event.eventIdInContract,
        event.poapsToBeMinted,
        timestamp,
        wallet,
        wallet
      );
      console.log(
        "🚀 ~ handleEventCreation ~ eventInContractTransaction:",
        eventInContractTransaction
      );
    }
  };

  useEffect(() => {
    getLastEvent();
    getAllEvents();
    getAllIssuers();
  }, []);

  useEffect(() => {
    if (wallet) {
      getIssuerByAddress(wallet);
    }
  }, [wallet]);

  /*   const poapAppendEventData = async (poap: IGetUserPoapsResult) => {
    const response = await mw.appendEventData(poap.address, poap.nft_id);
    console.log({ response });
    if (response.success) {
      const newPoaps = poaps.map(c =>
        c.nft_id === poap.nft_id ? response.result.poap : c
      );
      setPoaps(newPoaps);
    } else {
      console.log('Failed to append data of new event to poap:', response.errorMessage, response.errorCode);
      fetchPoaps(wallet);
    }
  }; */

  async function userWalletLogin() {
    const response = await mw.userWalletLogin({
      mode: WalletMode.EvmInjected,
      preferBatchedMode: false,
    });
    console.log("🚀 ~ userWalletLogin ~ response:", response);
    if (!response.success) {
      console.log(
        "Error while logging in address:",
        response.errorMessage,
        response.errorCode
      );
    } else {
      const { walletAddress } = response.result;
      console.log("Successfully logged in address:", walletAddress);
      setWallet(walletAddress);
      fetchPoaps(walletAddress);
    }
  }

  const hasPoaps = poaps?.length > 0;

  return (
    <div className="container">
      <header>
        <h1>Stateful POAP</h1>
      </header>
      <main>
        <div>
          {wallet ? (
            <p>Wallet: {wallet}</p>
          ) : (
            <p>Wallet: No wallet connected</p>
          )}
          <div className="button-group">
            <button onClick={userWalletLogin}>User Wallet Login</button>
            <button onClick={() => fetchPoaps(wallet)}>Refresh</button>
          </div>
        </div>
        <br />
        {wallet && (
          <>
            {hasPoaps ? (
              <div className="poaps">
                {poaps.map((poap) => (
                  <div key={poap["Poap.instance"]} className={`poap poap-poap`}>
                    <p>
                      Type: Poap Address: {poap.address} Token ID:{" "}
                      {poap["Poap.instance"]}
                    </p>
                    {/* <button onClick={() => poapAppendEventData(poap)}>Lvl Up</button> */}
                  </div>
                ))}
              </div>
            ) : (
              <p>You don't own any POAP.</p>
            )}
          </>
        )}
        <div className="container">
          <h2>Smart Contract Functions</h2>
          <h3>Address: {POAP}</h3>
          <div>
            <div className="button-group">
              <button onClick={async () => await handleEventCreation()}>
                Create Event
              </button>
              <button
              // onClick={async () =>
              //   await mintPoap(issuerId, eventId, wallet, "0x", "poap")
              // }
              >
                Mint/Update Poap
              </button>
            </div>
          </div>
          <form>
            <label>
              Issuer ID:
              <input
                type="string"
                value={issuer ? issuer.issuerUuid : ""}
                // onChange={handleIssuerChange}
              />
            </label>
            <br />
            <br />
            <label>
              Event ID:
              <input
                type="number"
                value={eventId}
                onChange={handleEventChange}
              />
            </label>
            <br />
            <br />
            <label>
              Max Supply:
              <input
                type="number"
                value={maxSupply}
                onChange={handleMaxSupplyChange}
              />
            </label>
            <br />
            <br />
            <label>
              Mint Expiration:
              <input
                type="number"
                value={mintExpiration}
                onChange={handleMintExpirationChange}
              />
            </label>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
