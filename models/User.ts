import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Store Clerk's userId as a string
    email: { type: String, required: true, unique: true },
    full_name: { type: String },
    customer_id: { type: String, unique: true, sparse: true },
    price_id: { type: String },
    status: { type: String, default: "inactive" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
