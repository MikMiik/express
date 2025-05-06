function success(res, status = 200, data, message) {
  return res.status(status).json({
    status: "Success",
    data,
    message: message,
  });
}

function error(res, status, message, errors) {
  return res.status(status).json({
    status: "Error",
    message,
    errors,
  });
}

module.exports = { success, error };
