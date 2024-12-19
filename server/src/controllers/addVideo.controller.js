import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const addVideo = asyncHandler(async (req, res) => {
    const videoUrl = req.body.videoUrl;
    const userId = req.user._id; // Assuming `req.user` is populated by a middleware like `verifyJWT`

    if (!videoUrl) {
        throw new ApiError(400, "Please provide a valid video URL");
    }

    // Check if the video exists in the database
    let video = await Video.findOne({ videoUrl });

    if (!video) {
        // Video doesn't exist, create a new video entry
        video = new Video({ videoUrl });

        // Fetch video details (from YouTube or another source)
        await video.fetchVideoDetails();

        // Validate video duration
        const [minutes, seconds] = video.duration.split(":").map(Number);
        if (minutes > 20 || (minutes === 20 && seconds > 0)) {
            throw new ApiError(400, "Input duration should be less than 20 minutes");
        }

        // Save the new video to the database
        await video.save();
    }

    // Fetch the user from the database
    const user = await User.findById(userId).populate("watchHistory");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Check if the video is already in the user's watch history
    const alreadyInHistory = user.watchHistory.some(
        (historyItem) => historyItem.videoUrl === videoUrl
    );

    if (alreadyInHistory) {
        return res.status(200).json(
            new ApiResponse(
                201,
                video,
                "Video already in watch history"
            )
        );
    }

    // Add the video to the user's watch history
    user.watchHistory.push(video._id);
    await user.save();

    res.status(201).json(
        new ApiResponse(
            201,
            video,
            "Video added successfully and included in watch history"
        )
    );
});


const addTranscript = asyncHandler(async (req, res) => {
    const { id, english, original } = req.body; // Extract ID and possible transcript fields from the request body
    // console.log("Received request body:", );
  
    try {
      // Find the video by ID
    //   console.log("The video ID is:", id);
      const video = await Video.findById(id);
  
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
  
      // Validate and update the transcript fields
      if (english && Array.isArray(english)) {
        video.transcript.english = english.map((item) => {
          if (Array.isArray(item.timestamp) && item.text) {
            return {
              timestamp: item.timestamp, // Expecting an array
              text: item.text,
            };
          }
          throw new Error("Invalid format for 'english' transcript: Each item must have an array 'timestamp' and a 'text' field");
        });
      }
  
      if (original && Array.isArray(original)) {
        video.transcript.original = original.map((item) => {
          if (Array.isArray(item.timestamp) && item.text) {
            return {
              timestamp: item.timestamp, // Expecting an array
              text: item.text,
            };
          }
          throw new Error("Invalid format for 'original' transcript: Each item must have an array 'timestamp' and a 'text' field");
        });
      }
  
      // Save the updated video
      await video.save();
  
      res.status(200).json({
        message: "Transcript updated successfully",
      });
    } catch (error) {
      console.error("Error updating transcript:", error.message);
      res.status(500).json({ message: "Failed to update transcript", error: error.message });
    }
  });


 
const addSummary = asyncHandler(async (req, res) => {
    const { id, original, english, Summary_eng } = req.body; 
    // console.log("Received Summary:", Summary_eng); 

    try {
        // Find the video by ID
        const video = await Video.findById(id);

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Ensure summary field exists
        if (!video.summary) {
            video.summary = { english: '', original: '' };
        }

        // Only update if values exist
        if (Summary_eng) video.summary.english = Summary_eng; // Update english summary
        if (original) video.summary.original = original; // Update original summary
        if (english && !Summary_eng) video.summary.english = english; 


        // Save the updated video
        await video.save();

        // Fetch the updated video to verify the change
        const updatedVideo = await Video.findById(id);
        // console.log("Updated video:", updatedVideo);

        res.status(200).json({
            message: "Summary updated successfully"
        });
    } catch (error) {
        console.error("Error updating summary:", error); // Log the error for debugging
        res.status(500).json({ message: "Failed to update summary", error: error.message });
    }
});





// const addKeyconcept = asyncHandler(async (req, res) => {
//     const { id, keyconcept } = req.body; // Extract video ID and keyconcept from the request body

//     try {
//         // Find the video by ID
//         const video = await Video.findById(id);

//         if (!video) {
//             return res.status(404).json({ message: "Video not found" });
//         }

//         // Ensure keyconcept field exists and update it
//         video.keyconcept.type = keyconcept || "NA"; // Update the keyconcept field or set it to "NA" if not provided

//         // Save the updated video
//         await video.save();

//         res.status(200).json({
//             message: "Keyconcept updated successfully",
//             keyconcept: video.keyconcept.type, // Include updated keyconcept in response
//         });
//     } catch (error) {
//         console.error("Error updating keyconcept:", error); // Log error for debugging
//         res.status(500).json({
//             message: "Failed to update keyconcept",
//             error: error.message,
//         });
//     }
// });

const addKeyconcept = asyncHandler(async (req, res) => {
    const { id, primary, concept, description } = req.body;
  
    try {
      // Find the video by ID
      const video = await Video.findById(id);
  
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
  
      // Ensure `keyconcept` and its properties exist
      if (!video.keyconcept) {
        video.keyconcept = {}; // Initialize if not exists
      }
      if (!video.keyconcept.type) {
        video.keyconcept.type = {}; // Initialize if not exists
      }
  
      // Update primary, description, and concept
      if (primary) video.keyconcept.type.primary = primary;
      if (description) video.keyconcept.type.description = description;
  
      // Add or update the `concept` field
      if (concept && Array.isArray(concept)) {
        video.keyconcept.type.secondary = concept; // Replace existing concepts
      }
  
      // Save the updated video
      await video.save();
  
      res.status(200).json({
        message: "Keyconcept updated successfully",
        keyconcept: video.keyconcept.type, // Include updated keyconcept in response
      });
    } catch (error) {
      console.error("Error updating keyconcept:", error); // Log error for debugging
      res.status(500).json({
        message: "Failed to update keyconcept",
        error: error.message,
      });
    }
  });
  
  




const addQnas = asyncHandler(async (req, res) => {
    const { id, Questions, mcqs } = req.body; // Extract video ID and possible Q&A fields from the request body
    console.log("The data to be saved is:", req.body)

    try {
        // Find the video by ID
        const video = await Video.findById(id);

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Validate and add short questions if provided
        if (shortQuestions && Array.isArray(shortQuestions)) {
            shortQuestions.forEach(({ question, answer }) => {
                if (question && answer) {
                    video.qnas.shortQuestions.push({ question, answer });
                }
            });
        }

        // Validate and add MCQs if provided
        if (mcqs && Array.isArray(mcqs)) {
            mcqs.forEach(({ question, options, correctAnswer }) => {
                if (question && options && correctAnswer && Array.isArray(options)) {
                    video.qnas.mcqs.push({ question, options, correctAnswer });
                }
            });
        }

        // Save the updated video
        await video.save();

        res.status(200).json({
            message: "Q&A updated successfully",
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update Q&A", error });
    }
});




export { addVideo,
    addTranscript,
    addSummary,
    addQnas,
    addKeyconcept
 };
