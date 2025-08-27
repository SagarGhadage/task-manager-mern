const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/tokens");

/**
 * Generate jwt token
 * - Payload must contain fields
 * --- "sub": `userId` parameter
 * --- "type": `type` parameter
 *
 * - Token expiration must be set to the value of `expires` parameter
 *
 * @param {id} userId - user id
 * @param {Number} expires - Token expiration time in seconds
 * @param {string} type - Access token type eg: Access, Refresh etc
 * @param {string} [secret] - Secret key to sign the token, defaults to config.jwt.secret
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload={
      sub:userId,
      iat:Math.floor(Date.now()/1000),
      exp:expires,
      type
  }
  return jwt.sign(payload,secret)
};

/**
 * Generate auth token
 * Example response:
 * "access": {
 *          "token": "eyJhbGcipiJIUzI1NiIs...",
 *          "expires": "2025-07-24T23:51:19.036Z"
 * }
 */
const generateAuthTokens = async (user) => {
  const tokenExpires=Math.floor(Date.now()/1000)+config.jwt.accessExpirationMinutes*60;
  const token=generateToken(user.id,tokenExpires,tokenTypes.ACCESS);
  return {
    access:{
      token:token,
      expires:new Date(tokenExpires*1000)
    }
  }
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
