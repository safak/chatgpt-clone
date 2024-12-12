import model from "./gemini.js"


// Helper function for retry logic
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