// Helper function for retry logic
const generateContentWithRetry = async (prompt, imageUrl = null, retries = 3) => {
    let attempt = 0;
    while (attempt < retries) {
      try {
        let response;
        
        // Handle both image and text separately
        if (imageUrl) {
          // Send the prompt and image separately
          response = await model.generateContent(prompt, imageUrl);
        } else {
          // If no image, just send the prompt
          response = await model.generateContent(prompt);
        }
  
        // Log the response to debug the structure
        console.log("Gemini response:", response);
  
        // Ensure response contains the expected data
        if (
          response &&
          response.response &&
          response.response.candidates &&
          response.response.candidates[0].content &&
          response.response.candidates[0].content.parts
        ) {
          const aiText = response.response.candidates[0].content.parts[0].text;
          return aiText;
        }
  
        throw new Error("Invalid response format from Gemini");
  
      } catch (error) {
        console.warn(`Attempt ${attempt + 1} failed. Error:`, error);
  
        // If retries are exhausted, throw the error
        if (attempt >= retries - 1) {
          throw error;
        }
  
        // Retry after 2 seconds
        attempt++;
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  };
  