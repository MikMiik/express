function throwError(status, message, errors) {
  const error = new Error(message);
  error.status = status;
  error.errors = errors;
  console.log(error);
  throw error;
}

module.exports = throwError;
