const { generateNewToken } = require("./lib/controller/generateNewTokenForSubmissionWemade");
const { getWeb3Client } = require("./lib/utils/web3-utils");

async function run() {
    const web3Client = getWeb3Client();
    return generateNewToken({
        name: "Test_02",
        symbol: "TT2",
        to: "0x4C6F2Ad51F134Ee6cBA536995b5dc6D62a32A355",
        amount: web3Client.utils.toWei("100000000", "ether"),
    }).then(receipt => {
        console.log("Success!");
        console.log(JSON.stringify(receipt));
    })
}

run();