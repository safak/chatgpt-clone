// import mongoose, { Schema } from "mongoose";
// import ytdl from "ytdl-core"; // Import ytdl-core library

// const videoSchema = new Schema(
//   {
//     videoUrl: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     thumbnailUrl: { type: String },
//     title: { type: String },
//     duration: { type: String }, // Store duration as a string in minutes:seconds format
//     transcript: {
//       english: [{
//         timestamp: [Number], // Array of numbers
//         text: { type: String, required: true }
//       }],
//       original: [{
//         timestamp: [Number], // Array of numbers
//         text: { type: String, required: true }
//       }]
//     },    
//     requestSent: {
//       type: Boolean,
//       default: false, // Set to false by default
//     },
//     summary: {
//       english: { type: String, default: "NA" },
//       original: { type: String, default: "NA" }
//     },
//     keyconcept: {
//       type: {
//           primary: { type: String, default: "NA" }, // Primary key concept
//           secondary: [{ type: String }], // Array for additional/secondary concepts
//           description: { type: String, default: "No description available" } // Optional description
//       },
//       default: {}, // Set default to an empty object
//     },  
//     qnas: {
//       shortQuestions: [
//         {
//           question: { type: String, required: true },
//           answer: { type: String, required: true },
//         },
//       ],
//       mcqs: [
//         {
//           question: { type: String, required: true },
//           options: [{ type: String, required: true }],
//           correctAnswer: { type: String, required: true },
//         },
//       ],
//     },
//   },
//   { timestamps: true }
// );

// // Helper Method to fetch video details
// videoSchema.methods.fetchVideoDetails = async function () {
//   const videoData = await getYouTubeVideoDetails(this.videoUrl);
//   this.thumbnailUrl = videoData.thumbnailUrl;
//   this.title = videoData.title;
//   this.duration = videoData.duration;

//   return this.save();
// };

// // Helper function to get YouTube video details using ytdl-core
// const getYouTubeVideoDetails = async (url) => {
//   try {
//     // Ensure the URL is correctly formatted
//     if (!/^https:\/\/www\.youtube\.com\/watch\?v=/.test(url)) {
//       throw new Error("Invalid YouTube URL: " + url);
//     }

//     // Fetch video info using ytdl-core
//     const info = await ytdl.getInfo(url);
//     const thumbnailUrl = info.videoDetails.thumbnails[0].url;
//     const title = info.videoDetails.title;
//     const durationInSeconds = info.videoDetails.lengthSeconds;

//     const minutes = Math.floor(durationInSeconds / 60);
//     const seconds = durationInSeconds % 60;
//     const duration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

//     return { thumbnailUrl, title, duration };
//   } catch (error) {
//     throw new Error("Error fetching video details: " + error.message);
//   }
// };


// export const Video = mongoose.model("Video", videoSchema);



import mongoose, { Schema } from "mongoose";
import ytdl from "ytdl-core"; // Import ytdl-core library

const videoSchema = new Schema(
  {
    videoUrl: {
      type: String,
      required: true,
      unique: true,
    },
    thumbnailUrl: { type: String },
    title: { type: String },
    duration: { type: String }, // Store duration as a string in minutes:seconds format
    transcript: {
      english: [
        {
          timestamp: [Number], // Array of numbers
          text: { type: String, required: true },
        },
      ],
      original: [
        {
          timestamp: [Number], // Array of numbers
          text: { type: String, required: true },
        },
      ],
    },
    requestSent: {
      type: Boolean,
      default: false, // Set to false by default
    },
    summary: {
      english: { type: String, default: "NA" },
      original: { type: String, default: "NA" },
    },
    keyconcept: {
      type: {
        primary: { type: String, default: "NA" }, // Primary key concept
        secondary: [
          {
            Question: { type: String, required: true }, // The question text
            Answer: [{ type: String, required: true }], // Array of answers
          },
        ], // Array of objects for questions and answers
        description: { type: String, default: "No description available" }, // Optional description
      },
      default: {}, // Default to an empty object
    },    
    qnas: {
      shortQuestions: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
      mcqs: [
        {
          question: { type: String, required: true },
          options: [{ type: String, required: true }],
          correctAnswer: { type: String, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

// Add pre-save validation for duration
videoSchema.pre("save", function (next) {
  const [minutes, seconds] = this.duration.split(":").map(Number);

  if (minutes > 20 || (minutes === 20 && seconds > 0)) {
    return next(new Error("Duration is above 20 minutes. Video cannot be saved."));
  }
  next();
});

// Helper Method to fetch video details
videoSchema.methods.fetchVideoDetails = async function () {
  const videoData = await getYouTubeVideoDetails(this.videoUrl);
  this.thumbnailUrl = videoData.thumbnailUrl;
  this.title = videoData.title;
  this.duration = videoData.duration;

  return this.save();
};

// Helper function to get YouTube video details using ytdl-core
const getYouTubeVideoDetails = async (url) => {
  try {
    // Ensure the URL is correctly formatted
    if (!/^https:\/\/www\.youtube\.com\/watch\?v=/.test(url)) {
      throw new Error("Invalid YouTube URL: " + url);
    }

    // Fetch video info using ytdl-core
    const info = await ytdl.getInfo(url);
    const thumbnailUrl = info.videoDetails.thumbnails[0].url;
    const title = info.videoDetails.title;
    const durationInSeconds = info.videoDetails.lengthSeconds;

    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const duration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    return { thumbnailUrl, title, duration };
  } catch (error) {
    throw new Error("Error fetching video details: " + error.message);
  }
};

export const Video = mongoose.model("Video", videoSchema);
