// import React from "react";
// import { useImage } from "../contexts/ImageContext.jsx";
// import model from "./gemini.js";



// export const generateContentWithRetry = async (prompt, imageUrl = null, retries = 3) => {
//   let attempt = 0;
//   while (attempt < retries) {
//     try {
//       let response;
//       if (imageUrl) {
//         // Send the prompt and image separately (or adjust according to the API)
//         response = await model.generateContent(prompt, imageUrl); // Assuming generateContent expects prompt and imageUrl separately
//       } else {
//         response = await model.generateContent(prompt); // If no image, just send the prompt
//       }

      
//       if (response ) {
//         const aiText = response.response.candidates[0].content.parts[0].text;
//         return aiText;
//       }

//       throw new Error("Invalid response format from Gemini");
//     } catch (error) {
//       console.warn(`Attempt ${attempt + 1} failed. Error:`, error);

//       if (attempt >= retries - 1) {
//         throw error; // Re-throw the error if retries are exhausted
//       }

//       attempt++;
//       await new Promise((resolve) => setTimeout(resolve, 2000)); // Retry after 2 seconds
//     }
//   }
// };















// export const startChatWithMessage = async (message, history = [], updateCallback) => {
//   // Ensure history is initialized with a default conversation if empty
//   const chat = model.startChat({
//     history: history.length
//       ? history
//       : [
//           { role: "user", parts: [{ text: "Hello" }] },
//           { role: "model", parts: [{ text: "Great to meet you. What would you like to know?" }] },
//         ],
//   });

//   try {
//     // Start streaming the response
//     const result = await chat.sendMessageStream(message);

//     let responseText = "";

//     // Stream chunks in real-time
//     for await (const chunk of result.stream) {
//       const chunkText = chunk.text();
//       responseText += chunkText;

//       // Use the callback to update the UI with streamed chunks
//       if (updateCallback) {
//         updateCallback(chunkText); // Pass the current chunk to the callback
//       }
//     }

//     // Update the history with the user message and AI response
//     history.push({ role: "user", text: message.text || message });  // Handle both text and image data
//     history.push({ role: "model", text: responseText });

//     return responseText;
//   } catch (error) {
//     console.error("Error during chat session:", error);

//     if (error.message.includes("blocked due to SAFETY")) {
//       throw new Error("Your message was flagged as unsafe. Please modify the input and try again.");
//     }

//     throw new Error("An unexpected error occurred during the chat session.");
//   }
// };


































import React from "react";
import { useImage } from "../contexts/ImageContext.jsx";
import model from "./gemini.js";
import fs from "fs"; // If using Node.js, otherwise adjust for browser-side functionality

// Utility function to fetch and encode image data from URL
const encodeImageFromUrl = async (imageUrl) => {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
  }

  const fileBlob = await response.blob();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      const base64Data = reader.result.split(",")[1]; // Base64 string (without the data URL prefix)
      resolve({
        inlineData:{
          inlineData: {
            data: base64Data,  // Base64 image data
            mimeType: fileBlob.type,  // MIME type of the image (e.g., image/jpeg, image/png)
          }
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(fileBlob);
  });
};

// Function to handle retrying image processing
export const generateContentWithRetry = async (prompt, imageUrl = null, retries = 3) => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      let response;
      
      if (imageUrl) {
        // Fetch and encode the image if imageUrl is provided
        const encodedImage = await encodeImageFromUrl(imageUrl);

        // Send the prompt and the encoded image data (wrapped in the expected format)
        response = await model.generateContent(prompt, encodedImage.inlineData);
      } else {
        response = await model.generateContent(prompt); // If no image, just send the prompt
      }

      if (response) {
        const aiText = response.response.candidates[0].content.parts[0].text;
        return aiText;
      }

      throw new Error("Invalid response format from Gemini");
    } catch (error) {
      console.warn(`Attempt ${attempt + 1} failed. Error:`, error);

      if (attempt >= retries - 1) {
        throw error; // Re-throw the error if retries are exhausted
      }

      attempt++;
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Retry after 2 seconds
    }
  }
};

// Function to start a chat with the given message
export const startChatWithMessage = async (message, history = [], updateCallback) => {
  // Ensure history is initialized with a default conversation if empty
  const chat = model.startChat({
    history: history.length
      ? history
      : [
          { role: "user", parts: [{ text: "Hello" }] },
          { role: "model", parts: [{ text: "Great to meet you. What would you like to know?" }] },
        ],
  });

  try {
    // If message contains an image URL, encode it
    let encodedMessage = message;

    if (message[1] && message[1].startsWith("http")) {
      // If the message contains an image URL, fetch and encode it
      const encodedImage = await encodeImageFromUrl(message[1]);
      encodedMessage[1] = encodedImage.inlineData; // Replace the URL with the formatted base64 image data
    }

    // Start streaming the response
    console.log("The message before sending payload", encodedMessage);
    const result = await chat.sendMessageStream(encodedMessage);

    let responseText = "";

    // Stream chunks in real-time
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      responseText += chunkText;

      // Use the callback to update the UI with streamed chunks
      if (updateCallback) {
        updateCallback(chunkText); // Pass the current chunk to the callback
      }
    }

    // Update the history with the user message and AI response
    history.push({ role: "user", text: message.text || message });  // Handle both text and image data
    history.push({ role: "model", text: responseText });

    return responseText;
  } catch (error) {
    console.error("Error during chat session:", error);

    if (error.message.includes("blocked due to SAFETY")) {
      throw new Error("Your message was flagged as unsafe. Please modify the input and try again.");
    }

    throw new Error("An unexpected error occurred during the chat session.");
  }
};
