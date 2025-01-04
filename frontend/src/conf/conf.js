const conf = {
    apiUrl: (() => {
        const baseUrl = String(import.meta.env.VITE_API_URL) || 'http://localhost:3000';
        return baseUrl.endsWith('/api/v1') ? baseUrl : `${baseUrl}/api/v1`;
    })(),
    googleClientId: String(import.meta.env.VITE_GOOGLE_CLIENT_ID),
    googleRedirectUri: String(import.meta.env.VITE_GOOGLE_REDIRECT_URI),
    jwtSecret: String(import.meta.env.VITE_JWT_SECRET),
    clerkFrontendApi: String(import.meta.env.REACT_APP_CLERK_FRONTEND_API),
    clerkApiKey: String(import.meta.env.REACT_APP_CLERK_API_KEY),
    clerkPublishableKey: String(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY),
    imageKitPublicKey: String(import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY),
    imageKitEndpoint: String(import.meta.env.VITE_IMAGE_KIT_ENDPOINT),
    googleAiApiKey: String(import.meta.env.VITE_GOOGLE_AI_API_KEY),
};

export default conf;
