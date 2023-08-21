import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectWithMongodb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import errorHandler from "./helper/errorHandle.js";
import permissionRoutes from "./routes/permissionRoutes.js";

// Init Express
const app = express();

// Init Environment Variable
dotenv.config();
const PORT = 5050;

// Cors Setup
app.use(
  cors({
    origin: "https://ephemeral-salmiakki-ad316d.netlify.app/",
    credentials: true,
  })
);
app.use(cookieParser());

// Static Folder
app.use(express.static("public"));

// Form data Manage
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Init Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/role", roleRoutes);
app.use("/api/v1/permission", permissionRoutes);

// Error Handler
app.use(errorHandler);

// Listen Server
app.listen(PORT, () => {
  console.log(`Server is Running On Port ${PORT}`.bgGreen.black);
  connectWithMongodb();
});
