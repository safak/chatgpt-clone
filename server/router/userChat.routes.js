import { Router } from "express";
import { uploadFile } from "../controllers/user.controller.js";
import { addFileData, getFileHistory, getVectorData } from "../controllers/userFileData.controller.js";
import { insertChat, getChatHistory } from "../controllers/userChat.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; // Your multer setup
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router();







// New route for file upload and saving the uplaoded url of file and the specific encoded data
router.route("/add-file-data").post(verifyJWT, addFileData);
router.route("/get-vector").post(verifyJWT, getVectorData);
router.route("/get-file-history").post(verifyJWT, getFileHistory);
router.route("/insert-chat").post(verifyJWT, insertChat);
router.route("/get-chat-history").post(verifyJWT, getChatHistory);
router.route("/upload-file").post(verifyJWT, upload.single("file"), uploadFile);



export default router;