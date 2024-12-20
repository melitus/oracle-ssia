const {
  getSystem_1_Hash,
  getSystem_2_Hash,
  getDGKHash,
  getGatewayFromDKG,
  getSecurityLicenseFromDKG,
} = require("./http");
const { runIExecApplicationOutputAndSaveOnBlockChain } = require("./hash");
const checkHashes = require('./helper')
const { logger } = require("./logger");

const onwerid_1 = 12333;
const onwerid_2 = 12388;
/*****************************************************************************
 *                                 ARGUMENTS                                 *
 *****************************************************************************/
 let [contractId] = process.argv.slice(2);

const runOracleVerificationOperation = async ({
  hash1,
  hash2,
  hash3,
  gateway,
  securityLicense,
}) => {
  let result;
  const responseCheck = checkHashes.compare(hash1, hash2, hash3)
  logger.info(JSON.stringify({responseCheck}))
  try {
    if (
      responseCheck === true &&
      gateway === true &&
      securityLicense === true
    ) {
      result = {
        contractId: contractId,
        business_contract: responseCheck,
        securityLicense: securityLicense,
        gateway: gateway,
        connection: "green",
      };
    } else {
      result = {
        contractId: contractId,
        business_contract: responseCheck,
        securityLicense: securityLicense,
        gateway: gateway,
        connection: "red",
      };
    }
    return result;
  } catch (error) {
    throw Error(error);
  }
};

// generate sequential connection Id
// add it to the verification value
const callApi = async () => {
  try {
    const [hash1, hash2, hash3, gateway, securityLicense] = await Promise.all([
      await getSystem_1_Hash(contractId),
      await getSystem_2_Hash(contractId),
      await getDGKHash(contractId),
      await getGatewayFromDKG(contractId),
      await getSecurityLicenseFromDKG(onwerid_1, onwerid_2),
    ]);
    logger.info(JSON.stringify({ hash1, hash2, hash3, gateway, securityLicense }));

    const verificationResult = await runOracleVerificationOperation({
      hash1: hash1.data.hash,
      hash2: hash2.data.hash,
      hash3: hash3.dkgHash,
      gateway,
      securityLicense,
    });
    console.log({verificationResult});
    await runIExecApplicationOutputAndSaveOnBlockChain(verificationResult);
  } catch (error) {
    console.trace(error);
    process.exit(1);
  }
};

callApi();