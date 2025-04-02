import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true , unique:true}, // Store Clerk's userId as a string
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
