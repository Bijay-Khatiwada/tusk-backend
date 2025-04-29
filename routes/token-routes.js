// server/routes/refreshToken.js  (or wherever you organize API routes)

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

// Replace with your own SECRET and expiry
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const TOKEN_EXPIRY = '15m'; // or however long you want the new token valid

router.post('/refresh-token', (req, res) => {
  const oldToken = req.body.token;

  if (!oldToken) {
    return res.status(400).json({ message: 'Token missing' });
  }

  try {
    const payload = jwt.verify(oldToken, JWT_SECRET, { ignoreExpiration: true }); // allow expired tokens

    const newToken = jwt.sign(
      { userId: payload.userId, email: payload.email }, // Copy relevant info
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    res.json({ token: newToken });
  } catch (err) {
    console.error('Refresh token error:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
