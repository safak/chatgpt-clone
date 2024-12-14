const conf = {
    
    apiUrl: (() => {
        const baseUrl = String(import.meta.env.VITE_API_URL) || 'http://localhost:3000';
        return baseUrl.endsWith('/api/v1') ? baseUrl : `${baseUrl}/api/v1`;
    })(),
    googleClientId: String(import.meta.env.VITE_GOOGLE_CLIENT_ID),
    googleRedirectUri: String(import.meta.env.VITE_GOOGLE_REDIRECT_URI), // Added this line
};

export default conf;
