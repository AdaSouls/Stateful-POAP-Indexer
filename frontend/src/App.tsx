import { useState } from 'react';
import './App.css';
import mw from 'mw';
import type { IGetOwnerPoapsResult } from '@game/db';
import { WalletMode } from '@paima/sdk/providers.js';
import { createEvent, mintPoap } from './services/poap.js';
import { POAP } from "./services/constants.js";

function App() {
  const [poaps, setPoaps] = useState<IGetOwnerPoapsResult[]>([]);
  const [wallet, setWallet] = useState('');
  const [issuerId, setIssuerId] = useState(0);
  const [eventId, setEventId] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [mintExpiration, setMintExpiration] = useState(0);

  const handleIssuerChange = (event: any) => {
    setIssuerId(event.target.value);
  }

  const handleEventChange = (event: any) => {
    setEventId(event.target.value);
  }

  const handleMaxSupplyChange = (event: any) => {
    setMaxSupply(event.target.value);
  }

  const handleMintExpirationChange = (event: any) => {
    setMintExpiration(event.target.value);
  }

  const fetchPoaps = async (userWallet: string) => {
    console.log("🚀 ~ fetchPoaps ~ userWallet:", userWallet)
    const response = await mw.getOwnerPoaps(userWallet);
    console.log(response);
    if (!response.success) {
      console.log('Failed to fetch your POAPs');
    } else {
      setPoaps(response.result.poaps);
    }
  };

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
    if (!response.success) {
      console.log('Error while logging in address:', response.errorMessage, response.errorCode);
    } else {
      const { walletAddress } = response.result;
      console.log('Successfully logged in address:', walletAddress);
      setWallet(walletAddress);
      fetchPoaps(walletAddress);
    }
  }

  const hasPoaps = poaps?.length > 0

  return (
    <div className="container">
      <header>
        <h1>Stateful POAP</h1>
      </header>
      <main>
        <div>
          {wallet ? <p>Wallet: {wallet}</p> : <p>Wallet: No wallet connected</p>}
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
                {poaps.map(poap => (
                  <div key={poap['Poap.instance']} className={`poap poap-poap`}>
                    <p>
                      Type: Poap Address: {poap.address} Token ID: {poap['Poap.instance']}
                    </p>
                    {/* <button onClick={() => poapAppendEventData(poap)}>Lvl Up</button> */}
                  </div>
                ))}
              </div>
            ) : (
              <p>
                You don't own any POAP.
              </p>
            )}
          </>
        )}
        <div className='container'>
          <h2>Smart Contract Functions</h2>
          <h3>Address: {POAP}</h3>
          <div>
            <div className="button-group">
              <button onClick={async () => await createEvent(issuerId, eventId, maxSupply, mintExpiration, wallet, "poap")}>Create Event</button>
              <button onClick={async () => await mintPoap(issuerId, eventId, wallet, "0x", "poap")}>Mint/Update Poap</button>
            </div>
          </div>
          <form>
            <label>
              Issuer ID:
              <input type="number" value={issuerId} onChange={handleIssuerChange} />
            </label>
            <br />
            <br />
            <label>
              Event ID:
              <input type="number" value={eventId} onChange={handleEventChange} />
            </label>
            <br />
            <br />
            <label>
              Max Supply:
              <input type="number" value={maxSupply} onChange={handleMaxSupplyChange} />
            </label>
            <br />
            <br />
            <label>
              Mint Expiration:
              <input type="number" value={mintExpiration} onChange={handleMintExpirationChange} />
            </label>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
