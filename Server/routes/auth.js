import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ msg: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "Account saved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: " Error in Adding User",
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const {email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "User Not exists" });
    }
     const checkPassword = await bcrypt.compare(password, user.password)
     if (!checkPassword) {
      return res.status(401).json({success: false, message: "Wrong Password"})
     }
     const token  = jwt.sign({id:user._id},"sahil@290500",{expiresIn: "5h"})
    return res
      .status(200)
      .json({ success: true,token, user:{name: user.name}, message: "Account Login successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: " Error in Login User",
    });
  }
});

export default router;
