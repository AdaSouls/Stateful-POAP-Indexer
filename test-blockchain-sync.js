#!/usr/bin/env node

/**
 * Test script for blockchain synchronization
 * This script tests the blockchain sync service independently
 */

import { ethers } from 'ethers';

// Contract configuration
const POAP_CONTRACT_ADDRESS = "0xE2113297a478889eFc11e0DC643D16a0178c2963";
const providerRPC = {
  name: "Amoy",
  rpc: "https://rpc-amoy.polygon.technology",
  chainId: 80002,
};

// POAP Contract ABI - EventCreated event definition
const POAP_CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "issuerId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "eventMaxSupply",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "eventMintExpiration",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "eventOrganizer",
        "type": "address"
      }
    ],
    "name": "EventCreated",
    "type": "event"
  }
];

async function testBlockchainConnection() {
  try {
    console.log('🔍 Testing blockchain connection...');
    
    const provider = new ethers.JsonRpcProvider(providerRPC.rpc, {
      chainId: providerRPC.chainId,
      name: providerRPC.name,
    });
    
    const contract = new ethers.Contract(
      POAP_CONTRACT_ADDRESS,
      POAP_CONTRACT_ABI,
      provider
    );

    // Test basic connection
    const currentBlock = await provider.getBlockNumber();
    console.log(`✅ Connected to blockchain. Current block: ${currentBlock}`);

    // Test contract connection
    const code = await provider.getCode(POAP_CONTRACT_ADDRESS);
    if (code === "0x") {
      console.log("❌ Contract not deployed at address:", POAP_CONTRACT_ADDRESS);
      return;
    }
    console.log(`✅ Contract found at address: ${POAP_CONTRACT_ADDRESS}`);

    // Test querying recent events
    const fromBlock = Math.max(1, currentBlock - 1000);
    console.log(`🔍 Querying events from block ${fromBlock} to ${currentBlock}...`);
    
    const events = await contract.queryFilter(
      "EventCreated",
      fromBlock,
      "latest"
    );

    console.log(`📊 Found ${events.length} EventCreated events in recent blocks`);
    
    if (events.length > 0) {
      console.log('📋 Recent events:');
      events.slice(-5).forEach((event, index) => {
        const decoded = contract.interface.parseLog({
          topics: event.topics,
          data: event.data
        });
        
        if (decoded) {
          const { issuerId, eventId, eventMaxSupply, eventMintExpiration, eventOrganizer } = decoded.args;
          console.log(`  ${index + 1}. Event ID: ${eventId.toString()}, Issuer: ${issuerId.toString()}, Max Supply: ${eventMaxSupply.toString()}, Organizer: ${eventOrganizer}`);
        }
      });
    }

    console.log('✅ Blockchain sync test completed successfully!');
    
  } catch (error) {
    console.error('❌ Blockchain sync test failed:', error);
  }
}

// Run the test
testBlockchainConnection();







