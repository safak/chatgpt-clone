import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false, // Tracks login status
    userData: {
        _id: null,
        username: null,
        email: null,
        fullname: null,
        avatar: null,
        coverImage: null,
        watchHistory: [], // Video history in user data
        createdAt: null,
        updatedAt: null,
        __v: null,
    },
    userHistory: [], // Additional field to store detailed user history
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoginStatus: (state, action) => {
            state.status = action.payload; // Set login status (true/false)
        },
        setUserData: (state, action) => {
            state.userData = {
                _id: action.payload._id,
                username: action.payload.username,
                email: action.payload.email,
                fullname: action.payload.fullname,
                avatar: action.payload.avatar,
                coverImage: action.payload.coverImage,
                watchHistory: action.payload.watchHistory,
                createdAt: action.payload.createdAt,
                updatedAt: action.payload.updatedAt,
                __v: action.payload.__v,
            };
        },
        updateUserHistory: (state, action) => {
            state.userHistory = action.payload; // Replace the user history with new data
        },
        addToUserHistory: (state, action) => {
            state.userHistory.push(action.payload); // Add a single item to the history
        },
        clearUserHistory: (state) => {
            state.userHistory = []; // Clear user history
        },
        logout: (state) => {
            state.status = false; // Reset login status
            state.userData = { // Reset user data
                _id: null,
                username: null,
                email: null,
                fullname: null,
                avatar: null,
                coverImage: null,
                watchHistory: [],
                createdAt: null,
                updatedAt: null,
                __v: null,
            };
            state.userHistory = []; // Reset user history
        },
    },
});

export const {
    setLoginStatus,
    setUserData,
    updateUserHistory,
    addToUserHistory,
    clearUserHistory,
    logout,
} = authSlice.actions;

export default authSlice.reducer;
