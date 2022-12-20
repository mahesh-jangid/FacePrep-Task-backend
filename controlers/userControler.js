import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!email || !password) {
    res.status(401).json({
      message: "All Fields Are Required",
    });
  }
  if (user && user.password === password) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Login Success",
    });
  } else {
    res.status(401).json({
      message: "User Not Found",
    });
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({
      message: "User Already Exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      message: "Register Success",
    });
  } else {
    res.status(400).json({
      message: "Invalid User Data",
    });
  }
});

export { authUser, registerUser };
