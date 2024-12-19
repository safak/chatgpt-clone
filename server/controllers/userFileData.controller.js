import { asyncHandler } from "../utils/asyncHandler.js";
import { FileData } from "../models/filedata.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import { parseAndStoreInPinecone, getVectorFromPinecone } from "./pineConeVectorSaving.controller.js";
import { parseAndVectorizePDF, getCompressedVector } from "./parseAndVectorizePDF.conroller.js";



// const addFileData = asyncHandler(async (req, res) => {
//   try {

//     const { fileUrl, fileName } = req.body.data;
//     const userId = req.user?._id;

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

//     // Create a new FileData document
//     const fileData = new FileData({
//       fileUrl,
//       fileName,
//     });
//     await fileData.save();

//     // Update the user with the new FileData reference
//     const userUpdate = await User.findByIdAndUpdate(
//       userId,
//       { $push: { fileData: fileData._id } },
//       { new: true } // Return the updated document
//     );

//     if (!userUpdate) {
//       return res.status(404).json({
//         status: 404,
//         message: "User not found.",
//       });
//     }

//     // Trigger vectorization in the background and store the Pinecone ID
//     const pineconeVectorId = await parseAndStoreInPinecone(fileData._id, fileUrl);
    
//     // Save the Pinecone vector ID in the file data
//     fileData.pineconeVectorId = pineconeVectorId;
//     await fileData.save();

//     // Respond to the user immediately
//     res.status(201).json({
//       status: 201,
//       message: "FileData added successfully. Vectorization has started.",
//       data: fileData,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       message: "Server error: " + (error.message || "An unknown error occurred."),
//     });
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

    // Respond to the user immediately
    res.status(201).json({
      status: 201,
      message: "FileData added successfully. Vectorization has started.",
      data: fileData,
    });

    // Run the vectorization task in the background
    new Promise(async (resolve, reject) => {
      try {
        const pineconeVectorId = await parseAndStoreInPinecone(fileData._id, fileUrl);
        
        // Save the Pinecone vector ID in the file data
        fileData.pineconeVectorId = pineconeVectorId;
        await fileData.save();

        resolve(pineconeVectorId);
      } catch (error) {
        console.error("Error during vectorization:", error.message);
        reject(error);
      }
    }).catch((error) => {
      console.error("Background task failed:", error.message);
    });

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server error: " + (error.message || "An unknown error occurred."),
    });
  }
});






const getVectorData = asyncHandler(async (req, res) => {
  try {
    // Validate request body
    const { fileId } = req.body;

    if (!fileId || typeof fileId !== "string") {
      return res.status(400).json({
        status: 400,
        message: "Invalid or missing 'fileId' in request body",
      });
    }

    console.log("The body contains: ", req.body);

    // Attempt to retrieve and decompress the vector
    const vectorData = await getVectorFromPinecone(fileId);

    if (!vectorData) {
      return res.status(404).json({
        status: 404,
        message: `No vector data found for file ID: ${fileId}`,
      });
    }

    // Success response
    res.status(200).json({
      status: 200,
      message: "Vector data retrieved successfully",
      data: vectorData,
    });
  } catch (error) {
    console.error(`Error retrieving vector data: ${error.message}`);

    // Generic error response
    res.status(500).json({
      status: 500,
      message: "An error occurred while retrieving vector data",
      error: error.message,
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
    getFileHistory,
    getVectorData
 };
