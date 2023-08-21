import mongoose from "mongoose";

// Create User Schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    mobile: {
      type: String,
      trim: true,
      default: null,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    photo: {
      type: String,
      trim: true,
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female", "custom", "undefine"],
      default: "undefine",
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      trim: true,
      require: true,
      // default: "basic-user",
    },
    trash: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export
export default mongoose.model("User", userSchema);
