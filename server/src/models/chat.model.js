import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    history: [
      {
        role: {
          type: String,
          enum: ["user", "model"],
          required: true,
        },
        parts: [
          {
            text: {
              type: String,
              required: true,
            },
          },
        ],
        image: {
          type: String,
          required: false,
        },
      },
    ],
    fileData: [
      {
        type: Schema.Types.ObjectId,
        ref: "FileData", // Reference to the FileData model
        required: false, // Optional association with file data
      },
    ],
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);
