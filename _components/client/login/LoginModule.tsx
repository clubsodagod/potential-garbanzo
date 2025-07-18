"use client";

import React from "react";
import LoginForm from "./_components/LoginForm";

/**
 * LoginModule Component
 *
 * Wraps the login form with centered alignment and responsive padding.
 * Useful as the main layout shell for a standalone login page.
 *
 * @returns {JSX.Element}
 */
const LoginModule: React.FC = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center px-6">
            <LoginForm />
        </div>
    );
};

export default LoginModule;
