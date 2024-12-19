import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            console.log("Authorization error: Token not provided");
            return res.status(401).json({ message: "Token not provided" });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find user in the database
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            console.log("Authorization error: Invalid token");
            return res.status(401).json({ message: "Invalid token" });
        }

        // Attach user to request object
        req.user = user;

        next(); // Proceed to the next middleware
    } catch (error) {
        console.log(`Authorization error: ${error.message}`);
        res.status(401).json({ message: "Invalid Access Token" });
    }
};
