const axiosInstance = require('axios')

const {
    responseErrorMessage,
    responseMessage,
    responseData,
  } = require('./response')
  

const getSystem_1_Hash = async (contractId) => {
  console.log({contractId})
  const system_1_Url = `http://ec2-44-213-31-19.compute-1.amazonaws.com:4000/v1/api/business-contract/${contractId}/system_1-hash`
    try {
      const responseBody = await axiosInstance.get(system_1_Url)

      if (responseBody.status > 299) {
        return responseMessage(responseBody)
      }
      return responseData(responseBody)
    } catch (error) {
      return responseErrorMessage(error)
    }
  }

  const getSystem_2_Hash = async (contractId) => {
    const system_2_Url = `http://ec2-3-232-91-206.compute-1.amazonaws.com:4000/v1/api/business-contract/${contractId}/system_2-hash`
    try {
      const responseBody = await axiosInstance.get(system_2_Url)
      if (responseBody.status > 299) {
        return responseMessage(responseBody)
      }
      return responseData(responseBody)
    } catch (error) {
      return responseErrorMessage(error)
    }
  }
  
  const getDGKHash = async (patientId) => {
    
    const DKGUrl = `http://ec2-18-185-149-155.eu-central-1.compute.amazonaws.com:4000/api/consensus/patientDataHash/${patientId}`
    try {
      const responseBody = await axiosInstance.get(DKGUrl)

      if (responseBody.status > 299) {
        return responseMessage(responseBody)
      }
      return {status: 200, dkgHash: responseBody.data}

    } catch (error) {
      return responseErrorMessage(error)
    }
  }
  
  const getGatewayFromDKG = async (patientId) => {
    const gatewayDKGUrl =  `http://ec2-18-185-149-155.eu-central-1.compute.amazonaws.com:4000/api/consensus/permissionConsensus/${patientId}`
    try {
      const responseBody = await axiosInstance.get(gatewayDKGUrl)
      if (responseBody.status > 299) {
        return responseMessage(responseBody)
      }
      return responseBody.data

    } catch (error) {
      return responseErrorMessage(error)
    }
  }


  const getSecurityLicenseFromDKG = async (ownerId1, ownerId2) => {
    console.log({ownerId1, ownerId2})
    const securityLicenseDKGUrl = `http://ec2-18-185-149-155.eu-central-1.compute.amazonaws.com:4000/api/consensus/medicalLicenseConsenus/owner1/${ownerId1}/owner2/${ownerId2}`
     try {
       const responseBody = await axiosInstance.get(securityLicenseDKGUrl)

       if (responseBody.status > 299) {
         return responseMessage(responseBody)
       }
       return responseBody.data
 
     } catch (error) {
      console.trace(error)
       return responseErrorMessage(error)
     }
   }
  
  module.exports = {
    getSystem_1_Hash,
    getSystem_2_Hash,
    getDGKHash,
    getGatewayFromDKG,
    getSecurityLicenseFromDKG
  }