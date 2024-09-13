
const db = require('../db/models');

async function verifyToken(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied, AuthHeader does not exist' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied, token does not exist' });
  }

  try {
    // Check if token exists in the database
    const userToken = await db.LoginToken.findOne({ where: { token } });
    if (!userToken) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const currentTime = new Date();
    if (currentTime > userToken.expiredAt) {
      return res.status(401).json({ error: 'Token expired' });
    }


    req.userId = userToken.userId;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = verifyToken;
