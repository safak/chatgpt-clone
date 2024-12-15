import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Chat } from "../models/chat.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Controller function to get chat history for a specific user
const getChatHistory = asyncHandler(async (req, res) => {
  // Check if the user is authenticated and available from `req.user`
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized: User ID is missing");
  }

  // Retrieve the chat history for the user
  const chat = await Chat.findOne({ userId });

  if (!chat) {
    throw new ApiError(404, "No chat history found for this user");
  }

  // Respond with the chat history
  res.status(200).json(new ApiResponse(200, "Chat history retrieved successfully", chat.history));
});




// Controller function to insert a chat
const insertChat = asyncHandler(async (req, res) => {
  const { history, fileDataIds } = req.body; // Extract chat history and optional fileData IDs from the request body
  // console.log("The received History Is:", history, fileDataIds);

  // Ensure `history` is provided and is an array
  if (!history || !Array.isArray(history)) {
    throw new ApiError(400, "Invalid chat history data");
  }

  // Transform history to match schema format if necessary
  const formattedHistory = history.map((item) => ({
    role: item.role,
    parts: item.parts || [{ text: item.text }], // Ensure `parts` array exists
    image: item.image || null,
  }));

  // Check if the user is authenticated and available from `req.user`
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized: User ID is missing");
  }

  // Find or create the chat for the user
  let chat = await Chat.findOne({ userId });

  if (!chat) {
    // If no chat exists for the user, create a new chat
    chat = new Chat({ userId, history: formattedHistory });
  } else {
    // Append the new history items to the existing chat
    // console.log("Appending history............................");
    chat.history.push(...formattedHistory);
  }

  // Optionally add FileData IDs to the chat if provided
  if (fileDataIds && Array.isArray(fileDataIds)) {
    chat.fileData.push(...fileDataIds); // Add the fileDataIds to the fileData array
  }

  // Save the chat with the fileData association
  await chat.save();

  // Respond with the updated chat
  res.status(200).json(new ApiResponse(200, "Chat inserted successfully", chat));
});

export { insertChat,
    getChatHistory
 };
