import mongoose from "mongoose";

// Create Role Schema
const roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      required: true,
    },
    permissions: {
      type: Array,
      default: [],
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
export default mongoose.model("Role", roleSchema);
