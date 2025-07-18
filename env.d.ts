/// <reference types="next" />
/// <reference types="next/types/global" />

namespace NodeJS {
    interface ProcessEnv {
        // MongoDB
        MONGODB_URI: string;
        MONGODB_USER: string;
        MONGODB_PASS: string;
        MONGODB_DB_NAME: string;
        MONGODB_AUTH_SOURCE: string;
        MONGODB_SOCKET_TIMEOUT_MS: string;
        MONGODB_SERVER_SELECTION_TIMEOUT_MS: string;

        // Email Provider
        RESEND_API_KEY: string;

        // Auth
        AUTH_GOOGLE_ID: string;
        AUTH_GOOGLE_SECRET: string;

        // URLs
        NEXT_PUBLIC_DEVELOPMENT_URL: string;
        NEXT_PUBLIC_PRODUCTION_URL: string;
        NEXT_PUBLIC_DEVELOPMENT_API_URL: string;
        NEXT_PUBLIC_PRODUCTION_API_URL: string;
    }
}
