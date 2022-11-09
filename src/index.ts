import { generateNewToken } from "./controller/generateNewTokenForSubmissionWemade";
import { getWeb3Client } from "./utils/web3-utils";

async function run() {
    const web3Client = getWeb3Client();
    return generateNewToken({
        name: "Test_02",
        symbol: "TT2",
        to: "0x4C6F2Ad51F134Ee6cBA536995b5dc6D62a32A355",
        amount: web3Client.utils.toWei("100000000", "ether"),
    });
}

run();