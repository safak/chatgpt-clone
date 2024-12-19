import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const config = {
    port: process.env.PORT || 8000,
    mongodbUri: process.env.MONGODB_URI,
    corsOrigin: process.env.CORS_ORIGIN || '*',
    accessToken: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiry: process.env.ACCESS_TOKEN_EXPIRY || '1d',
    },
    refreshToken: {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
    },
    cloudinary: {
        name: process.env.CLOUDINARY_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        url: process.env.CLOUDINARY_URL,
    },
    ngrok: {
        auth: process.env.NGROK_AUTH,
        url: null, // Placeholder for the Ngrok URL
    },
    externalEndpoints: {
        url1: `${process.env.EXTERNAL_VIDEO_ENDPOINT}/translate`,
        url2: process.env.EXTERNAL_VIDEO_ENDPOINT2,
    },
    googleAuth: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackUrl: process.env.GOOGLE_CALLBACK_URL,
    },
    pinecone: {
        apiKey: process.env.PINECONE_API,
    },
    sessionSecret: process.env.SESSION_SECRET || 'supersecretkey',
};

export default config;
