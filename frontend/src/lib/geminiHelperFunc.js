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



export const startChatWithMessage = async (message, imageUrl = null, history = []) => {
  const chat = model.startChat({
    history: history.length > 0 ? history : [
      { role: "user", parts: [{ text: "Hello" }] },
      { role: "model", parts: [{ text: "Great to meet you. What would you like to know?" }] },
    ],
  });
  
  console.log("Chat Initialized:", chat);

  try {
    let result;

    // Send both text and image if image URL is provided
      result = await chat.sendMessageStream(message);
      

      // Accumulate the streamed response
      let responseText = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      responseText += chunkText;
    }

    // Update the history with the new response (for future interactions)
    history.push({ role: "user", text: message });
    history.push({ role: "ai", text: responseText });


    return responseText;
  } catch (error) {
    console.error("Error during chat session:", error);
    
    if (error.message.includes('blocked due to SAFETY')) {
      throw new Error("Your message was flagged as unsafe. Please modify the input and try again.");
    }
    
    throw new Error("An unexpected error occurred during the chat session.");
  }
  
};


