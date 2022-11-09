import { abis } from "../abis/index";
import { Contract } from "web3-eth-contract";
import { generateNewTokenForSubmissionWemadeContractAddress } from "../constants/contractAddress";
import { NewTokenInformation } from "../interfaces/GenerateNewTokenSchema";
import { getWeb3ClientWithOwnerAccount } from "../utils/web3-utils";
import { TransactionConfig, TransactionReceipt } from "web3-core";

export async function generateNewToken({
    name,
    symbol,
    to,
    amount,
    nonce
}: NewTokenInformation) {

  const web3Client = getWeb3ClientWithOwnerAccount();
  const ownerAddress = web3Client.eth.accounts.wallet[0].address;
  const ownerPrivateKey = web3Client.eth.accounts.wallet[0].privateKey;

  if (nonce === undefined) {
    nonce = await web3Client.eth.getTransactionCount(ownerAddress, "latest");
  }

  const generateNewTokenForSubmissionWemadeContract: Contract = new web3Client.eth.Contract(abis.GenerateNewTokenForSubmissionWemadeABI, generateNewTokenForSubmissionWemadeContractAddress, { from: ownerAddress});
  const data = generateNewTokenForSubmissionWemadeContract.methods
    .createNewTokenForSubmissionWemade(name, symbol, to, amount)
    .encodeABI();
  const gasLimit = await generateNewTokenForSubmissionWemadeContract.methods
    .createNewTokenForSubmissionWemade(name, symbol, to, amount)
    .estimateGas();

  const transaction: TransactionConfig = {
    from: ownerAddress,
    to: generateNewTokenForSubmissionWemadeContractAddress,
    gasPrice: web3Client.utils.toHex(await web3Client.eth.getGasPrice()),
    gas: web3Client.utils.toHex(gasLimit),
    data,
    nonce,
  }

  const signedTransaction = await web3Client.eth.accounts.signTransaction(transaction, ownerPrivateKey);
  return web3Client.eth.sendSignedTransaction(signedTransaction.rawTransaction || "")
    .then((receipt: TransactionReceipt) => {
        if (receipt.status === false) {
            console.log("Create New Token is Failed. Check a receipt,", JSON.stringify(receipt));
        } else {
            console.log("Create New Token is Success! Check a receipt,", JSON.stringify(receipt));
        }
        return receipt;
    });
}
