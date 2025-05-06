const response = require("@/utils/response.js");

function errorHandler(error, req, res, next) {
  response.error(res, error.status, error.toString(), error.errors);
}

module.exports = errorHandler;
