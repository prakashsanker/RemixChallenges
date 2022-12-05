const { assert } = require("chai");
const hre = require('hardhat');
const networks = require('../networks');
const networkNames = Object.keys(networks);

const challenges = [
  { contractName: 'Challenge1', contractAddr: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" },
  { contractName: 'Challenge2', contractAddr: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9" },
  { contractName: 'Challenge3', contractAddr: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9" },
  { contractName: 'Challenge4', contractAddr: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707" },
  { contractName: 'Challenge5', contractAddr: "0x0165878A594ca255338adfa4d48449f69242Eb8F" },
];

describe("Challenges", function () {
  for(let i = 0; i < networkNames.length; i++) {
    const networkName = networkNames[i];
    describe(networkName, () => {
      before(() => {
        hre.changeNetwork(networkName);
      });

      for(let j = 0; j < challenges.length; j++) {
        const { contractName, contractAddr } = challenges[j];
        it(`should have won ${contractName}`, async function () {
          const contract = await ethers.getContractAt(contractName, contractAddr);
          
          assert(await contract.hasWon(), 'did not pass');
        });
      }
    });
  }
});
