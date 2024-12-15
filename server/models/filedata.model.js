import mongoose, { Schema } from "mongoose";

const fileDataSchema = new Schema(
  {
    fileUrl: {
      type: String,
      required: true, // The file URL is mandatory
    },
  },
  { timestamps: true }
);

export const FileData = mongoose.model("FileData", fileDataSchema);
