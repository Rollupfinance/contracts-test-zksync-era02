import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";
import "hardhat-abi-exporter";

const zkTestnet =
  process.env.NODE_ENV == "test" ? {
    url: "http://localhost:3050",
    ethNetwork: "http://localhost:8545",
    zksync: true,
    }
  : {
      url: "https://testnet.era.zksync.dev",
      ethNetwork: "goerli",
      zksync: true,
      verifyURL: 'https://zksync2-testnet-explorer.zksync.dev/contract_verification'
    };

module.exports = {
  zksolc: {
    version: "1.3.6",
    compilerSource: "binary",
    settings: {},
  },
  defaultNetwork: "zkTestnet",
  networks: {
    hardhat: {
      zksync: true
    },
    zkTestnet,
    zkMainnet: {
      url: "https://mainnet.era.zksync.io", // URL of the zkSync network RPC
      ethNetwork: "mainnet",
      zksync: true,
      verifyURL: 'https://zksync2-mainnet-explorer.zksync.io/contract_verification'
    },
  },
  solidity: {
    version: "0.8.17",
  },
  abiExporter: [
    {   
      path: './abis',
      runOnCompile: true,
      clear: true,
      flat: true,
    }   
  ]
};

