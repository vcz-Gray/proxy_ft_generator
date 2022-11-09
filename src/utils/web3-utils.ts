const Web3 = require("web3");
require("dotenv").config();

export function getWeb3Client() {
    return new Web3(new Web3.providers.HttpProvider(
        process.env.HTTPS_SERVER_ENDPOINT_TESTNET || "",
        ));
  }

export function getWeb3ClientWithOwnerAccount() {
    const web3Client = getWeb3Client();
    web3Client.eth.accounts.wallet.clear();
    web3Client.eth.accounts.wallet.add(
        process.env.OWNER_PRIVATE_KEY || "",
    );
    return web3Client;
}