import mongoose from "mongoose";

const PdfSummarySchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // Foreign key
    original_file_url: { type: String, required: true },
    summary_text: { type: String, required: true },
    status: { type: String, default: "completed" },
    title: { type: String },
    file_name: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.PdfSummary ||
mongoose.model("PdfSummary", PdfSummarySchema);
