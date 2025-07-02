import jwt from 'jsonwebtoken';
import db from '../utils/db.js';

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { userId, uid, roleId } = decoded;

    // Check if the refresh token corresponding to uid and userId is still valid
    const result = await db.query(
      `SELECT 1 FROM refresh_tokens WHERE id = $1 AND user_id = $2 AND role_id = $3 AND valid = true AND expires_at > NOW()`,
      [uid, userId, roleId]
    );

    if (result.rowCount === 0) {
      // UID mismatch or revoked → delete it
      await db.query(
        `DELETE FROM refresh_tokens WHERE id = $1 OR user_id = $2`,
        [uid, userId]
      );
       res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
      });
      return res.status(403).json({ message: 'Access token invalid. Logged out.' });
    }

    // Attach user info to request
    req.user = { userId, uid, roleId };
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      const decoded = jwt.decode(token);
      if (decoded?.uid || decoded?.userId) {
        await db.query(
          `DELETE FROM refresh_tokens WHERE id = $1 OR user_id = $2`,
          [decoded.uid, decoded.userId]
        );
      }

      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
      });
      return res.status(403).json({ message: 'Access token is invalid. Logged out.' });
    }

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Access token expired' });
    }

    console.error('Unexpected error in token verification:', err);
    res.status(500).json({ message: 'Token verification failed' });
  }
};

export default authenticateToken;
