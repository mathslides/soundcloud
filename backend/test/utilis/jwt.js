const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { secret, expiresIn } = jwtConfig;

const generateToken = (user) => {
  return jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn, 10) }
  );
};

module.exports = { generateToken };

