import mongoose, { Schema } from "mongoose";

const fileDataSchema = new Schema(
  {
    fileUrl: { type: String, required: true },
    fileName: { type: String },
    vectorData: { type: mongoose.Schema.Types.ObjectId, ref: "VectorData" }, // Reference to VectorData  
  },
  { timestamps: true }
);

export const FileData = mongoose.model("FileData", fileDataSchema);
