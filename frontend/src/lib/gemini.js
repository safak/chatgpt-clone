import { HarmBlockThreshold, HarmCategory, GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../conf/config";

// Initialize the GoogleGenerativeAI instance
const genAI = new GoogleGenerativeAI(config.VITE_GOOGLE_AI_API_KEY);

// Define safety settings for the generative model
const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,  // Allow all levels of harassment
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,  // Allow all levels of hate speech
    },
  ];
  
// Set up the generative model with the defined safety settings
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings: safetySettings });

// Export the model
export default model;
