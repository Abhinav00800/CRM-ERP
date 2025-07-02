import db from "../utils/db.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const result = await db.query(
      `SELECT id, email, password, role_id, name FROM users WHERE email = $1`,
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "User is not registered" });
    }
    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    // Generate unique ID for refresh token
    const uid = uuidv4();
    // Save uid in DB with user_id and role_id
    await db.query(`DELETE FROM refresh_tokens WHERE user_id = $1`, [user.id]); // Clean up old tokens
    await db.query(
      `Insert into refresh_tokens (id, user_id, role_id, expires_at) values ($1, $2, $3, NOW() + interval '1 days')`,
      [uid, user.id, user.role_id]
    );
    // Create access token
    const accessToken = jwt.sign(
      { userId: user.id, uid, roleId: user.role_id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    // Create refresh token
    const refreshToken = jwt.sign(
      { userId: user.id, uid, roleId: user.role_id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // Set refresh token in cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    // Send access token in response
    res.status(200).json({
      accessToken,
      message: "Login successful",
      user: {
        userId: user.id,
        email: user.email,
        roleId: user.role_id,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const { uid, userId, roleId } = decoded;

    // Query the refresh token
    const result = await db.query(
      `SELECT * FROM refresh_tokens 
       WHERE id = $1 AND user_id = $2 AND role_id = $3 AND valid = true AND expires_at > NOW()`,
      [uid, userId, roleId]
    );

    // If no valid token, delete it
    if (result.rowCount === 0) {
      await db.query(
        `DELETE FROM refresh_tokens WHERE id = $1 OR user_id = $2`,
        [uid, userId]
      );
      return res
        .status(401)
        .json({ message: "Invalid or expired refresh token" });
    }

    // Token is valid → Issue new access token
    const accessToken = jwt.sign(
      { userId, uid, roleId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      accessToken,
      message: "Access token refreshed successfully",
    });
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      try {
        const decoded = jwt.decode(token);
        if (decoded?.uid || decoded?.userId) {
          await db.query(
            `DELETE FROM refresh_tokens WHERE id = $1 OR user_id = $2`,
            [decoded.uid, decoded.userId]
          );
        }
        res.status(401).json({ message: "Invalid or expired refresh token" });
      } catch (_) {
        console.error("Error refreshing token:", error);
        res.status(500).json({ message: "Server side error" });
      }
    }
    console.error("Error refreshing token:", error);
    res.status(500).json({ message: "Server side error" });
  }
};

const logout = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  const token = refreshToken || accessToken;

  if (!token) {
    return res.sendStatus(204); // No token to delete, but still "successfully logged out"
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ safer than decode
    const uid = decoded?.uid;
    const userId = decoded?.userId;

    if (uid || userId) {
      await db.query(
        `DELETE FROM refresh_tokens WHERE id = $1 OR user_id = $2`,
        [uid, userId]
      );
    }
  } catch (error) {
    console.error("Error verifying token during logout:", error);
    // Even if verification fails, we still clear the cookie
  }

  // Always clear the cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};


export { login, refresh, logout };
