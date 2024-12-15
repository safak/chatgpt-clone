import axios from 'axios';
import conf from '../conf/conf.js'; // Configuration file for the API URL

class GetUserData {
    constructor() {
        this.apiUrl = conf.apiUrl; // API base URL from the configuration (e.g., `http://localhost:8000/api/v1`)
    }

    async getFileHistory() {
        try {
            
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('No access token found in localStorage');
                return null;
            }
    
            // Axios POST request
            console.log("Before sending history request to server")
            const response = await axios.post(
                `${this.apiUrl}/users/get-file-history`, // API endpoint
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Attach the access token
                    },
                    withCredentials: false, // No cookies required
                }
            );
    
            console.log("File history retrieved successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error('Error uploading chat history:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || error.message);
        }
        
    }

}


const getUserData = new GetUserData();
export default getUserData;