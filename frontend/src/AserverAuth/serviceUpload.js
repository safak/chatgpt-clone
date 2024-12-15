import axios from 'axios';
import conf from '../conf/conf.js'; // Configuration file for the API URL

class UploadService {
    constructor() {
        this.apiUrl = conf.apiUrl; // API base URL from the configuration (e.g., `http://localhost:8000/api/v1`)
    }

async addChatHistory(history) {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found in localStorage');
            return null;
        }

        // Axios POST request
        const response = await axios.post(
            `${this.apiUrl}/users/insert-chat`, // API endpoint
            { history }, // Send the history in the request body
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Attach the access token
                },
                withCredentials: false, // No cookies required
            }
        );

        // console.log("Chat history uploaded successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading chat history:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
}


async addFileData(data){
    try {
        
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found in localStorage');
            return null;
        }

        // Axios POST request
        const response = await axios.post(
            `${this.apiUrl}/users/add-file-data`, // API endpoint
            {data}, // Send the history in the request body
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Attach the access token
                },
                withCredentials: false, // No cookies required
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error uploading chat history:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
}

}


const uploadService = new UploadService();
export default uploadService;