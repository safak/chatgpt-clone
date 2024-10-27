import express from "express";
import cors from "cors";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const port = process.env.PORT || 3000; // Define server port
const app = express(); // Create Express application

// Enable CORS with credentials, restricting origins to CLIENT_URL environment variable
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO); // Connect to MongoDB using the MONGO environment variable
    console.log("Connected to mongoDB!");
  } catch (err) {
    console.log(err); // Log connection errors
  }
};

// Configure ImageKit for image handling and authentication
const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT, // ImageKit URL endpoint
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY, // ImageKit public key
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY, // ImageKit private key
});

// Endpoint to provide ImageKit authentication parameters
app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters(); // Generate authentication parameters
  res.send(result);
});

// Endpoint to create a new chat
app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId; // Get authenticated user ID
  const { text } = req.body; // Get text from request body

  try {
    // Create a new chat document
    const newChat = new Chat({
      userId: userId,
      history: [{ role: "user", parts: [{ text }] }],
    });
    const savedChat = await newChat.save(); // Save chat to database

    // Check if the user already has chats stored
    const userChats = await UserChats.find({ userId: userId });

    if (!userChats.length) {
      // If user has no existing chats, create a new UserChats document
      const newUserChats = new UserChats({
        userId: userId,
        chats: [{ _id: savedChat._id, title: text.substring(0, 40) }],
      });
      await newUserChats.save();
    } else {
      // If user has existing chats, append the new chat to the chats array
      await UserChats.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );
    }
    res.status(201).send(newChat._id); // Respond with new chat ID
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating chats!"); // Send error response if chat creation fails
  }
});

// Endpoint to get user’s chat list
app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId; // Get authenticated user ID
  try {
    const userChats = await UserChats.find({ userId: userId }); // Retrieve user's chats
    res.status(200).send(userChats[0].chats); // Send chat list in response
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching userchats"); // Error handling
  }
});

// Endpoint to get chat history by chat ID
app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId; // Get authenticated user ID
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId: userId }); // Find chat by ID
    res.status(200).send(chat); // Send chat details in response
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching chat"); // Error handling
  }
});

// Endpoint to update chat history with a new conversation
app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId; // Get authenticated user ID
  const { question, answer, img } = req.body; // Get conversation details from request body

  // Prepare new conversation items based on question, answer, and optional image
  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, userId }, // Update specific chat by ID and user
      {
        $push: {
          history: {
            $each: newItems, // Append new conversation items to chat history
          },
        },
      }
    );
    res.status(200).send(updatedChat); // Send updated chat in response
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding conversation!"); // Error handling
  }
});

// Global error handler for unauthenticated access
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});

// Start server and initiate MongoDB connection
app.listen(port, () => {
  connect();
  console.log("Server running on 3000");
});
