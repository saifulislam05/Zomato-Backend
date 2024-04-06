import bcrypt from "bcryptjs";
import userModel from "../../models/user/user.js";
import { generateToken } from "../../utils/tokenGenerator.js";


const signup = async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const newUser = new userModel({
    ...req.body,
    password: hash,
  });

  try {
    await newUser.save();

    const token = generateToken(newUser);

    res.json({
      success: true,
      message: "User signed up successfully",
      token: token,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists. Please use a different email.",
      });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages,
      });
    }

    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export default signup;
