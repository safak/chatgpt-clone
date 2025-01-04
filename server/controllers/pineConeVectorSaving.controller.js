import axios from "axios"; // For downloading the PDF
import pdfParse from "pdf-parse"; // For parsing the PDF
import { Pinecone } from "@pinecone-database/pinecone"; // Pinecone SDK
import conf from "../src/conf.js";

// Initialize Pinecone client
console.log("Initializing Pinecone client...");
const pc = new Pinecone({
  apiKey: conf.pinecone.apiKey, // Replace with your API key
});
console.log("Pinecone client initialized.");

// Define the Pinecone index name
const indexName = "vecotr";
const nameSpaceName = "newCheck"

// Define the embedding model
const model = "multilingual-e5-large"; // Replace with the model of your choice

// Function to generate embeddings using Pinecone's Inference API
const generateEmbeddings = async (text) => {
  // console.log("Generating embeddings for the provided text...");
  try {
    const embeddings = await pc.inference.embed(model, [text], {
      inputType: "passage", // Use "query" for queries
      truncate: "END",
    });
    console.log("Embeddings generated successfully.");
    return embeddings[0].values; // Extract the vector values
  } catch (error) {
    console.error("Error generating embeddings:", error.message);
    throw new Error("Embedding generation failed.");
  }
};

// Function to parse and store vectors in Pinecone
export const parseAndStoreInPinecone = async (fileId, fileUrl) => {
    console.log(`Processing file with ID: ${fileId} and URL: ${fileUrl}`);
    try {
      // Download the PDF file
      console.log("Downloading the PDF file...");
      const response = await axios.get(fileUrl, { responseType: "arraybuffer", timeout: 5000 });
      const pdfBuffer = response.data;
  
      if (!pdfBuffer || pdfBuffer.length === 0) {
        console.error("Failed to download the PDF file or file is empty.");
        throw new Error("Failed to download the PDF file or file is empty.");
      }
      console.log("PDF file downloaded successfully.");
  
      // Parse the PDF content
      console.log("Parsing the PDF content...");
      const pdfData = await pdfParse(pdfBuffer);
      const pdfText = pdfData?.text;
  
      if (!pdfText || pdfText.trim() === "") {
        console.error("PDF parsing failed or produced empty text.");
        throw new Error("PDF parsing failed or produced empty text.");
      }
      console.log("PDF content parsed successfully.");
  
      // Generate embeddings
      console.log("Generating embeddings for the parsed PDF text...");
      const vector = await generateEmbeddings(pdfText);
  
      if (!vector || vector.length === 0) {
        console.error("Embedding generation failed or produced an empty vector.");
        throw new Error("Embedding generation failed or produced an empty vector.");
      }
      console.log("Embeddings generated and ready to be stored.");
  
      // Initialize the Pinecone index
      console.log("Initializing the Pinecone index...");
      const index = pc.index(indexName);
  
      // Upsert the vector to the Pinecone index
      console.log("Upserting vector to the Pinecone index...");
      const upsertResponse = await index.namespace(nameSpaceName).upsert([{
        id: fileId.toString(),
        values: vector,
        metadata: { fileId, text: pdfText },
      }]);
      if(upsertResponse){
        console.log("there was a response:", upsertResponse)
      }
      console.log("Done without anyResponse Error");
  
        return fileId;  // Using fileId as the ID for Pinecone database
      
    } catch (error) {
      console.error(`Error processing file with ID: ${fileId}`, error.message);
      throw new Error("Error during vectorization and Pinecone storage.");
    }
};


  










// Function to retrieve vectors from Pinecone using metadata filtering (without a vector query)
export const getVectorFromPinecone = async (fileId) => {
  console.log(`Ngrok url is ${conf.externalEndpoints.flaskApi} from Pinecone...`);

  try {
    // Initialize Pinecone index
    
    console.log("Fetching vector data from Pinecone...");

    // Query the Pinecone index using metadata filter (fileId)
    const requestBody = {
      file_id: fileId, 
    };
    const apiUrl = conf.externalEndpoints.flaskApi || "https://7ac8-34-91-77-28.ngrok-free.app";
    const response = await fetch(`${apiUrl}/get_model_response`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Send the request body as JSON
    });

    // Check if the response is OK (HTTP 2xx)
    if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}: ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Log the response to the console
    // console.log("Response from Flask server:", data);

    // Log and return the vector data
    if (data && data.data) {
      console.log("Vector Data Retrieved from Pinecone");
      return data.data; // Return the vector data (assuming the response has 'data' field)
    } else {
      throw new Error("No vector data found in the response");
    }

  } catch (error) {
    // Catch errors and log detailed messages
    console.error(`Error retrieving vector for file ID: ${fileId}`, error.message);
    throw new Error(`Error retrieving vector from Pinecone: ${error.message}`);
  }
};
