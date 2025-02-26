// Import packages
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check for .env file and create it if it doesn't exist
const envPath = join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(
    envPath,
    'GEMINI_API_KEY=your_gemini_api_key_here\nPORT=3001\n'
  );
  console.log('.env file created. Please add your Gemini API key.');
}

// Load environment variables
dotenv.config();

// Validate API key is set
if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
  console.warn('⚠️ GEMINI_API_KEY not configured in .env file');
}

// Initialize express app
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());

// Endpoint to handle chat with Gemini API
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Format conversation history for Gemini
    const contents = [];
    
    // Add conversation history
    history.forEach(item => {
      contents.push({ role: item.isUser ? 'user' : 'model', parts: [{ text: item.text }] });
    });
    
    // Add current message
    contents.push({ role: 'user', parts: [{ text: message }] });
    
    // Make request to Gemini API
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
      { contents },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY
        }
      }
    );
    
    // Extract text from response
    const responseText = response.data.candidates[0]?.content?.parts[0]?.text || 
                        'Sorry, I could not generate a response.';
    
    res.json({ 
      text: responseText,
      raw: response.data
    });
  } catch (error) {
    console.error('Error communicating with Gemini API:', error.message);
    
    res.status(500).json({ 
      error: 'Failed to communicate with Gemini API', 
      details: error.response?.data || error.message 
    });
  }
});

// Add an active listener endpoint that summarizes and asks questions
app.post('/api/active-listener', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Instruct Gemini to act as an active listener
    const prompt = `
      You are acting as an active listener. The user has shared the following:
      
      "${message}"
      
      Please:
      1. Provide a brief summary of what they shared
      2. Ask a thoughtful follow-up question that shows you're genuinely interested
      
      Format your response as a JSON object with two properties:
      - "summary": Your brief summary of what they shared
      - "question": Your thoughtful follow-up question`;
    
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
      {
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY
        }
      }
    );
    
    // Get response text
    const responseText = response.data.candidates[0]?.content?.parts[0]?.text || '';
    
    // Parse JSON from the response (handling potential formatting issues)
    let responseObj;
    try {
      // Find and extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        responseObj = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Error parsing JSON from Gemini response:', parseError);
      // Fallback: try to extract summary and question with regex
      const summary = responseText.match(/summary["\s:]+([^"]+)/i)?.[1] || 
                      'I understand you shared something important.';
      const question = responseText.match(/question["\s:]+([^"]+)/i)?.[1] || 
                       'Can you tell me more about how this makes you feel?';
      
      responseObj = { summary, question };
    }
    
    res.json(responseObj);
  } catch (error) {
    console.error('Error with active listener:', error.message);
    res.status(500).json({ 
      error: 'Failed to process as active listener', 
      details: error.response?.data || error.message 
    });
  }
});

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));