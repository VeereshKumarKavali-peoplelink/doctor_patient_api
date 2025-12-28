const ErrorCodes = {
    ERROR: 500, // standard error
    UNAVAILABLE: 503,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    ACCESS_FORBIDN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_FOUND: 405
  };
  
function success(body, response) {
    return buildResponse(200, body, response);
}
  
function failure(errorType, body, response) {
    let errorCode = ErrorCodes[errorType]
      ? ErrorCodes[errorType]
      : ErrorCodes.ERROR;
    return buildResponse(errorCode, body, response);
}
  
  
function buildResponse(statusCode, body, response) {
    return response.status(statusCode).json(body);
  }

module.exports ={success, failure}