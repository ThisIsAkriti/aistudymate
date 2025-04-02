import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    full_name: { type: String },
    username: { type: String, unique: true },
    customer_id: { type: String, unique: true, sparse: true },
    price_id: { type: String },
    status: { type: String, default: "inactive" },
    photo: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
