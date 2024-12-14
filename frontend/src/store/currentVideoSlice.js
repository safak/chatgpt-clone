import { createSlice } from "@reduxjs/toolkit";

const currentVideoSlice = createSlice({
  name: "currentVideo",
  initialState: {
    videoData: null,
    userHistory: [],
    quizResponses: {}, // Store user responses
  },
  reducers: {
    setVideoData: (state, action) => {
      state.videoData = action.payload;
    },
    clearVideoData: (state) => {
      state.videoData = null;
    },
    setUserHistory: (state, action) => {
      state.userHistory = action.payload;
    },
    clearUserHistory: (state) => {
      state.userHistory = [];
    },
    addToUserHistory: (state, action) => {
      state.userHistory.unshift(action.payload);
    },
    saveQuizResponse: (state, action) => {
      state.quizResponses = action.payload; // Save responses globally
    },
  },
});

export const {
  setVideoData,
  clearVideoData,
  setUserHistory,
  clearUserHistory,
  addToUserHistory,
  saveQuizResponse,
} = currentVideoSlice.actions;

export default currentVideoSlice.reducer;
