import asyncHandler from "express-async-handler";
import Permission from "../../models/Permission.js";
import { createSlug } from "../../helper/createSlug.js";

/**
 * @Desc Get All Permissions
 * @Method GET
 * @Access Private
 */

export const getAllPermissions = asyncHandler(async (req, res) => {
  const permissions = await Permission.find();

  // Check Permission
  if (!permissions?.length) {
    return res.status(404).json([]);
  }
  res.status(200).json({
    allPermissions: permissions,
    message: "Permissions Get SuccessFull",
  });
});

/**
 * @Desc Create New Permission
 * @Method POST
 * @Access Private
 */

export const createNewPermission = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Validation
  if (!name) {
    return res.status(400).json({ message: "Permission Name is Required" });
  }
  // Check Permission Exist or Not
  const checkPermission = await Permission.findOne({ name });
  if (checkPermission) {
    return res.status(400).json({ message: "Permission Already Exist" });
  }

  // Send Data to DB
  const permission = await Permission.create({
    name,
    slug: createSlug(name),
  });
  res
    .status(200)
    .json({ permission, message: "Permission Created Successful" });
});

/**
 * @Desc Get Singlle Permission
 * @Method GET
 * @Access Private
 */

export const singlePermission = asyncHandler(async (req, res) => {
  // Get id
  const { id } = req.params;

  // Get Single Permission From DB
  const singlePermission = await Permission.findById(id);
  if (!singlePermission) {
    return res.status(404).json({ message: "Single Permission Not Found" });
  }
  res
    .status(200)
    .json({ singlePermission, message: "Single Permission Get Success" });
});

/**
 * @Desc Delete Singlle Permission
 * @Method DELETE
 * @Access Private
 */

export const deletePermission = asyncHandler(async (req, res) => {
  // Get id
  const { id } = req.params;

  // Get Single Permission From DB
  const deletePermission = await Permission.findByIdAndDelete(id);
  if (!deletePermission) {
    return res.status(404).json({ message: "Permission Not Found" });
  }
  res.status(200).json({
    permission: deletePermission,
    message: "Permission Deleted Successful",
  });
});

/**
 * @Desc Update Permission
 * @Method PUT / PATCH
 * @Access Private
 */

export const updatePermission = asyncHandler(async (req, res) => {
  // Get id
  const { id } = req.params;
  const { name } = req.body;

  // Validation
  if (!name) {
    return res.status(400).json({ message: "Permission Name is Required" });
  }

  // Get Single Permission From DB
  const permission = await Permission.findById(id);

  // Check Permission
  if (!permission) {
    return res.status(404).json({ message: "Permission Not Found" });
  }

  // Send Data DB
  const data = await Permission.findByIdAndUpdate(
    id,
    {
      name,
      slug: createSlug(name),
    },
    {
      new: true,
    }
  );
  res.status(200).json({ data, message: " Permission Updated Successful" });
});

/**
 * @Desc Update Permission Status
 * @Method PUT / PATCH
 * @Access Private
 */

export const updatePermissionStatus = asyncHandler(async (req, res) => {
  // Get id
  const { id } = req.params;
  const { status } = req.body;

  // Send Data DB
  const data = await Permission.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );
  res.status(200).json({ data, message: " Status Updated Successful" });
});
