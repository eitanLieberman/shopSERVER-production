import express from "express";
import { default as User } from "../models/User.js";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import Jwt from "jsonwebtoken";
const router = express.Router();

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.username,
    });
    if (!user) {
      user = await User.findOne({
        username: req.body.username,
      });
    }

    if (!user) {
      res.status(401).json("wrong email or password11");
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const passwordO = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (passwordO !== req.body.password) {
      res.status(401).json("wrong email or password2");
    }
    const accessToken = Jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
