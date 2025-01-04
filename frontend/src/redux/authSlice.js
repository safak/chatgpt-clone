import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false, // Tracks login status
    user: {
        id: null,
        username: null,
        email: null,
        fullName: null,
        avatar: null,
        coverImage: null,
        createdAt: null,
        updatedAt: null,
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoginStatus: (state, action) => {
            state.isAuthenticated = action.payload; // Set login status
        },
        setUserData: (state, action) => {
            state.user = {
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                fullName: action.payload.fullName,
                avatar: action.payload.avatar,
                coverImage: action.payload.coverImage,
                createdAt: action.payload.createdAt,
                updatedAt: action.payload.updatedAt,
            };
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload }; // Update user data partially
        },
        logout: (state) => {
            state.isAuthenticated = false; // Reset authentication status
            state.user = { // Reset user data
                id: null,
                username: null,
                email: null,
                fullName: null,
                avatar: null,
                coverImage: null,
                createdAt: null,
                updatedAt: null,
            };
        },
    },
});

export const { setLoginStatus, setUserData, updateUser, logout } = authSlice.actions;

export default authSlice.reducer;
