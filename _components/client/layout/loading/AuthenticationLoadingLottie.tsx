"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/**
 * AuthenticationLoadingLottie Component
 *
 * Displays a centered Lottie animation for authentication-related loading states,
 * such as login, session validation, or redirects. Use this within auth-guarded layouts
 * or pages that depend on session or token validation.
 *
 * @component
 * @returns {JSX.Element} Authentication-focused loading animation
 */
const AuthenticationLoadingLottie: React.FC = () => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white">
            <div className="w-[200px] h-[200px]">
                <DotLottieReact
                    src="https://lottie.host/ce3a2ae8-3ff4-4504-83fe-f1c0ce8c8a62/9x9fZ8MAoX.lottie" // Example: animated fingerprint scanning
                    loop
                    autoplay
                />
            </div>
        </div>
    );
};

export default AuthenticationLoadingLottie;
