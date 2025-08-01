import dotenv from "dotenv"
dotenv.config()

/**
 * Returns the base API URL based on the current environment.
 *
 * @returns {string | undefined} - Environment-specific API URL.
 */
export function getBaseApiUrl(): string | undefined {
    switch (process.env.NODE_ENV) {
        case "development":
            return process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL;
        case "test":
            return process.env.NEXT_PUBLIC_PRODUCTION_TEST_URL;
        case "production":
        default:
            return process.env.NEXT_PUBLIC_PRODUCTION_URL;
    }
}

/**
 * Returns the base client URL based on the current environment.
 *
 * @returns {string | undefined} - Environment-specific frontend URL.
 */
export function getBaseUrl(): string | undefined {
    const env = process.env.NODE_ENV || "production";

    switch (env) {
        case "development":
            return process.env.NEXT_PUBLIC_DEVELOPMENT_URL;
        case "test":
            return process.env.NEXT_PUBLIC_PRODUCTION_TEST_URL;
        case "production":
        default:
            return process.env.NEXT_PUBLIC_PRODUCTION_URL;
    }
}
