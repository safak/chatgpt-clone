import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Chat } from "../models/chat.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Function to insert chat
// const insertChat = asyncHandler(async (req, res) => {
//     const { history } = req.body; // Extract chat history from the request body
//     console.log("The recieved History Is:", history)

//     // Ensure `history` is provided
//     if (!history || !Array.isArray(history)) {
//         throw new ApiError(400, "Invalid chat history data");
//     }

//     // Check if the user is authenticated and available from `req.user`
//     const userId = req.user._id;
//     if (!userId) {
//         throw new ApiError(401, "Unauthorized: User ID is missing");
//     }

//     // Create or update the chat for the user
//     let chat = await Chat.findOne({ userId });

//     if (!chat) {
//         // If no chat exists for the user, create a new chat
//         chat = new Chat({ userId, history });
//     } else {
//         // Append the new history items to the existing chat
//         console.log("Appending hisory")
//         chat.history.push(...history);
//     }

//     // Save the chat
//     await chat.save();

//     // Respond with the updated chat
//     res.status(200).json(new ApiResponse(200, "Chat inserted successfully", chat));
// });





const insertChat = asyncHandler(async (req, res) => {
    const { history } = req.body; // Extract chat history from the request body
    // console.log("The received History Is:", history);

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
        console.log("Appending history");
        chat.history.push(...formattedHistory);
    }

    // Save the chat
    await chat.save();

    // Respond with the updated chat
    res.status(200).json(new ApiResponse(200, "Chat inserted successfully", chat));
});




export { insertChat };
