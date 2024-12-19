import mongoose from "mongoose";

const vectorMetadataSchema = new mongoose.Schema(
  {
    fileId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "FileData", 
      required: true 
    }, // Link back to the FileData document
    pineconeId: { 
      type: String, 
      required: true, 
      unique: true 
    }, // Unique ID used in Pinecone
    status: { 
      type: String, 
      enum: ["processing", "completed", "failed"], 
      default: "processing" 
    }, // Track vectorization status
    metadata: { 
      type: Map, 
      of: String, 
      default: {} 
    }, // Store any additional metadata
  },
  { timestamps: true }
);

export const VectorMetadata = mongoose.model("VectorMetadata", vectorMetadataSchema);













// import mongoose from "mongoose";

// const vectorDataSchema = new mongoose.Schema(
//   {
//     fileId: { type: mongoose.Schema.Types.ObjectId, ref: "FileData", required: true }, // Link back to FileData
//     vector: { type: Buffer, required: true }, // Use Buffer to store compressed vector
//   },
//   { timestamps: true }
// );

// export const VectorData = mongoose.model("VectorData", vectorDataSchema);

