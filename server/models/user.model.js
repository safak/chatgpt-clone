import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    fileData: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileData",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
      default: null,
    },
    googleId: { // Add this field to store the Google user ID
      type: String,
      unique: true, // Ensure this field is unique
      sparse: true,  // Allow it to be missing in users who sign up with other methods
    },
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
  } catch (error) {
      next(error); // Proper error handling
  }
});


userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
      {
          _id: this._id,
          username: this.username,
          email: this.email,
          fullname: this.fullname,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
      {
          _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
  );
};


export const User = mongoose.model("User", userSchema);
