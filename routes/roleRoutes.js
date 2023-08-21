import express from "express";

import { tokenVerify } from "../middlewares/tokenVerify.js";
import {
  createNewRole,
  deleteRole,
  getAllRoles,
  singleRole,
  updateRole,
  updateRoleStatus,
} from "../controllers/role/roleControllers.js";

// Inity Router
const router = express.Router();
router.use(tokenVerify);

/**
 * @Desc User Routing
 */
router.route("/").get(getAllRoles).post(createNewRole);
router
  .route("/:id")
  .get(singleRole)
  .delete(deleteRole)
  .put(updateRole)
  .patch(updateRole);
router.put("/status/:id", updateRoleStatus);
router.patch("/status/:id", updateRoleStatus);
// Export
export default router;
