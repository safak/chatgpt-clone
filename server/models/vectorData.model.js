import mongoose, {Schema} from "mongoose";

const vectorDataSchema = new mongoose.Schema({
    fileId: { type: mongoose.Schema.Types.ObjectId, ref: "FileData", required: true }, // Link back to FileData
    vector: { type: Array, required: true }, // Store the vector data here
  }, {timestamps: true});
  
export const VectorData = mongoose.model("VectorData", vectorDataSchema);