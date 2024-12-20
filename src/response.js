
const responseMessage = (responseBody) => {
  const response = {
    status: responseBody.status,
    data: responseBody.data.message,
  }
  return response
}

const responseData = (responseBody) => {
  const response = {
    status: responseBody.status,
    data: responseBody.data.data,
  }
  return response
}

const responseErrorMessage = (error) => {
  const responseError = {
    status: error.response,
    data: error.response.data,
  }
  return responseError
}

module.exports = {
  responseMessage,
  responseData,
  responseErrorMessage,
}
