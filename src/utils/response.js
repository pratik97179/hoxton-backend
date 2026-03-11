function success(res, statusCode, data = null, message = 'OK') {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      error: null,
    });
  }
  
  function failure(res, statusCode, message, errorCode, data = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      data,
      error: errorCode || message,
    });
  }
  
  module.exports = {
    success,
    failure,
  };