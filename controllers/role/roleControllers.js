import asyncHandler from "express-async-handler";
import Role from "../../models/Role.js";
import { createSlug } from "../../helper/createSlug.js";

/**
 * @Desc Get All Roles
 * @Method GET
 * @Access Private
 */

export const getAllRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find();

  // Check Role
  if (!roles?.length) {
    return res.status(404).json([]);
  }
  res.status(200).json({
    roles,
    message: "Roles Get SuccessFull",
  });
});

/**
 * @Desc Create New Role
 * @Method POST
 * @Access Private
 */

export const createNewRole = asyncHandler(async (req, res) => {
  const { name, permissions } = req.body;

  // Validation
  if (!name) {
    return res.status(400).json({ message: "Role Name is Required" });
  }
  // Check Role Exist or Not
  const checkRole = await Role.findOne({ name });
  if (checkRole) {
    return res.status(400).json({ message: "Role Already Exist" });
  }

  // Send Data to DB
  const role = await Role.create({
    name,
    slug: createSlug(name),
    permissions,
  });
  res.status(200).json({ role, message: "Role Created Successful" });
});

/**
 * @Desc Get Singlle Role
 * @Method GET
 * @Access Private
 */

export const singleRole = asyncHandler(async (req, res) => {
  // Get id
  const { id } = req.params;

  // Get Single Role From DB
  const singleRole = await Role.findById(id);
  if (!singleRole) {
    return res.status(404).json({ message: "Single Role Not Found" });
  }
  res.status(200).json({ singleRole, message: "Single Role Get Success" });
});

/**
 * @Desc Delete Singlle Role
 * @Method POST
 * @Access Private
 */

export const deleteRole = asyncHandler(async (req, res) => {
  // Get id
  const { id } = req.params;

  // Get Single Role From DB
  const deleteRole = await Role.findByIdAndDelete(id);
  if (!deleteRole) {
    return res.status(404).json({ message: "Role Not Found" });
  }
  res
    .status(200)
    .json({ role: deleteRole, message: "Role Deleted Successful" });
});

/**
 * @Desc Update Role
 * @Method GET
 * @Access Private
 */

export const updateRole = asyncHandler(async (req, res) => {
  // Get id
  const { id } = req.params;
  const { name, permissions } = req.body;

  // Validation
  if (!name) {
    return res.status(400).json({ message: "Role Name is Required" });
  }

  // Get Single Role From DB
  const role = await Role.findById(id);

  // Check Role
  if (!role) {
    return res.status(404).json({ message: "Role Not Found" });
  }

  // Send Data DB
  const data = await Role.findByIdAndUpdate(
    id,
    {
      name,
      slug: createSlug(name),
      permissions,
    },
    {
      new: true,
    }
  );
  res.status(200).json({ data, message: " Role Updated Successful" });
});

/**
 * @Desc Update Role Status
 * @Method GET
 * @Access Private
 */

export const updateRoleStatus = asyncHandler(async (req, res) => {
  // Get id
  const { id } = req.params;
  const { status } = req.body;

  // Send Data DB
  const data = await Role.findByIdAndUpdate(
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
