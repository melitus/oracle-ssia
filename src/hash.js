const fs = require("fs").promises;
const ethers = require("ethers");

const { logger } = require("./logger");

const root = "iexec_out";
const resultFilePath = `${root}/result.txt`;
const computedJsonObjPath = `${root}/computed.json`;

const writeFile = async (filePath, content) => {
  try {
    await fs.writeFile(filePath, content);
  } catch (error) {
    logger.error(`Got an error trying to write to a file: ${error.message}`);
  }
};

const storeResultInResultFile = async (data) => {
  logger.info({ data });
  await writeFile(resultFilePath, JSON.stringify(data));
};

const storeFileComputedJsonObjFile = async (digest) => {
  await writeFile(computedJsonObjPath, digest);
};

const generateCallback = async (verificationResult) => {
  const {
    contractId,
    business_contract,
    securityLicense,
    gateway,
    connection,
  } = verificationResult;
  logger.info("Fetching values to generate callback data", JSON.stringify({
    contractId,
    business_contract,
    securityLicense,
    gateway,
    connection,
  }));
  try {
    logger.info("encoding result for blockchain");
    //The callback.iexec value is stored in the results field of the Task object in the IexecHub smart contract.
    const iExecCallback = ethers.utils.defaultAbiCoder.encode(
      ["uint256", "bool", "bool", "bool", "string"],
      [contractId, business_contract, securityLicense, gateway, connection]
    );
    logger.info(JSON.stringify({ iExecCallback }));
    return iExecCallback;
  } catch (error) {
    logger.info("Error encoding file to be saved in the callback file", error);
  }
};

const runIExecApplicationOutputAndSaveOnBlockChain = async (
  verificationResult
) => {
  try {
    logger.info("Appending some results in /iexec_out/");
    await storeResultInResultFile(verificationResult);

    logger.info("Declaring everything is computed");
    // GENERATE CALLBACK
    const callbackData = await generateCallback(verificationResult);
    console.log({callbackData})
    const computedJsonObj = {
      "callback-data": callbackData,
    };
    console.log({computedJsonObj});
    await storeFileComputedJsonObjFile(JSON.stringify(computedJsonObj));
  } catch (error) {
    logger.error("Error encoding file to be saved in the callback file", error);
    process.exit(1);
  }
};

module.exports = {
  runIExecApplicationOutputAndSaveOnBlockChain,
};
