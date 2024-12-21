import conf from "../src/conf.js";

async function checkFlaskHealth() {
    try {
        // Use the API URL from the configuration
        const apiUrl =  "https://b4c5-34-91-77-28.ngrok-free.app" 
        // const apiUrl = conf.externalEndpoints.videoApi || "https://3b8d-34-91-77-28.ngrok-free.app"; // Fallback to default if not defined

        // Prepare the request body with an 'id' and a valid 'url'
        const requestBody = {
            file_id: "676594520c3eb8c3272efa2c", // Example ID, change as needed
            url: "https://example.com" // Replace with a valid URL
        };

        // Make a POST request to the Flask server's endpoint
        const response = await fetch(`${apiUrl}/get_model_response`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody), // Send the request body as JSON
        });

        // Check if the response is OK (HTTP 2xx)
        if (response.status !== 200) {
            throw new Error(`Server responded with status ${response.message}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Log the response to the console
        console.log("Response from Flask server:", data);

        // Check the status of the response
        if (data.status === "Flask server is running great!") {
            console.log("Flask server is up and running!");
        } else {
            console.log("Unexpected response from Flask server:", data.status);
        }
    } catch (error) {
        // Log any errors encountered during the request
        console.error("Error while making the request:", error.message);
    }
}

// Call the function to check the Flask health endpoint
checkFlaskHealth();

