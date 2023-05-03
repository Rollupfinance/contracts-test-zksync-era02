import { Wallet, Provider } from "zksync-web3";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

import { readTmpAddresses } from "./shared/helpers";

require('dotenv').config();
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  // Initialize the wallet.
  const wallet = new Wallet(PRIVATE_KEY);
  const signer = wallet.connect(new Provider(hre.network.config["url"]))

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  const network = hre.network.name;
  const cached = readTmpAddresses(network);

  console.log(`Running deploy script for only deploy vault`)

  const vaultArtifact = await deployer.loadArtifact("Vault");
  const vault = await deployer.deploy(vaultArtifact, []);
  console.log(`Vault deployed at ${vault.address}`);
}

