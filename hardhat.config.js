require("@nomicfoundation/hardhat-toolbox");
require("hardhat-change-network");
const networks = require('./networks.json');

module.exports = {
  solidity: "0.8.17",
  networks
};