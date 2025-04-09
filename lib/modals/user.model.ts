import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  //clerkId: string;
  email: string;
  name: string;
  // imageUrl: string;
  // createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  //clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  // imageUrl: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
