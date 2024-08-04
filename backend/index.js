import express from "express";
import ImageKit from "imagekit";
import cors from "cors";
import mongoose from "mongoose";
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import path from "path";
import url from "url";

import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";

const port = process.env.PORT || 3000;
const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      // SINCE WE ARE CREATING THE chat FOR THE FIRST TIME, THE role WILL BE "user" ALL THE TIME
      history: [{ role: "user", parts: [{ text }] }],
    });

    const savedChat = await newChat.save();

    // CHECK IF THE userChats EXISTS
    const userChats = await UserChats.find({ userId: userId });

    // IF userChats DOES NOT EXIST CREATE IT AND ADD chat IN THE chats ARRAY OF MODEL UserChats
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
      // IF userChats DOES EXIST ADD chat IN THE chats ARRAY OF MODEL UserChats
      await UserChats.updateOne(
        // FIRST WE SEARCH FOR THE userId
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

    if (userChats.length === 0) {
      return res.status(200).send([]);
    }

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

// put BC WE ARE GOING TO UPDATE OUR EXISTING chats
app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  const { question, answer, img } = req.body;

  const newItems = [
    // THE REASON FOR ...(question) IS THAT WHEN WE CREATE A NEW chat IT AUTOMATICALLY ADD A NEW user MESSAGE IN THE chatPage component on top, THAT MEANS IT IS ALREADY IN OUR DB, ENTONCES NOSOTROS AÑADIMOS UN NUEVO mensaje AL chat
    ...(question
      // ... INDICA QUE SI HAY UNA img SE AGREGARA AL ARRAY DE parts (POR ESO PROPAGA DENTRO DEL ARRAY parts LA img), SINO NO SE AGREGARA AL ARRAY DE parts
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            // WILL SEND EVERY SINGLE item IN THE history ARRAY
            $each: newItems,
          },
        },
      }
    );
    res.status(200).send(updatedChat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding conversation!");
  }
})

// error HANDLER TAKEN FROM Clerk's DOCUMENTATION FOR WHEN WE DO AUTHENTICATION
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send('Unauthenticated!');
});

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
})

app.listen(port, () => {
  connect();

  console.log("Server running on port", port);
});