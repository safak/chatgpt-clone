import axios from "axios"; // For downloading the PDF
import pdfParse from "pdf-parse"; // For parsing the PDF
import { FileData } from "../models/filedata.model.js";
import { VectorData } from "../models/vectorData.model.js"; // For storing vector data

export const parseAndVectorizePDF = async (fileId, fileUrl) => {
  try {
    console.log(`Processing file with ID: ${fileId}`);

    // Step 1: Download the PDF
    const response = await axios.get(fileUrl, { responseType: "arraybuffer", timeout: 5000 });
    const pdfBuffer = response.data;

    // console.log(`PDF Buffer size||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\: ${pdfBuffer.length} bytes`);

    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error("Failed to download the PDF file or file is empty.");
    }

    // Step 2: Parse the PDF content
    const pdfData = await pdfParse(pdfBuffer);
    const pdfText = pdfData?.text;

    if (!pdfText || pdfText.trim() === "") {
      throw new Error("PDF parsing failed or produced empty text.");
    }

    console.log("Parsed PDF Text (Preview):", pdfText.slice(0, 500)); // Log a preview of the parsed text

    // Step 3: Convert the text into a vector format
    const vector = textToVector(pdfText);

    if (!vector || vector.length === 0) {
      throw new Error("Vectorization failed or produced an empty vector.");
    }

    console.log("Generated Vector (Preview):", vector.slice(0, 10)); // Log a preview of the vector

    // Step 4: Save vector data in the VectorData model
    const vectorData = new VectorData({
      fileId,
      vector,
    });
    await vectorData.save();

    // Update the FileData document with the VectorData reference
    const fileUpdate = await FileData.findByIdAndUpdate(
      fileId,
      { vectorData: vectorData._id },
      { new: true } // Return the updated document
    );

    if (!fileUpdate) {
      throw new Error(`Failed to update FileData with ID: ${fileId}`);
    }

    console.log(`Successfully vectorized file with ID: ${fileId}`);
  } catch (error) {
    console.error(`Error processing file with ID: ${fileId}`, error.message);
  }
};

// Helper function for text-to-vector conversion
const textToVector = (text) => {
  // Replace this with actual vectorization logic
  const words = text.split(/\s+/);
  return words.map((word) => word.length); // Example placeholder logic
};





// import axios from "axios"; // For downloading the PDF
// import pdfParse from "pdf-parse"; // For parsing the PDF
// import * as use from "@tensorflow-models/universal-sentence-encoder"; // Universal Sentence Encoder for text-to-vector conversion
// import * as tf from "@tensorflow/tfjs-node"; // TensorFlow.js Node.js backend
// import { FileData } from "../models/filedata.model.js"; // Database model for file metadata
// import { VectorData } from "../models/vectorData.model.js"; // Database model for vector data

// // Load the Universal Sentence Encoder model once at startup
// let useModel;

// const preloadUSEModel = async () => {
//   try {
//     console.log("Preloading Universal Sentence Encoder model...");
//     useModel = await use.load();
//     console.log("Universal Sentence Encoder model loaded successfully.");
//   } catch (error) {
//     console.error("Error loading Universal Sentence Encoder model:", error.message);
//     throw error; // Fail fast if the model cannot be loaded
//   }
// };

// // Main function to parse and vectorize a PDF
// export const parseAndVectorizePDF = async (fileId, fileUrl) => {
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

//     // Step 3: Convert the text into a vector format
//     const vector = await textToVector(pdfText);

//     if (!vector || vector.length === 0) {
//       throw new Error("Vectorization failed or produced an empty vector.");
//     }

//     console.log("Generated Vector (Preview):", vector.slice(0, 10)); // Log a preview of the vector

//     // Step 4: Save vector data in the VectorData model
//     const vectorData = new VectorData({
//       fileId,
//       vector,
//     });
//     await vectorData.save();

//     // Step 5: Update the FileData document with the VectorData reference
//     const fileUpdate = await FileData.findByIdAndUpdate(
//       fileId,
//       { vectorData: vectorData._id },
//       { new: true } // Return the updated document
//     );

//     if (!fileUpdate) {
//       throw new Error(`Failed to update FileData with ID: ${fileId}`);
//     }

//     console.log(`Successfully vectorized file with ID: ${fileId}`);
//   } catch (error) {
//     console.error(`Error processing file with ID: ${fileId}`, error.message);
//   }
// };

// // Helper function for text-to-vector conversion using the preloaded model
// const textToVector = async (text) => {
//   try {
//     if (!useModel) {
//       throw new Error("Universal Sentence Encoder model not loaded. Ensure preloadUSEModel is called.");
//     }

//     console.log("Generating embeddings...");
//     const embeddings = await useModel.embed(text);

//     console.log("Embeddings generated successfully.");
//     return embeddings.arraySync()[0]; // Return the vector as a flat array
//   } catch (error) {
//     console.error("Error generating vector with TensorFlow.js:", error.message);
//     return [];
//   }
// };

// // Export the model preload function for server initialization
// export { preloadUSEModel };
