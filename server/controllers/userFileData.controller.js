import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { FileData } from "../models/filedata.model.js";
import { Chat } from "../models/chat.model.js";
import mongoose from "mongoose";



// Controller function to add FileData
// const addFileData = asyncHandler(async (req, res) => {
//   const { fileUrl, inlineData, associatedChat } = req.body.data; // Extract fields from request body
//   console.log("The recieved Data:")

//   // Validate required fields
//   if (!fileUrl || !inlineData || !inlineData.data || !inlineData.mimeType) {
//     throw new ApiError(400, "Invalid data: fileUrl, inlineData, and mimeType are required.");
//   }

//   // If an associatedChat is provided, validate its existence
//   let chat = null;
//   if (associatedChat) {
//     if (!mongoose.Types.ObjectId.isValid(associatedChat)) {
//       throw new ApiError(400, "Invalid associatedChat ID.");
//     }

//     chat = await Chat.findById(associatedChat);
//     if (!chat) {
//       throw new ApiError(404, "Associated chat not found.");
//     }
//   }

//   // Create a new FileData document
//   const fileData = new FileData({
//     fileUrl,
//     inlineData: {
//       data: inlineData.data,
//       mimeType: inlineData.mimeType,
//     },
//     associatedChat: chat ? chat._id : null, // Assign the chat ID if valid
//   });

//   // Save the document
//   await fileData.save();

//   // Respond with the created document
//   res.status(201).json(new ApiResponse(201, "FileData added successfully", fileData));
// });


// Controller function to add FileData
const addFileData = asyncHandler(async (req, res) => {
    const { fileUrl, inlineData, associatedChat } = req.body.data; // Extract fields from request body
    console.log("The received Data:", req.body.data);
  
    // Validate required fields
    if (!fileUrl || !inlineData || !inlineData.data || !inlineData.mimeType) {
      throw new ApiError(400, "Invalid data: fileUrl, inlineData, and mimeType are required.");
    }
  
    // If an associatedChat is provided, validate its existence
    let chat = null;
    if (associatedChat) {
      // Here you can validate UUID format if needed
      if (!mongoose.Types.ObjectId.isValid(associatedChat)) {
        console.log("Using UUID format for associatedChat.");
        // If you're using UUID, skip the ObjectId validation and just proceed with the UUID
        chat = await Chat.findOne({ uuid: associatedChat }); // Assuming you store chat ID as UUID in your MongoDB
      } else {
        chat = await Chat.findById(associatedChat);
      }
  
      if (!chat) {
        throw new ApiError(404, "Associated chat not found.");
      }
    }
  
    // Create a new FileData document
    const fileData = new FileData({
      fileUrl,
      inlineData: {
        data: inlineData.data,
        mimeType: inlineData.mimeType,
      },
      associatedChat: chat ? chat._id : null, // Assign the chat ID if valid
    });
  
    // Save the document
    await fileData.save();
  
    // Respond with the created document
    res.status(201).json(new ApiResponse(201, "FileData added successfully", fileData));
  });
  



export { addFileData };
