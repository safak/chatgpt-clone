import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentFile: null, // Vector data for the selected file
  currentFileData: {
    fileId: null,
    fileUrl: null,
    fileName: null,
  },
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    // Action to set the vector data
    setCurrentFile(state, action) {
      state.currentFile = action.payload;
    },
    // Action to set the metadata (fileId, URL, and name)
    setCurrentFileData(state, action) {
      state.currentFileData = {
        fileId: action.payload.fileId,
        fileUrl: action.payload.fileUrl,
        fileName: action.payload.fileName,
      };
    },
    // Optionally add a reset action
    resetFileState(state) {
      state.currentFile = null;
      state.currentFileData = {
        fileId: null,
        fileUrl: null,
        fileName: null,
      };
    },
  },
});

export const { setCurrentFile, setCurrentFileData, resetFileState } = fileSlice.actions;

export default fileSlice.reducer;
