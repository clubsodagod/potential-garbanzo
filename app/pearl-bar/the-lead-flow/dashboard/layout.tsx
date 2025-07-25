"use client";

import React from "react";
import AuthenticatedOnly from "@/_components/route-protection/AuthenticatedOnly";

/**
 * Props for DashboardLayout.
 */
interface DashboardLayoutProps {
    /** Nested child components to be rendered inside the layout */
    children: React.ReactNode;
}

/**
 * DashboardLayout
 *
 * Layout component for admin or user dashboard pages.
 * Only accessible to authenticated users via HOC.
 *
 * @component
 * @param {DashboardLayoutProps} props - Children content to render
 * @returns {JSX.Element}
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <section className="min-h-screen px-4 py-6 ">
            {children}
        </section>
    );
};

// Protect route access via HOC
export default AuthenticatedOnly(DashboardLayout);
