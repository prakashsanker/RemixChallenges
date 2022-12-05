const hre = require("hardhat");

const numChallenges = 5;
async function main() {
  for(let i = 1; i <= numChallenges; i++) {
    const contractName = `Challenge${i}`;
    const Contract = await hre.ethers.getContractFactory(contractName);
    const contract = await Contract.deploy();
  
    await contract.deployed();
  
    console.log(contractName, contract.address);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
