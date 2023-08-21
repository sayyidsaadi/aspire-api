import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import asyncHandler from "express-async-handler";
import createHashPassword from "../../helper/hashPassword.js";

/**
 * @Desc Auth Login
 * @Method POST
 * @Access Public
 */
export const authLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Form Validation
  if (!email || !password)
    return res.status(400).json({ message: "All Fileds Are Required" });

  // Check User
  const checkUser = await User.findOne({ email }).populate("role");
  if (!checkUser) return res.status(404).json({ message: "User Not Found" });

  // Check Pass
  const checkPass = bcrypt.compareSync(password, checkUser.password);
  if (!checkPass)
    return res
      .status(400)
      .json({ message: `${checkUser.name} Your Password is Incorrect` });

  // Create Access Token
  const token = jwt.sign(
    {
      email: checkUser.email,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: process.env.TOKEN_EXPIRE,
    }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ user: checkUser, message: "User Login Successful" });
});

/**
 * @Desc Auth Register
 * @Method POST
 * @Access Public
 */

export const authRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password)
    return res.status(400).json({ message: "All Fileds Are Required" });

  // Check User
  const userCheck = await User.findOne({ email });
  if (userCheck) return res.status(400).json({ message: "User Already Exist" });

  // Now Send Data
  const user = await User.create({
    name,
    email,
    password: createHashPassword(password),
  });
  res.status(200).json({ user, message: "User Registration Successful" });
});

/**
 * @Desc Auth Logout
 * @Method POST
 * @Access Private
 */

export const authLogout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout Successful" });
});

/**
 * @Desc Get Loged in User
 * @Method get
 * @Access Private
 */
export const getLogedInUser = (req, res) => {
  res.status(200).json(req.me);
};
