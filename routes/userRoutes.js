import express from "express";
import {
  DeleteUser,
  createNewUser,
  getAllUsers,
  singleUser,
  updateUser,
  userUpdateStatus,
} from "../controllers/users/userControllers.js";
import { userPhotoUploadMulter } from "../util/multer.js";
import { tokenVerify } from "../middlewares/tokenVerify.js";

// Inity Router
const route = express.Router();
route.use(tokenVerify);

/**
 * @Desc User Routing
 */

// Get All Users
route.get("/", getAllUsers);
route.post("/", createNewUser);
route.get("/:id", singleUser);
route.delete("/:id", DeleteUser);
route.patch("/:id", userPhotoUploadMulter, updateUser);
route.put("/:id", userPhotoUploadMulter, updateUser);
route.put("/status/:id", userUpdateStatus);
route.patch("/status/:id", userUpdateStatus);

// Export
export default route;
