"use client";

import React from "react";
import RegisterForm from "./_components/RegisterForm";

/**
 * RegisterModule Component
 *
 * Wraps the registration form with centered layout and padding.
 * Serves as the layout container for the registration page.
 *
 * @returns {JSX.Element}
 */
const RegisterModule: React.FC = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center px-6">
            <RegisterForm />
        </div>
    );
};

export default RegisterModule;
