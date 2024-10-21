import express from "express";
import cors from "cors";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!");
  } catch (err) {
    console.log(err);
  }
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.post("/api/chats", async (req, res) => {
  const { userId, text } = req.body;
  console.log(text);
  console.log(userId);

  try {
    //create a new chat
    console.log("create a new chat");
    const newChat = new Chat({
      userId: userId,
      history: [{ role: "user", parts: [{ text }] }],
    });
    const savedChat = await newChat.save();

    //check if the userchats exist
    const userChats = await UserChats.find({ userId: userId });

    //if dowsnt exist create a new one and add the chats into that chats array
    console.log(userChats.length);
    if (!userChats.length) {
      console.log("IN leagth conditions");
      console.log(savedChat._id);
      const newUserChats = new UserChats({
        userId: userId,
        chats: [{ _id: savedChat.id, title: text.substring(0, 40) }],
      });

      await newUserChats.save();
    } else {
      //if existing,PUSH THE CHAT TO THE EXISTING ARRAY CHATS
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

      res.status(201).send(newChat._id);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating chats!");
  }
});

app.listen(port, () => {
  connect();
  console.log("Server running on 3000");
});
