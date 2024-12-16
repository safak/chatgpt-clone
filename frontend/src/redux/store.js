import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import fileReducer from "./fileSlice"; // Import the file slice

const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth slice
    file: fileReducer, // Add the file slice
  },
});

export default store;
