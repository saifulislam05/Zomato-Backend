import express from "express";
import authCheck from "../middlewares/auth.js";


import signup from "../Controller/user/signup.js";
import getAllUser from "../Controller/user/getAllUser.js";
import login from "../Controller/user/login.js";
import logout from "../Controller/user/logout.js";
import addressController from "../Controller/user/addressController.js";
import deleteUser from "../Controller/user/deleteUser.js";



const router = express.Router();

router.post("/signup", signup)

router.post("/login", login);

http: router.post("/logout", authCheck(["admin", "seller", "buyer"]), logout);

router.get("/", authCheck(["admin"]), getAllUser);

router.post(
  "/address",
  authCheck(["admin", "seller", "buyer"]),
  addressController
);


router.delete("/delete", authCheck(["admin", "seller", "buyer"]), deleteUser);

export default router;