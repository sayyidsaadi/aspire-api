import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import User from "../../models/User.js";
import createHashPassword from "../../helper/hashPassword.js";
import { sendEmail } from "../../util/sendEmail.js";

/**
 * @Desc Get All Users
 * @Method GET
 * @Access Private
 */

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate("role");

  // Check User
  if (!users?.length) {
    return res.status(404).json({ message: "Users Not Found" });
  }
  res.status(200).json({
    users,
    message: "Users Get SuccessFull",
  });
});

/**
 * @Desc Create New User
 * @Method POST
 * @Access Private
 */

export const createNewUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All Fileds Are Required" });
  }
  // Check User Exist or Not
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return res.status(400).json({ message: "User Already Exist" });
  }

  // Send Data to DB
  let createdUser = await User.create({
    name,
    email,
    password: createHashPassword(password),
    role,
  });
  let user = await createdUser.populate("role");

  // Send Email
  sendEmail({
    to: email,
    sub: "Account Access Info",
    msg: `Dear ${name} Your Email Is: ${email} and Your Password is: ${password}`,
    name: name,
  });
  res.status(200).json({ user, message: "User Created Successful" });
});

/**
 * @Desc Get Singlle User
 * @Method GET
 * @Access Private
 */

export const singleUser = asyncHandler(async (req, res) => {
  // Get id
  const { id } = req.params;

  // Get Single User From DB
  const singleUser = await User.findById(id);
  if (!singleUser) {
    return res.status(404).json({ message: "Single User Not Found" });
  }
  res.status(200).json({ singleUser, message: "Single User Get Success" });
});

/**
 * @Desc Delete Singlle User
 * @Method DELETE
 * @Access Private
 */

export const DeleteUser = asyncHandler(async (req, res) => {
  // Get id
  const { id } = req.params;

  // Get Single User From DB
  const deleteUser = await User.findByIdAndDelete(id);
  if (!deleteUser) {
    return res.status(404).json({ message: "User Can Not Delete" });
  }
  res
    .status(200)
    .json({ user: deleteUser, message: "User Deleted Successful" });
});

/**
 * @Desc Update User
 * @Method PUT?PATCH
 * @Access Private
 */

export const updateUser = asyncHandler(async (req, res) => {
  // Get id
  const { id } = req.params;
  const { name, email, mobile, password, currentpassword, role } = req.body;

  // Get Single User From DB
  const user = await User.findById(id);

  // Check Current Password
  if (currentpassword) {
    const currentPass = bcrypt.compareSync(currentpassword, user.password);

    if (!currentPass) {
      return res.status(400).json({ message: "Current Password is Incorrect" });
    }
  }

  // Get Info From DB
  const updateName = name ? name : user.name;
  const updateEmail = email ? email : user.email;
  const updateMobile = mobile ? mobile : user.mobile;
  const updatePassword = password
    ? createHashPassword(password)
    : user.password;
  const updatephoto = req.file?.filename ? req.file.filename : user.photo;
  const updateRole = role ? role : user.role;

  // Send Data DB
  const data = await User.findByIdAndUpdate(
    id,
    {
      name: updateName,
      email: updateEmail,
      password: updatePassword,
      mobile: updateMobile,
      photo: updatephoto,
      role: updateRole,
    },
    {
      new: true,
    }
  );
  res.status(200).json({ data, message: `${name} Updated Successful` });
});

/**
 * @Desc Update User Status
 * @Method PUT/PATCH
 * @Access Private
 */

export const userUpdateStatus = asyncHandler(async (req, res) => {
  // Get id
  const { id } = req.params;
  const { status } = req.body;

  // Send Data DB
  const data = await User.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );
  res.status(200).json({ data, message: "Status Updated Successful" });
});
