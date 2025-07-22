"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/**
 * CallListLoadingLottie Component
 *
 * Displays a Lottie animation specifically for when the call list is loading.
 * Typically used inside containers rather than full-screen blocks.
 *
 * @component
 * @returns {JSX.Element} Centered loading animation for call list views
 */
const CallListLoadingLottie: React.FC = () => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="w-[250px] h-[250px]">
                <DotLottieReact
                    src="https://lottie.host/4f9b1180-3129-4d0c-b034-0c80662febbb/5PPP8zAgEi.lottie"
                    loop
                    autoplay
                />
            </div>
        </div>
    );
};

export default CallListLoadingLottie;
