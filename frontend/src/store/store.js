// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import fileSlice from "./fileSlice.js"


const store = configureStore({
  reducer: {
    auth: authReducer,
    file: fileSlice
  },
});

export default store;
