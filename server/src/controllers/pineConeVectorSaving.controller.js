import axios from "axios"; // For downloading the PDF
import pdfParse from "pdf-parse"; // For parsing the PDF
import { pipeline } from "@huggingface/transformers"; // For Hugging Face pipeline
import { PineconeClient } from "@pinecone-database/pinecone"; // For Pinecone
import conf from "../conf.js"; // Configuration file

// Initialize Pinecone client
const pc = new PineconeClient();
pc.init({
  apiKey: conf.pinecone,
  environment: "us-east1-gcp", // Make sure this matches your Pinecone environment
});

const indexName = "quickstart";

// Ensure the Pinecone index is created
const createPineconeIndex = async () => {
  try {
    // Only create the index if it doesn't exist already
    const existingIndexes = await pc.listIndexes();
    if (!existingIndexes.includes(indexName)) {
      await pc.createIndex({
        name: indexName,
        dimension: 384, // Replace with your model's dimensions
        metric: "cosine", // Use cosine similarity or other metrics
      });
      console.log(`Index created: ${indexName}`);
    } else {
      console.log(`Index ${indexName} already exists.`);
    }
  } catch (error) {
    console.error("Error creating Pinecone index:", error.message);
  }
};

// Call createPineconeIndex during initialization
await createPineconeIndex();

// Load the pre-trained Sentence-BERT model for embeddings
const model = await pipeline("feature-extraction", "sentence-transformers/all-MiniLM-L6-v2", {
  device: "cpu", // Use 'cuda' for GPU if available
});

// Convert text to vector (embedding)
const textToVector = async (text) => {
  const embeddings = await model(text); // Get embeddings from the model
  return embeddings[0]; // Return the first embedding
};

export const parseAndStoreInPinecone = async (fileId, fileUrl) => {
  try {
    console.log(`Processing file with ID: ${fileId}`);

    // Step 1: Download the PDF
    const response = await axios.get(fileUrl, { responseType: "arraybuffer", timeout: 5000 });
    const pdfBuffer = response.data;

    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error("Failed to download the PDF file or file is empty.");
    }

    // Step 2: Parse the PDF content
    const pdfData = await pdfParse(pdfBuffer);
    const pdfText = pdfData?.text;

    if (!pdfText || pdfText.trim() === "") {
      throw new Error("PDF parsing failed or produced empty text.");
    }

    console.log("Parsed PDF Text done, now sending to the textToVector");

    // Step 3: Convert the text into a vector format (embedding)
    const vector = await textToVector(pdfText);

    if (!vector || vector.length === 0) {
      throw new Error("Vectorization failed or produced an empty vector.");
    }

    console.log("Generated Vector (Preview):", vector.slice(0, 10)); // Log a preview of the vector

    // Step 4: Store vector data in Pinecone
    const index = pc.index(indexName);
    const upsertResponse = await index.upsert({
      vectors: [
        {
          id: fileId.toString(), // Use fileId as Pinecone ID (converted to string)
          values: vector, // Store the raw vector
          metadata: { fileId }, // Optional metadata for future reference
        },
      ],
    });

    console.log(`Successfully stored vector for file ID: ${fileId} in Pinecone`);

    // Return the Pinecone vector ID
    return upsertResponse.upsertedIds[0];
  } catch (error) {
    console.error(`Error processing file with ID: ${fileId}`, error.message);
    throw new Error("Error during vectorization and Pinecone storage.");
  }
};

export const getVectorFromPinecone = async (fileId) => {
  try {
    const index = pc.index(indexName);
    const result = await index.fetch([fileId]);

    if (!result.vectors || Object.keys(result.vectors).length === 0) {
      throw new Error(`No vector data found for file ID: ${fileId}`);
    }

    console.log("Vector Data Retrieved from Pinecone");
    return result.vectors[fileId]; // Return the vector data
  } catch (error) {
    console.error(`Error retrieving vector for file ID: ${fileId}`, error.message);
    throw error; // Re-throw the error to be handled elsewhere
  }
};

  

//   export const getVectorFromPinecone = async (fileId) => {
//     try {
//       const index = await pc.index(indexName);
//       const result = await index.fetch([fileId]);
  
//       if (!result.vectors || Object.keys(result.vectors).length === 0) {
//         throw new Error(`No vector data found for file ID: ${fileId}`);
//       }
  
//       console.log("Vector Data Retrieved from Pinecone");
//       return result.vectors[fileId]; // Return the vector data
//     } catch (error) {
//       console.error(`Error retrieving vector for file ID: ${fileId}`, error.message);
//       throw error; // Re-throw the error so it can be handled by the caller
//     }
//   };
  

// export const parseAndStoreInPinecone = async (fileId, fileUrl) => {
//   try {
//     console.log(`Processing file with ID: ${fileId}`);

//     // Step 1: Download the PDF
//     const response = await axios.get(fileUrl, { responseType: "arraybuffer", timeout: 5000 });
//     const pdfBuffer = response.data;

//     if (!pdfBuffer || pdfBuffer.length === 0) {
//       throw new Error("Failed to download the PDF file or file is empty.");
//     }

//     // Step 2: Parse the PDF content
//     const pdfData = await pdfParse(pdfBuffer);
//     const pdfText = pdfData?.text;

//     if (!pdfText || pdfText.trim() === "") {
//       throw new Error("PDF parsing failed or produced empty text.");
//     }

//     console.log("Parsed PDF Text done, now sending to the textToVector");

//     // Step 3: Convert the text into a vector format (embedding)
//     const vector = await textToVector(pdfText);

//     if (!vector || vector.length === 0) {
//       throw new Error("Vectorization failed or produced an empty vector.");
//     }

//     console.log("Generated Vector (Preview):", vector.slice(0, 10)); // Log a preview of the vector

//     // Step 4: Compress the vector (Optional for Pinecone, not used here)
//     const stringifiedVector = JSON.stringify(vector);

//     // Step 5: Store vector data in Pinecone
//     const index = await pc.index(indexName);
//     await index.upsert({
//       vectors: [
//         {
//           id: fileId, // Unique ID for the file
//           values: vector, // Store the raw vector
//           metadata: { fileId }, // Optional metadata
//         },
//       ],
//     });

//     console.log(`Successfully stored vector for file ID: ${fileId} in Pinecone`);
//   } catch (error) {
//     console.error(`Error processing file with ID: ${fileId}`, error.message);
//   }
// };

// // Usage Example: Retrieve Vector from Pinecone
// export const getVectorFromPinecone = async (fileId) => {
//   try {
//     const index = await pc.index(indexName);
//     const result = await index.fetch([fileId]);

//     if (!result.vectors || Object.keys(result.vectors).length === 0) {
//       throw new Error(`No vector data found for file ID: ${fileId}`);
//     }

//     console.log("Vector Data Retrieved from Pinecone");
//     return result.vectors[fileId]; // Return the vector data
//   } catch (error) {
//     console.error(`Error retrieving vector for file ID: ${fileId}`, error.message);
//     throw error; // Re-throw the error so it can be handled by the caller
//   }
// };
