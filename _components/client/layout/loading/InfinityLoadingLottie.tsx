"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/**
 * InfinityLoadingLottie Component
 *
 * Displays a centered, full-screen Lottie animation for loading states.
 * Ideal for blocking UI screens like protected routes or async wait screens.
 *
 * @component
 * @returns {JSX.Element} Centered infinite Lottie loader
 *
 * @example
 * ```tsx
 * return (
 *   <InfinityLoadingLottie />
 * )
 * ```
 */
const InfinityLoadingLottie: React.FC = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full h-[350px]">
                <DotLottieReact
                    src="https://lottie.host/46d66ad5-3245-4420-a88b-7e2e6e5e1adf/OjnWWFgMw1.lottie"
                    loop
                    autoplay
                />
            </div>
        </div>
    );
};

export default InfinityLoadingLottie;
