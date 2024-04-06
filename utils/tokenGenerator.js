import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Function to generate JWT token
export const generateToken = (user) => {
  const expiry = Math.floor(Date.now() / 1000) + 7200; // 2 hours from now
  const payload = {
    id: user._id,
    fullName: user.fullName,
    role: user.role,
    exp: expiry,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET_KEY);
};
