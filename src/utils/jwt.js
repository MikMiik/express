const jwt = require("jsonwebtoken");

exports.createToken = (payload, options) => {
  const token = jwt.sign(payload, process.env.MAIL_JWT_SECRET, options);
  return token;
};

exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.MAIL_JWT_SECRET);
    return {
      success: true,
      data: decoded,
    };
  } catch (error) {
    return {
      success: false,
      data: error.message,
    };
  }
};
