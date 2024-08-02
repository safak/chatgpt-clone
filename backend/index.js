import express from "express";
import ImageKit from "imagekit";
import cors from "cors";
import mongoose from "mongoose";
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(express.json())

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
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

// app.get('/api/test', ClerkExpressRequireAuth(), async (req, res) => {
//   const userId = req.auth.userId
//   console.log(userId);
//   res.send('yeah')
// })

app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId
  const { text } = req.body;

  try {
    const newChat = new Chat({
      userId: userId,
      // text HERE WOULD BE THE prompt
      history: [{ role: "user", parts: [{ text }] }],
    });

    const savedChat = await newChat.save();

    // CHECK IF userChats EXISTS
    const userChats = await UserChats.find({ userId: userId });

    // IF userChats DOES NOT EXIST CREATE IT AND ADD CHAT IN THE chats ARRAY
    if (!userChats?.length) {
      const newUserChats = new UserChats({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40)
          },
        ]
      })

      await newUserChats.save()
    } else {
      // IF userChats DOES EXIST ADD CHAT IN THE chats ARRAY
      await UserChats.updateOne(
        { userId: userId }, 
        {
          $push: {
            // ADD CHAT IN THE chats ARRAY
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40)
            }
          }
        }
      )

      // WE SEND THE _id BC WHEN WE SEND ANY text WE ARE GOING TO BE REDIRECTED TO THE chatPage
      res.status(201).send(newChat._id);
    }    
  } catch (error) {
    console.log(error);

    res.status(500).send({ error: 'error creating chat' });
  }
});

app.get('/api/userchats', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId

  try {
    const userChats = await UserChats.find({ userId: userId })

    res.status(200).send(userChats[0].chats)
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'error fetching userchats' });    
  }
})

app.get('/api/chats/:id', ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId

  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId: userId })

    res.status(200).send(chat)
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'error fetching chat' });    
  }
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send('Unauthenticated!');
});

app.listen(port, () => {
  connect();

  console.log("Server running on port", port);
});