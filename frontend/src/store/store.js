// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import currentVideoReducer from "./currentVideoSlice"; // Import the slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    currentVideo: currentVideoReducer, // Add the currentVideo slice
  },
});

export default store;
