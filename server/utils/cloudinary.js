import { v2 as cloudinary } from "cloudinary";
import fs from 'fs/promises'; // Use async fs module

// Cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Upload function to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Uploading the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // Automatically determine resource type (image, video, etc.)
        });

        // Delete the local file after successful upload
        await fs.unlink(localFilePath);

        return response; // Return Cloudinary response (file URL, etc.)
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);

        // Clean up local file if an error occurs
        try {
            await fs.unlink(localFilePath);
            console.log("Local file deleted after failure:", localFilePath);
        } catch (cleanupError) {
            console.error("Error deleting local file:", cleanupError);
        }

        throw error; // Re-throw error to be handled by the caller
    }
};

export { uploadOnCloudinary };
