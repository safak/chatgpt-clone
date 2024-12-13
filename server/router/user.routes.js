import { Router } from "express";
import { registerUser, loginWithTempToken, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, uploadFile } from "../controllers/user.controller.js";
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

// New route for file upload
router.route("/upload-file").post(verifyJWT, upload.single("file"), uploadFile);

export default router;




// const handleFileUpload = async (event) => {
//     const formData = new FormData();
//     formData.append("file", event.target.files[0]); // Add the file to the form data

//     try {
//         const response = await fetch("/api/user/upload-file", {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Add JWT token
//             },
//             body: formData,
//         });

//         if (!response.ok) {
//             throw new Error("File upload failed");
//         }

//         const data = await response.json();
//         console.log("File uploaded successfully:", data.fileUrl); // Log the uploaded file URL
//     } catch (error) {
//         console.error("Error uploading file:", error);
//     }
// };

// return (
//     <input type="file" onChange={handleFileUpload} />
// );
