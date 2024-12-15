import mongoose, { Schema } from "mongoose";

const fileDataSchema = new Schema(
  {
    fileUrl: {
      type: String,
      required: true, // The file URL is mandatory
    },
    inlineData: {
      data: {
        type: String, // Base64 encoded string
        required: true,
      },
      mimeType: {
        type: String, // MIME type of the file
        required: true,
      },
    },
    associatedChat: {
      type: Schema.Types.ObjectId,
      ref: "Chat", // Reference to the Chat model
      required: false, // Optional association with a chat
    },
  },
  { timestamps: true }
);

export const FileData = mongoose.model("FileData", fileDataSchema);
