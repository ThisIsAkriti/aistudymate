import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    stripe_payment_id: { type: String, required: true, unique: true },
    price_id: { type: String, required: true },
    user_email: { type: String, required: true }, // No strict foreign key, handled in app logic
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
