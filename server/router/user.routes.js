import { Router } from "express";
import { registerUser, loginWithTempToken, loginUser, logoutUser,  refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, 
    updateUserAvatar, updateUserCoverImage, uploadFile } from "../controllers/user.controller.js";
import { addFileData, getFileHistory, getVectorData } from "../controllers/userFileData.controller.js";
import { insertChat, getChatHistory } from "../controllers/userChat.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; // Your multer setup
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Existing routes
router.route("/register").post(upload.fields([{ name: "avatar", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]), registerUser);
router.route("/login").post(loginUser);
router.route("/login-with-temp-token").post(loginWithTempToken);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

// New route for file upload and saving the uplaoded url of file and the specific encoded data
router.route("/add-file-data").post(verifyJWT, addFileData);
router.route("/get-vector").post(verifyJWT, getVectorData);
router.route("/get-file-history").post(verifyJWT, getFileHistory);
router.route("/insert-chat").post(verifyJWT, insertChat);
router.route("/get-chat-history").post(verifyJWT, getChatHistory);
router.route("/upload-file").post(verifyJWT, upload.single("file"), uploadFile);

export default router;


