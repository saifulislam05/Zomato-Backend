import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../../models/user/user.js";
import dotenv from "dotenv";
dotenv.config();

const login = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not registered with this email",
    });
  }
  const userToken = user?.token;


  if (userToken) {
    try {
      jwt.verify(userToken, process.env.TOKEN_SECRET_KEY);
      return res.json({
        success: true,
        message: "You are already Logged in",
        token: userToken,
      });
    } catch (error) {
      
    }
  }



  const isPasswordCorrect = bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: "wrong password",
    });
  }

  const expiry = Math.floor(Date.now() / 1000) + 7200; // 2hr from now

  const payload = {
    id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
    exp: expiry,
  };

  const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY);

  await userModel.findByIdAndUpdate(user._id, { token });

  res.json({
    success: true,
    message: "login successed",
    token: token,
  });
};

export default login;
