import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const tokenVerify = asyncHandler(async (req, res, next) => {
  const authToken = req.cookies.token;

  // Check Token
  if (!authToken) return res.status(400).json({ message: "Unauthorized" });

  // Verify Token
  jwt.verify(
    authToken,
    process.env.ACCESS_TOKEN,
    asyncHandler(async (err, decode) => {
      if (err) return res.status(400).json({ message: "Invalid Token" });
      const me = await User.findOne({ email: decode.email })
        .select("-password")
        .populate("role");
      req.me = me;
      next();
    })
  );
});
