import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './passport.js';
import config from './conf.js'; // Import config.js for env variables
import authRouter from "../router/auth.routes.js"; // Import auth routes
import ImageKit from 'imagekit'; // Import ImageKit

// Initialize ImageKit
const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
});

// Create an instance of an Express app
const app = express();

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
    origin: config.corsOrigin, 
    credentials: true, 
}));

// Middleware to parse incoming JSON payloads
app.use(express.json({
    limit: "10mb", // Increase payload limit
}));

// Middleware to parse URL-encoded data
app.use(express.urlencoded({
    extended: true,
    limit: "10mb", // Increase payload limit
}));

// Middleware to serve static files
app.use(express.static("public"));

// Middleware to parse cookies
app.use(cookieParser());

// Session middleware
app.use(session({
    secret: config.sessionSecret, 
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true,
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1/auth', authRouter); // Mount the auth routes under '/api/v1/auth'

// ImageKit authentication endpoint
app.get("/api/upload", (req, res) => {
    try {
        const result = imagekit.getAuthenticationParameters();
        res.json(result); // Send the authentication parameters
    } catch (error) {
        console.error("Error getting ImageKit auth parameters:", error);
        res.status(500).json({ error: "Error getting authentication parameters" });
    }
});

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the API Server! Use /api/v1 for accessing routes.");
});

// Import routes
import userRouter from "../router/user.routes.js";

// Declare routes
app.use("/api/v1/users", userRouter);

// Export the app
export { app };
