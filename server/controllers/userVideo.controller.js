import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import axios from 'axios'; // Importing axios
import config from "../src/conf.js";


const getWatchHistory = asyncHandler(async (req, res) => {
    try {
        const user = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.user._id),
                },
            },
            {
                $lookup: {
                    from: "videos",
                    localField: "watchHistory",
                    foreignField: "_id",
                    as: "watchHistory",
                },
            },
            {
                $project: {
                    watchHistory: 1, // Only include watchHistory field
                },
            },
        ]);

        if (!user || !user.length) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(
            new ApiResponse(200, user[0].watchHistory, "Watch History Fetched Successfully")
        );
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch watch history", error });
    }
});


const addVideo = asyncHandler(async (req, res) => {

  // console.log("Inside AddVideo Func")
    const videoUrl = req.body.videoUrl;
    const userId = req.user._id; // Assuming `req.user` is populated by a middleware like `verifyJWT`
    const apiUrl = config.externalEndpoints.url1 || config.externalEndpoints.url2
  
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
      if (!video.requestSent) {
        // console.log("This is the ngrok url:", config.ngrokUrl)
        try {
              // console.log("Already in the DataBase Before sending Request To external API")
              const tempResponse = await axios.post(apiUrl , {
                videoId: video._id,
                videoUrl: videoUrl,
                ngrokUrl: config.ngrokUrl // Include ngrok URL in the request
            });
            if (tempResponse.data) {
              // console.log("Response from external API:", tempResponse);
      
              // Set requestSent to true after successful response
              video.requestSent = true;
      
              // Save the updated video to the database
              await video.save();
              } else {
                  // Handle case where the external API did not respond as expected
                  throw new ApiError(400, "External API did not return a successful response");
              }
        } catch (error) {
            // If there is an error, throw an appropriate ApiError
            throw new ApiError(400, "Unable to send Request to the external API Again");
        }
    }
        return res.status(200).json(
            new ApiResponse(
                201, video, "Video already in watch history"
            )
        );
    }

    // Add the video to the user's watch history
    user.watchHistory.push(video._id);
    await user.save();

    // Sending a POST request to another endpoint with the videoId and videoUrl
    try {
        // console.log("Before sending Request To external API")
        
        const tempResponse = await axios.post(apiUrl, {
            videoId: video._id,
            videoUrl: videoUrl,
            ngrokUrl: config.ngrokUrl // Include ngrok URL in the request
        });

        // Log the full response for debugging
        if (tempResponse) {
          // console.log("Response from external API:", tempResponse.data);
  
          // Set requestSent to true after successful response
          video.requestSent = true;
  
          // Save the updated video to the database
          await video.save();
      } else {
          // Handle case where the external API did not respond as expected
          throw new ApiError(400, "External API did not return a successful response");
      }
    } catch (error) {
        console.error("Error sending video data:", error);
    }

    res.status(201).json(
        new ApiResponse(
            201,
            video,
            "Video added successfully and included in watch history"
        )
    );
});



const getTranscript = asyncHandler(async (req, res) => {
  const videoId = req.query.videoId || req.body.videoId || req.params;
  // console.log("Inside the getTranscript :", videoId);
  
    if (!videoId) {
      throw new ApiError(400, "Video ID is required.");
    }
  
    // Find the video by its ID
    const video = await Video.findById(videoId);
  
    if (!video) {
      throw new ApiError(404, "Video not found.");
    }
  
    // Extract the transcript (default to English for this example)
    const transcript = video.transcript || {};
  
    // If you want to return specific language, you can modify it like this:
    // const { english, hindi, urdu } = video.transcript;
    // In this case, you would return a specific one based on query parameter or user choice.
  
    return res.status(200).json(
      new ApiResponse(200, { transcript: transcript }, "Transcript fetched successfully")
    );
  });


const keyconcept = asyncHandler(async (req, res) => {
  const videoId = req.query.videoId || req.body.videoId || req.params;
  // console.log("Inside the getTranscript :", videoId);
  
    if (!videoId) {
      throw new ApiError(400, "Video ID is required.");
    }
  
    // Find the video by its ID
    const video = await Video.findById(videoId);
  
    if (!video) {
      throw new ApiError(404, "Video not found.");
    }
  
    // Extract the transcript (default to English for this example)
    const keyconcept = video.keyconcept || {};
  
  
    return res.status(200).json(
      new ApiResponse(200, { keyconcept: keyconcept }, "Transcript fetched successfully")
    );
  });


  const getSummary = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId || req.body.videoId || req.params.videoId; // Access the videoId properly
    // console.log("Inside the Summary, Video ID:", videoId);
    if (!videoId) {
      throw new ApiError(400, "Video ID is required.");
    }
  
    // Find the video by its ID
    const video = await Video.findById(videoId);
    // console.log("This is the video:", video)
  
    if (!video) {
      throw new ApiError(404, "Video not found.");
    }
  
    // Extract the summary (default to empty object if not found)
    const summary = video.summary || {};
    // console.log("This is the summary:", summary);
    
    return res.status(200).json(
      new ApiResponse(200, { summary: summary }, "Summary fetched successfully")
    );
});



  const getQnas = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId || req.body.videoId || req.params;
  
    if (!videoId) {
      throw new ApiError(400, "Video ID is required.");
    }
  
    // Find the video by its ID
    const video = await Video.findById(videoId);
  
    if (!video) {
      throw new ApiError(404, "Video not found.");
    }
  
    // Extract the QnAs (both short questions and MCQs)
    const qnas = video.qnas || {};
  
    return res.status(200).json(
      new ApiResponse(200, { qnas: qnas }, "QnAs fetched successfully")
    );
  });



export{
    getWatchHistory,
    addVideo,
    getTranscript,
    getSummary,
    getQnas,
    keyconcept
}