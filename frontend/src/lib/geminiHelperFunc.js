import React from "react";
import { useImage } from "../contexts/ImageContext.jsx";
import model from "./gemini.js";



export const generateContentWithRetry = async (prompt, imageUrl = null, retries = 3) => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      let response;
      if (imageUrl) {
        // Send the prompt and image separately (or adjust according to the API)
        response = await model.generateContent(prompt, imageUrl); // Assuming generateContent expects prompt and imageUrl separately
      } else {
        response = await model.generateContent(prompt); // If no image, just send the prompt
      }

      
      if (response ) {
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

















export const startChatWithMessage = async (message, history = [], updateCallback) => {
  const chat = model.startChat({
    history: history.length
      ? history
      : [
          { role: "user", parts: [{ text: "Hello" }] },
          { role: "model", parts: [{ text: "Great to meet you. What would you like to know?" }] },
        ],
  });

  try {
    // Start streaming the response
    const result = await chat.sendMessageStream(message);

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
    history.push({ role: "user", text: message });
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



// export const startChatWithMessage = async (message, history = [], setMessages) => {
//   console.log("Inside here", message);

//   // Ensure history is in the correct format
//   const formattedHistory = history.map((msg) => ({
//     role: msg.role,
//     parts: [{ text: msg.text }],
//   }));

//   // Default history if none exists
//   const chat = model.startChat({
//     history: formattedHistory.length
//       ? formattedHistory
//       : [
//           { role: "user", parts: [{ text: "Hello" }] },
//           { role: "model", parts: [{ text: "Great to meet you. What would you like to know?" }] },
//         ],
//   });

//   try {
//     console.log(
//       "Atleast in the try part"
//     )
//     // Format the user message correctly
//     const userMessage = { role: "user", parts: [{ text: message }] };

//     // Add the user message to the history and state
//     formattedHistory.push(userMessage);
//     // setMessages((prevMessages) => [...prevMessages, userMessage]);

//     // Start streaming the AI response
//     console.log("Before chat creation");
//     const result = await chat.sendMessageStream(message[0]);
//     console.log("After chat creation", chat);

//     let responseText = "";

//     // Create a placeholder AI message
//     const aiMessage = { role: "model", parts: [{ text: "" }] };
//     formattedHistory.push(aiMessage);
//     setMessages([...formattedHistory]); // Add the placeholder AI message

//     // Stream chunks and update the last AI message
//     for await (const chunk of result.stream) {
//       const chunkText = chunk.text();
//       responseText += chunkText;

//       // Update the last AI message in the history
//       aiMessage.parts[0].text = responseText;
//       setMessages([...formattedHistory]);
//     }

//     return responseText;
//   } catch (error) {
//     console.error("Error during chat session:", error);

//     if (error.message.includes("blocked due to SAFETY")) {
//       throw new Error("Your message was flagged as unsafe. Please modify the input and try again.");
//     }

//     throw new Error("An unexpected error occurred during the chat session.");
//   }
// };
