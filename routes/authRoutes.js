import express from "express";
import {
  authLogin,
  authLogout,
  authRegister,
  getLogedInUser,
} from "../controllers/auth/authControllers.js";
import { tokenVerify } from "../middlewares/tokenVerify.js";

// Init Router
const route = express.Router();

/**
 * @Desc Login and Registration
 * @Name Routes
 */

// Auth Login
route.post("/", authLogin);
route.post("/register", authRegister);
route.post("/logout", authLogout);
route.get("/me", tokenVerify, getLogedInUser);

// Export
export default route;
