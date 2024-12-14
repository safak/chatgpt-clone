import axios from 'axios';
import conf from '../conf/conf.js';  // Configuration file for the API URL
import Cookies from 'js-cookie';


export class AuthService {
    constructor() {
        this.apiUrl = conf.apiUrl;  // API base URL from the configuration (e.g., `http://localhost:8000/api/v1`)
    }
    

    async createAccount({ email, password, fullname, username, avatar, coverImage }) {
        try {
            // Prepare FormData for the request
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('fullname', fullname);
            formData.append('username', username);
    
            if (avatar) {
                formData.append('avatar', avatar);
            }
            if (coverImage) {
                formData.append('coverImage', coverImage);
            }
    
            // Send the request to the backend
            const response = await axios.post(`${this.apiUrl}/users/register`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: false,
                });
           
    
            if (response.data.success) {
                const { temporaryToken } = response.data.data;
    
                // Automatically log in with the temporary token
                return await this.loginWithTemporaryToken({ temporaryToken });
            }
        } catch (error) {
            // Handle errors and propagate meaningful messages
            const errorMessage = error.response || "Error Creating Account try later or Use other Credentials";
            throw new Error(errorMessage); // Pass the error to be handled in the UI
        }
    }  

    async loginWithTemporaryToken({ temporaryToken }) {
        try {
            // console.log( "The temporary token login step" ,temporaryToken)
            const response = await axios.post(`${this.apiUrl}/users/login-with-temp-token`, { token: temporaryToken }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false,
            });
            

            const { accessToken, refreshToken } = response.data.data || {};
            // console.log("Now in the user Data step in the loginWithTemporaryToken :")
            if (accessToken, refreshToken) {
                // Store the access and refresh tokens
                // console.log("accesss and refresh token", accessToken, refreshToken)
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
            }
        
            return {accessToken, refreshToken}; // Return only user data
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : error.message);
        }
    }

    async login(data) {
        try {
            const { emailOrUsername, password } = data;

            // Determine if the input is an email
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername);

            // Prepare the payload based on the input type
            const payload = isEmail 
                ? { email: emailOrUsername, password } 
                : { username: emailOrUsername, password };

            const response = await axios.post(
                `${this.apiUrl}/users/login`, 
                payload, 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false,
                }
            );

            // Handle the successful response
            // console.log("Login successful:", response.data);
            
    
            const { accessToken, refreshToken } = response.data.data || {};
            if (accessToken && refreshToken) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
            }
            return { accessToken, refreshToken };
        } catch (error) {
            // Custom error handling based on status codes
            if (error.response) {
                const { status, data } = error.response;
                if (status === 401) {
                    throw new Error("Invalid password. Please try again.");
                } else if (status === 404) {
                    throw new Error("User not found. Please check your email or username.");
                } else {
                    throw new Error(data.message || "An error occurred. Please try again.");
                }
            } else {
                throw new Error(error.message || "Network error. Please try again.");
            }
        }
    }

    async googleLogin({ tokenId }) {
        try {
            const response = await axios.post(`${this.apiUrl}/users/google-login`, { tokenId }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false,
            });

            const { accessToken, refreshToken } = response.data.data || {};
            if (accessToken && refreshToken) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
            }

            return response.data;
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : error.message);
        }
    }

    async getCurrentUser() {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) return null;

            const response = await axios.post(
                `${this.apiUrl}/users/current-user`, 
                {},
                { headers: { "Authorization": `Bearer ${accessToken}` }, withCredentials: false }
            );
            // console.log("Inside the current user:", response.data.data)
            return response.data.data;
        } catch (error) {
            console.error("Error fetching current user:", error);
            return null;
        }
    }

    async logout() {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) return null;

            await axios.post(`${this.apiUrl}/users/logout`, {}, {
                headers: { "Authorization": `Bearer ${accessToken}` }, 
                withCredentials: false 
            });

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            
        } catch (error) {
            console.error('Error logging out:', error);
            throw new Error(error.response ? error.response.data.message : error.message);
        }
    }
}

const authService = new AuthService();
export default authService;
