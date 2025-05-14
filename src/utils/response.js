function success(res, status = 200, data, message) {
  if (status === 204) return res.status(status).send();

  return res.status(status).json({
    success: true,
    data,
    message: message,
  });
}

function error(res, status, message, errors) {
  return res.status(status).json({
    success: false,
    message,
    errors,
  });
}

module.exports = { success, error };
