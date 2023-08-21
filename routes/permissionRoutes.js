import express from "express";

import { tokenVerify } from "../middlewares/tokenVerify.js";
import {
  createNewPermission,
  deletePermission,
  getAllPermissions,
  singlePermission,
  updatePermission,
  updatePermissionStatus,
} from "../controllers/permission/permissionControllers.js";

// Inity Router
const router = express.Router();
router.use(tokenVerify);

/**
 * @Desc User Routing
 */
router.route("/").get(getAllPermissions).post(createNewPermission);
router
  .route("/:id")
  .get(singlePermission)
  .delete(deletePermission)
  .patch(updatePermission)
  .put(updatePermission);
router.put("/status/:id", updatePermissionStatus);
router.patch("/status/:id", updatePermissionStatus);

// Export
export default router;
