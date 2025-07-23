"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import InfinityLoadingLottie from "../client/layout/loading/InfinityLoadingLottie";

/**
 * `AdminRoleOnly` is a higher-order component (HOC) that restricts access
 * to a given component strictly for users with the admin role (`role === 0`).
 *
 * - If the user is unauthenticated, they are redirected to `/register`.
 * - If the user is authenticated but not an admin, they are redirected to `/`.
 * - If the user is an admin, the wrapped component is rendered.
 * - A loading animation is shown during session resolution.
 *
 * @template P - The props of the wrapped component
 * @param WrappedComponent - The component to protect for admin access only
 * @returns A component that checks admin authentication before rendering
 *
 * @example
 * ```tsx
 * const AdminPanel = () => <div>Only for admins</div>;
 * export default AdminRoleOnly(AdminPanel);
 * ```
 */
const AdminRoleOnly = <P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
    const AdminProtected: React.FC<P> = (props) => {
        const { status, data: session } = useSession();
        const [ready, setReady] = useState(false);

        useEffect(() => {
            const timeout = setTimeout(() => {
                if (status === "loading") return;

                if (status === "unauthenticated") {
                    redirect("/register");
                } else {
                    const role = session?.user?.role;
                    if (role === "admin") {
                        setReady(true);
                    } else {
                        redirect("/");
                    }
                }
            }, 500); // slight delay to allow auth sync

            return () => clearTimeout(timeout);
        }, [status, session]);

        return !ready || status === "loading" ? (
            <InfinityLoadingLottie />
        ) : (
            <WrappedComponent {...props} />
        );
    };

    AdminProtected.displayName = `AdminRoleOnly(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return AdminProtected;
};

export default AdminRoleOnly;
