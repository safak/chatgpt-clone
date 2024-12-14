import mongoose, { Schema } from "mongoose";

const scoreSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema
      required: true,
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video", // Reference to the Video schema
      required: true,
    },
    shortAnswers: [
      {
        question: { type: String, required: true },
        givenAnswer: { type: String, required: true },
        correctAnswer: { type: String }, // To be added after LLM evaluation
      },
    ],
    mcqs: [
      {
        question: { type: String, required: true },
        selectedOption: { type: String, required: true },
        correctOption: { type: String, required: true },
        isCorrect: { type: Boolean, required: true }, // Remains for MCQs as correctness can be determined immediately
      },
    ],
    score: {
      type: Number,
      min: 0, // Score should be non-negative
    },
  },
  { timestamps: true }
);

export const Score = mongoose.model("Score", scoreSchema);
