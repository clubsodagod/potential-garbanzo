"use client";

import React from "react";
import AdminRoleOnly from "@/_components/route-protection/AdminRoleOnly";

/**
 * Props for AdminDashboardLayout.
 */
interface AdminDashboardLayoutProps {
    /** Nested child components to be rendered inside the admin layout */
    children: React.ReactNode;
}

/**
 * AdminDashboardLayout
 *
 * Layout component for admin-only dashboard pages.
 * Protected by `AdminRoleOnly` HOC to restrict access to users with role === 0.
 *
 * @component
 * @param {AdminDashboardLayoutProps} props - Child elements to render inside the layout
 * @returns {JSX.Element} Protected admin dashboard section
 */
const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children }) => {
    return (
        <section className="min-h-screen px-4 py-6 bg-slate-50 dark:bg-[#0f0f0f]">
            {children}
        </section>
    );
};

// Wrap layout with admin-only protection
export default AdminRoleOnly(AdminDashboardLayout);
