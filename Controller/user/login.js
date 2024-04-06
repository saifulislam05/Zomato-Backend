import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../../models/user/user.js";
import { generateToken } from "../../utils/tokenGenerator.js";  
import dotenv from "dotenv";
dotenv.config();

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not registered with this email",
      });
    }

  

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }
  // Check if user already has a valid token
    const userToken = user.token;
    if (userToken) {
      try {
        jwt.verify(userToken, process.env.TOKEN_SECRET_KEY);
        return res.json({
          success: true,
          message: "You are already logged in",
          token: userToken,
        });
      } catch (error) {
        // Token is not valid, proceed with login
      }
    }
    const token = generateToken(user);
    await userModel.findByIdAndUpdate(user._id, { token });

    res.json({
      success: true,
      message: "Login succeeded",
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export default login;
