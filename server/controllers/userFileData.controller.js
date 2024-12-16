
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { FileData } from "../models/filedata.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import { parseAndVectorizePDF } from "./parseAndVectorizePDF.conroller.js";


// const addFileData = asyncHandler(async (req, res) => {
//   try {
    
//     const { fileUrl, fileName } = req.body.data; // Extract fileUrl and fileName from the request body
//     const userId = req.user?._id; // Extract the user ID from the authenticated user
//     // console.log("Filename is :", fileName, fileUrl)

//     // Validate required fields
//     if (!fileUrl) {
//       return res.status(400).json({
//         status: 400,
//         message: "Invalid data: fileUrl is required.",
//       });
//     }

//     if (!userId) {
//       return res.status(401).json({
//         status: 401,
//         message: "Unauthorized: User ID is required.",
//       });
//     }

//     // Create a new FileData document with fileUrl and fileName
//     const fileData = new FileData({
//       fileUrl,
//       fileName, // This can be optional; null or undefined is fine if not provided
//     });

//     // Save the FileData document
//     await fileData.save();

//     // Find the user and update their fileData array with the newly created fileData ObjectId
//     await User.findByIdAndUpdate(userId, {
//       $push: { fileData: fileData._id }, // Push the new fileData's ObjectId into the user's fileData array
//     });

//     // Respond with the populated file data
//     const populatedFileData = await FileData.findById(fileData._id);
//     res.status(201).json({
//       status: 201,
//       message: "FileData added successfully",
//       data: populatedFileData,
//     });

//   } catch (error) {
//     // Handle different errors and respond with specific messages
//     if (error.name === "ValidationError") {
//       return res.status(400).json({
//         status: 400,
//         message: "Validation failed: " + error.message,
//       });
//     } else if (error.name === "MongoError" && error.code === 11000) {
//       return res.status(400).json({
//         status: 400,
//         message: "Duplicate field error: " + error.message,
//       });
//     } else {
//       return res.status(500).json({
//         status: 500,
//         message: "Server error: " + (error.message || "An unknown error occurred."),
//       });
//     }
//   }
// });


const addFileData = asyncHandler(async (req, res) => {
  try {
    const { fileUrl, fileName } = req.body.data;
    const userId = req.user?._id;

    if (!fileUrl) {
      return res.status(400).json({
        status: 400,
        message: "Invalid data: fileUrl is required.",
      });
    }

    if (!userId) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized: User ID is required.",
      });
    }

    // Create a new FileData document
    const fileData = new FileData({
      fileUrl,
      fileName,
    });
    await fileData.save();

    // Update the user with the new FileData reference
    const userUpdate = await User.findByIdAndUpdate(
      userId,
      { $push: { fileData: fileData._id } },
      { new: true } // Return the updated document
    );

    if (!userUpdate) {
      return res.status(404).json({
        status: 404,
        message: "User not found.",
      });
    }

    // Trigger vectorization in the background
    parseAndVectorizePDF(fileData._id, fileUrl).catch((err) => {
      console.error("Error during vectorization:", err.message);
    });
    console.error("Done with the background or in the backforung----------");

    // Respond to the user immediately
    res.status(201).json({
      status: 201,
      message: "FileData added successfully. Vectorization has started.",
      data: fileData,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error: " + (error.message || "An unknown error occurred."),
    });
  }
});




const getFileHistory = asyncHandler(async (req, res) => {
  try {
    // console.log("Retriving started")
    const userId = req.user._id; // Get user ID from the authenticated user
    // console.log("User retrived:", userId)
    // Validate user ID
    if (!userId) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized: User ID is missing",
      });
    }

    // Aggregate to get file data associated with the user
    const userFileHistory = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "filedatas", // Name of the collection storing FileData
          localField: "fileData", // Array of ObjectIds in the User model
          foreignField: "_id", // Field in FileData collection that should match the ObjectId
          as: "fileData", // The name of the new field containing the matched file data
        },
      },
      {
        $project: {
          fileData: 1, // Only include the fileData field
        },
      },
    ]);

    if (!userFileHistory || !userFileHistory.length) {
      return res.status(404).json({
        status: 404,
        message: "No file history found for this user",
      });
    }

    // Respond with the populated file data
    res.status(200).json({
      status: 200,
      message: "File history retrieved successfully",
      data: userFileHistory[0].fileData,
    });
  } catch (error) {
    // Handle server errors or unexpected issues
    res.status(500).json({
      status: 500,
      message: error.message || "An unknown error occurred",
    });
  }
});




export { addFileData,
    getFileHistory
 };
