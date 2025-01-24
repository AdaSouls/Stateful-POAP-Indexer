const yaml = require("js-yaml");
const fs = require("fs");
const parameters = require("../parameters.json");
const path = require("path");
const hre = require("hardhat");

const getBlockNumber = async () => {
  const blockNumber = await hre.ethers.provider.getBlockNumber();
  return blockNumber;
};

async function main() {
  const accounts = await ethers.getSigners();
  // Deploy Poap
  const Poap = await hre.ethers.getContractFactory("Poap");
  const poap = await Poap.deploy(
    parameters.Poap.name,
    parameters.Poap.symbol,
    accounts[0].address
  );

  await poap.waitForDeployment();
  await poap["initialize(string,address[])"](parameters.Poap.baseUri, []);

  const newContractAddress = await poap.getAddress();
  console.log("Poap deployed and initialized at: ", newContractAddress);

  const newBlockHeight = await getBlockNumber();

  console.log(newBlockHeight);

  // I have to update extensions.yml
  let doc = yaml.load(
    fs.readFileSync(
      path.resolve(__dirname, "../../../../extensions.yml"),
      "utf-8"
    )
  );

  doc.extensions[0].contractAddress = newContractAddress;
  doc.extensions[1].contractAddress = newContractAddress;
  doc.extensions[2].contractAddress = newContractAddress;

  doc.extensions[0].startBlockHeight = newBlockHeight;
  doc.extensions[1].startBlockHeight = newBlockHeight;
  doc.extensions[2].startBlockHeight = newBlockHeight;

  fs.writeFileSync(
    "extensions.yml",
    yaml.dump(doc, {
      forceQuotes: true,
    })
  );

  // Verify the contract after deploying
  /*await hre.run("verify:verify", {
    address: await poap.getAddress(),
    constructorArguments: [
      parameters.Poap.name,                                               
      parameters.Poap.symbol,
      accounts[0].address,
    ],
  });*/
}

main();
